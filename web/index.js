async function saveDataTODB() {
  const promise = new Promise(function (resolve, reject) {
    chrome.runtime.sendMessage({ type: "saveTODO" }, function (response) {
      resolve(response);
    });
  })

  const selection = await promise;
  console.log('selection : ', selection);
  if (selection) {
    return selection.status ?? 'selection';
  }
  return '';
}

async function getDataTODB() {
  const promise = new Promise(function (resolve, reject) {
    chrome.runtime.sendMessage({ type: "getTODO" }, function (response) {
      if (chrome.runtime.lastError) {
        console.error("Error:", chrome.runtime.lastError.message);
        reject(chrome.runtime.lastError.message);
      } else {
        resolve(response); // Response will be JSON serialized
      }
    });
  });

  try {
    const selection = await promise;
    console.log('Raw selection data:', selection);

    if (selection) {
      // Serialize the data into JSON
      const serializedSelection = JSON.stringify(selection);
      console.log('Serialized selection data:', serializedSelection);

      // Return JSON string to Flutter
      return serializedSelection;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return JSON.stringify({ error: 'Failed to fetch data' }); // Return error as JSON
  }

  return JSON.stringify({}); // Return empty JSON if no data
}

async function updateDataTODB(id,isDone) {
  const promise = new Promise(function (resolve, reject) {
    chrome.runtime.sendMessage({ type: "updateTODO", id: id,isDone: isDone }, function (response) {
      resolve(response);
    });
  })

  const updateResult = await promise;
  console.log('result : ', updateResult);
  if (updateResult) {
    return updateResult.status ?? 'updateResult';
  }
  return '';
}
async function deleteData(id) {
  const promise = new Promise(function (resolve, reject) {
    chrome.runtime.sendMessage({ type: "deleteTODO", id: id }, function (response) {
      resolve(response);
    });
  })

  const deleteResult = await promise;
  console.log('result : ', deleteResult);
  if (deleteResult) {
    return deleteResult.status ?? 'deleteResult';
  }
  return '';
}
