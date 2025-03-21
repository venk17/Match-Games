import {Component} from 'react'
import TagItem from './TagItem'
import ImageItem from './ImageItem'
import './index.css'

class Matchgame extends Component {
  state = {
    score: 0,
    activeId: 'FRUIT',
    timer: 60,
    matchImageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/orange-img.png',
    isGameOver: false,
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
    clearInterval(this.timerId)
    this.setState({score: 0, isGameOver: false, timer: 60})
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

    return (
      <ul className="tabs-list-container">
        {tabsList.map(eachTab => (
          <TagItem
            tabs={eachTab}
            key={eachTab.tabId}
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
            imageList={eachImage}
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
      <div className="bg-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            className="logo"
            alt="website logo"
          />
          <ul className="nav-items">
            <li className="scr">
              <p className="score">
                Score: <span className="scores">{score}</span>
              </p>
            </li>
            <li className="timer-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                className="timer"
                alt="timer"
              />
              <p className="scores">{timer} sec</p>
            </li>
          </ul>
        </div>

        <div className="container">
          {isGameOver ? (
            <div className="gameOver-container">
              <div className="game-over">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
                  className="trophy"
                  alt="trophy"
                />
                <p className="your-score">YOUR SCORE</p>
                <h1 className="final-score">{score}</h1>
                <button
                  className="play-again"
                  type="button"
                  onClick={this.onPlayAgain}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
                    className="reset"
                    alt="reset"
                  />
                  <p>Play Again</p>
                </button>
              </div>
            </div>
          ) : (
            <div>
              <img src={matchImageUrl} className="image" alt="match" />
              {this.renderTabsList()}
              {this.renderImageList()}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Matchgame
