import chalk from 'chalk'
import cssMinify from 'css-minify'
import { minify } from 'terser'
import fs from 'fs'
import stylelint from 'stylelint'
import browsersync from 'browser-sync'
import standard from 'standard'
const bs = browsersync.create()

// Functions
async function minifyCss (showError = false) {
  (async function () {
    const cssSrc = fs.readFileSync('public_html/styles.css', 'utf-8')
    fs.writeFileSync('public_html/styles.min.css', await cssMinify(cssSrc))
  })().catch(function (error) {
    if (showError) {
      console.error(`[css-minify] ${error.file}, line ${error.line}, column ${error.column}:`)
      console.error(`[css-minify] ${error.name} - ${error.reason}`)
      console.error('')
    }
  })
}

async function minifyJs () {
  (async function () {
    const jsSrc = fs.readFileSync('public_html/index.js', 'utf-8')
    const jsMin = await minify(jsSrc, {
      sourceMap: true
    })
    fs.writeFileSync('public_html/index.min.js', jsMin.code)
    fs.writeFileSync('public_html/index.min.js.map', jsMin.map)
  })().catch(function (error) {
    console.error(error)
  })
}

async function lintCss () {
  (async function () {
    await stylelint.lint({
      files: ['public_html/styles.css'],
      formatter: function (results) {
        console.log('Linting CSS...')
        console.log('')
        results.forEach((result) => {
          console.log(chalk.underline(result.source))
          result.warnings.forEach((warning) => {
            console.error('')
            let message = '  ' + chalk.gray(warning.line + ':' + warning.column) + '  '
            if (warning.severity === 'error') {
              message += chalk.red(warning.severity)
            } else {
              message += warning.severity
            }
            message += '  ' + warning.text + '  ' + chalk.gray(warning.rule)
            console.error(message)
            console.error('')
          })
          if (result.errored) {
            if (result.warnings.length === 1) {
              console.error(chalk.red('1 error found'))
            } else {
              console.error(chalk.red(result.warnings.length + ' errors found'))
            }
          } else {
            console.log(chalk.green('No errors or warnings'))
          }
          console.log('')
        })
      }
    })
  })().catch(function (error) {
    console.error(error)
  })
}

async function lintJs () {
  (async function () {
    console.log('Linting Javascript...')
    standard.lintFiles(['public_html/index.js']).then((results) => {
      results.forEach((result) => {
        if (result.messages.length > 0) {
          console.error('')
          console.error(chalk.underline(result.filePath))
          result.messages.forEach((message) => {
            let messageText = '  ' + chalk.gray(message.line + ':' + message.column) + '  '
            if (message.severity === 2) {
              messageText += chalk.red(message.severity)
            } else {
              messageText += message.severity
            }
            messageText += '  ' + message.message + '  ' + chalk.gray(message.ruleId)
            console.error(messageText)
            console.error('')
          })
        }
      })
    })
  })().catch(function (error) {
    console.error(error)
  })
}

// Reload when the HTML changes
bs.watch('public_html/index.html').on('change', function () {
  bs.reload()
})

// Lint, minify, then reload when CSS source changes
bs.watch('public_html/styles.css').on('change', function () {
  lintCss()
  minifyCss()
  bs.reload()
})

// Lint, minify, then reload when JS source changes
bs.watch('public_html/index.js').on('change', async function () {
  lintJs()
  minifyJs()
  bs.reload()
}, {})

// minify CSS and JS once on load
minifyCss(true)
minifyJs()

// Init Browsersync
bs.init({
  ui: {
    port: 3000
  },
  rewriteRules: [
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
  server: {
    baseDir: 'public_html',
    directory: true,
    index: 'index.html'
  },
  single: true
})
