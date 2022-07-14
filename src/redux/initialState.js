import {storage} from '@core/utils'
import {defaultStyles, defaultTitle} from '../constants'

export const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  styleState: {},
  currentText: '',
  currentStyles: defaultStyles,
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
})

export const initialState = storage('excel-state')
  ? normalize(storage('excel-state'))
  : defaultState
