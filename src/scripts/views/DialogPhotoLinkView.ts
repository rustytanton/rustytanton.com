import { BaseView } from './BaseView'
import { IDialogView, DialogView } from './DialogView'
import { DialogPhoto } from '../types/DialogPhoto'

export interface IDialogPhotoLinkView {
  el: HTMLElement
  dialog: IDialogView
  model: DialogPhoto
}

export class DialogPhotoLinkView extends BaseView implements IDialogPhotoLinkView {
  dialog: IDialogView
  model: DialogPhoto

  constructor (el: HTMLElement, dialog?: IDialogView, model?: DialogPhoto) {
    super(el)
    this.dialog = dialog !== undefined ? dialog : new DialogView(document.createElement('dialog'))

    if (model === undefined) {
      const altText = this.el.getAttribute('data-alt')
      const imgSrc = this.el.getAttribute('href')
      this.model = {
        altText: (altText !== null ? altText : ''),
        imgSrc: (imgSrc !== null ? imgSrc : '')
      }
    } else {
      this.model = model
    }
  }

  init (): void {
    this.dialog.init()
    super.init()
  }

  addEvents (): void {
    this.el.addEventListener('click', (e: Event) => {
      e.preventDefault()
      this.dialog.open()
    })
  }

  render (): void {
    const elImg = document.createElement('img')
    elImg.setAttribute('src', this.model.imgSrc)
    this.dialog.el.appendChild(elImg)
  }
}
