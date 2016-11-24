import { connect } from 'react-redux'
import { addDownloadItem, pauseAllDownloadItems, activeAllDownloadItems } from '../actions/actions'
import BottomMenu from '../components/BottomMenu'

const mapDispatchToProps = (dispatch) => ({
  addItem: (idx) => {
    dispatch(addDownloadItem(idx))
  },
  pauseAll: () => {
    dispatch(pauseAllDownloadItems())
  },
  activeAll: () => {
    dispatch(activeAllDownloadItems())
  }
})

const BottomMenuContainer = connect(
  null,
  mapDispatchToProps
)(BottomMenu)

export default BottomMenuContainer
