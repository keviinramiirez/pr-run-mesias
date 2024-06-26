import { desktop, lgphone, phone } from '../../breakpoints/MediaBreakpoint'
import { isPathIgo, isPathBillGenius, isPathSkintech } from '../Util'

export const checkButtonSize = (isNavbarButton) => {
  let innerWidth = window.innerWidth

  if (innerWidth <= 600 && isPathSkintech()) return 'xsmall'
}

export const paletteColors = {
  defaultPrimary: {
    light: '#f7e888',
    main: '#F5E051',
    dark: '#f3d617',
    contrastText: '#000',
  },
  defaultSecondary: {
    light: '#a85fd3',
    main: '#8529b9',
    dark: '#760cb4',
    contrastText: '#fff',
  },
  skintechPrimary: {
    light: '#6e39ff',
    main: '#4F1AE2',
    dark: '#291d83',
    contrastText: '#000',
  },
  skintechSecondary: {
    light: '#95efff',
    main: '#25D8F6',
    dark: '#03acca',
    contrastText: '#000',
  },
  igoPrimary: {
    light: '#ffe56f',
    main: '#e4c01e',
    dark: '#E7AE11',
    contrastText: '#000',
  },
  igoSecondary: {
    light: '#0692d0',
    main: '#004ae9',
    dark: '#003cbe',
    contrastText: '#000',
  },
  billPrimary: {
    light: '#6dffdf',
    main: '#00f5c0',
    dark: '#00bb92',
    contrastText: '#000',
  },
  billSecondary: {
    light: '#55a4ff',
    main: '#2662A7',
    dark: '#0e4f99',
    contrastText: '#fff',
  },
  ellev8Primary: {
    light: '#8affc8',
    main: '#26dd88',
    dark: '#2ab675',
    contrastText: '#000',
  },
}

export const themeShape = {
  borderRadius: 100,
  padding: 10,
}
