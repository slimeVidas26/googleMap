let input = document.getElementById('location-input');
let locationForm = document.getElementById('geocode-form');
locationForm.addEventListener('submit' , geoCode16)

function geoCode16(e) {
    e.preventDefault()
    var location = input.value;
    var api = "AIzaSyBi-aqdycegFXEhvd37vSubX0u0sGjw3FM";
    axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
            params: {
                address:location,
                key: api
            }
        })
        .then(function (response) {
            let res = response.data.results[0];
            console.log(res)

            Object.keys(res).forEach(key=>{
///////////////////////// plus_code ///////////////////////////////////////////////
                if(key === 'plus_code'){
                    let output = '';
                    output += ` <div class="key">${key}</div>
                <div class="value">
                <div class="object-wrapper">`
                    Object.keys(res[key]).forEach(keyPlusCode => {
                            output += `<div class="object-item">
                <div class="key">${keyPlusCode}</div>
                <div class="value">
                <div class="string-wrapper">${res[key][keyPlusCode]}</div>
                </div>
                </div>`
                        })
                    output += `</div>
                </div>`
                
                    document.getElementsByClassName(key)[0].innerHTML = output;
                }

///////////////////////////// address_components /////////////////////////////////////
                else if(key === 'address_components'){
                    let output = '';
                    output += `<div class="key">${key}</div>
                                               <div class="value">
                                              <div class="array-wrapper">`
                    res[key].forEach((item, index) => {
                        output += `<div class="object-wrapper">`
                        Object.keys(res[key][index]).forEach(addressKey => { 
                                output += `<div class="object-item">
                                                      <div class="key">${addressKey}</div>
                                                     <div class="value">`
                                if (Array.isArray(res[key][index][addressKey])) {
                                    output += `<div class="array-wrapper2">`
                                    res[key][index][addressKey].forEach(arrayItem => {
                                        output += `<div class="array-item">${arrayItem}</div>`
                                    })
                                    output += `</div>`
                                } else {
                                    output += `<div class="string-wrapper">${res[key][index][addressKey]}</div>`
                                }
                                output += `</div>  
                             </div>`
                            })
        
                        output += `</div>`
                    })
        
                    output += `</div>  
                </div>
               </div>`
        
                    document.getElementsByClassName(key)[0].innerHTML = output;
                }
/////////////////////////////// types /////////////////////////////////////////////
                else if(key === 'types'){
                    let output = '';
                    output += `<div class="key">${key}</div>
           <div class="value">
            <div class="array-wrapper">`
                    res[key].forEach(item => {
                        output += `<div class="array-item">${item}</div>`
                    })
        
                    output += `</div>
           </div>`;
        
                    document.getElementsByClassName(key)[0].innerHTML = output;
                }

//////////////////////////////// geometry /////////////////////////////////////////////
                
                else if(key === 'geometry'){
let output = '';
output += `<div class="key">${key}</div>
                <div class="value">
                  <div class="location">
                    <div class="key">location</div>
                      <div class="value">
                        <div class="object-wrapper">`
            Object.keys(res[key].location).forEach((keyLoc )=> {
               
                    output += `<div class="object-item">
            <div class="key">${keyLoc}</div>
            <div class="value">
                <div class="string-wrapper toto">${res[key].location[keyLoc]}</div>
                </div>  
           </div>`
                })
            output += `</div>
   </div>
 </div>`


 ////////////////////////////////////////////////////////////////////////////////////////

            output += `<div class="location_type">
    <div class="key">location_type</div>
    <div class="value">
        <div class="string-wrapper">
            <div class="text-wrapper">${key.location_type}</div>
            
        </div>
    </div>  
   </div>`

            output += `<div class="viewport">
    <div class="key">viewport</div>
    <div class="value">`
            Object.keys(res[key].viewport).forEach(keyView => {
                    output += `<div class="object-wrapper">
            <div class="object-item">
             <div class="key">${keyView}</div>
             <div class="value">
                <div class="object-wrapper">`
                    Object
                        .keys(res[key].viewport[keyView])
                        .forEach(childKey => {
                            output += `<div class="object-item">
                        <div class="key">${childKey}</div>
                        <div class="value">
                            <div class="string-wrapper"> ${res[key].viewport[keyView][childKey]}</div>
                           </div>
                    </div>`
                        })
                    output += `</div>
             </div>  
            </div>  
        </div>`
                })
            output += `</div>
  </div>
</div>`;

            document.getElementsByClassName(key)[0].innerHTML = output;
                }
                else{
                    let output = '';
                    output += `<div class="key">${key}</div>
                                             <div class="value">
                                                <div class="string-wrapper">${res[key]}</div>
                                            </div>`;
                    document.getElementsByClassName(key)[0].innerHTML= output; 
                }
               
            })
        })
       .then(   function initMap(){
        const myPosition = {lat:Number(document.getElementsByClassName('toto')[0].innerHTML) , lng:Number(document.getElementsByClassName('toto')[1].innerHTML)}
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

)
        
}

geoCode16();




