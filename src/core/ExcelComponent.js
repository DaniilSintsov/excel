import { DomListener } from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.store = options.store
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.unSubscribers = []

    this.prepare()
  }

  prepare() {}

  toHTML() {
    return ``
  }

  $dispatch(event, ...args) {
    this.emitter.dispatch(event, ...args)
  }

  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  $on(event, cb) {
    const unSub = this.emitter.subscribe(event, cb)
    this.unSubscribers.push(unSub)
  }

  $emit(action) {
    this.store.dispatch(action)
  }

  init() {
    this.initDomListeners()
  }

  destroy() {
    this.removeDomListeners()
    this.unSubscribers.forEach(unSub => unSub())
  }
}
