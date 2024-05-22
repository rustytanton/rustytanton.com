import '../styles/styles.css'
import { ready } from './globals/ready'
import { DialogPhotoLinkView } from './views/DialogPhotoLinkView'

ready().then(() => {
  document.querySelectorAll('.dialog-photo-link').forEach((el) => {
    new DialogPhotoLinkView(el as HTMLElement).init()
  })
})
