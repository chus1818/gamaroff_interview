$(function(){
  initializeFbSDK();
  pubnub = connectToPubNub();
  
  centerH('.button');

  $('#login').on('click tap', function() {
    FB.login(function(response) {
      if (response.authResponse) {
        FB.api('/me', function(response) {

          // Actions to perform after receiving a successful fb login response
          $('#login').hide();

          $.post( 'users', { user: { fb_id: response.id, first_name: response.first_name } } );

          publishToPubnub( pubnub, response );
          appendImage( response.id, 'row_3', '.ui-page' );

          // Events to be defined after receiving a successful fb login response
          defineRowActions( pubnub, response );
          defineProfileImageActions( pubnub, response );
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    });
  });
});

function defineRowActions( pubnub, fbLoginResponse ) {
  $(".row").on('click tap', function(){
    fbLoginResponse.rowId = this.id;

    publishToPubnub( pubnub, fbLoginResponse );
    moveImgToRow( fbLoginResponse.id, this.id, '.ui-page' );
    defineProfileImageActions( pubnub, fbLoginResponse );
  });
}

function defineProfileImageActions( pubnub, fbLoginResponse ) {
  $(".fb-profile").on('click taphold', function(){
    c = confirm( 'are you sure?' );

    if( c == true ) {
      var message = { 
        messageType: 'confirmation',
        id: fbLoginResponse.id,
        first_name: fbLoginResponse.first_name
      }

      publishToPubnub( pubnub, message );
    }
  });
}