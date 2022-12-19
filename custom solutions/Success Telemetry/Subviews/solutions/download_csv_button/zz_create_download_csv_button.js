  const moment = require('moment')

  const injectFunction = (name, functionBody, variables = {}) => {
    functionBody = functionBody.toString()
    return {
      inject: `<script id='fn-${name}' type="text/javascript">
                    ${Object.keys(variables)
                      .map(key => {
                        const stringVar = variables[key].toString()
                        const value = typeof variables[key] == 'string' ? `"${stringVar}"` : stringVar
                        return `var ${name}_${key} = ${value};`
                      })
                      .join(' ')}
                    function ${name}${Object.keys(variables)
        .reduce((previous, current) => {
          return previous.replace(current, `${name}_${current}`)
        }, functionBody)
        .replace(/^\(\) =>/, '()')
        // Replace new line with ; to prevent issues
        .replace(/\n/g, ';')
        // Remove single line comments
        .replace(/\/\/.*?;( ){1}/g, '')}
                  </script>
                  <img src onerror="
                    var scriptGraph = document.createElement('script');
                    scriptGraph.innerText = document.getElementById('fn-${name}').innerText;
                    document.getElementById('fn-${name}').appendChild(scriptGraph);
                  "/>`,
      call: name + '()'
    }
  }

  const generateButton = (subviewId, metricKey, h2Title) => {
    console.log({ subviewId, metricKey, h2Title })
    bp.experimental.successTelemetry.addNewSubview({
      id: 'export-' + subviewId,
      label: `Interactions ${h2Title}`,
      metricId: metricKey,
      viewFunction: async ({ botId, startDate, endDate }) => {
        const int_var_searchTextTitle = h2Title
        const int_var_filenameExport = `exported_${subviewId}__bot_${botId}__from_${moment(startDate)
          .local()
          .format('D_MMM_YYYY')}__to__${moment(endDate)
          .local()
          .format('D_MMM_YYYY')}`

        // Since the function to download will be called from the frontend
        // We will need to inject the function in the browser
        const fn = injectFunction(
          `download_${subviewId}`,
          () => {
            // Get all h2 tags from the page
            var aTags = [...document.getElementsByTagName('h2'), ...document.getElementsByTagName('h5')]
            var found
            // Search for the one with the text from the metric title
            for (var i = 0; i < aTags.length; i++) {
              if (aTags[i].textContent.includes(int_var_searchTextTitle)) {
                found = aTags[i]
                break
              }
            }
            var table = found.parentNode.getElementsByTagName('table')[0]
            if (!table) {
              alert('Could not find table for metric with title: ' + int_var_searchTextTitle)
              return
            }

            // Create the csv array
            var csv_data = []
            var rows = table.getElementsByTagName('tr')
            // For each row
            for (var i = 0; i < rows.length; i++) {
              var cols = rows[i].querySelectorAll('td,th')

              var csvrow = []
              // For each column
              for (var j = 0; j < cols.length; j++) {
                csvrow.push(cols[j].innerHTML)
              }

              csv_data.push(csvrow.join(','))
            }

            //Create A tag and click intiate download
            var element = document.createElement('a')
            element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_data.join('\n')))
            element.setAttribute('download', int_var_filenameExport)

            element.style.display = 'none'
            document.body.appendChild(element)

            element.click()

            document.body.removeChild(element)
          },
          // Since some backend variables will not be available in the browser
          // Add them here so their values can be inject in the browser too
          // Give them a name with prefix to avoid replacament issues
          {
            int_var_filenameExport,
            int_var_searchTextTitle
          }
        )

        return `
            ${fn.inject}
            <button onclick="${fn.call}">Download CSV</button>
          `
      }
    })
  }

  // Wait all subviews to be added
  setTimeout(() => {
    // Generate button for all metrics
    for (const metricId of Object.keys(bp.experimental.successTelemetryRegistry)) {
      if (metricId == 'others') continue
      const metric = bp.experimental.successTelemetryRegistry[metricId]
      generateButton(metric.key, metric.key, metric.options.name)
      // Generate button for all subviews
      for (const subViewKey of Object.keys(metric.subviews)) {
        const subView = metric.subviews[subViewKey]
        generateButton(subView.label.replace(/ /g, ''), metric.key, subView.label)
      }
    }
  }, 3000)
