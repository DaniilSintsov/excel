import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '../../core/Dom'

export class Formula extends ExcelComponent {
  static className = 'formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options
    })
  }

  toHTML() {
    return `
      <div class="formula__info">fx</div>

      <div id="formula"
           class="formula__input"
           contenteditable
           spellcheck="false"></div>
    `
  }

  init() {
    super.init()

    this.formula = this.$root.find('#formula')

    this.$on('table:select', $cell => {
      this.formula.text($cell.text())
    })

    this.$on('table:input', $cell => {
      this.formula.text($cell.text())
    })
  }

  onInput(event) {
    this.$dispatch('formula:input', $(event.target).text())
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.code)) {
      event.preventDefault()
      this.$dispatch('formula:onEnter')
    }
  }
}
