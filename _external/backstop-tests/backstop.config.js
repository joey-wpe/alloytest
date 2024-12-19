require('dotenv').config();
const fs = require('fs');
const Sitemapper = require('sitemapper');

/**
 * Defaults with .env options
 */
const BSConfig = {
    referenceHost: (process.env.REFERENCE_HOST || `https://www.referencesite.com`),
    testHost: (process.env.TEST_HOST || `https://testsite.com`),
    delay : 500,
    variance : 0.16
};

/**
 * BackstopJS configuration
 * https://github.com/garris/BackstopJS
 */
const BackstopConfig = {
  "casperFlags" : [
    ""
  ],
  "debug" : false,
  "paths" : {
    "casper_scripts" : "",
    "bitmaps_reference" : "results/backstop_data/bitmaps_reference",
    "bitmaps_test" : "results/backstop_data/bitmaps_test",
    "engine_scripts": "engine_scripts",
    "html_report": "results/backstop_data/html_report",
    "json_report": "results/backstop_data/json_report",
    "ci_report": "results/backstop_data/ci_report"
  },
  "scenarios" : [
  ],
  "report" : [
    "CLI", "browser"
  ],
  "onBeforeScript": "onBeforeScriptGlobal.js",
  "onReadyScript": "onReadyScriptGlobal.js",
  "engine" : "puppeteer",
  "port" : 3001,
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
};

/**
 * This builds our test urls based on sitemap
 */
const sitemap = new Sitemapper();
sitemap.fetch(`${BSConfig.referenceHost}/sitemap.xml`).then(({ url, sites }) => {
    for( var i in sites ){
        var url = sites[i].replace( BSConfig.referenceHost, '');
        BackstopConfig.scenarios.push(
            {
                "label" : `${url}`,
                "readyEvent" : "",
                "delay" : BSConfig.delay,
                "misMatchThreshold" : BSConfig.variance,
                "onBeforeScript" : "",
                "removeSelectors" : [
                    "#notarealremoveselector"
                ],
                "onReadyScript" : "",
                "selectors" : [
                    "document"
                ],
                "url": `${BSConfig.testHost}${url}?__backstop_test=1`,
                "referenceUrl": `${BSConfig.referenceHost}${url}?__backstop_test=1`,
                "hideSelectors" : [
                    "#notarealhideselector"
                ]
            }
        ); 
    }
    fs.writeFile( './backstop.json', JSON.stringify(BackstopConfig, null, 2), function (err) {
        if (err) return console.log(err);
        console.log('Writing Backstop json configuration file.');
    });
});