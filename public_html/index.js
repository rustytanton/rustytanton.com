/* globals customElements, HTMLElement */
class StickyAlert extends HTMLElement {
  bodyClass = 'with-sticky-alert'
  cssVarName = '--sticky-alert-height'

  connectedCallback () {
    this.addWindowLoadEvent()
    this.addWindowResizeEvent()
  }

  addBodyClass () {
    document.body.classList.add(this.bodyClass)
  }

  addWindowLoadEvent () {
    const self = this
    window.addEventListener('load', () => {
      self.handleWindowLoadEvent()
    })
  }

  handleWindowLoadEvent () {
    const elRoot = document.querySelector(':root')
    this.handleWindowResizeEvent(elRoot)
    this.addBodyClass()
  }

  addWindowResizeEvent () {
    const elRoot = document.querySelector(':root')
    const self = this
    window.addEventListener('resize', () => {
      self.handleWindowResizeEvent(elRoot)
    })
  }

  handleWindowResizeEvent (elRoot) {
    if (elRoot) {
      elRoot.style.setProperty(this.cssVarName, this.offsetHeight + 'px')
    }
  }
}

customElements.define('sticky-alert', StickyAlert)
