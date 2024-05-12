/* global customElements, document, HTMLElement, window */

class StickyAlert extends HTMLElement {
    bodyClass = 'with-sticky-alert'
    cssVarName = '--sticky-alert-height'

    connectedCallback() {
        this.addWindowLoadEvent()
        this.addWindowResizeEvent()        
    }

    addBodyClass() {
        document.body.classList.add(this.bodyClass)
    }

    addWindowLoadEvent() {
        let self = this
        window.addEventListener('load', () => {
            self.handleWindowLoadEvent()
        })
    }

    handleWindowLoadEvent() {
        let elRoot = document.querySelector(':root')
        this.handleWindowResizeEvent(elRoot)
        this.addBodyClass()
    }

    addWindowResizeEvent() {
        let elRoot = document.querySelector(':root')
        let self = this
        window.addEventListener('resize', () => {
            self.handleWindowResizeEvent(elRoot)
        })
    }

    handleWindowResizeEvent(elRoot) {
        if (elRoot) {
            elRoot.style.setProperty(this.cssVarName, this.offsetHeight + 'px');
        }
    }
}

customElements.define('sticky-alert', StickyAlert)
