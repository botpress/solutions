const moment = require("moment");
const ms = require("ms");

if (!bp.schedulerInterval) {
  bp.schedulerInterval = {};
} else if (bp.schedulerInterval["main"]) {
  clearInterval(bp.schedulerInterval["main"]);
}

async function hasAlreadyRan(now) {
  const lastRun = await bp.kvs.global().get("last_run_scheduler");
  if (lastRun == now.format("YYYY-MM-DD")) {
    return true;
  }
  return false;
}

async function runTask(bp, day) {
  console.log("Running task at " + day);
}

async function run() {
  try {
    const now = moment().utcOffset(0);
    const day = now.startOf("day");

    const milisecondsUntilEndOfDay = (moment().utcOffset(0).endOf("day").unix() - moment().unix()) * 1000;

    if (await hasAlreadyRan(now)) {
      bp.logger.error(
        "Custom Scheduler: task already ran today (" + now.format("YYYY-MM-DD") + "), skipping."
      );
      return;
    }

    if (milisecondsUntilEndOfDay <= ms("31m")) {
      const lock = await bp.distributed.acquireLock("lock_scheduler", ms("10m")); // Lock for 10 minutes
      try {
        if (lock) {
          await runTask(bp, day.toDate());
          await bp.kvs.global().set("last_run_scheduler", now.format("YYYY-MM-DD")); // Save run
        } else {
          bp.logger.error(
            'Lock not set for resource "lock_scheduler", probably there is another node running the task.'
          );
        }
      } catch (e) {
        throw e;
      } finally {
        if (lock) {
          await lock.unlock();
        }
      }
    } else {
      const milisecondsUntil30MinutesBeforeEndOfDay = milisecondsUntilEndOfDay - ms("30m");
      if (!bp.schedulerTimeout) {
        bp.schedulerTimeout = {};
      } else if (bp.schedulerTimeout["main"]) {
        clearTimeout(bp.schedulerTimeout["main"]);
      }
      bp.schedulerTimeout["main"] = setTimeout(async () => {
        await run();
      }, milisecondsUntil30MinutesBeforeEndOfDay);

      bp.logger.error(
        "Custom Scheduler: It`s not the end of the day yet " +
          moment().utcOffset(0).format("YYYY-MM-DD HH:mm:ss") +
          " , waiting more " +
          (milisecondsUntil30MinutesBeforeEndOfDay / 60000).toFixed(0) +
          " minutes to run task."
      );
    }
  } catch (e) {
    bp.logger.error("Custom Scheduler: Error running: " + e.message);
  }
}

setTimeout(run, 3000);

bp.schedulerInterval["main"] = setInterval(() => {
  run();
}, 86400000);
