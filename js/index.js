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