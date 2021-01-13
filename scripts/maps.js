function initMap(){
    const myPosition = {lat: 32.1836, lng: 34.87386}

    //Map options
    var options ={
        zoom : 16,
        center: myPosition
       
    } 

    //new map
     var map = new google.maps.Map(document.getElementById('map') , options)

    //add marker
    const iconBase ="https://developers.google.com/maps/documentation/javascript/examples/full/images/";

     addMarker({coords : {lat: 32.1836, lng: 34.87386} ,
                iconImage : iconBase + 'parking_lot_maps.png' , 
                info : '<h1>Raanana</h1>'})
    
    addMarker({coords : {lat: 32.1850, lng: 34.87400} ,
    iconImage : iconBase + 'library_maps.png' , 
    info : '<h1>Tel aviv</h1>'})

     addMarker({coords : {lat: 32.1800, lng: 34.87000} ,
     iconImage : iconBase + 'info-i_maps.png' , 
     info : '<h1>Hasharon</h1>'})

     function addMarker(props){
        var marker = new google.maps.Marker({
         position :props.coords,
         map,
         icon : props.iconImage
     })

      //infoWindow
      var infoWindow = new google.maps.InfoWindow({
         content : props.info
     });

     marker.addListener('click' , function(){
         infoWindow.open(map , marker)
     })

     }

}
