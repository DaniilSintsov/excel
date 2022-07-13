import {ExcelComponent} from '@core/ExcelComponent'

export class Toolbar extends ExcelComponent {
  static className = 'toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: [],
      ...options
    })
  }

  toHTML() {
    return `
      <div class="toolbar__btn btn">
        <span class="material-icons">format_align_left</span>
      </div>

      <div class="toolbar__btn btn">
        <span class="material-icons">format_align_justify</span>
      </div>

      <div class="toolbar__btn btn">
        <span class="material-icons">format_align_right</span>
      </div>

      <div class="toolbar__btn btn">
        <span class="material-icons">format_bold</span>
      </div>

      <div class="toolbar__btn btn">
        <span class="material-icons">format_italic</span>

      </div>

      <div class="toolbar__btn btn">
        <span class="material-icons">format_underlined</span>
      </div>
    `
  }
}
