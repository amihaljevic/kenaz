var httpRequest = new XMLHttpRequest();
httpRequest.open("GET", "https://samples.openweathermap.org/data/2.5/group?id=3193935,3186886&units=metric&appid=b1b15e88fa797225412429c1c50c122a1");
httpRequest.addEventListener("load", onLoad);
httpRequest.send();

function onLoad() {
  var responseHtml = '';
  if (this.status === 200) {
    var response = JSON.parse(this.responseText);
    responseHtml = makePost(response);
  } else {
    responseHtml = makeError(this.status);
  }
  document.body.innerHTML += responseHtml;
}

function makePost() {
  return "<article><h1>" + response.name + "</h1><p>" + response.main.temp + "</p><p>" + response.weather["main"] + "</p></article>";
}
