chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        const command = request.command;
        switch (command) {
            case 'getPageContents':
                getPageContents(request, sender, sendResponse);
                break;
        }
        return false;
    }
);
function getPageContents(request, sender, sendResponse) {
    const data = {
        web: {
            title: document.title,
            href: document.location.href
        }
    }
    sendResponse(data);
}