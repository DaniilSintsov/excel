import { Router } from './Router'
import { Page } from '../page/Page'

// eslint-disable-next-line no-unused-vars
class DashboardPage extends Page {
  getRoot() {
    const root = document.createElement('div')
    root.innerHTML = 'dashboard'
    return root
  }
}
// eslint-disable-next-line no-unused-vars
class ExcelPage extends Page {}

describe('Router', () => {
  let router
  let $root

  beforeEach(() => {
    router = new Router($root, {
      dasboard: '',
      excel: ''
    })
  })

  test('should be defined', () => {
    expect(router).toBeDefined()
  })

  test('should render Dashboard Page', () => {
    router.changePageHandler()
    expect($root.innerHTML).toBe('<div>dashboard</div>')
  })
})
