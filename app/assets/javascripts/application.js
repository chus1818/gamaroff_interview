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
  return "<div id='c_" + id + "' class='column'>" + 
    "<img src='http://graph.facebook.com/" + id + "/picture?type=large' id=" + id + " class=fb-profile />"
    
  "</div>"
}

function appendImage(imgId, row, container){
  var image = getImage( imgId );

  var existingImage = $('#c_' + imgId);
  if( existingImage ) { existingImage.remove(); }

  $( container ).append( image );
  $('#' + imgId).css('top', (row.substr(row.length - 1) - 1)*20 + '%');
}

function connectToPubNub() {
  return PUBNUB.init({
    publish_key: 'pub-c-064fe80e-e897-47e1-b39f-0a3a66d58612',
    subscribe_key: 'sub-c-7956b8b2-9afe-11e3-b431-02ee2ddab7fe'
  });
}

function moveImgToRow( imgId, row, container ) {
  var img = getImage( imgId );

  appendImage( imgId, row, container );
}

function addItemToArrayIfNotPresent(element, array) {
  var found = jQuery.inArray(element, array);
  if (found == -1) {
    array.push(element);
  }
}

function storeStates(userState, array) {
  $.each(array, function(index, value){
    if( value.id == userState.id ) {
      array.splice( index, 1 );
    }
  })
  array.push(userState);
  return array;
}

function storeState( state ) {
  var color = '#694278';
  
  switch( state.rowId ){
    case 'row_1':
      color = '#694278';
      break;
    case 'row_2':
      color = '#e33c3c';
      break;
    case 'row_3':
      color = '#328a6a';
      break;
    case 'row_4':
      color = '#f2bf57';
      break;
    case 'row_5':
      color = '#265a76';
      break;
  }

  $('body').css('background', color);
}