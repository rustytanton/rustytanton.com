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
    const dialog = document.createElement('dialog')
    dialog.classList.add('dialog-photo')
    
    const img = document.createElement('img')
    img.setAttribute('alt', el.getAttribute('data-alt') || '')
    img.setAttribute('src', el.getAttribute('href') || '')
    
    const btnClose = document.createElement('button')
    btnClose.classList.add('dialog-photo-button-close')
    btnClose.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.597 17.954l-4.591-4.55-4.555 4.596-1.405-1.405 4.547-4.592-4.593-4.552 1.405-1.405 4.588 4.543 4.545-4.589 1.416 1.403-4.546 4.587 4.592 4.548-1.403 1.416z"/></svg>'

    dialog.appendChild(img)
    dialog.appendChild(btnClose)

    el.addEventListener('click', (e) => {
      e.preventDefault()
      if (dialog.hasAttribute('open')) {
        document.body.classList.remove('dialog-photo-open')
        dialog.close()
      } else {
        document.body.classList.add('dialog-photo-open')
        dialog.showModal()
      }
    })

    dialog.addEventListener('click', (e) => {
      const tag = (e.target as HTMLElement)
      if (tag && tag.tagName.toLowerCase() === 'dialog') {
        document.body.classList.remove('dialog-photo-open')
        dialog.close()
      }
    })

    btnClose.addEventListener('click', (e) => {
      document.body.classList.remove('dialog-photo-open')
      dialog.close()
    })
    
    document.body.appendChild(dialog)
    console.log(el)
  })
})
