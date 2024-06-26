import { ready } from '../../scripts/globals/ready'

test('resolves immediately if loaded on readyState complete', async () => {
  Object.defineProperty(global.document, 'readyState', {
    value: 'complete',
    writable: true
  })
  const result = await ready()
  expect(result).toBe('resolved')
})

test('rejects if event does not fire after n seconds', async () => {
  Object.defineProperty(global.document, 'readyState', {
    value: 'loading',
    writable: true
  })
  try {
    await ready(1)
  } catch (error: any) {
    if ('message' in error) {
      expect(error.message).toMatch('rejected')
    } else {
      throw new Error('no message in error object')
    }
  }
})

test('ready adds event when loaded before readyState = complete', async () => {
  const addEventListenerSpy = jest.spyOn(window.document, 'addEventListener')
  Object.defineProperty(global.document, 'readyState', {
    value: 'loading',
    writable: true
  })
  try {
    await ready(1)
  } catch (error) {
    console.log(error)
  }
  expect(addEventListenerSpy).toHaveBeenCalledWith('readystatechange', expect.any(Function))
})
