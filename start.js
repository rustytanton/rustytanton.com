const { minify } = require('terser')
const { ESLint } = require("eslint")
const eslint = new ESLint()
const fs = require('fs')
const bs = require('browser-sync').create()
const cssMinify = require('css-minify')
const stylelint = require('stylelint')

// Functions
async function minifyCss() {
    (async function() {
        const cssSrc = fs.readFileSync('public_html/styles.css', 'utf-8')
        fs.writeFileSync('public_html/styles.min.css', await cssMinify(cssSrc))
    })().catch(function(error) {
        console.error(Object.keys(error))
        console.error(`[css-minify] ${error.file}, line ${error.line}, column ${error.column}:`)
        console.error(`[css-minify] ${error.name} - ${error.reason}`)
        console.error('')
    })
}

async function minifyJs() {
    (async function() {
        const jsSrc = fs.readFileSync('public_html/index.js', 'utf-8')
        const jsMin = await minify(jsSrc, {
            sourceMap: {
                filename: 'index.js',
                url: '/index.min.js.map'
            }
        })
        fs.writeFileSync('public_html/index.min.js', jsMin.code)
        fs.writeFileSync('public_html/index.min.js.map', jsMin.map)
    })().catch(function(error) {
        console.error(error)
    })
}

async function lintCss() {
    (async function() {
        await stylelint.lint({
            files: ['public_html/styles.css'],
            formatter: function(results) {
                for ([key, result] of Object.entries(results)) {
                    console.log(`[stylelint] Linting ${result.source}:`)
                    for ([wkey, warning] of Object.entries(result.warnings)) {
                        console.error(`[stylelint] Line ${warning.line}, column ${warning.column}:`)
                        console.error(`[stylelint] ${warning.text}`)
                    }
                }
            }
        })
    })().catch(function(error) {
        console.error(error)
    })
}

async function lintJs() {
    (async function() {
        console.log('Linting Javascript...')
        const results = await eslint.lintFiles(['public_html/index.js'])
        const formatter = await eslint.loadFormatter('stylish')
        const resultsText = formatter.format(results)
        console.log(resultsText)
    })().catch(function(error) {
        console.error(error)
    })
}

// Reload when the HTML changes
bs.watch('public_html/index.html').on('change', function() {
    bs.reload()
})

// Lint, minify, then reload when CSS source changes
bs.watch('public_html/styles.css').on('change', function() {
    lintCss()
    minifyCss()
    bs.reload()
})

// Lint, minify, then reload when JS source changes
bs.watch('public_html/index.js').on('change', async function() {
    lintJs()
    minifyJs()
    bs.reload()
}, {})

// minify CSS and JS once on load
minifyCss()
minifyJs()

// Init Browsersync
bs.init({
    "ui": {
        "port": 3000
    },
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
                    'September',
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
});