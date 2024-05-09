
/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */
module.exports = {
    "ui": {
        "port": 3000
    },
    "files": ["public_html/*"],
    "rewriteRules": [
        // simulates the static rewrite that happens in the github publish workflow
        // so that localhost will preview a properly-formatted date string
        {
            match: /{{DATE_TODAY}}/g,
            fn: function (req, res, match) {
                const months = [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'Sepetember',
                    'October',
                    'November',
                    'December'
                ]
                const d = new Date()
                return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
            }
        },
        // simulates the static rewrite that happens in the github publish workflow
        // so that localhost will preview a properly-formatted version string
        {
            match: /{{VERSION}}/g,
            fn: function (req, res, match) {
                return new Date().getTime()
            }
        }
    ],
    "server": {
        baseDir: "public_html",
        directory: true,
        index: "index.html"
    },
    "single": true
};