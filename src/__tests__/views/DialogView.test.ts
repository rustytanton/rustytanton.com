import { htmlClasses } from '../../scripts/globals/enums'
import { DialogView } from '../../scripts/views/DialogView'

test('render adds expected className to element', () => {
    const elDialog = document.createElement('dialog')
    const dialog = new DialogView(elDialog)
    expect(dialog.el.classList.contains(htmlClasses.DIALOG)).toBeFalsy()
    dialog.render()
    expect(dialog.el.classList.contains(htmlClasses.DIALOG)).toBeTruthy()
})

test('render adds button to dialog content on render', () => {
    const elDialog = document.createElement('dialog')
    const dialog = new DialogView(elDialog)
    dialog.render()
    const btn = dialog.el.querySelector('button')
    expect(btn).toBeTruthy()
})

test('render appends element to the body', () => {
    const elDialog = document.createElement('dialog')
    const dialog = new DialogView(elDialog)
    expect(document.body.contains(dialog.el)).toBeFalsy()
    dialog.render()
    expect(document.body.contains(dialog.el)).toBeTruthy()
})

test('addEvents adds event listener to dialog element', () => {
    const elDialog = document.createElement('dialog')
    const dialog = new DialogView(elDialog)
    dialog.el.addEventListener = jest.fn()
    dialog.addEvents()
    expect(dialog.el.addEventListener).toHaveBeenCalledWith('click', expect.any(Function))
})

test('addEvents adds event listener to close button', () => {
    const elDialog = document.createElement('dialog')
    const dialog = new DialogView(elDialog)
    dialog.el.innerHTML = '<button></button>'
    dialog.elBtnClose = dialog.el.querySelector('button') as HTMLButtonElement
    dialog.elBtnClose.addEventListener = jest.fn()
    dialog.addEvents()
    expect(dialog.elBtnClose.addEventListener).toHaveBeenCalledWith('click', expect.any(Function))
})

test('open adds body class', () => {
    const elDialog = document.createElement('dialog')
    elDialog.showModal = jest.fn()
    const dialog = new DialogView(elDialog)
    expect(document.body.classList.contains(htmlClasses.DIALOG_OPEN)).toBeFalsy()
    dialog.open()
    expect(document.body.classList.contains(htmlClasses.DIALOG_OPEN)).toBeTruthy()
})

test('open calls dialog.showModal', () => {
    const elDialog = document.createElement('dialog')
    elDialog.showModal = jest.fn()
    const dialog = new DialogView(elDialog)
    dialog.open()
    expect(elDialog.showModal).toHaveBeenCalledTimes(1)
})

test('close removes body class', () => {
    const elDialog = document.createElement('dialog')
    elDialog.close = jest.fn()
    const dialog = new DialogView(elDialog)
    document.body.classList.add(htmlClasses.DIALOG_OPEN)
    dialog.close()
    expect(document.body.classList.contains(htmlClasses.DIALOG_OPEN)).toBeFalsy()
})

test('close calls dialog.close', () => {
    const elDialog = document.createElement('dialog')
    elDialog.close = jest.fn()
    const dialog = new DialogView(elDialog)
    dialog.close()
    expect(elDialog.close).toHaveBeenCalledTimes(1)
})