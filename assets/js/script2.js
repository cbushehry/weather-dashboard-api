function getAllMyHtml(data) {
  }
  function fetchSecondCall(latlng) {
    fetch(`url${latLng}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (secondCallData) {
      getAllMyHtml(secondCallData);
    });
  }
  function myFunction(city) {
    fetch(
      `https://en.wikipedia.org/w/api.php?action=${city}query&format=json&list=random&rnnamespace=0&rnlimit=1&origin=*`
    )
      .then(function (weatherResponse) {
        return weatherResponse.json();
      })
      .then(function (weatherData) {
        const latLng = weatherData.latlng;
        fetchSecondCall(latLng);
      });
    console.log('something');
  }
  