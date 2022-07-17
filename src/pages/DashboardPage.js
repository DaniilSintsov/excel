import {$} from '@core/Dom'
import {createRecordsTable} from '../shared/dashboard.functions'
import {Page} from '../core/page/Page'

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString()
    return $.create('div', 'db').html(/* html */ `
      <div class="db">
        <div class="db__header">
          <h1>Таблицы - панель управления</h1>
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
