
function sendMessage(message) {
  chrome.windows.getCurrent(w => {
    chrome.tabs.query({ active: true, windowId: w.id }, tabs => {
      const tabId = tabs[0].id;
      chrome.tabs.sendMessage(tabId, { "type": "notifications", "data": message });
    });
  });
}

const getActiveTab = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) throw new Error("No active tab found");
  return tab;
};

const openDatabase = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("ToDoDB", 1);

      request.onerror = (event) => reject(`Error opening database: ${event.target.errorCode}`);
      request.onsuccess = (event) => resolve(event.target.result);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("ToDo")) {
          const store = db.createObjectStore("ToDo", { keyPath: "id", autoIncrement: true });
          store.createIndex("title", "title", { unique: false });
          store.createIndex("timestamp", "timestamp", { unique: false });
          store.createIndex("isDone", "isDone", { unique: false }); // Creating an index for the isDone attribute
        }
      };
    });
};

// Save a record to IndexedDB
const saveToDoToIndexedDB = async (todo) => {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("ToDo", "readwrite");
    const store = transaction.objectStore("ToDo");
    const request = store.add(todo);

    request.onsuccess = () => resolve("ToDo successfully saved to IndexedDB");
    request.onerror = (event) => reject(`Error saving ToDo to IndexedDB: ${event.target.error}`);
  });
};

const getToDosFromIndexedDB = async () => {
  const db = await openDatabase();
  const transaction = db.transaction(["ToDo"], "readonly");
  const objectStore = transaction.objectStore("ToDo");

  return new Promise((resolve, reject) => {
    const request = objectStore.getAll();

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(`Error listing data: ${event.target.error}`);
    };
  });
};

const updateToDoInDatabase = async (id, isDone) => {
    const db = await openDatabase();
        const transaction = db.transaction("ToDo", "readwrite");
        const store = transaction.objectStore("ToDo");
        return new Promise((resolve, reject) => {
            const getRequest = store.get(id);

            getRequest.onsuccess = () => {
                const todo = getRequest.result;
                if (todo) {
                    todo.isDone = isDone;  // Update isDone based on the passed value

                    const updateRequest = store.put(todo);  // Save the updated todo back to the database
                    updateRequest.onsuccess = () => resolve("ToDo updated successfully");
                    updateRequest.onerror = (event) => reject(`Error updating ToDo: ${event.target.error}`);
                } else {
                    reject("ToDo not found");
                }
            };

            getRequest.onerror = (event) => {
                reject(`Error fetching ToDo: ${event.target.error}`);
            };
        });
}
const deleteToDoFromIndexedDB = async (id) => {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("ToDo", "readwrite");
    const store = transaction.objectStore("ToDo");
    const request = store.delete(id);

    request.onsuccess = () => resolve("ToDo deleted successfully from IndexedDB");
    request.onerror = (event) => reject(`Error deleting ToDo from IndexedDB: ${event.target.error}`);
  });
};

chrome.tabs.onUpdated.addListener(
  (tabId, changeInfo, tab) => {``
    console.log('Updated to URL:', tab.url)
  }
)


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.type){
    case "saveTODO":
        async function saveToDo() {
            const message = {
                title: "오늘 할 일",
                isDone: false,  // Use boolean false instead of string "false"
                timestamp: new Date().toISOString(), // Add a timestamp
            };

            try {
                const result = await saveToDoToIndexedDB(message);
                return { status: "success", message: result }; // Success response
            } catch (error) {
                return { status: "error", message: error.toString() }; // Ensure the error message is a string
            }
        }

        saveToDo().then(response => {
            sendResponse(response);
        });
        return true; // To keep the message channel open for `sendResponse`
    case "getTODO":
        async function getToDos() {
                try {
                    const todos = await getToDosFromIndexedDB(); // Adjust the filtering parameters as necessary
                    return { status: "success", data: todos };
                } catch (error) {
                    return { status: "error", message: error.toString() };
                }
            }

        getToDos().then(response => {
                sendResponse(response);
        });
        return true;
    case "updateTODO":
        const { id, isDone } = message;
            updateToDoInDatabase(id, isDone).then(
                successMessage => sendResponse({ status: "success", message: successMessage }),
                errorMessage => sendResponse({ status: "error", message: errorMessage })
            );
        return true;
    case "deleteTODO":
        async function deleteToDo(id) {
                try {
                    const result = await deleteToDoFromIndexedDB(id); // Assuming `id` is passed correctly
                    return { status: "success", message: result };
                } catch (error) {
                    return { status: "error", message: error.toString() };
                }
            }

            deleteToDo(message.id).then(response => { // Assuming `request.message.id` contains the ToDo ID
                sendResponse(response);
            });
        return true;
  }
});

