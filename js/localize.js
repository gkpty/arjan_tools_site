/* require('../css/general.css')
require('../css/shared.css')
require('../css/localize.css') */
//END_STYLE_INJECT
//dropzone
let dropArea = document.getElementById("drop-area");
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)   
  document.body.addEventListener(eventName, preventDefaults, false)
});
['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
});
['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false)
});

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false)
function preventDefaults (e) {
  e.preventDefault()
  e.stopPropagation()
}
function highlight(e) {
  dropArea.classList.add('highlight')
}
function unhighlight(e) {
  dropArea.classList.remove('active')
}
function handleDrop(e) {
  var ext = e.dataTransfer.files[0].name.split('.')[1]
  console.log(ext)
  if(ext === 'html' || ext === 'md' || ext === 'txt'){
    var dt = e.dataTransfer
    var files = dt.files
    handleFiles(files)
  }
  else{
    document.getElementById('progress-bar').hidden = true
    document.getElementById('fileName').textContent = 'Error. only html, md and txt files supported.'
  }
}
let uploadProgress = []
let progressBar = document.getElementById('progress-bar')
function initializeProgress(numFiles) {
  progressBar.value = 0
  uploadProgress = []
  for(let i = numFiles; i > 0; i--) {
    uploadProgress.push(0)
  }
}

function updateProgress(fileNumber, percent) {
  uploadProgress[fileNumber] = percent
  let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
  console.debug('update', fileNumber, percent, total)
  progressBar.value = total
}

function handleFiles(files) {
  document.getElementById('fileName').textContent = files[0].name
  document.getElementById('progress-bar').hidden = false
  files = [...files]
  initializeProgress(files.length)
  files.forEach(uploadFile)
}

function uploadFile(file, i) {
  var num = 0
  var ext = ""
  const reader = new FileReader();
  if (file){
    reader.readAsText(file);
    num = document.getElementById('adjuntos_qty')
    ext = file.name.split('.').pop().toLowerCase()
  }
  reader.addEventListener("progress", function(e) {
    updateProgress(i, (e.loaded * 100.0 / e.total) || 100)
  })
  reader.addEventListener('loadend', function(e) {
    updateProgress(i, 100) // <- Add this
  }) 
  reader.addEventListener("load", function () {
    //convert image file to base64 string
    console.log(reader.result.length)
    //AWS API gateway hast a limit of 10MB.
    if(reader.result.length < 10380000){
      var sizeMb = reader.result.length*(1/1000000)
      console.log('total upload size: ', sizeMb)
      document.getElementById('file').value = reader.result;
      //console.log(reader.result)
    }
    else {alert('You have exceeded the 10MB filesize limit.')};
  }, false);
}

/* function removePreview(elem){
  var colId = elem+'col'
  var preview = document.getElementById(colId)
  var item = document.getElementById(elem)
  var itemSize = 0
  if(item.src) itemSize = item.src.length
  else if(item.data) itemSize = item.data.length
  preview.remove()
  document.getElementById('adjuntos_qty').value -= 1
  document.getElementById('attchSize').value = parseInt(document.getElementById('attchSize').value) - itemSize
} */

//submit the form
$(function(){
  $('#arjantranslate-form').submit(function(e){
    e.preventDefault();
    let captcha = grecaptcha.getResponse();
    if(captcha.length < 1){
      alert('please fill out the recaptcha')
    }
    else {
      $.ajax({
        type: "POST",
        url: "https://u9thejfp8g.execute-api.us-east-1.amazonaws.com/DeploymentStage/",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify( { "id": "","from": $('#from').val(),"to": $('#to').val(),"file": $('#file').val(),"email": $('#email').val(), "captcha":captcha }),
        beforeSend: function(data) {
            $('#arjantranslate-btn').prop('disabled', true);
            $('#arjantranslate-form :input').prop('disabled', true);
            $('#arjantranslate-status').show();
            $('#arjantranslate-status').addClass('loading')
        },
        success: function(data, status, jqXHR) {
          if(data && data.html && data.html.length > 1){
            console.log(data)
            var destFile = $('#to').val() + '.html'
            var destJson = $('#to').val() + '.json'
            $('#arjantranslate-status').removeClass('loading')
            $('#arjantranslate-status').text("Done. Your download should start soon.").show();
            $('#arjantranslate-form :input').removeProp('disabled');
            $('#arjantranslate-btn').removeProp('disabled');
            download(destJson, data.locale);
            download(destFile, data.html);
          }
          else {
            $('#arjantranslate-status').text('Error. Please try again.').show();
            $('#arjantranslate-form :input').removeProp('disabled');
            $('#arjantranslate-btn').removeProp('disabled');
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
          $('#arjantranslate-status').text('Error. Please check your network connection and try again.').show();
          $('#arjantranslate-form :input').removeProp('disabled');
          $('#arjantranslate-btn').removeProp('disabled');
        }
      });
    }
  }); 				
});

//download the translated html and locale files
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}