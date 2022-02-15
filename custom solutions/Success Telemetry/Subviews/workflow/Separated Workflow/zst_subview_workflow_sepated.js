bp.experimental.successTelemetry.addNewSubview({
  id: "workflow_details",
  label: "Workflow Details",
  metricId: "workflow",
  viewFunction: async ({ botId, startDate, endDate, getFilteredQuery }) => {
    const all = await getFilteredQuery();

    const workflows = {};

    for (const item of all) {
      try {
        item.payload = JSON.parse(item.payload);
      } catch (e) {
        continue;
      }
      const { workflowId, status } = item.payload;
      if (!workflows[workflowId]) {
        workflows[workflowId] = { count: 0, successCount: 0 };
      }

      workflows[workflowId].count++;

      if (status == "SUCCESS") workflows[workflowId].successCount++;
    }

    return `
      <table>
        <tr>
          <th> Workflow ID </th>
          <th> Workflows Started </th>
          <th> Successful Completion </th>
        </tr>
        <tr>
          ${Object.keys(workflows)
            .map((workflowId) => {
              const { successCount, count } = workflows[workflowId];

              return `
                <tr>
                  <td>${workflowId}</td>
                  <td>${count}</td>
                  <td>${count > 0 ? (successCount / count).toFixed(2) * 100 : "-"}%</td>
                </tr>
              `;
            })
            .join("")}
        </tr>
      </table>
    `;
  },
});
