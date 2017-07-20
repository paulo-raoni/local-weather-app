$('document').ready(function() {
  //Get user language.
  var userLang = navigator.language || navigator.userLanguage;
  userLang = userLang.slice(0, 2);

  if (userLang === 'pt') {
    $('.buttonTest').html('COMO ESTÁ O TEMPO?');
  }

  var currentLongitude,
    currentLatitude,
    buttonChangeTemp = true,
    scale = 'Celsius',
    temperature;
  
  function showPosition(position) {
      currentLongitude = position.coords.longitude;
      currentLatitude = position.coords.latitude;

    }

    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    }

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(showPosition, error, {
        enableHighAccuracy: true,
        maximumAge: 70000
      });

    } else {
      alert("HTML5 geolocation API isn't working.");
    }
  
  
  

  // This is the main button.
  $('.buttonTest').on('click', function(e) {
     
    e.preventDefault();
    
    $.ajax({
      url: "https://api.apixu.com/v1/current.json?key=f656b34e64024e528c6182849171104&q=" + currentLatitude + "," + currentLongitude + "&lang=" + userLang,
      maximumAge: 70000,
      success: function(data) {
        
         //This function gets the latitude and longitude and puts in 2 variables.
    
        
        
        //These variables are catching JSON information to be properly used on the HTML ids.
        var city = data.location.name;
        var condition = data.current.condition.text;
        var conditionCode = data.current.condition.code;
        var region = data.location.region;
        var country = data.location.country;
        var localtime = data.location.localtime;
        var timezone = data.location.tz_id;
        temperature = data.current.temp_c;
        //This buttonChangeTemp variable toggles the temperature variable between Celsius(if it's true) and Fahrenheit(if it's false).
       

        //This switch statement catchs the condition code shown in the JSON, and apply the appropriate photo accordling to the weather.     
        var conditionPng;
        switch (conditionCode) {
          //Sunny.  
          case 1000:
            conditionPng = "'//giphy.com/embed/vadsqiBwAM18c'";
            $('.result > p').css('color', 'yellow');

            break;
            //Partly Cloud.
          case 1003:
            conditionPng = "'//giphy.com/embed/aQ7kognlRPDzi'";
            $('.result > p').css('color', 'grey');

            break;
            //Cloudy, Overcast.  
          case 1006:
          case 1009:
            conditionPng = "'//giphy.com/embed/6WJUmLWTPmKYw'";
            $('.result > p').css('color', 'grey');

            break;
            //Mist.  
          case 1030:
            conditionPng = "'//giphy.com/embed/ZWRCWdUymIGNW'";
            $('.result > p').css('color', 'grey');

            break;
            //Light Rains.  
          case 1063:
          case 1180:
          case 1183:
          case 1186:
          case 1189:
          case 1195:
          case 1198:
          case 1204:
          case 1243:
          case 1246:
            conditionPng = "'//giphy.com/embed/dI3D3BWfDub0Q'";
            $('.result > p').css('color', 'grey');

            break;
            //Snow.
          case 1066:
          case 1114:
          case 1210:
          case 1213:
          case 1216:
          case 1219:
          case 1222:
          case 1225:
            conditionPng = "'//giphy.com/embed/XcsdCc78BtNBu'";
            $('.result > p').css('color', 'white');

            break;
            //Ice Pallets.
          case 1237:
            conditionPng = "'//giphy.com/embed/xTiTnGmU99wLFvZBfy'";
            $('.result > p').css('color', 'white');

            break;
            //Moderate and Heavy Rains.
          case 1201:
          case 1192:
          case 1195:
          case 1207:
          case 1240:
          case 1243:
          case 1246:
          case 1249:
            conditionPng = "'//giphy.com/embed/pCv0qq14iK3PG'";
            $('.result > p').css('color', 'grey');

            //Light Rain.  
          case 1183:
            conditionPng = "'//giphy.com/embed/dI3D3BWfDub0Q'";
            $('.result > p').css('color', 'grey');
            break;
        }

        //Here is a special translation to my native language if the user language is portuguese(pt).
        if (userLang === 'pt') {
          //These are the transformtions using jQuery selectors.   
          $('.result').animate({
            heigth: '200px'
          }, 200);
          $('#city').html('Local: ' + city + ', ' + region + ', ' + country).addClass('newDesignLocal', 200);
          $('#condition').html('Condição: ' + condition).addClass('newDesignLocal', 200);
          $('#temperature').html('Temperatura: ' + temperature + 'º ' + scale).addClass('newDesignLocal', 200);
          $('#localtime').html('Data: ' + localtime).addClass('newDesignLocal', 200);
          $('#timezone').html('Fuso horário: ' + timezone).addClass('newDesignLocal', 200);
        } else {
          //These are the transformtions using jQuery selectors.  
          $('.result').animate({
            heigth: '200px'
          }, 200);
          $('#city').html('Local: ' + city + ', ' + region + ', ' + country).addClass('newDesignLocal', 200);
          $('#condition').html('Condition: ' + condition).addClass('newDesignLocal', 200);
          $('#temperature').html('Temperature: ' + temperature + 'º ' + scale).addClass('newDesignLocal', 200);
          $('#localtime').html('Date: ' + localtime).addClass('newDesignLocal', 200);
          $('#timezone').html('Timezone: ' + timezone).addClass('newDesignLocal', 200);
        }

        //Here is where the weather photo comes with effects.   
        $('#conditionPng')
          .html('<iframe src=' + conditionPng + 'style = "width: 220px; height: 160px; overflow: auto; margin: 0" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>')
          .css({
            height: '100px',
          }, 1000)
          .animate({
            height: '140px'
          }, 2000);

        //Temperature button changer
        $('.buttonChangeTemp').html('<button>Cº or Fº</button>').css({
          textShadow: '1px 2px 2px #263964'
        });
        $('#tempNowParagraph').html(scale).css({
          color: '#263964',
          textShadow: '1px 1px 4px #952F2F'
        });
        
        
        $('.buttonChangeTemp').on('click', function(e) {

          if (scale == 'Celsius') {
            temperature = data.current.temp_f;
            scale = 'Fahrenheit';
            $('#temperature').html('Temperatura: ' + temperature + 'º ' + scale).addClass('newDesignLocal', 200);
            $('.buttonChangeTemp').html('<button>Cº or Fº</button>').css({
              textShadow: '1px 2px 2px #263964'
            });
            $('.buttonChangeTemp button').css({
              textShadow: '1px 2px 2px #263964'
            });
            $('#tempNowParagraph').html(scale).css({
              color: '#263964',
              textShadow: '1px 1px 4px #952F2F'
            });
          } 
          
          else {
            temperature = data.current.temp_c;
            scale = 'Celsius';
            $('#temperature').html('Temperatura: ' + temperature + 'º ' + scale).addClass('newDesignLocal', 200);
            $('.buttonChangeTemp').html('<button>Cº or Fº</button>').css({
              textShadow: '1px 2px 4px red',
            });
            $('#tempNowParagraph').html(scale).css({
              color: 'red',
              textShadow: '1px 2px 3px #293366'
            });
          }

        });

      },

    });

  });

});