import {DataModel,StateModel} from './model-state'
import marked from 'marked'

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
    , stringe = ''
    , updateLocalStorage = function() {
      stringe = JSON.stringify(data)
      localStorage.setItem('H06',stringe)
    }
  return {
    state ,
    model : data[selectedData] ,
    add (url) {
      data[selectedData].bookmarks.push(url)
      updateLocalStorage()
    } ,
    descMarked (desc,idx) {
      let nhtml = marked(desc)
        data[selectedData].bookmarks[idx].description = nhtml
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
      data = dm(selectedData)
      this.model = data[selectedData]
    }
  }
}(DataModel,StateModel))

export default ac