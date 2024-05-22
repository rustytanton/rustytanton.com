import { BaseView } from '../../scripts/views/BaseView'

test('saves el on construction', () => {
    const el = document.createElement('div')
    const mgr = new BaseView(el)
    expect(mgr.el).toBe(el)
})

test('calls expected methods on init', () => {
    const el = document.createElement('div')
    const mgr = new BaseView(el)
    mgr.addEvents = jest.fn()
    mgr.render = jest.fn()
    mgr.init()
    expect(mgr.addEvents).toHaveBeenCalledTimes(1)
    expect(mgr.render).toHaveBeenCalledTimes(1)
})