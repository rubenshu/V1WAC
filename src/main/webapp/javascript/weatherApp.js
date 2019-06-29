function initPage() {
  fetch("https://ipapi.co/json/")
  .then(response => response.json())
  .then(function(myJson) {

    //var landcode = document.createTextNode(myJson.country);
    document.querySelector("#landcode").innerHTML = myJson.country;

    //var land = document.createTextNode(myJson.country_name);
    document.querySelector("#land").innerHTML = myJson.country_name;

    //var regio = document.createTextNode(myJson.region);
    document.querySelector("#regio").innerHTML = myJson.region;

    //var stad = document.createTextNode(myJson.city);
    document.querySelector("#stad").innerHTML = myJson.city;

    //var postcode = document.createTextNode(myJson.postal);
    document.querySelector("#postcode").innerHTML = myJson.postal;

    //var latitude = document.createTextNode(myJson.latitude);
    document.querySelector("#latitude").innerHTML = myJson.latitude;

    //var longitude = document.createTextNode(myJson.longitude);
    document.querySelector("#longitude").innerHTML = myJson.longitude;

    //var ip = document.createTextNode(myJson.ip);
    document.querySelector("#ip").innerHTML = myJson.ip;


    var mylocatie = document.querySelector("#myLocation");
    mylocatie.addEventListener("click", function() {
      showWeather(myJson.lat, myJson.longitude, myJson.city);
    });

    showWeather(myJson.latitude, myJson.longitude, myJson.city);
    loadCountries();
  })
}

function showWeather(latitude, longitude, city) {
  var gegevens = JSON.parse(window.sessionStorage.getItem(city));
  var time = new Date();
  if(gegevens == null  || Date.parse(gegevens.tijd) + 600000 < time.getTime()) {
    fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + latitude +"&lon=" + longitude + "&appid=dba041e14351151fc3a7a911e460ddc6&units=metric")
    .then(response => response.json())
    .then(function(myJson) {

      var windrichting = "";
      if (myJson.wind.deg > 20 && myJson.wind.deg <= 60) {
        windrichting = "Noord-Oost";
      } else if (myJson.wind.deg > 60 && myJson.wind.deg <= 110) {
        windrichting = "Oost";
      } else if (myJson.wind.deg > 110 && myJson.wind.deg <= 160) {
        windrichting = "Zuid-Oost";
      } else if (myJson.wind.deg > 160 && myJson.wind.deg <= 200) {
        windrichting = "Zuid";
      } else if (myJson.wind.deg > 210 && myJson.wind.deg <= 250) {
        windrichting = "Zuid-West";
      } else if (myJson.wind.deg > 250 && myJson.wind.deg <= 290) {
        windrichting = "West";
      } else if (myJson.wind.deg > 290 && myJson.wind.deg <= 340) {
        windrichting = "Noord-West";
      } else {
        windrichting = "Noord";
      }
      var zonsopgang = new Date(myJson.sys.sunrise * 1000);
      var zonsondergang = new Date(myJson.sys.sunset * 1000);

      document.querySelector("#temperatuur").innerHTML = myJson.main.temp;
      document.querySelector("#luchtvochtigheid").innerHTML = myJson.main.humidity;
      document.querySelector("#windsnelheid").innerHTML = myJson.wind.speed;
      document.querySelector("#windrichting").innerHTML = windrichting;
      document.querySelector("#zonsopgang").innerHTML = zonsopgang.toLocaleTimeString();
      document.querySelector("#zonsondergang").innerHTML = zonsondergang.toLocaleTimeString();

      document.querySelector("#locatie").innerHTML = city;

      saveData(city, myJson.main.temp, myJson.main.humidity, myJson.wind.speed, windrichting, zonsopgang, zonsondergang, time);
        })
    }
    else {
      console.log("in de else::")
      console.log(window.sessionStorage);

      var parsem = Date.parse(gegevens.tijd);

      document.querySelector("#temperatuur").innerHTML = gegevens.temp;
      document.querySelector("#luchtvochtigheid").innerHTML = gegevens.luchtvochtigheid;
      document.querySelector("#windsnelheid").innerHTML = gegevens.windsnelheid;
      document.querySelector("#windrichting").innerHTML = gegevens.windrichting;
      document.querySelector("#zonsopgang").innerHTML = new Date (gegevens.zonsopgang).toLocaleTimeString();
      document.querySelector("#zonsondergang").innerHTML = new Date (gegevens.zonsondergang).toLocaleTimeString();

      document.querySelector("#locatie").innerHTML = city;

    }
}

