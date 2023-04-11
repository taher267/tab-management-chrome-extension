window.addEventListener("DOMContentLoaded", function () {
    const OlTabs = document.querySelector("#ext_tabs");
    let allTabs = [];

    chrome.runtime.sendMessage({ type: "getTabs" }, (tabs) => {
        allTabs = tabs;
        tabs.forEach((tab) => {
            const tabEl = document.createElement("li");
            tabEl.innerText = tab.title;
            if (tab.active) tabEl.classList.add("active");
            tabEl.classList.add("tabLi");
            tabEl.addEventListener("dblclick", () => {
                chrome.tabs.remove(tab.id);
            });

            tabEl.addEventListener("click", () => changeTab(tab.id));

            OlTabs.appendChild(tabEl);
        });
    });
});

function changeTab(id) {
    chrome.tabs.update(id, { active: true });
    window.close();
}
