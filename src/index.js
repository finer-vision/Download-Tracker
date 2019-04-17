const DownloadTracker = {
    isReady: () => {
        const isReady = window.hasOwnProperty('ga') && typeof window.ga === 'function';

        if (!isReady) {
            console.error('Google Analytics may not be initialised.');
            console.error("Ensure you have added `googleAnalyticsInitialised = true` to your `window.APP` object at the end of the Google Analytics script");
        }

        return isReady;
    },
    getFileName: value => {
        if (!value) {
            return null;
        }

        const url = new URL(value);
        const pathnameParts = url.pathname.split('/');
        const downloadable = (pathnameParts.length >= 3 && pathnameParts[1] === 'downloads');

        return downloadable ? decodeURI(pathnameParts[pathnameParts.length - 1]) : null;
    },
    autoAddListeners: () => {
        document.querySelectorAll('.download').forEach(downloadTrigger => {
            const href = downloadTrigger.getAttribute('href') || false;
            const name = this.getFileName(href);

            name && downloadTrigger.addEventListener('click', () => trackDownload(name));
        });
    },
};

export const trackDownload = (fileName = null) => {
    fileName && DownloadTracker.isReady() && ga('send', 'event', 'File Downloads', 'download', fileName);
};

DownloadTracker.autoAddListeners();

export default DownloadTracker;