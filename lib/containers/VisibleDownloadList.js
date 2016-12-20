import { connect } from 'react-redux'
import { addDownloadItem } from '../actions/actions'
import DownloadItemList from '../components/DownloadItemList'

const getVisibleDownloads = (downloads, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return downloads
    case 'SHOW_COMPLETED':
      return downloads.filter(item => item.status === 'completed')
    case 'SHOW_ACTIVE':
      return downloads.filter(item => item.status === 'active')
    default:
      return downloads
  }
}

const mapStateToProps = (state) => ({
  downloads: getVisibleDownloads(state.downloads, state.filter)
})

const mapDispatchToProps = (dispatch) => ({
  addItem: (id) => {
    dispatch(addDownloadItem(id))
  }
})

const VisibleDownloadList = connect(
  mapStateToProps,
  mapDispatchToProps
)(DownloadItemList)

export default VisibleDownloadList
