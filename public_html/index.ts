export const enum htmlClasses {
  DIALOG = 'dialog',
  DIALOG_BUTTON_CLOSE = 'dialog-button-close',
  DIALOG_OPEN = 'dialog-open',
  DIALOG_PHOTO_LINK = 'dialog-photo-link'
}

export const enum svgs {
  DIALOG_CLOSE_BTN = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.597 17.954l-4.591-4.55-4.555 4.596-1.405-1.405 4.547-4.592-4.593-4.552 1.405-1.405 4.588 4.543 4.545-4.589 1.416 1.403-4.546 4.587 4.592 4.548-1.403 1.416z"/></svg>'
}

export interface IBaseView {
  el: HTMLElement
  init: () => void
  addEvents: () => void
  render: () => void
}


export class BaseView implements IBaseView {
  el: HTMLElement

  constructor (el: HTMLElement) {
    this.el = el
  }

  init (): void {
    this.render()
    this.addEvents()
  }
  
  addEvents(): void {
    return
  }

  render(): void {
    return
  }
}


export interface IDialogView {
  el: HTMLElement
  init: () => void
  open: () => void
  close: () => void
}


export class DialogView extends BaseView implements IDialogView { 
  elBtnClose?: HTMLButtonElement

  open(): void {
    document.body.classList.add(htmlClasses.DIALOG_OPEN);
    (this.el as HTMLDialogElement).showModal()
  }

  close(): void {
    document.body.classList.remove(htmlClasses.DIALOG_OPEN);
    (this.el as HTMLDialogElement).close()
  }

  render(): void {
    this.el.classList.add(htmlClasses.DIALOG)

    this.elBtnClose = document.createElement('button')
    this.elBtnClose.classList.add(htmlClasses.DIALOG_BUTTON_CLOSE)
    this.elBtnClose.innerHTML = svgs.DIALOG_CLOSE_BTN
    this.el.appendChild(this.elBtnClose)

    document.body.appendChild(this.el)
  }

  addEvents(): void {
    if (this.elBtnClose) {
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


export type DialogPhotoLink = {
  altText: string
  imgSrc: string
}


export interface IDialogPhotoLinkView {
  el: HTMLElement  
  dialog: IDialogView
  model: DialogPhotoLink
}


export class DialogPhotoLinkView extends BaseView implements IDialogPhotoLinkView {
  dialog: IDialogView
  model: DialogPhotoLink

  constructor (el: HTMLElement, dialog?: IDialogView, model?: DialogPhotoLink) {
    super(el)
    this.dialog = dialog ? dialog : new DialogView(document.createElement('dialog'))
    this.model = model ? model : {} as DialogPhotoLink

    this.model.altText = this.el.getAttribute('data-alt') || ''
    this.model.imgSrc = this.el.getAttribute('href') || ''
  }

  init (): void {
    this.dialog.init()
    super.init()
  }

  addEvents(): void {
    this.el.addEventListener('click', (e: Event) => {
      e.preventDefault()
      this.dialog.open()
    })
  }

  render(): void {
    const elImg = document.createElement('img')
    elImg.setAttribute('src', this.model.imgSrc)
    this.dialog.el.appendChild(elImg)
  }
}


export async function ready(waitDuration: number = 5000): Promise<string> {
  return new Promise((resolve, reject) => {
    if (document.readyState === 'complete') {
      resolve('resolved')
    } else {
      document.addEventListener('readystatechange', () => {
        if (document.readyState === 'complete') {
          resolve('resolved')
        }
      })
    }
    setTimeout(() => {
      reject('rejected')
    }, waitDuration)
  })
}

ready().then(() => {
  document.querySelectorAll('.dialog-photo-link').forEach((el) => {
    new DialogPhotoLinkView(el as HTMLElement).init()
  })
})
