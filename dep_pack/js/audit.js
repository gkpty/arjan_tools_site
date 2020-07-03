/* require('../css/general.css')
require('../css/shared.css')
require('../css/audit.css') */
//END_STYLE_INJECT

window.onload = function() {
  animateSquares();
};

//squares animation
function animateSquares(){
  var sqtops = document.getElementsByClassName('square-top')
  for(var sq of sqtops) {
    let initVal = parseInt(sq.getAttribute("y"))-50;
    console.log(initVal)
    sq.setAttribute("y", initVal.toString());
    for(let i=0; i<20; i++){
      setTimeout(()=>{
        let dec = 5
        if(i%2) dec = -5
        initVal += dec;
        //console.log(initVal)
        sq.setAttribute("y", initVal.toString());
      }, 10)
    }
  }
}