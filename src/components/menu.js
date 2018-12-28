import m from 'mithril'
import b from 'bss'
import cfs from 'class-func-style'

// menu - to be removed on next clean up
// b.css({
//   '.menu' : b`width:16rem;padding:2rem;background-color:#0d98ba;` , // hover #0a718a
//   '.menu-header'       : b`color:#effbfe;` ,
//   '.menu-header:hover' : b`background-color:#0b85a2;opacity:.9;` ,
// })

let 
  fc = cfs({
    '-category-list' : b`padding: 0 1rem;display:flex;justify-content:space-between;align-items:center;` ,
    '-category-input' : b`width:98%;padding: .4rem .2rem;border:solid #0b85a2;`
      .$focus(`outline-color:black;`) ,
    '-link' : b`margin-top:1rem;color:#effbfe;`
      .$hover(`background-color:#0b85a2;opacity:.9;`) ,
    '-menu' : b`width:22rem;padding:2rem 1rem;background-color:#0d98ba;` 
      .$media('(max-width:55rem)',b`display:none;`), // hover #0a718a
  })
const Menu = {
  view (v) {
    let { categories , deleteCategory , newCategory } = v.attrs
    return m('div.c2', { ...fc('-menu') } ,
      [
        m('h3.ph3.pv1.mv3',{...fc('-link')},[m('a','@ hrext')]) ,
        m('input.mv3.ph1[type=text][placeholder="new category..."]'
        , {
          ...fc('-category-input') ,
          onkeyup(e) {
            if (e.keyCode === 13) {
              if (e.target.value !== '') {
                newCategory(e.target.value)
                e.target.value = ''
              }
            }
          }
        }) ,
        m('div',[
          categories.map((category) =>{
            return m('span',{...fc('-category-list','-link')}
              ,[
                m('a'
                ,{
                  id:`${category}` ,
                  onclick (e) {
                    e.preventDefault()
                    m.route.set(`/${category}`)
                  }
                },`# ${category}`) ,
                m('span.btn-i'+b`font-size:1.6rem;`
                ,{
                  onclick(e) {
                    let targetCategory = e.target.parentElement.previousSibling.id
                    if (targetCategory !== 'hrext') {
                      deleteCategory(targetCategory)
                    }
                  }
                }
                ,[[m('i.fas.fa-times-circle')]]) ,
              ]) 
          })
        ])
      ]
    )
  }
}

export default Menu