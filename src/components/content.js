import m from 'mithril'
import b from 'bss'
import cfs from 'class-func-style'

import ContentList from './content-list.js'
import ToolTip from './util/tool-tip.js'

function Content() {

  let 
    txtInput = ''
    , set_toggle = false
    , fc = cfs({
        '-header'             : b`color:gray;margin-left:2rem;margin-right:4rem;` ,
        '-txt-input'          : b`width:60%;padding-right:8rem;box-sizing:border-box;` ,
        '-i-bookmark-margin'  : b`background-color:white;margin-left:-8rem;margin-right:2rem;` ,
        '-i-search-margin'    : b`background-color:white;margin-left:0rem;margin-right:2rem;` ,
        '-i-settings-margin'  : b`margin-left:1rem;margin-right:1rem;` ,
        '-btn-clear'          : b`min-width:6rem;`
          .$media('(max-width:55rem)',b`display:none;opacity:0;`) ,
      })

  const 
    content = {}
  content.view = function(v) {
    let 
      { add , clear , descMarked , search , remove , reset , test , model } = v.attrs
    return (
      m('.content.fcl',[
        // form -
        m('.ctrl-.-form.bb.mv1.pv3', 
          [ 
            m('span'
            ,{
              ...fc('-header') ,
              'onclick' (e) {
                test()
              }
            },['URL Stack']) ,
            // [ textinput -
            m('span.mh3', [
              m('input.itxt.mh3[type=text]'
              ,{
                ...fc('-txt-input') ,
                'name':'txtInput' ,
                'value':txtInput ,
                'placeholder':'add or search url ...' ,
                'onkeyup' (e) { 
                  txtInput = e.target.value
                } ,
                'onblur' (e) {
                  if (e.target.value === '') {
                    reset()
                  }
                }
              }) ,
              m('span.btn-i'
              ,{
                ...fc('-i-bookmark-margin') ,
                'onclick' (e) {
                  add({'url':txtInput,'description':'','rawDesc':''})
                  txtInput = ''
                }
              },[
                m('i.far.fa-bookmark'),m(ToolTip,{'tip':'bookmark'})
              ]) ,
              m('span.btn-i'
              ,{
                ...fc('-i-search-margin') ,
                'onclick' (e) {
                  search(txtInput)
                }
              },[
                m('i.fas.fa-search'),m(ToolTip,{'tip':'search'})
              ])
            ]) ,
            // - textinput ]
            m('button.btn.mh3'
            ,{
              ...fc('-btn-clear') ,
              'onclick' (e) {
                clear()
              }
            }
            ,['Clear']) ,
            m('span.btn-i',
            {
              ...fc('-i-settings-margin') ,
              'onclick' (e) {
                set_toggle = !set_toggle
              }
            },[m('i.fas.fa-cog'),m(ToolTip,{'tip':'settings'})]) ,
        ]) ,
        // - form ]
        // [ list -
        m(ContentList,{'bookmarks':model.bookmarks,descMarked,remove})
        // - list ]
      ])
    )
  }

  return content

}

export default Content