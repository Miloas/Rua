// @flow
export const ADD_DOWNLOADITEM = "ADD_DOWNLOADITEM"

export const PAUSE_DOWNLOADITEM = "PAUSE_DOWNLOADITEM"
export const RESUME_DOWNLOADITEM = "RESUME_DOWNLOADITEM"

export const REMOVE_DOWNLOADITEM = "REMOVE_DOWNLOADITEM"

export const PAUSEALL_DOWNLOADITEMS = "PAUSEALL_DOWNLOADITEMS"
export const ACTIVEALL_DOWNLOADITEMS = "ACTIVEALL_DOWNLOADITEMS"

export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER"

export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE"
}

export function pauseDownloadItem(
  id: string
) {
  return {
    type: PAUSE_DOWNLOADITEM,
    id
  }
}

export function resumeDownloadItem(
  id: string
) {
  return {
    type: RESUME_DOWNLOADITEM,
    id
  }
}

export function pauseAllDownloadItems() {
  return {
    type: PAUSEALL_DOWNLOADITEMS
  }
}

export function activeAllDownloadItems() {
  return {
    type: ACTIVEALL_DOWNLOADITEMS
  }
}

export function addDownloadItem(
  id:string,
  filename:string = "loading",
  completed:number = 0,
  speed:number = 0,
  speedUnit:string = "b",
  status:string = "active") {
  return {
    type: ADD_DOWNLOADITEM,
    id,
    filename,
    completed,
    speed,
    speedUnit,
    status
  }
}

export function removeDownloadItem(
  id: string
) {
  return {
    type: REMOVE_DOWNLOADITEM,
    id
  }
}

export function setVisibilityFilter(
  filter:string
) {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  }
}
