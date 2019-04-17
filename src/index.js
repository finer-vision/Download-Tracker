const DownloadTracker = () => {
    const getFileName = value => {
        if (!value) {
            return null;
        }

        const url = new URL(value);
        const pathnameParts = url.pathname.split('/');
        const downloadable = (pathnameParts.length >= 3 && pathnameParts[1] === 'downloads');

        return downloadable ? decodeURI(pathnameParts[pathnameParts.length - 1]) : null;
    };

    return {
        isReady: () => {
            const isReady = window.hasOwnProperty('ga') && typeof window.ga === 'function';

            if (!isReady) {
                console.error('Google Analytics may not be installed.');
            }

            return isReady;
        },
        autoAddListeners: () => {
            document.querySelectorAll('.download').forEach(downloadTrigger => {
                const href = downloadTrigger.getAttribute('href') || false;
                const name = getFileName(href);

                name && downloadTrigger.addEventListener('click', () => trackDownload(name));
            });
        },
    }
};

const trackDownload = (fileName = '') => {
    const fileNameType = typeof fileName;
    if (fileNameType !== 'string') {
        console.error(`trackDownload -> fileName: Expected type of string, but received a ${fileNameType}`);
    }

    if (!fileName) {
        console.error('trackDownload -> fileName: File name not supplied');
    }

    DownloadTracker().isReady() &&
    ga('send', 'event', 'File Downloads', 'download', fileName);
};

DownloadTracker().autoAddListeners();

window.trackDownload = trackDownload;