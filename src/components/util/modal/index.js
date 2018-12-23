import m from 'mithril'
import Content from './content.js'

let 
  modal_toggle_value = false
  , modal_toggle = () => { 
    modal_toggle_value = !modal_toggle_value
    m.redraw()
  }

export default {
  view ({attrs,children}) {
    let 
      { button , label } = attrs
    button.attrs.onclick = function () { modal_toggle() }
    return m.fragment({},[
        button ,
        modal_toggle_value && m(Content,{modal_toggle},[children])
      ])
  }
}