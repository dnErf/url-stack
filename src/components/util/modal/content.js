import m from 'mithril'
import b from 'bss'
import cfs from 'class-func-style'

function Content() {
  let
    handleToggle = null
    , modalNode = null
    , handleKeyup = e => {
      let 
        presskey = {
          27 : () => {
            e.preventDefault()
            handleToggle()
            window.removeEventListener('keyup',handleKeyup,false)
          }
        }
      if (presskey[e.keyCode]) { presskey[e.keyCode]() }
    }
    , handleClick = e => {
      if (!modalNode.contains(e.target)) {
        handleToggle()
        document.removeEventListener('click',handleClick,false)
      }
    }
    , fc = cfs({
      '-modal-overlay'  : b`display:flex;position:fixed;width:100%;height:100%;background-color:#effbfe;align-items:center;justify-content:center;overflow-x:hidden;overflow-y:auto;z-index:999;opacity:.96;top:0;right:0;` ,
      '-modal'          : b`background-color:#fff;padding:2rem;` , //.$media('(min-width:55rem)',b`width:35rem;`) ,
      // '-modal-content'  : b`opacity:1;` ,
      '-modal-close-btn': b`top:0;right:0;float:right;` ,
    })
  const
    content = {
      oninit (v) {
        handleToggle = v.attrs.modal_toggle
      } ,
      oncreate () {
        window.addEventListener('keyup',handleKeyup,false)
        document.addEventListener('click',handleClick,false)
      } ,
      onbeforeremove() {
        window.removeEventListener('keyup',handleKeyup,false)
        document.removeEventListener('click',handleClick,false)
      }
    }
    content.view = function({attrs,children}) {
      return [
        m('div',{...fc('-modal-overlay')},[
          m('div'
          ,{
            oncreate({dom}){ modalNode = dom } ,
            ...fc('-modal')
          },[
            m('.w-100',{...fc('-modal-content')},[children]) ,
          ]) ,
          // close button if needed
          // children should container close
          // m('div'
          // ,{
          //   ...fc('-modal-close-btn') ,
          //   onclick () {
          //     attrs.modal_toggle
          //   }
          // }
          // ,['x'])
        ])
      ]
    }
  return content
}

export default Content