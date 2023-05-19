const { override, addLessLoader, adjustStyleLoaders } = require('customize-cra')
// const addLessLoader = require('customize-cra-less-loader')

module.exports = override(
  // fixBabelImports('import', {
  //   libraryName: 'rsuit',
  //   libraryDirectory: 'es',
  //   style: true
  // }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        // colors
        '@transparent': 'transparent',
        '@white': '#fff',
        '@black': '#1e2731',
        '@green': '#00a760',
        '@red': '#ff4747',
        '@orange': '#ff8700',
        '@gray': '#6e7e92',
        '@blue': '#0091ff',
        '@silver': '#e9e9e9',
        '@light-green': 'Lime',
        '@light-red': 'rgba(@red, 0.08)',
        '@light-orange': 'rgba(@orange, 0.08)',
        '@light-gray': '#838f9f',
        '@light-blue': 'LightBlue',
        '@dark-green': 'DarkGreen',
        '@dark-blue': 'DarkBlue',
        '@dark-gray': '#38424f',
        '@base-color': '@orange',
        '@-color': '@orange',
        '@diff-gray': '#bac2cb',
        '@modal-content-padding': '36px',
        '@primary': 'rgba(79, 70, 229, 0.8)',
        '@primary-color': '#4f46e5',
        '@primary-dark': 'rgba(79, 70, 229, 0.9)',

        //background
        '@primary-bg-dark': 'rgb(107 101 220)',
        '@primary-bg-light': 'rgba(rgba(79,70,229,.1), 0.1)',

        // control
        '@control-height': '40px',
        '@padding-base-vertical': '10px',
        '@padding-base-horizontal': '16px',

        // border
        '@border-radius-base': '8px',

        // font
        '@font-family-base': 'GoogleSans',
        '@text-color': '@black',
        '@font-size-base': '16px',

        // icon
        '@icon-font-path': __dirname + '/src/assets/fonts',

        // select
        '@picker-selected-value-color': '@black',
        '@picker-select-menu-item-selected-color': '@white',
        '@picker-select-menu-item-selected-bg': '@primary-color',
        '@picker-default-toggle-hover-border-color': '@primary-color',
        '@picker-transition': 'all ease-in-out 0.3s',

        // input
        '@input-border': 'rgba(@gray, 0.2)',
        '@input-color': '@black',
        '@input-border-focus': '@primary-color',
        '@input-transition': 'color ease-in-out 0.3s, border-color ease-in-out 0.3s',

        // modal
        '@modal-border-radius': '12px',
        '@modal-backdrop-bg': '@black',
        '@modal-backdrop-opacity': '0.56',
        '@modal-box-shadow': 'none',
        '@modal-title-font-size': '26px',
        '@modal-md': '620px',
        '@modal-sm': '550px',
        '@modal-body-margin': '0',

        // timeline
        '@time-line-dot-side-length': '16px',
        '@time-line-dot-default-background-color': '@primary-color',
        '@time-line-tail-width': '4px',
        '@time-line-tail-default-background-color': 'rgba(@gray, 0.16)',

        // avatar
        '@avatar-md-side-length': '48px',
        //header
        '@header-height': "61px",
        //sidebar
        '@sidebar-width': '64px',
        '@sidebar-width-lg': '240px',
      }
    }
  }),
  adjustStyleLoaders(({ use: [, , postcss] }) => {
    const postcssOptions = postcss.options
    postcss.options = { postcssOptions }
  })
)
