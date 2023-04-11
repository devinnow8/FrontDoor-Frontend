// Lets listen to mouseup DOM events.
// document.addEventListener('mouseup', async function (e) {
//   const selection = window.getSelection();
//   if (selection && selection.rangeCount > 0) {
//     const range = selection.getRangeAt(0);
//     const boundingRect = range.getBoundingClientRect();
//     const message = {
//       type: "selectedText",
//       text: selection.toString(),
//       position: {
//         top: boundingRect.top + window.pageYOffset,
//         left: boundingRect.left + window.pageXOffset,
//       },
//     };


//     // Create a new tooltip element
//     const divElement = document.createElement("div");
//     divElement.id = "tmp-chrome-ext";
//     divElement.style.position = "absolute";
//     divElement.style.top = message.position.top - divElement.offsetHeight + 25 + "px";
//     divElement.style.left = message.position.left + "px";
//     divElement.style.zIndex = "9999";

//     // Add the tooltip element to the document
//     document.body.prepend(divElement);
//     const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
//     await chrome.scripting.executeScript({
//       target: { tabId: tabs[0].id || 0 },
//       files: ['js/contentScript.js']
//     }, () => {
//       const text = selection.toString();
//       chrome.tabs.sendMessage(tabs[0].id || 0 as number, { action: "highlight", text });
//     });
//   }
// }, false);


// // Close the bubble when we click on the screen.
// document.addEventListener('mousedown', function (e) {
//   const element =  document.getElementById("tmp-chrome-ext");
//   if (element) {
//     element.style.visibility = 'hidden';
//   }
// }, false);
export {}