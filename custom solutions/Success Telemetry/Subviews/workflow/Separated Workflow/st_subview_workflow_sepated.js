  bp.experimental.successTelemetry.addNewSubview({
    id: 'workflow_details',
    label: 'Workflow Details',
    metricId: 'workflow',
    viewFunction: async ({ botId, startDate, endDate, getFilteredQuery }) => {
      const all = await getFilteredQuery()

      return `
        <table>
          <tr>
            <th> Workflow ID </th>
            <th> Status </th>
            <th> Start Unix </th>
            <th> End Unix </th>
          </tr>
          <tr>
            ${all
              .map(item => {
                return `
                <tr>
                  <td>${item.payload.workflowId}</td>
                  <td>${item.payload.status}</td>
                  <td>${item.payload.startUnix}</td>
                  <td>${item.payload.endUnix}</td>
                </tr>
              `
              })
              .join('')}
          </tr>
        </table>
      `
    }
  })
  //sss