export const enum htmlClasses {
  WITH_STICKY_ALERT = 'with-sticky-alert'
}

export const enum cssVariables {
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
  }

  init(): void {
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
    if (this.el) {
      this.elRoot.style.setProperty(
        cssVariables.STICKY_ALERT_HEIGHT,
        this.el.offsetHeight.toString() + 'px'
      )
    }
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
  new StickyAlert(
    document.querySelector('.sticky-alert') as HTMLElement
  ).init()
})
