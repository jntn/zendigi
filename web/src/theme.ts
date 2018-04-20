import { Theme } from 'rebass'

interface ZendigiTheme extends Theme {
  timeline: {
    barHeight: number
  }
}

export const theme = <ZendigiTheme>{
  breakpoints: [32, 48, 64, 80],
  space: [0, 4, 8, 16, 32, 64, 128],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72, 96],
  radius: 0,
  timeline: {
    barHeight: 30
  }
}

export default theme
