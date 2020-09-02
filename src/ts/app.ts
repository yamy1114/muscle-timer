import '../css/app.css'
import '../font/number.ttf'

import BgImg from '../img/bg.png'

import { Howl } from 'howler'
import LongWhistle from '../music/whistle_long.mp3'
import ShortWhistle from '../music/whistle_short.mp3'
import PlaySound from '../music/play.mp3'

window.addEventListener('load', () => {
  // スクロール抑制
  document.addEventListener(
    'touchmove',
    (event) => {
      event.preventDefault()
    },
    {
      passive: false
    }
  )

  // HTML 要素の描画
  const display: HTMLElement = document.getElementById('display')

  const bg: HTMLImageElement = document.createElement('img')
  bg.classList.add('bg', 'object')
  bg.src = BgImg

  const displayTime: HTMLElement = document.createElement('div')
  displayTime.classList.add('display-time', 'object')

  const playButton: HTMLElement = document.createElement('i')
  playButton.classList.add('material-icons', 'button-play', 'object')

  const resetButton: HTMLElement = document.createElement('i')
  resetButton.classList.add('material-icons', 'button-reset', 'object')
  resetButton.textContent = 'replay'

  display.append(bg)
  display.append(displayTime)
  display.append(playButton)
  display.append(resetButton)

  // 定数の設定
  const startTime: number = 60 * 3 + 30 + 10
  const longWhistleHowl = new Howl({ src: [LongWhistle] })
  const shortWhistleHowl = new Howl({ src: [ShortWhistle] })
  const playSoundHowl = new Howl({ src: [PlaySound] })

  // 関数定義
  const createRipple = () => {
    const ripple = document.createElement('div')
    ripple.classList.add('button-effect', 'object')
    ripple.addEventListener('animationend', (event) => {
      const target = event.srcElement as HTMLElement
      target.remove()
    })
    display.append(ripple)
  }

  const togglePlay = () => {
    if (active != null) {
      playSoundHowl.play()
      createRipple()
    }

    if (active || active == null) {
      active = false
      playButton.textContent = 'play_circle_outline'
    } else {
      active = true
      playButton.textContent = 'pause_circle_filled'
    }
  }

  const reset = () => {
    active = false
    time = startTime
    redrawTime(time)
    playSoundHowl.play()
    playButton.textContent = 'play_circle_outline'
  }

  function formatTime(time: number) {
    const minute: number = Math.floor(time / 60)
    const second: number = time % 60

    return `${('00' + minute).slice(-2)}:${('00' + second).slice(-2)}`
  }

  function redrawTime(time) {
    displayTime.textContent = formatTime(time)
  }

  // 変数の初期化
  let time: number = startTime
  let active: boolean = null

  // 処理の開始
  redrawTime(time)
  togglePlay()
  playButton.onclick = togglePlay
  resetButton.onclick = reset

  setInterval(() => {
    if (time > 0 && active) {
      time -= 1
      redrawTime(time)

      const interval_time = time % 30
      if (interval_time >= 1 && interval_time <= 5 || interval_time >= 11 && interval_time <= 15) {
        shortWhistleHowl.play()
      } else if (interval_time == 0 || interval_time == 10) {
        longWhistleHowl.play()
      }
    }
  }, 1000)
})

