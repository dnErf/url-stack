export const DataModel = function() {
  if(!localStorage.getItem('H06')) localStorage.setItem('H06','{"hrext" : {"bookmarks" : [] ,"notes" : "" ,"slug" : "hrext"}}')
  let model = JSON.parse(localStorage.getItem('H06'))
  return model
}

export const StateModel = function(ns) {
  return {
    isReady: true ,
    isBusy: false
  }
}