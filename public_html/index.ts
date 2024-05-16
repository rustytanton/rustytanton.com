const enum htmlClasses {
  WITH_STICKY_ALERT = 'with-sticky-alert'
}

const enum cssVariables {
  STICKY_ALERT_HEIGHT = '--sticky-alert-height'
}

export interface IStickyAlert {
  el: HTMLElement
  elRoot: HTMLElement
  addEvents: () => void
  addAlertClassToBody: () => void
  setCssVarAlertSize: () => void
}

export class StickyAlert implements IStickyAlert {
  el: HTMLElement
  elRoot: HTMLElement

  constructor (el: HTMLElement, elRoot?: HTMLElement) {
    this.el = el
    if (elRoot) {
      this.elRoot = elRoot
    } else {
      this.elRoot = document.querySelector(':root') as HTMLElement
    }
    this.addEvents()
    this.setCssVarAlertSize()
    this.addAlertClassToBody()
  }

  addEvents(): void {
    document.addEventListener('resize', () => {
      this.setCssVarAlertSize()
    })
  }

  addAlertClassToBody(): void {
    document.body.classList.add(htmlClasses.WITH_STICKY_ALERT)
  }

  setCssVarAlertSize(): void {
    this.elRoot.style.setProperty(
      cssVariables.STICKY_ALERT_HEIGHT,
      this.el.offsetHeight.toString() + 'px'
    )
  }
}

export async function ready(): Promise<void> {
  return new Promise((resolve) => {
    if (document.readyState === 'complete') {
      resolve()
    } else {
      document.addEventListener('readystatechange', () => {
        if (document.readyState === 'complete') {
          resolve()
        }
      })
    }
  })
}

ready().then(() => {
  new StickyAlert(
    document.querySelector('.sticky-alert') as HTMLElement
  )
})
