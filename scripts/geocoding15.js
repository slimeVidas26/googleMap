let input = document.getElementById('location-input');
let locationForm = document.getElementById('geocode-form');
locationForm.addEventListener('submit' , geoCode15)

//geoCode15();

function geoCode15(e) {
    e.preventDefault()
    var location = input.value;
    var api = "AIzaSyBi-aqdycegFXEhvd37vSubX0u0sGjw3FM";
    axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
            params: {
                address: location,
                key: api
            }
        })
        .then(function (response) {
            let res = response.data.results[0];

            let arrLevelOne = [];
            Object.keys(res).forEach(key => {
            arrLevelOne.push(key);
            });

             function initMap(){
                 let map;
                const myPosition = {lat:res.geometry.location.lat,
                    lng:res.geometry.location.lng
                   }

                    //Map options
                var options ={
                zoom : 16,
                center: myPosition       
                } 

                 map = new google.maps.Map(document.getElementById('map') , options)
                            }

              
              initMap();

            //address_components
            let addressComponents = res.address_components;
            let addressComponentsInput = '';
            addressComponentsInput += `<div class="key">${arrLevelOne[0]}</div>
                                       <div class="value">
                                      <div class="array-wrapper">`
            addressComponents.forEach((item, index) => {
                addressComponentsInput += `<div class="object-wrapper">`
                Object
                    .keys(addressComponents[index])
                    .forEach(key => {
                        addressComponentsInput += `<div class="object-item">
                                              <div class="key">${key}</div>
                                             <div class="value">`
                        if (Array.isArray(addressComponents[index][key])) {
                            addressComponentsInput += `<div class="array-wrapper2">`
                            addressComponents[index][key].forEach(arrayItem => {
                                addressComponentsInput += `<div class="array-item">${arrayItem}</div>`
                            })
                            addressComponentsInput += `</div>`
                        } else {
                            addressComponentsInput += `<div class="string-wrapper">${addressComponents[index][key]}</div>`
                        }
                        addressComponentsInput += `</div>  
                     </div>`
                    })

                addressComponentsInput += `</div>`
            })

            addressComponentsInput += `</div>  
        </div>
       </div>`

            document.getElementsByClassName('address_components')[0].innerHTML = addressComponentsInput;

//formatted_address *****************************************************************
let formattedAddress = res.formatted_address;
let formattedAddressInput = '';
formattedAddressInput += `<div class="key">${arrLevelOne[1]}</div>
                         <div class="value">
                            <div class="string-wrapper">${formattedAddress}</div>
                        </div>`;
document.getElementsByClassName('formatted_address')[0].innerHTML = formattedAddressInput;

//geometry ****************************************************************************

let geometry = res.geometry;
let geometryInput = '';
geometryInput += `<div class="key">${arrLevelOne[2]}</div>
                <div class="value">
                  <div class="location">
                    <div class="key">location</div>
                      <div class="value">
                        <div class="object-wrapper">`
            Object.keys(geometry.location).forEach(key => {
                    geometryInput += `<div class="object-item">
            <div class="key">${key}</div>
            <div class="value">
                <div class="string-wrapper">${geometry.location[key]}</div>
                </div>  
           </div>`
                })
            geometryInput += `</div>
   </div>
 </div>`

            geometryInput += `<div class="location_type">
    <div class="key">location_type</div>
    <div class="value">
        <div class="string-wrapper">
            <div class="text-wrapper">${geometry.location_type}</div>
            
        </div>
    </div>  
   </div>`

            geometryInput += `<div class="viewport">
    <div class="key">viewport</div>
    <div class="value">`
            Object
                .keys(geometry.viewport)
                .forEach(key => {
                    geometryInput += `<div class="object-wrapper">
            <div class="object-item">
             <div class="key">${key}</div>
             <div class="value">
                <div class="object-wrapper">`
                    Object
                        .keys(geometry.viewport[key])
                        .forEach(childKey => {
                            geometryInput += `<div class="object-item">
                        <div class="key">${childKey}</div>
                        <div class="value">
                            <div class="string-wrapper"> ${geometry.viewport[key][childKey]}</div>
                           </div>
                    </div>`
                        })
                    geometryInput += `</div>
             </div>  
            </div>  
        </div>`
                })
            geometryInput += `</div>
  </div>
</div>`;

            document.getElementsByClassName('geometry')[0].innerHTML = geometryInput;

//place_id ******************************************************************************
            let placeId = res.place_id;
            let placeIdInput = '';
            placeIdInput += `<div class="key">${arrLevelOne[3]}</div>
<div class="value">
    <div class="string-wrapper">${placeId}</div>
</div>`;
            document.getElementsByClassName('place_id')[0].innerHTML = placeIdInput;

// //plus_code ****************************************************************************
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}  




let plusCode = res.plus_code;
if(plusCode){
    let plusCodeInput = '';
    plusCodeInput += ` <div class="key">${arrLevelOne[4]}</div>
<div class="value">
<div class="object-wrapper">`

    Object.keys(plusCode).forEach(key => {
            plusCodeInput += `<div class="object-item">
<div class="key">${key}</div>
<div class="value">
<div class="string-wrapper">${plusCode[key]}</div>
</div>
</div>`
        })
    plusCodeInput += `</div>
</div>`

    document.getElementsByClassName('plus_code')[0].innerHTML = plusCodeInput;
}
else{
     plusCodeInput = ''; 
}
               
           

//types ******************************************************************************
            let types = res.types;
            let typesInput = '';
            typesInput += `<div class="key">${arrLevelOne[5]}</div>
   <div class="value">
    <div class="array-wrapper">`
            types.forEach(item => {
                typesInput += `<div class="array-item">${item}</div>`
            })

            typesInput += `</div>
   </div>`;

            document.getElementsByClassName('types')[0].innerHTML = typesInput;

        });
}


