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

$(function(){
  Array.prototype.isEqualTo = function (array) {
    if (!array) return false;
    if (this.length != array.length) return false;

    for (var i = 0, l=this.length; i < l; i++) {
      if (this[i] instanceof Array && array[i] instanceof Array) {
        if (!this[i].compare(array[i]))
          return false;
      }
      else if (this[i] != array[i]) {
        return false;
      }
    }
    return true;
  }

  Array.prototype.addItemToArrayIfNotPresent = function(element) {
    if ($.inArray(element, this) == -1) this.push(element);
  }
})

// Facebook SDK initialization

function initializeFbSDK(){
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '217597998440130',
      status     : true,
      xfbml      : true
    });
  };

  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
}

// Pubnub handling

function connectToPubNub() {
  return PUBNUB.init({
    publish_key: 'pub-c-064fe80e-e897-47e1-b39f-0a3a66d58612',
    subscribe_key: 'sub-c-7956b8b2-9afe-11e3-b431-02ee2ddab7fe'
  });
}

function publishToPubnub( pubnubObj, message ){
  pubnubObj.publish({
    channel: 'desktop',        
    message: message
  });
}

// Image append and repositioning

function getImage(id){
  return "<div id='c_" + id + "' class='column'>" + 
    "<img src='http://graph.facebook.com/" + id + "/picture?type=large' id=" + id + " class=fb-profile />" + 
  "</div>"
}

function appendImage(imgId, row, container){
  var image = getImage( imgId );

  var existingImage = $('#c_' + imgId);
  if( existingImage ) { existingImage.remove(); }

  $( container ).append( image );
  $('#' + imgId).css('top', (row.substr(row.length - 1) - 1)*20 + '%');
}

function moveImgToRow( imgId, row, container ) {
  var img = getImage( imgId );

  appendImage( imgId, row, container );
}

// Carrousel

function carrousel( statesArray ) {
  $(".row").hide();
  $(".fb-profile").hide();

  var n = 0;
  
  n = performCarrouselStateIteration( n, statesArray );
  setInterval(function(){
    n = performCarrouselStateIteration( n, statesArray );
  }, 3000)
}

function storeState(userState, array) {
  $.each(array, function(index, value){
    if( value.id == userState.id ) {
      array.splice( index, 1 );
    }
  })
  array.push(userState);
  return array;
}

function setCarrouselState( state ) {
  var color = '#694278';

  switch( state.rowId ){
    case 'row-1':
      color = '#694278';
      break;
    case 'row-2':
      color = '#e33c3c';
      break;
    case 'row-3':
      color = '#328a6a';
      break;
    case 'row-4':
      color = '#f2bf57';
      break;
    case 'row-5':
      color = '#265a76';
      break;
  }

  $('body').css('background', color);
  
  if( $("#first-name") ) { $("#first-name").remove() }
  $('body').append( "<div id='first-name'>" + state.first_name + "</div>" );
  centerV( "#first-name" );
}

function performCarrouselStateIteration( n, statesArray ) {
  setCarrouselState( statesArray[n] );
  n++;
  if( n >= statesArray.length ) { n = 0 };
  return n;
}

// DOM positionining

function centerV( element ) {
  $(element).offset( { top: ($(window).outerHeight() - $(element).outerHeight())/2 })
}

function centerH( element ) {
  $(element).offset( { left: ($(window).outerWidth() - $(element).outerWidth())/2 })
}

function centerHV( element ) {
  centerH( element );
  centerV( element );
}