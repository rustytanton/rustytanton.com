import { htmlClasses, svgs } from '../globals/enums'
import { BaseView } from './BaseView'

export interface IDialogView {
  el: HTMLElement
  init: () => void
  open: () => void
  close: () => void
}

export class DialogView extends BaseView implements IDialogView {
  elBtnClose?: HTMLButtonElement

  open (): void {
    document.body.classList.add(htmlClasses.DIALOG_OPEN);
    (this.el as HTMLDialogElement).showModal()
  }

  close (): void {
    document.body.classList.remove(htmlClasses.DIALOG_OPEN);
    (this.el as HTMLDialogElement).close()
  }

  render (): void {
    this.el.classList.add(htmlClasses.DIALOG)

    this.elBtnClose = document.createElement('button')
    this.elBtnClose.classList.add(htmlClasses.DIALOG_BUTTON_CLOSE)
    this.elBtnClose.innerHTML = svgs.DIALOG_CLOSE_BTN
    this.el.appendChild(this.elBtnClose)

    document.body.appendChild(this.el)
  }

  addEvents (): void {
    if (this.elBtnClose !== undefined) {
      this.elBtnClose.addEventListener('click', () => {
        this.close()
      })
    }
    this.el.addEventListener('click', (e: Event) => {
      if (e.target === this.el) {
        this.close()
      }
    })
  }
}
