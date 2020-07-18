var pages = {}

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


/* function swapBody(current, next){
    var page1 = document.getElementById(current)
    page1.classList.add('fadeout')
    document.body.innerHTML = pages[next]+ document.body.innerHTML 
    var page2 = document.getElementById(next)
    let urlorg = window.location.href
    var url = urlorg.substr(0, urlorg.lastIndexOf('/'))+'/'+next.split('_body')[0]+'.html'
    console.log(url)
    setTimeout(function(){
        document.body.removeChild(document.getElementById(current))
    }, 1000)
    //window.history.pushState({}, 'Optimize', url)
} */

document.addEventListener("DOMContentLoaded", function(){ 
    //pageload
    /* var links = document.getElementsByClassName('pagelink')
    for(var link of links){
        var proxyurl = "https://cors-anywhere.herokuapp.com/";
        var url = 'https://arjan.tools/'+link.getAttribute('alt')
        var pagename = link.getAttribute('alt').split('.')[0]+'_body'
        
        link.addEventListener('mouseover', function(){
            fetch(proxyurl+url).then(function (response){
               return response.text();
            }).then(function(html){
                console.log(pagename)
                pages[pagename] = '<div id="'+pagename+'" class="fadein">'+html.split('<body id="page-top" class="bg-black text-white">')[1].split('</body>')[0]+'</div><!--ENDBODY-->'
                console.log(pages[pagename])
            }).catch(function(err){console.log(err)})
        })
    } */
    //Cat or Dog
    var catvar = sessionStorage.getItem('cat')
    if(catvar === 'true'){
        document.getElementById('dog').classList.remove('modebtn-selected')
        document.getElementById('cat').classList.add('modebtn-selected')
    }
    var elems = document.getElementsByClassName('arjan-head')
    for(var elem of elems){
        var img = new Image()
        var dogurl = elem.getAttribute('src')
        var caturl = dogurl.split(`_dog.svg`)[0]+'_cat.svg'
        if(catvar === 'true') {
            img.src = caturl
            elem.setAttribute('src', caturl)
            elem.removeAttribute('style')
        }
        else {
            img.src = dogurl
            elem.removeAttribute('style')
        }
    }
})

window.toggleButton = toggleButton;