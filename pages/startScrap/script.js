document.addEventListener("DOMContentLoaded", function () {
  const messageDiv = document.getElementById("message");
  const inputDiv = document.getElementById("inputDiv");
  const previousCodeDiv = document.getElementById("previousCodeDiv");
  const codeInput = document.getElementById("codeInput");
  const saveButton = document.getElementById("saveButton");
  const updateButton = document.getElementById("updateButton");

  // Check if previous code exists
  chrome.storage.sync.get("code", function (data) {
    if (data.code) {
      // Show previous code and update button
      previousCodeDiv.innerText = "Previous code: " + data.code;
      inputDiv.style.display = "block";
      updateButton.style.display = "block";
      saveButton.style.display = "none";
      codeInput.value = data.code;
    } else {
      // Show input box and save button
      inputDiv.style.display = "block";
      saveButton.style.display = "block";
      updateButton.style.display = "none";
    }
  });

  // Save code to storage
  function saveCode(code) {
    chrome.storage.sync.set({ code: code }, function () {
      messageDiv.innerText = "Code saved successfully";
      messageDiv.style.color = "green";
      messageDiv.style.display = "block";
      setTimeout(function () {
        messageDiv.innerText = "";
        messageDiv.style.color = "";
        messageDiv.style.display = "none";
      }, 3000);
    });
  }

  // Handle save button click
  saveButton.addEventListener("click", function () {
    const code = codeInput.value.trim();
    if (code === "") {
      messageDiv.innerText = "Please enter a code";
      messageDiv.style.color = "red";
      messageDiv.style.display = "block";
      setTimeout(function () {
        messageDiv.innerText = "";
        messageDiv.style.color = "";
        messageDiv.style.display = "none";
      }, 3000);
    } else {
      saveCode(code);
      inputDiv.style.display = "none";
      previousCodeDiv.innerText = "Previous code: " + code;
      previousCodeDiv.style.display = "block";
    }
  });

  // Handle update button click
  updateButton.addEventListener("click", function () {
    const code = codeInput.value.trim();
    if (code === "") {
      messageDiv.innerText = "Please enter a code";
      messageDiv.style.color = "red";
      messageDiv.style.display = "block";
      setTimeout(function () {
        messageDiv.innerText = "";
        messageDiv.style.color = "";
        messageDiv.style.display = "none";
      }, 3000);
    } else {
      saveCode(code);
      previousCodeDiv.innerText = "Previous code: " + code;
      messageDiv.innerText = "Code saved successfully";
      messageDiv.style.color = "green";
      messageDiv.style.display = "block";
      setTimeout(function () {
        messageDiv.innerText = "";
        messageDiv.style.color = "";
        messageDiv.style.display = "none";
      }, 3000);
    }
  });

  //handle start button
  async function start() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      return chrome.tabs.sendMessage(tabs[0].id, { message: "hello" });
    });
  }

  document.getElementById("startButton").addEventListener(
    "click",
    start
    // async () => {
    //   let queryOptions = { active: true, lastFocusedWindow: true };
    //   let [tab] = await chrome.tabs.query(queryOptions, { message: 'Bismillah' });
    //   return tab
    // }
  );
});
