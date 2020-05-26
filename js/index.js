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

function copyVal(val){
  const el = document.createElement('textarea');
  el.value = val;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

