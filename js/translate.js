$(function(){
  $('#arjantranslate-form').submit(function(e){
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "https://u9thejfp8g.execute-api.us-east-1.amazonaws.com/DeploymentStage/",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify( { "id": "","from": $('#from').val(),"to": $('#to').val(),"file": $('#file').val(),"email": $('#email').val() } ),
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
  }); 				
});


function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}