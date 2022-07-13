import {ExcelComponent} from '@core/ExcelComponent'

export class Header extends ExcelComponent {
  static className = 'header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      ...options
    });
  }

  toHTML() {
    return `
      <input type="text"
               class="header__input"
               value="Новая таблица">

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
}
