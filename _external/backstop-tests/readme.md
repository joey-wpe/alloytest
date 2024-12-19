# Backstop UI Regression Testing

## Overview

This tool allows us to generate screenshots of all pages at various viewport sizes for each of our projects and compare those to the last known good set of reference images.

Running the full suite of tests for large projects may take 15-30+ minutes. Reducing the number of scenarios and/or viewports in the `backstop.json` will greatly reduce this time, but also reduce the footprint of what is tested.

## High-Level Notes
* The tests being used are based on testing out the various template types as defined in this Google Sheet: https://docs.google.com/spreadsheets/d/1TKlmRgZ18dfdYlZsFcob9hQg_5ffVT9OetKablCCC5U/edit?usp=sharing
* There is logic in `engine_scripts/OnReadyScriptGlobal.js` to disable CSS animations across all HTML elements.
* The default `backstop.config.js` will append `?__backstop_test=1` to all reference and test URLs. This can be helpful if the front-end codebase (of the website in test) would like to disable animations or other features that may cause tests to falsely fail.

## Known Issues

- Running lots of tests (200+) can murder a CPU and make the rest of your programs slow to use. You can limit the number of concurrent browsers with `"asyncCaptureLimit": 5,` at the root level of the `backstop.json`
- At times instances of Chromium may lockup or fail to close. Running the following command will kill those processes: `pkill -f '(chrome)?(--headless)'`

## How it Works

The regression testing tool being used is [BackstopJS](https://github.com/garris/BackstopJS).

The `backstop.json` defines:

* The viewports to take screenshots at (ex: desktop size, ipad size, etc.)
* The scenarios to take screenshots of (ex: a certain url)

The `onBeforeScriptGlobal.js` and `onReadyScriptGlobal.js` are run before and after the page is considered 'ready' to have screenshots taken of.

## Running Tests

### Setup

Make sure you have run `npm install` in this folder before continuing.

### Creating Initial Reference Images

If you do not yet have any reference images, you will need to generate them. The tool will generate these by visiting the `url` values as defined per scenario in the `scenarios` section of the generated `backstop.json`. 

To create the initial reference images (after any changes to `backstop.json` have been made), run the command:

`backstop reference`

### Creating New Test Images

To generate a set of images to test against the initial reference images, host the site locally (ex: `localhost:9000`), or on a hosted multi-dev, and find/replace the urls in the `backstop.json` to point to your test location in the `url` field of each scenario. 

To generate a set of images to test against the reference images, run the command:

`backstop test`

### Reviewing Differences

Once the `backstop test` command completes, open the following file:
`/results/backstop_data/html_report/index.html`

This will let you visually compare the reference images to the test images.

### Approving Test Images

If all of the test images are acceptable, run the following command to update your reference images:

`backstop approve`

## Viewports

Example of 5 potential viewports - can cull down these in tests to reduce how long they take to run:

```
  "viewports": [
    {
      "name": "desktop-small",
      "width": 1280,
      "height": 720,
      "vIndex": 0
    },
    {
      "name": "desktop-wide",
      "width": 1920,
      "height": 1000,
      "vIndex": 1
    },
    {
      "name": "iphone-x",
      "width": 375,
      "height": 812,
      "vIndex": 2
    },
    {
      "name": "ipad-v",
      "width": 768,
      "height": 1024,
      "vIndex": 3
    },
    {
      "name": "ipad-h",
      "width": 1024,
      "height": 768,
      "vIndex": 3
    }
  ]
	```