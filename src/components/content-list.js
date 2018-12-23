import m from 'mithril'
import b from 'bss'
import cfs from 'class-func-style'

import MarkdownHelp from './util/markdown-help.js'
import ToolTip from './util/tool-tip.js'

function ContentList () {
  let
    collapse_toggle = true
    , desc_toggle = false
    , txtDesc = ''
    , htmlDesc = ''
    , txtIndx = null 
    , fc = cfs({
        '-item': b`line-height:4rem;vertical-align:middle;margin:1rem;padding:1rem;`
          .$hover(`
              background-color: #fbfbfb;
          `) ,
        '-item-border'  : b`border-style:solid;border-color:gray;border-width:.5px .2rem .5px .2rem;` ,
        '-remove'       : b`float:right;` ,
        '-desc'         : b`background-color:#fcfcfc;font-size:1.6rem;` ,
        '-desc-input'   : b`resize:none;min-height:8rem;padding:.5rem;width:98%;` ,
        '-url'          : b`cursor:pointer;font-size:1.8rem;margin-left:1rem;` ,
      })
  const 
    ContentList = {}
  ContentList.view = function(v) {
    let 
      { bookmarks , descMarked , remove} = v.attrs   
    return (
      // [ list -
      m('.dsply-.-list',[
        bookmarks.map((value,indx) => {
          let 
            collapse_value = indx === txtIndx
            , collapse = fc({
              'fa-chevron-circle-down' : collapse_value && collapse_toggle ,
              'fa-chevron-circle-right' : !(collapse_value && collapse_toggle)
            })
          if (value.description!=='') {
            htmlDesc = value.description
          }
          return m.fragment({key:indx},[
            m('div', { ...fc('-item','-item-border','ba','mv3') , 'data-id':indx } , [
              m('span.btn-i',
              {
                onclick (e) {
                  e.preventDefault()
                  if (txtIndx === indx) {
                    collapse_toggle = !collapse_toggle
                  }
                  else {
                    collapse_toggle = true
                  }
                  txtIndx = indx
                }
              },[m('i.fas ',collapse)]) ,
              m('span.mh3.mv1',[m(`a[href=${value.url}]`,{...fc('-url')},[value.url])]) ,
              m('span.btn-i'
              ,{
                ...fc('-remove') ,
                'onclick' (e) {
                  e.preventDefault()
                  remove(indx)
                }
              },[m('i.fas.fa-trash-alt'),m(ToolTip,{'tip':'remove'})]) ,
              collapse_value && collapse_toggle
                ? m('.desc',{...fc('-desc','ma3','pa3')},
                  desc_toggle && indx === txtIndx
                  ? [
                      // m('span.btn-i',[m('i.fab.fa-markdown')]) ,
                      m(MarkdownHelp) ,
                      m('textarea',
                      {
                        value : txtDesc !== '...' ? txtDesc : '',
                        ...fc('-desc-input','itxtarea') ,
                        'onblur'(e) {
                          e.preventDefault()
                          htmlDesc = descMarked(txtDesc,indx)
                          desc_toggle = !desc_toggle
                        } ,
                        'onkeyup' (e) {
                          e.preventDefault()
                          txtDesc = e.target.value
                        }
                      }) ,
                      m('span.btn-i',[m('i.fas.fa-plus-circle.fr'),m.trust('<br/>')]) ,
                    ]
                  : [
                      m('span.desc-text'
                      ,{
                        'onclick' (e) {
                          e.preventDefault()
                          // txtDesc = e.target.textContent
                          txtDesc = value.rawDesc
                          desc_toggle = !desc_toggle
                        }
                      },[value.description === ''? '...' : m.trust(htmlDesc)])
                    ]
                ) 
              : null
            ])
          ])
        })
      ])
      // - list ]
    )
  }
  return ContentList
}

export default ContentList