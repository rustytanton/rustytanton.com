/* global customElements, document, HTMLElement, window */

class StickyAlert extends HTMLElement {
    bodyClass = 'with-sticky-alert'
    cssVarName = '--alert-height'

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
        this.handleResizeEvent(elRoot)
        this.addBodyClass()
    }

    addWindowResizeEvent() {
        let elRoot = document.querySelector(':root')
        let self = this
        window.addEventListener('resize', () => {
            self.handleResizeEvent(elRoot)
        })
    }

    handleResizeEvent(elRoot) {
        if (elRoot) {
            elRoot.style.setProperty(this.cssVarName, this.offsetHeight + 'px');
        }
    }
}

customElements.define('sticky-alert', StickyAlert)
