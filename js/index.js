/* require('../css/optimize.css')
require('../css/index.css')
require('../css/general.css')
require('../css/shared.css') */
//END_STYLE_INJECT






var observer = new IntersectionObserver(function(entries) {
	if(entries[0].isIntersecting === true)
		for(let l of document.getElementsByClassName('img-arrow')){
      //console.log(l)
      let num = 0;
      if(l.id.startsWith('arrow')) num = parseInt(l.id.split('arrow')[1]); 
      else if(l.alt.startsWith('arrow')) {
        num = parseInt(l.alt.split('arrow')[1])
        l.id='smarrow'+num+2;
      }
      /* console.log(num) */
      setTimeout(function(){
        document.getElementById(l.id).classList.add('arrowanimate')
      }, num*400)
    }
}, { threshold: [.6] });

observer.observe(document.querySelector("#arrowset"));

function nodArjan(mod){
  let name = "arjan-logo-"+mod;
  document.getElementById(name).classList.remove("quickfade")
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

function borderanimate(){document.getElementById("main-rect").classList.toggle("rect-border")}
