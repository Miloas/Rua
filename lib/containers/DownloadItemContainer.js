import { connect } from 'react-redux'
import { removeDownloadItem, pauseDownloadItem, resumeDownloadItem } from '../actions/actions'
import DownloadItem from '../components/DownloadItem'

const mapDispatchToProps = (dispatch) => ({
  removeItem: (idx) => {
    dispatch(removeDownloadItem(idx))
  },
  pauseItem: (idx) => {
    dispatch(pauseDownloadItem(idx))
  },
  resumeItem: (idx) => {
    dispatch(resumeDownloadItem(idx))
  }
})

const DownloadItemContainer = connect(
  null,
  mapDispatchToProps
)(DownloadItem)

export default DownloadItemContainer
