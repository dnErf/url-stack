import {DataModel,StateModel} from './model-state'
import marked from 'marked'
import m from 'mithril'

marked.setOptions({
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  }
});

const ac = (function(dm,sm) {
  let 
    data = dm()
    , state = sm()
    , selectedData = 'hrext'
    , model = data[selectedData]
    , stringe = ''
    , updateLocalStorage = function() {
      stringe = JSON.stringify(data)
      localStorage.setItem('H06',stringe)
    }
  return {
    state ,
    model ,
    add (url) {
      data[selectedData].bookmarks.push(url)
      updateLocalStorage()
    } ,
    descMarked (desc,idx) {
      let nhtml = marked(desc)
        data[selectedData].bookmarks[idx].description = nhtml
        data[selectedData].bookmarks[idx].rawDesc = desc
        updateLocalStorage()
      return nhtml
    } ,
    search (term) {
      data[selectedData].bookmarks = data[selectedData].bookmarks.filter((value) => {
        return String(value.url).includes(term)
      })
    } ,
    remove (idx) {
      data[selectedData].bookmarks = data[selectedData].bookmarks.filter((_,indx) => {
        return !(indx === Number(idx))
      })
      updateLocalStorage()
    } ,
    clear () {
      data[selectedData].bookmarks = []
      updateLocalStorage()
    } ,
    reset () {
      let
        ndata = dm(selectedData)
      data[selectedData].bookmarks = ndata[selectedData].bookmarks
    } ,
    test () {
      // getting the title tag then getting the inside string
      m.request({
        method : 'GET' ,
        url: 'https://www.npmjs.com/' ,
        deserialize : function(value) {
          console.log()
          return value.match(/<title [^>]+>([^<]+)<\/title>/)[1]
        }
      })
      .then((res)=>{
        console.log(res)
      })
    }
  }
}(DataModel,StateModel))

export default ac