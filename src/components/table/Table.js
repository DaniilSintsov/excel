import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from './table.template'
import { resizeHandler } from './table.resize'
import {
  shouldResize,
  isCell,
  matrix,
  findNextSelector
} from './table.functions'
import { TableSelection } from './TableSelection'
import { $ } from '@core/Dom'
import * as actions from '@/redux/actions'
import { defaultStyles } from '@/constants'
import { parse } from '@core/parse'

export class Table extends ExcelComponent {
  static className = 'table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  toHTML() {
    return createTable(20, this.store.getState())
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    this.selectCell(this.$root.find('[data-id="0:0"]'))

    this.$on('formula:input', value => {
      this.selection.current.attr('data-value', value).text(parse(value))
      this.updateTextInStore(value)
    })

    this.$on('formula:onEnter', () => {
      this.selection.current.focus()
    })

    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value)
      this.$emit(
        actions.applyStyle({
          value,
          ids: this.selection.selectedIds
        })
      )
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$dispatch('table:select', $cell)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$emit(actions.changeStyles(styles))
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$emit(actions.tableResize(data))
    } catch (e) {
      console.warn('Resize error', e.message)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map(id =>
          this.$root.find(`[data-id="${id}"]`)
        )
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp'
    ]

    const { code } = event

    if (keys.includes(code)) {
      event.preventDefault()

      const id = this.selection.current.id(true)
      const $next = this.$root.find(findNextSelector(code, id))

      this.selectCell($next)
    }
  }

  updateTextInStore(value) {
    this.$emit(
      actions.changeText({
        id: this.selection.current.id(),
        value
      })
    )
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text())
  }
}