function loadCountries() {
  fetch("restservices/countries")
  .then(response => response.json())
  .then(function(myJson) {
    var table = document.querySelector("#landen");
    for (let i of myJson) {
      table.appendChild(links(i.Name, i.Capital, i.Region, i.Surface, i.Population, i.Code));
    }

    function links(country, cap, reg, sur, pop, code){
      var tablerow = document.createElement("tr");
      var cell1 = document.createElement("td");
      var cell2 = document.createElement("td");
      var cell3 = document.createElement("td");
      var cell4 = document.createElement("td");
      var cell5 = document.createElement("td");
      var cell6 = document.createElement("td");
      var wijzig = document.createElement("button");
      var verwijder = document.createElement("button");

      tablerow.className = "rij";
      tablerow.setAttribute("id", code);
      cell1.innerText = country;
      cell2.innerText = cap;
      cell3.innerText = reg;
      cell4.innerText = sur;
      cell5.innerText = pop;
      wijzig.innerText = "wijzig";
      verwijder.innerText = "verwijder";

      tablerow.addEventListener("click", function() {
        for (let i of myJson) {
          if(cell2.innerHTML == i.Capital) {
            showWeather(i.Latitude, i.Longitude, i.Capital);
          }
        }
      })

      tablerow.appendChild(cell1);
      tablerow.appendChild(cell2);
      tablerow.appendChild(cell3);
      tablerow.appendChild(cell4);
      tablerow.appendChild(cell5);
      tablerow.appendChild(cell6);
      cell6.appendChild(wijzig);
      cell6.appendChild(verwijder);

      wijzig.addEventListener('click', function(event){
        var landcode = document.getElementById("code");
        var modal = document.getElementById("modal");
        var land = document.getElementById("landtxt");
        var hoofdstad = document.getElementById("hoofdstadtxt");
        var regio = document.getElementById("regiotxt");
        var opp = document.getElementById("opptxt");
        var inwoners = document.getElementById("inwonerstxt");
        modal.style.display = "block";
        landcode.value = code;
        land.value = country;
        hoofdstad.value = cap;
        regio.value = reg;
        opp.value = sur;
        inwoners.value = pop;
      });

      verwijder.addEventListener('click', function(e) {
          console.log("de code voor verwijderen: " + code);
          fetch("restservices/countries/"+ code, { method: 'DELETE', headers:{ 'Authorization':'Bearer '+ window.sessionStorage.getItem("sessionToken")} })
          .then(function (response) {
            if (response.ok) { // response-status = 200 OK
            console.log("Country deleted");
            var element = document.getElementById(code);
            element.parentNode.removeChild(element);
            }
            else if (response.status == 404){
            console.log("Country not found!");}
            else if(response.status == 401 || response.status == 403) {
              console.log("unauthorized: 401/403 Fout!");
              alert("u bent niet ingelogd \nTest account:\nusername: e\nwachtwoord: e");
            }
            else {console.log("Cannot delete Country!");}
    });
      });
      return tablerow;
    }
  })
}

function saveData(city, temp, vocht, wSnelheid, wRichting, opgang, ondergang, currentTime) {
  var obj = {"temp" : temp, "luchtvochtigheid" : vocht, "windsnelheid" : wSnelheid, "windrichting" : wRichting, "zonsopgang" : opgang, "zonsondergang" : ondergang, "tijd" : currentTime};
  window.sessionStorage.setItem(city, JSON.stringify(obj));
}


/* voor de modal */
var btnSubmit = document.getElementById("submit");
btnSubmit.addEventListener('click', submit);

function submit(){
  var code = document.getElementById("code").value;
  var land = document.getElementById("landtxt").value;
  var formData = new FormData(document.querySelector("#PUTcountryForm"));
  var encData = new URLSearchParams(formData.entries());

  fetch("restservices/countries/"+ code, { method: 'PUT', body: encData, headers:{ 'Authorization':'Bearer '+ window.sessionStorage.getItem("sessionToken")}  })
  .then(function(response) {
      if (response.status == 403) {
        throw '403 Fout!';

      } else if (response.ok) {
          return response.json();
      }
    })
  .then(function(myJson) { console.log(myJson); })
  .catch(function(exception){
    console.log(exception);
    alert("u bent niet ingelogd \nTest account:\nusername: e\nwachtwoord: e");
  });
  document.querySelector("#landen").innerHTML = "";
  loadCountries();
  modal.style.display = "none";
}

var btnClose = document.getElementById("close");
btnClose.addEventListener('click', close);

function close(){
  modal.style.display = "none";
}

//Land toevoegen:
document.querySelector("#POST").addEventListener("click", voegToe);

function voegToe(){
  var formData = new FormData(document.querySelector("#POSTcountryForm"));
  var encData = new URLSearchParams(formData.entries());

  fetch("restservices/countries", { method: 'POST', body: encData, headers:{ 'Authorization':'Bearer '+ window.sessionStorage.getItem("sessionToken")} })
    .then(function(response) {
      if (response.ok) {
        console.log("toevoegen gelukt");
        document.querySelector("#landen").innerHTML = "";
        loadCountries();
      } else {
        console.log("Toevoegen niet gelukt!");
        alert("u bent niet ingelogd \nTest account:\nusername: e\nwachtwoord: e");
      }
    })
}

//Inloggen
function login(e) {
  var formData = new FormData(document.querySelector("#loginform"));
  var encData = new URLSearchParams(formData.entries());

  fetch("restservices/authentication", {method: 'POST', body: encData })
  .then(function(response){
    if(response.ok) {
      return response.json();
    }
    else {
      throw "wrong username/password";
    }
  })
  .then(myJson => {
    window.sessionStorage.setItem("sessionToken", myJson.JWT)
    console.log("ingelogd met met logincode: " + sessionStorage.getItem("sessionToken"));
  })

  .catch(error => console.log(error));

}

document.querySelector("#login").addEventListener("click", login);

window.onload = initPage;
console.log(sessionStorage);
