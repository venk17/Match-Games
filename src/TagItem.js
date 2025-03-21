import './index.css'

const TagItem = props => {
  const {tabs, onSelectedTab} = props
  const {tabId, displayText} = tabs

  const handleTabClick = () => {
    onSelectedTab(tabId)
  }

  return (
    <li className="list">
      <button className="tab" type="button" onClick={handleTabClick}>
        {displayText}
      </button>
    </li>
  )
}

export default TagItem
