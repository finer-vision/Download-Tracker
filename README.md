# Download Tracker

Track clicks of download links via Google Analytics.

### Pre-Requisites
- You will need to have Google Analytics installed for this package to work.
- Files will need to be served from a directory of `/downloads`.

### Installation

```bash
npm add fv-analytics
```

### Usage

Add this to your global app.js file.

```bash
import "fv-analytics";
```

To start tracking downloads, add the following class name to the elements:

```
<a href="..." class="download">...</a>
```

For dynamic elements that get added to the page, you will need to add this to your click handler:

```js
trackDownload('file name');
```
