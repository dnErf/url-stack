import './style.js'

import m from 'mithril'
import b from 'bss'

import ac from './data/action-control'

import Menu from './components/menu.js'
import Content from './components/content.js'

window.m = m
b.setDebug(true)

hljs.initHighlightingOnLoad();

// const app = {
//   view (v) {
//     return m('.app.fbx', [
//       m(Menu) ,
//       m(Content,ac)
//     ])
//   }
// }
// m.mount(document.body, app)

m.route(document.body, '/hrext', {
  '/:data' : {
    onmatch (args) {
      if (ac.data === null || ac.data === undefined) {
        ac.fetchData()
      }
      else {
        ac.switchData(args.data)
      }
      // ac.selectedData = args.data
      // ac.model = ac.data[ac.selectedData]
      // ac.reset()
    } ,
    render (v) {
      return m('.app.fbx', [
        m(Menu,
          {
            categories:Object.keys(ac.data) ,
            newCategory : ac.newCategory ,
            deleteCategory : ac.deleteCategory ,
          }
        ) ,
        m(Content,ac)
      ])
    }
  }
})


