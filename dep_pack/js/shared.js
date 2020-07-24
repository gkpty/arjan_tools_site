function copyVal(val){
    const el = document.createElement('textarea');
    el.value = val;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

document.addEventListener("load", function(){ 
    var elems = document.getElementsByClassName('arjan-head')
    for(var elem of elems){
        var img = new Image()
        var caturl = elem.getAttribute('src').split(`_dog.svg`)[0]+'_cat.svg'
        img.src = caturl
        elem.setAttribute('src', caturl)
        elem.removeAttribute('style')
    }
})

window.copyVal = copyVal