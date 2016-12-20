// @flow
import { ADD_DOWNLOADITEM, REMOVE_DOWNLOADITEM, PAUSEALL_DOWNLOADITEMS, ACTIVEALL_DOWNLOADITEMS, PAUSE_DOWNLOADITEM, RESUME_DOWNLOADITEM, SET_VISIBILITY_FILTER, VisibilityFilters } from '../actions/actions'

const { SHOW_ALL } = VisibilityFilters

export function downloads(state: Array<Object> = [], action: Object) {
  switch (action.type) {
    case PAUSE_DOWNLOADITEM: {
      const i = state.findIndex(item => item.id === action.id)
      return [
        ...state.slice(0, i),
        Object.assign({}, state[i], {
          status: 'paused'
        }),
        ...state.slice(i + 1)
      ]
    }
    case RESUME_DOWNLOADITEM: {
      const i = state.findIndex(item => item.id === action.id)
      return [
        ...state.slice(0, i),
        Object.assign({}, state[i], {
          status: 'active'
        }),
        ...state.slice(i + 1)
      ]
    }
    case ADD_DOWNLOADITEM:
      return [
        ...state,
        {
          id: action.id,
          filename: action.filename,
          completed: action.completed,
          speed: action.speed,
          speedUnit: action.speedUnit,
          isComplete: action.isComplete,
          status: action.status
        }
      ]
    case REMOVE_DOWNLOADITEM: {
      const i = state.findIndex(item => item.id === action.id)
      return [
        ...state.slice(0, i),
        ...state.slice(i + 1)
      ]
    }
    case PAUSEALL_DOWNLOADITEMS: {
      return state.map(item => Object.assign({}, item, {
        status: 'paused'
      }))
    }
    case ACTIVEALL_DOWNLOADITEMS: {
      return state.map(item => Object.assign({}, item, {
        status: 'active'
      }))
    }
    default:
      return state
  }
}

export function visibilityFilter(state: string = SHOW_ALL, action: Object) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

