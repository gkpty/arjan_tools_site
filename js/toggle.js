function toggleButton(id){
    sessionStorage.setItem('cat', id==='cat'?true:false);
    var btns = document.getElementsByClassName('modebtn')
    for(var btn of btns) if(btn.classList.contains('modebtn-selected')) btn.classList.remove('modebtn-selected')
    document.getElementById(id).classList.add('modebtn-selected')
    var elems = document.getElementsByClassName('arjan-head')
    for(var elem of elems){
        elem.setAttribute('src', elem.getAttribute('src').substr(0, elem.getAttribute('src').lastIndexOf('_'))+`_${id}.svg`)
    }
}

document.addEventListener("DOMContentLoaded", function(){ 
    let catvar = sessionStorage.getItem('cat')
    if(catvar === 'true'){
        document.getElementById('dog').classList.remove('modebtn-selected')
        document.getElementById('cat').classList.add('modebtn-selected')
    }
    var elems = document.getElementsByClassName('arjan-head')
    for(var elem of elems){
        if(catvar === 'true') elem.setAttribute('src', elem.getAttribute('src').split(`_dog.svg`)[0]+'_cat.svg')
        elem.removeAttribute('style')
    }
})

window.toggleButton = toggleButton;