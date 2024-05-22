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
