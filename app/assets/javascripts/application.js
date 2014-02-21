// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

function getImage(id){
  return $("<img />").attr( 'src', 'http://graph.facebook.com/' + id + '/picture?type=large' ).attr( 'id', id ).attr( 'class', 'fb-profile' )
}

function connectToPubNub() {
  return PUBNUB.init({
    publish_key: 'pub-c-064fe80e-e897-47e1-b39f-0a3a66d58612',
    subscribe_key: 'sub-c-7956b8b2-9afe-11e3-b431-02ee2ddab7fe'
  });
}

function moveImgToRow( img_id, row ) {
  var img = getImage( img_id );
  var existingImage = $('#' + img_id);
  if( existingImage ) { existingImage.remove(); }

  $( "#" + row ).append( img );
}