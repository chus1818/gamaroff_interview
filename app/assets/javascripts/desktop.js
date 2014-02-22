$(function(){
  var pubnub         = connectToPubNub();
  var presentUsers   = [];
  var confirmedUsers = [];
  var userStates     = [];
  var inCarrousel    = false;

  centerV(".welcome-message");

  pubnub.subscribe({
    channel: 'desktop',
    message: function( m ){
      if( inCarrousel === true ) return false;

      if( m.messageType == 'confirmation' ) {
        
        confirmedUsers.addItemToArrayIfNotPresent( m.id );

        if( presentUsers.sort().isEqualTo(confirmedUsers.sort()) ){
          inCarrousel = launchCarrousel( userStates );
        }

      } else {

        presentUsers.addItemToArrayIfNotPresent( m.id );
        userStates = storeState( m, userStates );

        $('.welcome-message').hide()
        
        if( m.rowId === undefined ) m.rowId = 'row-3';
        moveImgToRow( m.id, m.rowId, 'body' );
        
      }
    }
  });
});

function launchCarrousel( userStates ) {
  carrousel( userStates );
  return true;
}