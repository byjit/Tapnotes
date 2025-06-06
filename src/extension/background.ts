// background script for the extension

// Listen for the extension icon click and open the side panel
chrome.action.onClicked.addListener(() => {
	chrome.windows.getCurrent((window) => {
		if (window && window.id !== undefined) {
			chrome.sidePanel.open({ windowId: window.id });
		}
	});
});