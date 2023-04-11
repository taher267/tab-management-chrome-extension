console.log(
  "hello world from content scrope , this is follower or following page of twitter. 1234"
);

let followersData = [];

function scrapeFollowers() {
  const selector = document.querySelector("section > div > div");

  if (selector) {
    const newData = [];
    selector.childNodes.forEach((item) => {
      const [name, username, _, ...bio] = JSON.stringify(item.innerText).split(
        "\\n"
      );
      newData.push({ name, username, bio: bio.join(' ') });
    });

    const newFollowers = newData.filter((follower) => {
      const existingFollower = followersData.find(
        (f) => f.username === follower.username
      );
      return !existingFollower;
    });

    if (newFollowers.length > 0) {
      followersData = [...followersData, ...newFollowers];
      console.log(`1234Scraped ${newFollowers.length} new followers. Total: ${followersData.length}`);
      console.log(followersData, 1234);
    } else {
      console.log(`1234No new followers found. Total: ${followersData.length}`);
    }
  } else {
    console.log('1234There is no data')
  }
}

function scrollToBottom() {
  window.scrollTo(0, document.body.scrollHeight);
}

function scrapeAndScroll() {
  const followersCount = document.querySelectorAll("section > div > div > div").length;
  if (followersData.length === followersCount) {
    console.log(`1234All followers loaded. Total: ${followersData.length}`);
    clearInterval(checkForEnd);
    console.log("1234Reached end of followers. Final scrape complete.");
    return;
  }
  scrapeFollowers();
  scrollToBottom();
}


// Wait for the followers div to load and load the first set of followers
// const checkForLoad = setInterval(() => {
//   const selector = document.querySelector("section > div > div");

//   if (selector && selector.childNodes.length > 0) {
//     clearInterval(checkForLoad);
//     console.log("2334Followers div loaded. Scraping initial followers...");
//     scrapeFollowers();

//     // Scroll down to load more followers
//     const checkForEnd = setInterval(() => {
//       scrapeAndScroll();
//     }, 2000);
//   }
// }, 3000);



// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.code) {
//     // Perform asynchronous task here
//     // Once completed, send result back to popup.js
//     sendResponse({result: "success"});
//   }
// });



function addButton() {
  document.addEventListener("DOMContentLoaded", function () {
    var button = document.createElement("button");
    button.innerText = "Start Scraping";
    button.style.position = "fixed";
    button.style.bottom = "10px";
    button.style.right = "10px";
    button.style.backgroundColor = "#0077ff";
    button.style.color = "white";
    button.style.padding = "10px 10px";
    button.style.border = "none";
    button.style.borderRadius = "50%";
    button.style.width = "80px";
    button.style.height = "80px";
    button.style.display = "flex";
    button.style.alignItems = "center";
    button.style.justifyContent = "center";
    button.style.cursor = "pointer";
    button.style.boxShadow = "0px 3px 5px rgba(0, 0, 0, 0.2)";
    button.addEventListener("mouseenter", function () {
      button.style.backgroundColor = "#0055cc";
    });
    button.addEventListener("mouseleave", function () {
      button.style.backgroundColor = "#0077ff";
    });
    document.body.appendChild(button);



    button.addEventListener("click", function () {
      chrome.runtime.sendMessage({ message: "openPopup" });
    });
  });
}

addButton();



chrome.runtime.onClick.addListener(function (request, sender, sendResponse) {
  console.log("Hello from popup.js! Call the function in the content script");
  if (request) {
    console.log("Hello from popup.js! Call the function in the content script");

    // myFunction();
  }
  // if (request.message === "hello") {
  //   console.log("Hello from popup.js! Call the function in the content script");

  //   // myFunction();
  // }
});
