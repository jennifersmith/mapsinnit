
function initialize() {
    var geocoder = new google.maps.Geocoder();

    var postcodes = [
	'SL59JH',
	'LU13TQ',
	'SR29TD',
	'DA75BQ',
	'EC1V9B'
    ];
    var mapOptions = {
	zoom: 7,
	center: new google.maps.LatLng(53,-2), // 51 0 for london
	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var placePostcodePin = function(data){
	 var infowindow = new google.maps.InfoWindow({
	     content: data.formatted_address
	 });
	var marker = new google.maps.Marker({
	    map: map,
	    position: new google.maps.LatLng(data.geometry.location.lat, data.geometry.location.lng)
	   });
	google.maps.event.addListener(marker, 'click', function() {
	    infowindow.open(map,marker);
	});
    }

    jQuery.get("geocoded.json", function(data){
	$(data).each(function(i){
	    foo = data[0];
	    if(data[i] && data[i].geometry)
		placePostcodePin(data[i]); //?
	});
    });
}

google.maps.event.addDomListener(window, 'load', initialize);

