import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '../../core/Dom'

export class Formula extends ExcelComponent {
  static className = 'formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options
    })
  }

  init() {
    super.init()

    this.$formula = this.$root.find('#formula')

    this.$on('table:select', $cell => {
      this.$formula.text($cell.data.value)
    })
  }

  toHTML() {
    return /* html */ `
      <div class="formula__info">fx</div>

      <div id="formula"
           class="formula__input"
           contenteditable
           spellcheck="false"></div>
    `
  }

  storeChanged({ currentText }) {
    this.$formula.text(currentText)
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
