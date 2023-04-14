chrome.runtime.onInstalled.addListener(() => {
  console.log("hereeee");

  chrome.contextMenus.create({
    id: "highlight",
    title: "Word Wizard Smart Search",
    contexts: ["selection"],
    enabled: false,
    visible: false,
  });
});

const addTooltipDiv = () => {
  const selection = window.getSelection();
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const boundingRect = range.getBoundingClientRect();
    const message = {
      type: "selectedText",
      text: selection.toString(),
      position: {
        top: boundingRect.top + window.pageYOffset,
        left: boundingRect.left + window.pageXOffset,
      },
    };

    // document.getElementById("tmp-chrome-ext") && document.getElementById("tmp-chrome-ext")?.remove();

    let tooltipElement: HTMLElement;

    // Create a new tooltip element
    tooltipElement = document.createElement("div");
    tooltipElement.id = "tmp-chrome-ext";
    tooltipElement.style.position = "absolute";
    tooltipElement.style.top = message.position.top - tooltipElement.offsetHeight + 25 + "px";
    tooltipElement.style.left = message.position.left + "px";
    tooltipElement.style.zIndex = "9999";

    // Add the tooltip element to the document
    document.body.prepend(tooltipElement);
  }
};

chrome.contextMenus.onClicked.addListener(async (info) => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });

  await chrome.scripting.executeScript({
    target: { tabId: tabs[0].id || 0 },
    func: addTooltipDiv,
  });
  await chrome.scripting.executeScript(
    {
      target: { tabId: tabs[0].id || 0 },
      files: ["js/contentScript.js"],
    },
    () => {
      const text = info.selectionText;
      chrome.tabs.sendMessage(tabs[0].id || (0 as number), {
        action: "highlight",
        text,
      });
    }
  );
});

export {};
