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
      if (event.touches.length >= 2) {
        event.preventDefault()
      }
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

  display.append(bg)
  display.append(displayTime)
  display.append(playButton)

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
      console.log(playButton)
    } else {
      active = true
      playButton.textContent = 'pause_circle_filled'
    }
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

  setInterval(() => {
    if (time > 0 && active) {
      time -= 1
      redrawTime(time)

      if (time % 30 >= 1 && time % 30 <= 5) {
        shortWhistleHowl.play()
      } else if (time % 30 == 0) {
        longWhistleHowl.play()
      }
    }
  }, 1000)
})

