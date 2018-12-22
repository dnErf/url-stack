import m from 'mithril'
import b from 'bss'
import cfs from 'class-func-style'
import ContentList from './content-list.js'

function Content() {

  let 
    txtUrl = ''
    , txtTerm = ''
    , set_toggle = false
    , fc = cfs({
        '-header'      : b`color:gray;margin-left:2rem;margin-right:4rem;` ,
        '-plus-margin' : b`margin-left:-4rem;margin-right:4rem;` ,
      })

  const 
    content = {}
  content.view = function(v) {
    let 
      { add , clear , descMarked , search , remove , reset , model } = v.attrs
    return (
      m('.content.fcl',[
        // form -
        m('.ctrl-.-form.bb.mv1.pv3.content-between', 
          [ 
            m('span',{...fc('-header')},['URL Stack']) ,
            m('span.mh3', !set_toggle ? 
              [ // [ bookmarks -
              m('input.itxt.mh3[type=text]'+b`width:60%;`
              ,{
                'name': 'url' ,
                'value': txtUrl ,
                'onkeyup' (e) {
                  if (e.keyCode === 13) {
                    add({
                      url: txtUrl ,
                      description: ''
                    })
                  }
                  txtUrl = e.target.value
                } ,
                'placeholder': 'url...'
              }) ,
              m('span.btn-i'
              ,{
                ...fc('-plus-margin') ,
                'onclick' (e) {
                  add({
                    url: txtUrl ,
                    description: ''
                  })
                  txtUrl = ''
                }}
              ,[m('i.far.fa-bookmark')]) ,
              m('span.btn-i.mh3'
              ,{
                'onclick' (e) {
                  set_toggle = !set_toggle
                }
              },[m('i.fas.fa-search')]) ,
            ] : // - bookmarks ]
            [ // [ search -
              m('input.itxt[type=text].mh3'+b`width:60%;`
              ,{
                'name' : 'search' ,
                'value' : txtTerm ,
                'onkeyup' (e) {
                  if (e.keyCode === 13) {
                    search(txtTerm)
                  }
                  txtTerm = e.target.value
                } ,
                'placeholder': 'seach...'
              }) ,
              m('span.btn-i'
              ,{
                ...fc('-plus-margin') ,
                'onclick' (e) {
                  search(txtTerm)
                  txtTerm = ''
                }
              },[m('i.fas.fa-search')]) ,
              m('span.btn-i.mh3'
              ,{
                'onclick' (e) {
                  set_toggle = !set_toggle
                }
              },[m('i.far.fa-bookmark')]) ,
            ] // - search ]
            ), 
              m('button.btn.mh3'+b`min-width:8rem;`
              ,{
                'onclick' (e) {
                  clear()
                }
              }
              ,['Clear']) ,
              m('span.btn-i',
              {
                'onclick' (e) {
                  set_toggle = !set_toggle
                }
              },[m('i.fas.fa-cog')]) ,
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