import m from 'mithril'

import Modal from './modal'
import ToolTip from './tool-tip.js'

const MarkdownHelp = {
  view (v) {
    return (
      m(Modal
        ,{
          label: 'Demo',
          button: m('span.btn-i',[ m('i.fab.fa-markdown') , m(ToolTip,{'tip':'markdown help'}) ])}
        ,[
          // modal markdown help content
          m('table',[
            m('tr',[
              m('th[colspan=2]',['Markdown Syntax Help']) ,
            ]) ,
            m('tr',[
              m('td',['Headers']) ,
              m('td',['# H1 ## H2 ### H3'])
            ]) ,
            m('tr',[
              m('td',['Bold']) ,
              m('td',['**bold**'])
            ]) ,
            m('tr',[
              m('td',['Italic']) ,
              m('td',['*italics*'])
            ]) ,
            m('tr',[
              m('td',['Strikethrough']) ,
              m('td',['~~strikethrough~~'])
            ]) ,
            m('tr',[
              m('td',['Bullet List']) ,
              m('td',['* item'])
            ]) ,
            m('tr',[
              m('td',['Image']) ,
              m('td',['![alt](http://)'])
            ]) ,
            m('tr',[
              m('td',['Code']) ,
              m('td',['``_code``'])
            ]) ,
            m('tr',[
              m('td',['Highlighted Code ']) ,
              m('td',['`` `` ``_javascript var code=formatted`` `` ``'])
            ]) ,
          ])
        ])
    )
  }
}

export default MarkdownHelp

