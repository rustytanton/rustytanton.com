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