const screens = {
    'sm': '480px',
    'md': '768px',
    'lg': '992px',
    'xl': '1024px',
    '2xl': '1200px'
}

const colors = {
    transparent: 'transparent',
    white: '#fff',
    black: '#000',
    green: '#07cc1d',
    red: '#ff4747',
    orange: '#ff8700',
    gray: '#6e7e92',
    blue: '#0091ff',
    silver: '#e9e9e9',
    light: {
        green: 'rgba(7, 204, 29, 0.08)',
        red: 'rgba(255, 71, 71, 0.08)',
        orange: 'rgba(255, 91, 0, 0.08)',
        gray: 'rgba(110,126, 146, 0.08)',
        blue: 'rgba(0, 145, 255, 0.08)'
    },
    dark: {
        green: '#00a760',
        blue: 'DarkBlue',
        gray: '#38424f'
    },
    diff: {
        gray: '#bac2cb'
    }
}

const fontWeight = {
    100: '100',
    200: '200',
    300: '300',
    400: '400',
    500: '500',
    600: '600',
    700: '700',
    800: '800'
}

const fontSize = {
    base: '16px',
    9: '9px',
    10: '10px',
    11: '11px',
    12: '12px',
    13: '13px',
    14: '14px',
    15: '15px',
    16: '16px',
    17: '17px',
    18: '18px',
    19: '19px',
    20: '20px',
    21: '21px',
    22: '22px',
    23: '23px',
    24: '24px',
    25: '25px',
    26: '26px',
    27: '27px',
    28: '28px',
    29: '29px',
    30: '30px',
    31: '31px',
    32: '32px'
}

const spacing = {
    0: '0',
    1: '1px',
    2: '2px',
    3: '3px',
    4: '4px',
    5: '5px',
    6: '6px',
    8: '8px',
    9: '9px',
    10: '10px',
    12: '12px',
    14: '14px',
    16: '16px',
    18: '18px',
    20: '20px',
    22: '22px',
    24: '24px',
    26: '26px',
    28: '28px',
    30: '30px',
    32: '32px',
    36: '36px',
    40: '40px',
    44: '44px',
    48: '48px',
    56: '56px',
    64: '64px',
    72: '72px',
    80: '80px',
    88: '88px',
    104: '104px',
    120: '120px',
    140: '140px',
    144: '144px',
    172: '172px',
    180: '180px',
    200: '200px',
    250: '250px',
    300: '300px',
    500: '500px',
    '95%': '95%',
    'auto': 'auto',
}

const borderWidth = {
    0: '0',
    0.5: '0.5px',
    1: '1px',
    1.5: '1.5px',
    2: '2px',
    2.5: '2.5px',
    4: '4px'
}

const borderRadius = {
    0: '0',
    4: '4px',
    8: '8px',
    10: '10px',
    12: '12px',
    16: '16px',
    '50%': '50%',
    'full': '9999px'
}

const boxShadow = {
    none: 'none',
    0: `0 3px ${colors.silver}, 0 0 5px 0 #e4e8eb`
}

const opacity = {
    0: '0',
    '0.06': '0.06',
    '0.16': '0.16',
    '0.3': '0.3',
    '0.5': '0.5',
    '0.72': '0.72',
    100: '1'
}

const fill = {
    black: 'black'
}
  

module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
        screens,
        colors,
        textColor: theme => theme('colors'),
        backgroundColor: theme => theme('colors'),
        borderColor: theme => theme('colors'),
        borderWidth,
        borderRadius,
        boxShadow,
        fontSize,
        spacing,
        opacity,
        fill: fill,
        backgroundOpacity: theme => theme('opacity'),
        textOpacity: theme => theme('opacity'),
        borderOpacity: theme => theme('opacity'),
        margin: theme => theme('spacing'),
        padding: theme => theme('spacing'),
        minWidth: theme => theme('spacing'),
        maxWidth: theme => ({
        ...theme('spacing'),
        full: '100% !important'
        }),
        width: theme => ({
        ...theme('spacing'),
        full: '100% !important',
        '100vh': '100vh'
        }),
        minHeight: theme => ({
        ...theme('spacing'),
        '100vh': '100vh'
        }),
        height: theme => ({
        ...theme('spacing'),
        full: '100% !important',
        '100vh': '100vh'
        }),
        fontWeight
    },
    variants: {
        extend: {},
    },
    plugins: [],
}