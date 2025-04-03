import './index.css'

const TabItem = ({tab, isActive, onSelectedTab}) => {
  const {tabId, displayText} = tab

  const onClickTab = () => {
    onSelectedTab(tabId)
  }

  const activeTabClassName = isActive ? 'active-tab' : ''

  return (
    <li className="tab-item">
      <button
        type="button"
        className={`tab-button ${activeTabClassName}`}
        onClick={onClickTab}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TabItem
