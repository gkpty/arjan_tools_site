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
        console.log(data);
        if(status === 'success'){
          $('#arjantranslate-status').removeClass('loading')
          $('#arjantranslate-status').text("Done. Your download should start soon.").show();
          $('#arjantranslate-form :input').removeProp('disabled');
          $('#arjantranslate-btn').removeProp('disabled');
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