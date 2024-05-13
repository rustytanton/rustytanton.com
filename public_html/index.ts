enum StickyAlertConfig {
  BODY_CLASS = 'with-sticky-alert',
  CSS_VAR_NAME = '--sticky-alert-height'
}

interface StickyAlert {
  readonly element: HTMLElement
  readonly elementRoot: HTMLElement
}

function stickyAlertHandleResizeEvent (stickyAlert: StickyAlert): void {
  stickyAlert.elementRoot.style.setProperty(
    StickyAlertConfig.CSS_VAR_NAME,
    stickyAlert.element.offsetHeight.toString() + 'px'
  )
}

function stickyAlertHandleLoadEvent (stickyAlert: StickyAlert): void {
  stickyAlertHandleResizeEvent(stickyAlert)
  document.body.classList.add(StickyAlertConfig.BODY_CLASS)
}

function stickyAlertAttach (el: HTMLElement): void {
  let stickyAlert: StickyAlert = {
    element: el,
    elementRoot: document.querySelector(':root') as HTMLElement
  }

  let stickyLoaded: boolean = false

  // call once on load
  if (document.readyState === 'complete') {
    stickyAlertHandleLoadEvent(stickyAlert)
    stickyLoaded = true
  } else {
    window.addEventListener('load', () => {
      stickyAlertHandleLoadEvent(stickyAlert)
      stickyLoaded = true
    })
  }

  // call on resize
  window.addEventListener('resize', () => {
    if (stickyLoaded) {
      stickyAlertHandleResizeEvent(stickyAlert)
    }
  })
}

window.addEventListener('load', e => {
  document.querySelectorAll('.sticky-alert').forEach(el => {
    stickyAlertAttach(el as HTMLElement)
  })
})
