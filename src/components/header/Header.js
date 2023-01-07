import { ExcelComponent } from '@core/ExcelComponent'
import { changeTitle } from '@/redux/actions'
import { $ } from '@core/Dom'
import { defaultTitle } from '@/constants'
import { debounce } from '@core/utils'
import { ActiveRoute } from '@core/routes/ActiveRoute'

export class Header extends ExcelComponent {
  static className = 'header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
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
          <span class="material-icons" data-button="exit">logout</span>
        </div>

        <div class="header__btn btn">
          <span class="material-icons" data-button="remove">delete_outline</span>
        </div>
      </div>
    `
  }

  onClick(event) {
    const $target = $(event.target)

    if ($target.data.button === 'remove') {
      const decision = confirm('Вы действительно хотите удалить эту таблицу?')

      if (decision) {
        localStorage.removeItem(`excel:${ActiveRoute.param}`)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }

  onInput(event) {
    const $target = $(event.target)
    this.$emit(changeTitle($target.text()))
  }
}
