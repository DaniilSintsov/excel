import {ExcelComponent} from '@core/ExcelComponent'
import {changeTitle} from '@/redux/actions'
import {$} from '@core/Dom'
import {defaultTitle} from '@/constants'
import {debounce} from '../../core/utils'

export class Header extends ExcelComponent {
  static className = 'header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML() {
    const title = this.store.getState().title || defaultTitle
    return /* html */ `
      <input type="text"
               class="header__input"
               value="${title}">

      <div class="header__buttons">
        <div class="header__btn btn">
          <span class="material-icons">logout</span>
        </div>

        <div class="header__btn btn">
          <span class="material-icons">delete_outline</span>
        </div>
      </div>
    `
  }

  onInput(event) {
    const $target = $(event.target)
    this.$emit(changeTitle($target.text()))
  }
}
