import { Dialog, DialogPhotoLink } from '../public_html'

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