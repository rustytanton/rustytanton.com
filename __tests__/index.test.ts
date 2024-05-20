import { StickyAlert, cssVariables, htmlClasses, ready } from '../public_html'

describe('StickyAlert', () => {

    beforeEach(() => {
        document.body.innerHTML = `
        <div id="root">
            <aside id="sticky-alert"></aside>
        </div>`
    })

    afterEach(() => {
        document.body.classList.remove(htmlClasses.WITH_STICKY_ALERT)
    })

    test('Elements are saved on construction', () => {
        const elAlert = document.getElementById('sticky-alert') as HTMLElement
        const elRoot = document.getElementById('root') as HTMLElement
        const stickyAlert = new StickyAlert(elAlert, elRoot)
        expect(stickyAlert.el).toBe(elAlert)
        expect(stickyAlert.elRoot).toBe(elRoot)
    })

    test('Expected methods called on init', () => {
        const elAlert = document.getElementById('sticky-alert') as HTMLElement
        const elRoot = document.getElementById('root') as HTMLElement
        const stickyAlert = new StickyAlert(elAlert, elRoot)
        stickyAlert.addEvents = jest.fn()
        stickyAlert.setCssVarAlertSize = jest.fn()
        stickyAlert.addAlertClassToBody = jest.fn()
        stickyAlert.init()
        expect(stickyAlert.addEvents).toHaveBeenCalledTimes(1)
        expect(stickyAlert.setCssVarAlertSize).toHaveBeenCalledTimes(1)
        expect(stickyAlert.addAlertClassToBody).toHaveBeenCalledTimes(1)
    })

    test('addAlertClassToBody adds alert class to body', () => {
        const elAlert = document.getElementById('sticky-alert') as HTMLElement
        const elRoot = document.getElementById('root') as HTMLElement
        const stickyAlert = new StickyAlert(elAlert, elRoot)
        stickyAlert.addAlertClassToBody()
        expect(document.body.classList.contains(htmlClasses.WITH_STICKY_ALERT))
    })

    test('setCssVarAlertSize sets CSS variable', () => {
        const elAlert = document.getElementById('sticky-alert') as HTMLElement
        const elRoot = document.getElementById('root') as HTMLElement
        const stickyAlert = new StickyAlert(elAlert, elRoot)
        stickyAlert.setCssVarAlertSize()
        const style = getComputedStyle(elRoot)
        expect(style.getPropertyValue(cssVariables.STICKY_ALERT_HEIGHT)).toBe('0px')
    })
})

describe('ready', () => {
    test('resolves immediately if loaded on readyState complete', async () => {
        Object.defineProperty(global.document, 'readyState', { 
            value: 'complete',
            writable: true
        })
        const result = await ready()
        expect(result).toBe('resolved')
    })

    test('rejects if event does not fire after n seconds', async () => {
        Object.defineProperty(global.document, 'readyState', { 
            value: 'loading',
            writable: true
        })
        try {
            await ready(1)
        } catch(error) {
            expect(error).toMatch('rejected')
        }
    })

    test('ready adds event when loaded before readyState = complete', async () => {
        const addEventListenerSpy = jest.spyOn(window.document, 'addEventListener')
        Object.defineProperty(global.document, 'readyState', { 
            value: 'loading',
            writable: true
        })
        try {
            ready()
        } catch(error) {
            console.log(error)
        }
        expect(addEventListenerSpy).toHaveBeenLastCalledWith('readystatechange', expect.any(Function))
    })
})
