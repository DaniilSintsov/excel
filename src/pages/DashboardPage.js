import {$} from '@core/Dom'
import {createRecordsTable} from '../shared/dashboard.functions'
import {Page} from '../core/page/Page'

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString()
    return $.create('div', 'db').html(/* html */ `
      <div class="db">
        <div class="db__header">
          <a href="#">Таблицы</a>
          <form class="db__form" action="#">
            <button type="submit">
              <span class="material-icons">search</span>
            </button>
            <input type="search" placeholder="Поиск">
          </form>
        </div>

        <div class="db__new">
          <div class="db__view">
            <a href="#excel/${now}" class="db__create">Новая <br> таблица</a>
          </div>
        </div>

        <div class="db__table db__view">
          ${createRecordsTable()}
        </div>
      </div>
    `)
  }
}
