chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // if (request.message === "start_script") {
  //   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //     chrome.tabs.executeScript(tabs[0].id, {file: "contentScript.js.js"});
  //   });
  // }
  switch (request.message) {
    case "openPopup":
      chrome.windows.create({
        url: chrome.runtime.getURL("../pages/startScrap/index.html"),
        type: "popup",
        width: 320,
        height: 500,
      });
      // chrome.tabs.create({
      //   url: chrome.runtime.getURL("../pages/startScrap/index.html")
      // });
      break;

    default:
      break;
  }
  return true;
});

// chrome.idle.onStateChanged.addListener((browserActivityState) => {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     const url = tabs[0].url;
//     const urlPattern = 'https:\/\/.*.twitter.com\/.*';

//     if (url.match(urlPattern)) {
//       chrome.tabs.sendMessage(tabs[0].id, { browserActivityState: browserActivityState });
//     }
//   });
// });
