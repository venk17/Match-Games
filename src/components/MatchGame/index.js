import {Component} from 'react'
import TabItem from '../TabItem'
import ImageItem from '../ImageItem'
import './index.css'

class MatchGame extends Component {
  constructor(props) {
    super(props)
    const {imagesList} = this.props
    this.state = {
      score: 0,
      activeId: 'FRUIT',
      timer: 60,
      matchImageUrl: imagesList[0].imageUrl,
      isGameOver: false,
    }
  }

  componentDidMount() {
    this.timerId = setInterval(this.decrementTime, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  onSelectedTab = tabId => {
    this.setState({activeId: tabId})
  }

  onPlayAgain = () => {
    const {imagesList} = this.props
    this.setState({
      score: 0,
      isGameOver: false,
      timer: 60,
      activeId: 'FRUIT',
      matchImageUrl: imagesList[0].imageUrl,
    })
    this.timerId = setInterval(this.decrementTime, 1000)
  }

  onThumbnailClick = imageUrl => {
    const {imagesList} = this.props
    const {matchImageUrl} = this.state

    if (imageUrl === matchImageUrl) {
      const randomIndex = Math.floor(Math.random() * imagesList.length)
      const newMatchImageUrl = imagesList[randomIndex].imageUrl

      this.setState(prevState => ({
        score: prevState.score + 1,
        matchImageUrl: newMatchImageUrl,
      }))
    } else {
      clearInterval(this.timerId)
      this.setState({isGameOver: true})
    }
  }

  decrementTime = () => {
    const {timer} = this.state
    if (timer > 0) {
      this.setState(prevState => ({timer: prevState.timer - 1}))
    } else {
      clearInterval(this.timerId)
      this.setState({isGameOver: true})
    }
  }

  renderTabsList = () => {
    const {tabsList} = this.props
    const {activeId} = this.state

    return (
      <ul className="tabs-list-container">
        {tabsList.map(eachTab => (
          <TabItem
            tab={eachTab}
            key={eachTab.tabId}
            isActive={activeId === eachTab.tabId}
            onSelectedTab={this.onSelectedTab}
          />
        ))}
      </ul>
    )
  }

  renderImageList = () => {
    const {imagesList} = this.props
    const {activeId} = this.state

    const filteredImages = imagesList.filter(
      eachImage => eachImage.category === activeId,
    )

    return (
      <ul className="image-list-container">
        {filteredImages.map(eachImage => (
          <ImageItem
            imageDetails={eachImage}
            key={eachImage.id}
            onThumbnailClick={this.onThumbnailClick}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {timer, matchImageUrl, score, isGameOver} = this.state

    return (
      <div className="app-container">
        <div className="navbar">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            className="website-logo"
            alt="website logo"
          />
          <div className="score-timer-container">
            <p className="score">
              Score: <span className="score-value">{score}</span>
            </p>
            <div className="timer-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                className="timer-icon"
                alt="timer"
              />
              <p className="timer">{timer} sec</p>
            </div>
          </div>
        </div>

        <div className="game-container">
          {isGameOver ? (
            <div className="score-card">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
                className="trophy"
                alt="trophy"
              />
              <p className="your-score">YOUR SCORE</p>
              <p className="final-score">{score}</p>
              <button
                type="button"
                className="play-again-button"
                onClick={this.onPlayAgain}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                  className="reset-icon"
                  alt="reset"
                />
                <span>PLAY AGAIN</span>
              </button>
            </div>
          ) : (
            <>
              <div className="match-image-container">
                <img src={matchImageUrl} className="match-image" alt="match" />
              </div>
              {this.renderTabsList()}
              {this.renderImageList()}
            </>
          )}
        </div>
      </div>
    )
  }
}

export default MatchGame
