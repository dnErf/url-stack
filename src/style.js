import b from 'bss'

b.css({
  '*,*+*,*::before,*::after' : b`border-sizing:borderbox;margin:0;padding:0;` ,
  'html'  : b`font-size:62.50%;height:100%;` ,
  'body'  : b`font: 2rem 'Noto Sans', sans-serif;height:100%;` ,
  'br'    : b`clear:both;` ,
  'a'     : b`cursor:pointer;` ,
  '.app'  : b`display:flex;flex-direction:row;width:100%;height:100%;`
  
})

// menu
b.css({
  '.menu' : b`width:20rem;padding:2rem;background-color:#0d98ba;` , // hover #0a718a
  '.menu-header' : b`color:#effbfe;` ,
  '.menu-header:hover' : b`background-color:#0b85a2;opacity:.9;` ,
})

//content
b.css({
  '.content' : b`width:100%;padding:1.5rem;`
})

// modifiers
b.css({
  '.ba'               : b`border:.1rem solid gray;` ,
  '.bb'               : b`border-bottom:.2rem solid gray;` ,
  '.btn'              : b`background:white;border:solid gray;border-width:1.5px;border-radius:.2rem;cursor:pointer;font-size:1.6rem;padding:.8rem;` ,
  '.btn:hover'        : b`opacity:.8;` ,
  '.btn-i'            : b`cursor:pointer;font-size:1.8rem;` ,
  '.btn-i:hover'      : b`opacity:.7;` ,
  '.itxt'             : b`border:solid gray;font-size:1.6rem;padding:.8rem;margin: .5rem 1rem;` ,
  '.itxt:focus'       : b`outline-color:black;` ,
  '.itxtarea'         : b`border:solid gray;` ,
  '.itxtarea:focus'   : b`outline-color:black;` ,
  '.fr'               : b`float:right;` ,
  '.mv1'              : b`margin-top:.25rem;margin-bottom:.25rem;` ,
  '.mh1'              : b`margin-left:.25rem; margin-right:.25rem;` ,
  '.ma3'              : b`margin:1rem;` ,
  '.mh3'              : b`margin-left:1rem;margin-right:1rem;` ,
  '.mv1'              : b`margin-top:.25rem;margin-bottom:.25rem;` ,
  '.mv3'              : b`margin-top:1rem;margin-bottom:1rem;` ,
  '.pv1'              : b`padding-top:.25rem;padding-bottom:.25rem;` ,
  '.pa3'              : b`padding:1rem;` ,
  '.ph3'              : b`padding-left:1rem;padding-right:1rem;` ,
  '.pv3'              : b`padding-top:1rem;padding-bottom:1rem;` ,
  '.w-100'            : b`width:100%;` ,
  '.w-90'             : b`width:90%;` ,
  '.w-70'             : b`width:70%;` ,
  '.w-58'             : b`width:58%;` ,
  '.w-40'             : b`width:40%;` ,
  '.content-between'  : b`align-items: middle;` ,
})

// grid
b.css({
  '.fbx'  : b`width:100%;display:flex;flex-wrap:wrap;flex-direction:row;margin-left:0;margin-right:0;padding-left:0;padding-right:0;` ,
  '.fcl'  : b`flex:1;` ,
  '.c1'   : b`max-width: calc(100% / 12);` ,
  '.c2'   : b`max-width: calc(100% / 12 * 2);` ,
  '.c3'   : b`max-width: calc(100% / 12 * 3);` ,
  '.c4'   : b`max-width: calc(100% / 12 * 4);` ,
  '.c5'   : b`max-width: calc(100% / 12 * 5);` ,
  '.c6'   : b`max-width: calc(100% / 2);` ,
  '@media(max-width:35rem)' : b`.fcl{min-width: 100%;}.fbx{margin: 1rem 0;}` ,
})

// media queries
b.css({
  '@media(max-width:35rem)' : b`.media-hide{display:none;}`
})