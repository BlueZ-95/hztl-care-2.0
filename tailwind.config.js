/**
 * Any modifications to this file will require a regeneration of types
 * for use with 'tailwind-classnames'
 *
 * npm run generate-css-types
 *
 */

module.exports = {
  content: [
    './public/**/*.html',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/helpers/**/*.{js,ts,jsx,tsx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media',
  theme: {
    boxShadow: {
      sm: '0 0 0.25rem 0.125rem rgba(0, 0, 0, 0.1)',
      lg: '0 0 1rem 0.125rem rgba(0, 0, 0, 0.2)',
      border: 'inset 0 0 0 1px rgba(0, 0, 0, 0.1)',
    },
    colors: {
      'theme-bg': 'var(--theme-bg-color)',
      'theme-bg-alt': 'var(--theme-bg-alt-color)',
      'theme-btn-hover': 'var(--theme-btn-hover-color)',
      'theme-btn-text': 'var(--theme-btn-text-color)',
      'theme-btn': 'var(--theme-btn-color)',
      'theme-outline': 'var(--theme-outline-color)',
      'theme-text': 'var(--theme-text-color)',
      'theme-text-alt': 'var(--theme-text-alt-color)',
      'theme-01': 'var(--theme-01-color)',
      'theme-01-text': 'var(--theme-01-text-color)',
      'theme-02': 'var(--theme-btn-color)',
      black: '#2f2d2e',
      gray: {
        DEFAULT: '#9e9e9e',
        dark: '#393738',
        light: '#d8d8d8',
      },
      green: '#2f4e40',
      turquoise: {
        DEFAULT: '#7fc3ba',
        dark: '#6ba69e',
        black: '#497978',
      },
      rose: {
        DEFAULT: '#f8aa97',
        dark: '#d79181',
      },
      salmon: '#f58466',
      white: '#ffffff',
      beige: '#f0efe7',
      error: {
        white: '#e02020',
        black: '#ff5e5e',
      },
      transparent: 'transparent',
      currentColor: 'currentColor',
    },
    fontFamily: {
      sans: [
        'Modern Era',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica',
        'Arial',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
      ],
    },
    fontSize: {
      xs: '0.875rem',
      sm: '1rem',
      base: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '1.875rem',
      '3xl': '2.25rem',
      '4xl': '3rem',
      '5xl': '4rem',
      '6xl': '4.5rem',
      '7xl': '6rem',
      '8xl': '8rem',
      '9xl': '9rem',
    },
    fontWeight: {
      regular: 400,
      bold: 700,
      black: 900,
    },
    extend: {
      borderWidth: {
        6: '6px',
        xxl: '3rem',
      },
      brightness: {
        25: '.25',
      },
      gridTemplateColumns: {
        '3-9': '1fr 3fr',
      },
      lineHeight: {
        tight: '1.125',
      },
      listStyleType: {
        em: '"— "',
      },
      minHeight: {
        sm: '10rem',
        ['branded-hero']: '20rem',
        ['office-hero']: '35.625rem',
        ['promo-home']: '45rem',
      },
      maxWidth: {
        48: '12rem',
        64: '16rem',
        prose: '48.75rem', // 780px, removing ch-based sizing because we not that cool.
      },
      spacing: {
        30: '7.5rem',
        '1/5': '20%',
        '2/5': '40%',
        em: '1em',
        'em-lg': '1.5em',
        inherit: 'inherit',
        gutter: '1rem',
        'gutter-md': '2rem',
        'gutter-lg': '4rem',
      },
      transitionProperty: {
        transformBorder: 'transform, border',
        ['transform-opacity-padding']: 'transform, opacity, padding',
      },
      transitionDelay: {
        1300: '1300ms',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['group-focus'],
      backgroundPosition: ['hover', 'focus'],
      borderWidth: ['first', 'last'],
      opacity: ['group-focus', 'group-hover'],
      padding: ['first', 'focus', 'hover'],
      position: ['focus'],
      textColor: ['group-focus', 'group-hover'],
      translate: ['group-focus', 'group-hover', 'focus-within'],
      scale: ['group-hover'],
    },
    lineClamp: ['responsive'],
  },
};

