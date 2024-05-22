import { Dialog, DialogPhotoLink, ElementManager, htmlClasses, ready } from '../public_html'

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
        expect(addEventListenerSpy).toHaveBeenCalledWith('readystatechange', expect.any(Function))
    })
})

describe('ElementManager', () => {
    test('saves el on construction', () => {
        const el = document.createElement('div')
        const mgr = new ElementManager(el)
        expect(mgr.el).toBe(el)
    })

    test('calls expected methods on init', () => {
        const el = document.createElement('div')
        const mgr = new ElementManager(el)
        mgr.addEvents = jest.fn()
        mgr.render = jest.fn()
        mgr.init()
        expect(mgr.addEvents).toHaveBeenCalledTimes(1)
        expect(mgr.render).toHaveBeenCalledTimes(1)
    })
})

describe('Dialog', () => {
    test('render adds expected className to element', () => {
        const elDialog = document.createElement('dialog')
        const dialog = new Dialog(elDialog)
        expect(dialog.el.classList.contains(htmlClasses.DIALOG)).toBeFalsy()
        dialog.render()
        expect(dialog.el.classList.contains(htmlClasses.DIALOG)).toBeTruthy()
    })

    test('render adds button to dialog content on render', () => {
        const elDialog = document.createElement('dialog')
        const dialog = new Dialog(elDialog)
        dialog.render()
        const btn = dialog.el.querySelector('button')
        expect(btn).toBeTruthy()
    })

    test('render appends element to the body', () => {
        const elDialog = document.createElement('dialog')
        const dialog = new Dialog(elDialog)
        expect(document.body.contains(dialog.el)).toBeFalsy()
        dialog.render()
        expect(document.body.contains(dialog.el)).toBeTruthy()
    })

    test('addEvents adds event listener to dialog element', () => {
        const elDialog = document.createElement('dialog')
        const dialog = new Dialog(elDialog)
        dialog.el.addEventListener = jest.fn()
        dialog.addEvents()
        expect(dialog.el.addEventListener).toHaveBeenCalledWith('click', expect.any(Function))
    })

    test('addEvents adds event listener to close button', () => {
        const elDialog = document.createElement('dialog')
        const dialog = new Dialog(elDialog)
        dialog.el.innerHTML = '<button></button>'
        dialog.elBtnClose = dialog.el.querySelector('button') as HTMLButtonElement
        dialog.elBtnClose.addEventListener = jest.fn()
        dialog.addEvents()
        expect(dialog.elBtnClose.addEventListener).toHaveBeenCalledWith('click', expect.any(Function))
    })

    test('open adds body class', () => {
        const elDialog = document.createElement('dialog')
        elDialog.showModal = jest.fn()
        const dialog = new Dialog(elDialog)
        expect(document.body.classList.contains(htmlClasses.DIALOG_OPEN)).toBeFalsy()
        dialog.open()
        expect(document.body.classList.contains(htmlClasses.DIALOG_OPEN)).toBeTruthy()
    })

    test('open calls dialog.showModal', () => {
        const elDialog = document.createElement('dialog')
        elDialog.showModal = jest.fn()
        const dialog = new Dialog(elDialog)
        dialog.open()
        expect(elDialog.showModal).toHaveBeenCalledTimes(1)
    })

    test('close removes body class', () => {
        const elDialog = document.createElement('dialog')
        elDialog.close = jest.fn()
        const dialog = new Dialog(elDialog)
        document.body.classList.add(htmlClasses.DIALOG_OPEN)
        dialog.close()
        expect(document.body.classList.contains(htmlClasses.DIALOG_OPEN)).toBeFalsy()
    })

    test('close calls dialog.close', () => {
        const elDialog = document.createElement('dialog')
        elDialog.close = jest.fn()
        const dialog = new Dialog(elDialog)
        dialog.close()
        expect(elDialog.close).toHaveBeenCalledTimes(1)
    })
})


describe('DialogPhotoLink', () => {
    beforeEach(() => {
        document.body.innerHTML = `
        <a href="https://rustytanton.com/image.jpg" class="dialog-photo-link" data-alt="Some Alt Text">Text</a>
        `
    })

    test('constructor saves attributes', () => {
        const elLink = document.querySelector('.dialog-photo-link')
        const dialogPhotoLink = new DialogPhotoLink(elLink as HTMLElement)
        expect(dialogPhotoLink.el).toBe(elLink)
        expect(dialogPhotoLink.altText).toBe('Some Alt Text')
        expect(dialogPhotoLink.imgSrc).toBe('https://rustytanton.com/image.jpg')
        expect(dialogPhotoLink.dialog).toBeInstanceOf(Dialog)
    })

    test('init calls expected functions', () => {
        const elLink = document.querySelector('.dialog-photo-link')
        const dialogPhotoLink = new DialogPhotoLink(elLink as HTMLElement)
        dialogPhotoLink.addEvents = jest.fn()
        dialogPhotoLink.render = jest.fn()
        dialogPhotoLink.dialog.init = jest.fn()
        dialogPhotoLink.init()
        expect(dialogPhotoLink.addEvents).toHaveBeenCalledTimes(1)
        expect(dialogPhotoLink.render).toHaveBeenCalledTimes(1)
        expect(dialogPhotoLink.dialog.init).toHaveBeenCalledTimes(1)
    })

    test('addEvents adds click event to element', () => {
        const elLink = document.querySelector('.dialog-photo-link') as HTMLElement
        elLink.addEventListener = jest.fn()
        const dialogPhotoLink = new DialogPhotoLink(elLink as HTMLElement)
        dialogPhotoLink.addEvents()
        expect(elLink.addEventListener).toHaveBeenCalledWith('click', expect.any(Function))
    })

    test('render appends image to dialog', () => {
        const elLink = document.querySelector('.dialog-photo-link') as HTMLElement
        const dialogPhotoLink = new DialogPhotoLink(elLink as HTMLElement)
        expect(dialogPhotoLink.dialog.el.querySelector('img')).toBeFalsy()
        dialogPhotoLink.render()
        expect(dialogPhotoLink.dialog.el.querySelector('img')).toBeTruthy()
    })
})