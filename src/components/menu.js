import m from 'mithril'
import b from 'bss'

const Menu = {
  view () {
    return m('.menu.c2'+b``.$media('(max-width:55rem)',b`display:none;`),
      m('h3.menu-header.ph3.pv1',[m('a','# hrext')])
    )
  }
}

export default Menu