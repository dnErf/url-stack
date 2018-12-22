import m from 'mithril'
import b from 'bss'

const Menu = {
  view () {
    return m('.menu.c2.media-hide',
      m('h3.menu-header.ph3.pv1',[m('a','# hrext')])
    )
  }
}

export default Menu