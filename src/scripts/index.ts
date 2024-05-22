import '../styles/styles.css'
import { ready } from './globals/ready'
import { DialogPhotoLinkView } from './views/DialogPhotoLinkView'

ready().then(() => {
  console.log(document.readyState)
  document.querySelectorAll('.dialog-photo-link').forEach((el) => {
    new DialogPhotoLinkView(el as HTMLElement).init()
  })
})
