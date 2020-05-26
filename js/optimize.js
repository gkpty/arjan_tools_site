var observer = new IntersectionObserver(function(entries) {
	if(entries[0].isIntersecting === true)
		for(let l of document.getElementsByClassName('checkmark')){
      let num = parseInt(l.id.split('check')[1]) - 2;
      setTimeout(function(){
        document.getElementById(l.id).classList.add('checkanimate')
      }, num*500)
    }
}, { threshold: [.6] });

observer.observe(document.querySelector("#checkbox_container"));

