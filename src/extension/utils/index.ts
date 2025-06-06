export const sendNotification = (
	notificationId: string,
	params: chrome.notifications.NotificationOptions<true>
) => {
	chrome.notifications.create(notificationId, params, function () {
		console.log('Notification sent!');
	});
};

export const setStorage = async (key: string, data: any) => {
	console.log(`saving to storage ${key}`, data);
	return await chrome.storage.local.set({ [key]: JSON.stringify(data) });
};

export const getStorage = async <T = any>(key: string, log: boolean = true) => {
	const a: { [key: string]: string } = await chrome.storage.local.get([key]);
	log && console.log(`retrieved from storage ${key}`, a[key]);
	return JSON.parse(a[key]) as T;
};


/**
 * Opens the side panel for the given window.
 *
 * If no windowId is given, it defaults to the current window.
 *
 * @param {number} [windowId] The id of the window to open the side panel for.
 * @returns {Promise<void>}
 */
export const openSidePanel = async (windowId?: number) => {
	chrome.sidePanel.open({ windowId: windowId ?? chrome.windows.WINDOW_ID_CURRENT });
};
