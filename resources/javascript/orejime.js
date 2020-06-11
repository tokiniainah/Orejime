import 'orejime/dist/orejime.js'
/**
 * Create instance
 */
let buildOrejime = () => {
  // Orejime.init(orejimeConfig)

  const IS_OREJIME = document.cookie.replace(/(?:(?:^|.*;\s*)orejime\s*=\s*([^;]*).*$)|^.*$/, '$1')

  // check if orejime cookie exist
  if (IS_OREJIME) {
    document.body.classList.remove('orejime-layer-show')
  } else {
    document.body.classList.add('orejime-layer-show')
  }

  $(window).on(
    'load',
    () => {
      const OREJIME = $('#orejime')
      let _orejimeActions = OREJIME.find('.orejime-Button')

      _orejimeActions.on(
        'click',
        event => {
          let _button = $(event.currentTarget)

          if (!_button.hasClass('orejime-Notice-learnMoreButton')) {
            document.body.classList.remove('orejime-layer-show')
          }
        }
      )
    }
  )
}

$(document).ready(() => buildOrejime())
