$(document).ready(function() {

$('.btn').on('click', function() {
  document.getElementById("hidden").className = "visible";

 
  //new
 function getWeath(){
  var locObj;
  var loc = "";
  var cTemp = "";
  var fTemp;
  var tempToggle = true;
  var sys = "metric";
  var condition = "";
  var condIcon;
  var lat;
  var lon;
  var cntry;
  
  function locOverIP(){
    var locReq = new XMLHttpRequest();
    locReq.onreadystatechange = function(){
      if(locReq.readyState === 4 && locReq.status === 200){
        locObj = JSON.parse(locReq.responseText);
        loc = locObj.city;
        lat = Number(locObj.lat);
        lon = Number(locObj.lon);
        cntry = locObj.country;
        
        document.getElementById("loc").innerHTML = loc;
        
        function reqWeath(){
          var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=3ba7eb98b9bb1425c736af049b3694f6' + '&units=' + sys + '&preventCache=' + new Date();
          var weathReq = new XMLHttpRequest();
          weathReq.onreadystatechange = function(){
            if(weathReq.readyState === 4 && weathReq.status === 200){
              var weathObj = JSON.parse(weathReq.responseText);
              cTemp = weathObj.main.temp;
              fTemp = (cTemp * 9)/5 + 32;
              condition = weathObj.weather[0].main;
              condIcon = weathObj.weather[0].id;
              
              //Use condIcon to pair weather code with proper icon
              switch(true) {
                case condIcon >= 200 && condIcon < 300:
                  $('body').css('background-image', 'url("https://aos.iacpublishinglabs.com/question/aq/1400px-788px/thunderstorms-made_fdef5d2957edbe09.jpg?domain=cx.aos.ask.com")');
                  break;
                case condIcon >= 300 && condIcon < 400:
                  $('body').css('background-image', 'url("http://st19.static.bikestats.pl/userimages,20160922,148169,149517,orig.jpg")');
                  break;
                case condIcon >= 500 && condIcon < 600:
                  $('body').css('background-image', 'url("https://i.ytimg.com/vi/J5OSRpRyl6g/maxresdefault.jpg")');
                  break;
                case condIcon >= 600 && condIcon < 700:
                  $('body').css('background-image', 'url("https://wagfarms.files.wordpress.com/2013/01/005.jpg")');
                  break;
                case condIcon == 800:
                    $('body').css('background-image', 'url("https://static.pexels.com/photos/3768/sky-sunny-clouds-cloudy.jpg")');
                  break;
                case condIcon > 800 && condIcon <= 804:
                  $('body').css('background-image', 'url("https://report.az/storage/news/b6561e5fd06e28947a3fbb2c8e6a221e/731c8a5a-fe4e-449d-bcef-337dcdb7791e.jpg")');
              }
              
              document.getElementById("temp").innerHTML = cTemp;
              document.getElementById("cond").innerHTML = condition;
            }
          };
          weathReq.open("GET", url, true);
          weathReq.send();
          
        }
        reqWeath();
      };
      
      
    }
    locReq.open("GET", 'http://ip-api.com/json', true);
    locReq.send();
  }
  locOverIP();
  
  $(".change").click(function(){
    if(tempToggle === false){
      $("#temp").html(fTemp);
      $("#sys").html("&#176;F");
      tempToggle = true;
    }
    else {
      $("#temp").html(cTemp);
      $("#sys").html("&#176;C");
      tempToggle = false;
    }
  })
}


$(document).ready(function(){
  getWeath();
}); 
  
  //end of new
  
  }); //end of js button
});//end of document ready