import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unSubscribers = []
    this.prepare()
  }

  prepare() {

  }

  toHTML() {
    return ``
  }

  $dispatch(event, ...args) {
    this.emitter.dispatch(event, ...args)
  }

  $on(event, cb) {
    const unSub = this.emitter.subscribe(event, cb)
    this.unSubscribers.push(unSub)
  }

  init() {
    this.initDomListeners()
  }

  destroy() {
    this.removeDomListeners()
    this.unSubscribers.forEach(unSub => unSub())
  }
}
