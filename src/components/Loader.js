import {$} from '@core/Dom'

export function Loader() {
  return $.create('div', 'loader').html(`
    <div class="lds-dual-ring"></div>
  `)
}
