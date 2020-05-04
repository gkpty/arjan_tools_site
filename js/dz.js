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
    document.getElementById('fileName').textContent = e.dataTransfer.files[0].name
    document.getElementById('progress-bar').hidden = false
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
      document.getElementById('fileBody').value = reader.result;
      console.log(reader.result)
    }
    else {alert('Ha excedido el Limite de 10MB de adjuntos.')};
  }, false);
}

function removePreview(elem){
  var colId = elem+'col'
  var preview = document.getElementById(colId)
  var item = document.getElementById(elem)
  var itemSize = 0
  if(item.src) itemSize = item.src.length
  else if(item.data) itemSize = item.data.length
  preview.remove()
  document.getElementById('adjuntos_qty').value -= 1
  document.getElementById('attchSize').value = parseInt(document.getElementById('attchSize').value) - itemSize
}


function removePreview(elem){
var colId = elem+'col'
var preview = document.getElementById(colId)
var item = document.getElementById(elem)
var itemSize = 0
if(item.src) itemSize = item.src.length
else if(item.data) itemSize = item.data.length
preview.remove()
document.getElementById('adjuntos_qty').value -= 1
document.getElementById('attchSize').value = parseInt(document.getElementById('attchSize').value) - itemSize
}

$(function(){
$('#consultaspanama-form').submit(function(e){
  console.log('Submitting ...')
  e.preventDefault();
  let captcha = grecaptcha.getResponse();
  if(captcha.length < 1){
    alert('please fill out the recaptcha')
  }
  else {
    //get attachments size
    var attachments = ""
    var delim = ''
    var siz = $('#adjuntos_qty').val();
    if(siz > 0){
      for(var i =0; i < siz; i++){
        if(i>0) delim = '*,*'
        id = '#attch'+i;		
        if($(id)){
          if($(id).is('img')){
            if($(id).attr("src") && $(id).attr("src").length > 0) attachments = attachments + delim + $(id).attr("src")
            else console.log('image upload error: no src attribute present')
          }
          else if($(id).is('div')){
            if($(id).attr("data") && $(id).attr("data").length > 0) attachments = attachments + delim + $(id).attr("data")
            else console.log('image upload error: no src attribute present')
          }
        }
      }
    }
    console.log(attachments.length)
    // ** add the number of attachments to the fields
    console.log({ "id": "","nombre": $('#nombre').val(),"correo": $('#correo').val(),"telefono": $('#telefono').val(),"tipo": $('#tipo').val(),"consulta": $('#consulta').val(),"adjuntos": attachments,"adjuntos_qty":$('#adjuntos_qty').val(), "captcha":captcha })
    $.ajax({
      type: "POST",
      url: "https://1p7rjld7p9.execute-api.us-east-1.amazonaws.com/DeploymentStage/",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify( { "id": "","nombre": $('#nombre').val(),"correo": $('#correo').val(),"telefono": $('#telefono').val(),"tipo": $('#tipo').val(),"consulta": $('#consulta').val(),"adjuntos": attachments,"adjuntos_qty":$('#adjuntos_qty').val(), "captcha":captcha } ),
      beforeSend: function(data) {
          $('#consultaspanama-btn').prop('disabled', true);
          $('#consultaspanama-form :input').prop('disabled', true);
          $('#consultaspanama-status').html('Enviando...').show();
      },
      success: function(data, status, jqXHR) {
        console.log(data);
        if(data === 'Success'){
          $('#consultaspanama-status').text("Su consulta ha sido enviada Exitosamente.").show();
          $('#consultaspanama-form :input').removeProp('disabled');
          $('#consultaspanama-btn').removeProp('disabled');
        }
        else {
          $('#consultaspanama-status').text('Ha habido un inconveniente... Porfavor intente denuevo').show();
          $('#consultaspanama-form :input').removeProp('disabled');
          $('#consultaspanama-btn').removeProp('disabled');
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        $('#consultaspanama-status').text('Error. Porfavor revise su coneccion al internet e intente denuevo').show();
        $('#consultaspanama-form :input').removeProp('disabled');
        $('#consultaspanama-btn').removeProp('disabled');
      }
    });
  }
}); 				
});
