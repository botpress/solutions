  const moment = require('moment')

  for (const metricId of Object.keys(bp.experimental.successTelemetryRegistry)) {
    if (metricId != 'others') {
      const metric = bp.experimental.successTelemetryRegistry[metricId]
      bp.experimental.successTelemetry.addNewSubview({
        id: 'export-' + metric.key,
        label: 'Interactions',
        metricId: metric.key,
        viewFunction: async ({ botId, startDate, endDate }) => {
          const startDateString = moment(startDate)
            .local()
            .format('D_MMM_YYYY')
          const endDateString = moment(endDate)
            .local()
            .format('D_MMM_YYYY')
          // In order for this script to work ; is required after every command, if not
          // you will get a "Unexpected token ..." error
          // - Remove comments too
          // - The \ character should be excaped with \\
          const script = `
            function download_${metric.key}() {
              const tableSelector = "${metric.options.name}";
              var aTags = document.getElementsByTagName("h2");
              var searchText = tableSelector;
              var found;

              for (var i = 0; i < aTags.length; i++) {
                if (aTags[i].textContent == searchText) {
                  found = aTags[i];
                  break;
                }
              }
              var table = found.parentNode.getElementsByTagName('table')[0];

              if(!table) {
                alert("Could not find table for metric with title: " + tableSelector);
                return;
              }

              var csv_data = [];

              var rows = table.getElementsByTagName('tr');
              for (var i = 0; i < rows.length; i++) {
          
                  var cols = rows[i].querySelectorAll('td,th');
          
                  var csvrow = [];
                  for (var j = 0; j < cols.length; j++) {
                      csvrow.push(cols[j].innerHTML);
                  }
          
                  csv_data.push(csvrow.join(","));
              }
              csv_data = csv_data.join('\\n');

              var element = document.createElement('a');
              element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_data));
              element.setAttribute('download', "exported_${metric.key}__bot_${botId}__from_${startDateString}__to__${endDateString}");

              element.style.display = "none";
              document.body.appendChild(element);

              element.click();

              document.body.removeChild(element);
            }
          `
          return `
            <script id='graph-${metric.key}' type="text/javascript">
              ${script}
            </script>
            <img src onerror="
              var scriptGraph = document.createElement('script');
              scriptGraph.innerText = document.getElementById('graph-${metric.key}').innerText;
              document.getElementById('graph-${metric.key}').appendChild(scriptGraph);
            "/>
            <button onclick="download_${metric.key}()">Download CSV</button>
          `
        }
      })
    }
  }