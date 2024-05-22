import { ElementManager } from '../public_html'

test('saves el on construction', () => {
    const el = document.createElement('div')
    const mgr = new ElementManager(el)
    expect(mgr.el).toBe(el)
})

test('calls expected methods on init', () => {
    const el = document.createElement('div')
    const mgr = new ElementManager(el)
    mgr.addEvents = jest.fn()
    mgr.render = jest.fn()
    mgr.init()
    expect(mgr.addEvents).toHaveBeenCalledTimes(1)
    expect(mgr.render).toHaveBeenCalledTimes(1)
})