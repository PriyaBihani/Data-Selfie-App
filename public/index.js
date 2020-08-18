// okay so in this project we are geolocating which basically means we are locating our position. In iss project we pulled the location of the third party through an api and in this one we are using inbuilt navigator tool in chrome.
// we have created the function setup bcoz it is like a main function for p5.js library.
// first we set up all the feilds like lat lon when user ask us to and send it to the server with a name and pic .
function setup() {
   noCanvas(); // just remove the default canvas created by the p5 lib

   // for the use of web cam
   const video = createCapture(VIDEO);
   video.size(320, 240);

   console.log('available');

   document.getElementById('geolocate').addEventListener('click', () => {
      if ('geolocation' in navigator) {
         // checking if the geo location is available
         console.log('available');

         // get the current position in geolocation and do that async function with that big position object passed in by the function.
         navigator.geolocation.getCurrentPosition(async (position) => {
            console.log(position);
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            video.loadPixels(); // just to warn p5 lib to convert image into a string data
            const image = video.canvas.toDataURL();

            document.getElementById('latitude').textContent = lat;
            document.getElementById('longitude').textContent = lon;
            const name = document.getElementById('name').value;
            // sent all the data to server. -- requesting a server from client side javascript
            const data = { name, image, lat, lon };
            const options = {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify(data),
            };
            const response = await fetch('/api', options);
            const json = await response.json();
            console.log(json);
         });
      } else {
         console.log('not available');
      }
   });
}
