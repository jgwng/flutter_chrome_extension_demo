function create_popup(message) {
  // content for the popup
  var popupContainer = document.createElement("div");
  popupContainer.style.cssText = "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: #ffffff; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); padding: 20px; border-radius: 8px; text-align: center; z-index: 1000;";

  // create the message element
  var popupMessage = document.createElement("div");
  popupMessage.textContent = message;
  popupMessage.style.marginBottom = "20px";

  // create the close button
  var closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.style.backgroundColor = "#eeeeee";
  closeButton.style.color = "#333333";
  closeButton.style.border = "none";
  closeButton.style.padding = "8px 16px";
  closeButton.style.borderRadius = "4px";
  closeButton.style.cursor = "pointer";
  closeButton.onclick = function () {
    popupContainer.remove();
  };

  // add elements to the popup container
  popupContainer.appendChild(popupMessage);
  popupContainer.appendChild(closeButton);

  // add the popup container to the body
  document.body.appendChild(popupContainer);

  setTimeout(function () {
    popupContainer.remove();
  }, 3000);
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("message listerner -- contentScript.js");
  console.log("message:", message);

  if (message.type == "notifications") {
    create_popup(message.data);
  } else if (message.type === "hello") {
    sendResponse({ response: "From contentScript" });
  }
});

