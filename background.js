chrome.runtime.onMessage.addListener(function (req, sender, res) {
  if (req.type === "getTabs") {
    chrome.tabs.query({}, function (tabs) {
      res(tabs)
    })
  } else if (req.type === 'openPopup') {
    console.log("req . open popup");
  }
  return true;
});