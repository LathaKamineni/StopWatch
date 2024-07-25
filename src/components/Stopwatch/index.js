// Write your code here
import './index.css'
import {Component} from 'react'

const initialState = {isTimerRunning: false, timeElapsedInSeconds: 0}
class Stopwatch extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  incrementStopTimer = () => {
    this.setState(prevState => ({
      timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
    }))
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  onStopTimer = () => {
    this.clearTimerInterval()
    this.setState({isTimerRunning: false})
  }

  onStartTimer = () => {
    const {isTimerRunning, timeElapsedInSeconds} = this.state
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementStopTimer, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  getStopWatchTimerFormat = () => {
    const {timeElapsedInSeconds} = this.state
    const minutes = Math.floor(timeElapsedInSeconds / 60)
    const seconds = Math.floor(timeElapsedInSeconds % 60)

    const stringifedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringfiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifedMinutes}:${stringfiedSeconds}`
  }

  renderStopWatchTimer = () => {
    const {isTimerRunning} = this.state
    return (
      <div className="stopwatch-container">
        <div className="stopwatch-img-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
            alt="stopwatch"
            className="stopwatch-img"
          />
          <p className="timer-text">Timer</p>
        </div>
        <h1>{this.getStopWatchTimerFormat()}</h1>
        <div className="buttons-contianer">
          <button
            type="button"
            disabled={isTimerRunning}
            className="button start-button"
            onClick={this.onStartTimer}
          >
            Start
          </button>
          <button
            type="button"
            className="button stop-button"
            onClick={this.onStopTimer}
          >
            Stop
          </button>
          <button
            type="button"
            className="button reset-button"
            onClick={this.onResetTimer}
          >
            Reset
          </button>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="app-container">
        <div>
          <h1 className="stopwatch-heading">Stopwatch</h1>
          {this.renderStopWatchTimer()}
        </div>
      </div>
    )
  }
}

export default Stopwatch
