import './style.js'

import m from 'mithril'
import b from 'bss'

import ac from './data/action-control'

import Menu from './components/menu.js'
import Content from './components/content.js'

window.m = m
b.setDebug(true)

hljs.initHighlightingOnLoad();

const app = {
  view (v) {
    return m('.app.fbx', [
      m(Menu) ,
      m(Content,ac)
    ])
  }
}

m.mount(document.body, app)
