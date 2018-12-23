import m from 'mithril'
import b from 'bss'
import cfs from 'class-func-style'

let
  fc = cfs({
    '-tooltip-wrap' : b`display:inline-block;position:relative;` 
      .$nest(
        '&:hover .-tooltip', b`opacity:1;transform:translateX(-100%) translateY(3rem);transition:all .3s ease .5s;visibility:visible;
      `) ,
  })

const ToolTip = {
  oncreate (v) {
    v.dom.parentElement.classList.add(fc('-tooltip-wrap').className)
  } ,
  view (v) {
    let { tip } = v.attrs
    return m('span',{...fc('-tooltip')},tip)
  }
}

export default ToolTip