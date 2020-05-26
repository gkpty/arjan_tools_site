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
    }, 100);
  }
  
  function loadWords(x) {
    var i = 0;
    if(x.matches) {
      console.log('Large')
      setTimeout(function(){
        addWords(i);
      }, 1750)
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