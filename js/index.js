var observer = new IntersectionObserver(function(entries) {
	if(entries[0].isIntersecting === true)
		for(let l of document.getElementsByClassName('img-arrow')){
      console.log(l)
      let num = 0;
      if(l.id.split('arrow')) num = parseInt(l.id.split('arrow')[1]) - 2; 
      else if(l.alt.split('arrow')) {
        num = parseInt(l.alt.split('arrow')[1]) -2
        l.id='arrowsm'+num+2;
      }
      setTimeout(function(){
        document.getElementById(l.id).classList.add('arrowanimate')
      }, num*500)
    }
}, { threshold: [.6] });

observer.observe(document.querySelector("#arrowset"));

function nodArjan(mod){
  let name = "arjan-logo-"+mod;
  document.getElementById(name).classList.add("nodArjan")
}

function removeNod(mod){
  let name = "arjan-logo-"+mod;
  document.getElementById(name).classList.remove("nodArjan")
}

window.onload = function() {
  setTimeout(() => loadnav(), 2000)
};

function loadnav(){
  var loadwords = document.getElementsByClassName('load-word')
  for(var lw of loadwords) {
    lw.classList.remove('d-none')
    lw.classList.add('fade-in')
  }
}

var words = {
  load_l:"Localize",
  load_o:"Optimize",
  load_a:"Audit",
  load_d:"Deploy"
}

function addWords(i) {
  setTimeout(function(){ 
    for(var w in words){
      if(document.getElementById(w).textContent.length >= i) {
        document.getElementById(w).textContent = words[w].substr(0,i+1)
      }
      else {
        document.getElementById(w).textContent += " ";
      }
    }
    i ++;
    if(i<9) {
      addWords(i)
    }
    else return('all done')
  }, 30);
}

function loadWords(x) {
  var i = 0;
  if(x.matches) {
    console.log('Large')
    setTimeout(function(){
      addWords(i);
    }, 1500)
  }
  else {
    console.log('Small')
    for(var w in words){
      document.getElementById(w).textContent = words[w].substr(0, 1)
    }
  }
}

var x = window.matchMedia("(min-width: 992px)")

window.onload = function() {
  loadWords(x)
};

x.addListener(loadWords);


function copyVal(val){
  const el = document.createElement('textarea');
  el.value = val;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

