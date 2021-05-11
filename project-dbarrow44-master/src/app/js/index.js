
//Adds a map to the bottom of page 
var L = window.L;
//Sets view to pensacola
var myMap = L.map('mapID').setView([30.42, -87.21], 10);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZGJhcnJvdzQ0IiwiYSI6ImNrbWUzZmllZTA3czAycG8zcTdtYnp5YTYifQ.4ifv_Qi4CkMQ_DjrVS2EDA'
}).addTo(myMap);

var markers = [
    {
        name: "Roger Scott Dog Park", 
        coords: [30.466467, -87.198278]
    },
    { 
        name: "Bayview Dog Beach", 
        coords: [30.431127, -87.191181]
    }, 
    { 
        name: "Bill Dickson Dog Park", 
        coords: [30.359872, -87.336452]
    },
    { 
        name: "River Road Dog Park", 
        coords: [30.300473, -87.44216]
    },  
    { 
        name: "Beulah Regional Park", 
        coords: [30.516291, -87.373174]
    }, 
    { 
        name: "Pensacola Dog Beach", 
        coords: [30.344983, -87.068812]
    }, 

]


markers.forEach(element =>  {
    L.marker(element.coords).bindPopup(`${element.name}`).addTo(myMap);
    //console.log(element.name);
});

var currentParkIndex = 0; 

$(document).ready(function() {
    
    $("#prevButton").click(function() {
        if(currentParkIndex == 0) {
            currentParkIndex = markers.length;
            myMap.myMap.flyTo(markers[currentParkIndex].coords, 18)
        } else {
            currentParkIndex -=1;
            myMap.flyTo(markers[currentParkIndex].coords, 18);

        }
    });
    
    $("#nextButton").click(function() {
        if(currentParkIndex == markers.length) {
            currentParkIndex = 0;
            myMap.myMap.flyTo(markers[currentParkIndex].coords, 18);
        } else {
            currentParkIndex +=1;
            myMap.flyTo(markers[currentParkIndex].coords, 18);
        }
    });

    


    //manipulate DOM stuff
    $("#birdButton").click(function() {
        var embedVideo = `  <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@barrowc97/video/6934139265030851845" data-video-id="6934139265030851845" style="max-width: 605px;min-width: 325px;" > 
                                <section> <a target="_blank" title="@barrowc97" href="https://www.tiktok.com/@barrowc97">@barrowc97</a> 
                                    <p>
                                        <a title="rip" target="_blank" href="https://www.tiktok.com/tag/rip">##rip</a> 
                                        <a title="mygirl" target="_blank" href="https://www.tiktok.com/tag/mygirl">##mygirl</a> <a title="birddog" target="_blank" href="https://www.tiktok.com/tag/birddog">##birddog</a> <a title="cancersucks" target="_blank" href="https://www.tiktok.com/tag/cancersucks">##cancersucks</a>
                                    </p> 
                                    <a target="_blank" title="♬ Home - Edith Whiskers" href="https://www.tiktok.com/music/Home-6773436955838401285" aria-label="link to Home song">♬ Home - Edith Whiskers</a> 
                                </section> 
                            </blockquote><script async src="https://www.tiktok.com/embed.js"></script>` 

        $("#birdButton").after(embedVideo);
        $(this).prop('disabled', true);
    });

});

