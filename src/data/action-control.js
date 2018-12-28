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
    , model 
    , stringe = ''
    , updateLocalStorage = function() {
      stringe = JSON.stringify(data)
      localStorage.setItem('H06',stringe)
    }
  return {
    data ,
    state ,
    model ,
    selectedData ,
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
      if (selectedData===undefined) selectedData = this.selectedData
      if (data[selectedData] === null || data[selectedData] === undefined) selectedData = 'hrext'
      let
        ndata = dm()
      data[selectedData].bookmarks = ndata[selectedData].bookmarks
    } ,
    switchData (targetData) {
      selectedData = targetData
      this.model = data[selectedData]
    } ,
    newCategory (category) {
      data[category] = {
        "bookmarks" : [] ,
        "notes" : "" ,
        "slug" : category.toLowerCase().replace(/\W/g,"-")
      }
      updateLocalStorage()
    } ,
    deleteCategory (category) {
      delete data[category]
      updateLocalStorage()
      /** send back to the default route */
      m.route.set('/hrext')
    } ,
    fetchData () {
      return m.request({
        method: 'GET' ,
        url: './data.json' ,
      })
      .then((res) => {
        localStorage.setItem('H06',JSON.stringify(res))
        data = JSON.parse(localStorage.getItem('H06'))
        this.switchData('hrext')
      })
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