
const button = document.querySelector('.button');
const inputValue = document.querySelector('.inputValue');
const api = '6bda9fb62f34664b58970fea30d1d419';
const iconImg = document.querySelector('.weather-icon');
const locate = document.querySelector('.name');
const tempC = document.querySelector('.tempC');
const tempF = document.querySelector('.tempF');
const desc = document.querySelector('.desc');
const minMax = document.querySelector('#minMax');
const feel = document.querySelector('#feel');
const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');

// Inputed data

inputValue.addEventListener('keypress', function(e){
	if (e.keyCode == 13) {
		fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid='+api+'&units=metric')
			.then(response => response.json())
			.then(data => {
				const nameValue = data['name'];
				console.log(nameValue);
				const tempValue = data['main']['temp'];
				const feelsValue = data['main']['feels_like'];
				const tempMinValue = data['main']['temp_min'];
				const tempMaxValue = data['main']['temp_max'];
				const descValue = data['weather'][0]['description'];
				const icon1 = data['weather'][0]['icon'];

				const iconUrl = 'https://openweathermap.org/img/wn/'+icon1+'@2x.png';
				const degreeF = (tempValue * 9) / 5 + 32;

				locate.innerHTML = nameValue;
				tempC.innerHTML = Math.round(tempValue)+" &#8451";
				desc.innerHTML = descValue;
				iconImg.src = iconUrl;
				tempF.innerHTML = Math.round(degreeF)+" &#8457";
				feel.innerHTML = "Feels like "+Math.round(feelsValue)+" &#8451";
				minMax.innerHTML = "min/max: "+Math.round(tempMinValue)+"/"+Math.round(tempMaxValue)+" &#8451";
				console.log(icon1);

				var path = /[d]/i;
				if (icon1.match(path)) {

					if (descValue === "clear sky") {
						document.querySelector(".box").style.backgroundImage = "url('img/clear.jpg')";
					}else if(descValue === "few clouds" || descValue === "scattered clouds" || descValue === "broken clouds" || descValue === "overcast clouds"){
						document.querySelector(".box").style.backgroundImage = "url('img/cloud.jpg')";
					}else if (descValue === "shower rain" || descValue === "rain") {
						document.querySelector(".box").style.backgroundImage = "url('img/rain.jpg')";
					}else if (descValue === "thunderstorm") {
						document.querySelector(".box").style.backgroundImage = "url('img/thunderstorm.jpg')";
					}else if (descValue === "snow") {
						document.querySelector(".box").style.backgroundImage = "url('img/snow.jpg')";
					}else if (descValue === "mist") {
						document.querySelector(".box").style.backgroundImage = "url('img/mist.jpg')";
					}
				}else{
					document.querySelector(".box").style.backgroundImage = "url('img/night.jpg')";
				}
			})
		.catch(err => alert("Wrong city name"))
	}
})

button.addEventListener('click', function(){
	fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid='+api+'&units=metric')
		.then(response => response.json())
		.then(data => {
			const nameValue = data['name'];
			console.log(nameValue);
			const tempValue = data['main']['temp'];
			const feelsValue = data['main']['feels_like'];
			const tempMinValue = data['main']['temp_min'];
			const tempMaxValue = data['main']['temp_max'];
			const descValue = data['weather'][0]['description'];
			const icon1 = data['weather'][0]['icon'];

			const iconUrl = 'https://openweathermap.org/img/wn/'+icon1+'@2x.png';
			const degreeF = (tempValue * 9) / 5 + 32;

			locate.innerHTML = nameValue;
			tempC.innerHTML = Math.round(tempValue)+" &#8451";
			desc.innerHTML = descValue;
			iconImg.src = iconUrl;
			tempF.innerHTML = Math.round(degreeF)+" &#8457";
			feel.innerHTML = "Feels like "+Math.round(feelsValue)+" &#8451";
			minMax.innerHTML = "min/max: "+Math.round(tempMinValue)+"/"+Math.round(tempMaxValue)+" &#8451";

			if (descValue === "clear sky") {
				document.querySelector(".box").style.backgroundImage = "url('img/clear.jpg')";
			}else if(descValue === "few clouds" || descValue === "scattered clouds" || descValue === "broken clouds" || descValue === "overcast clouds"){
				document.querySelector(".box").style.backgroundImage = "url('img/cloud.jpg')";
			}else if (descValue === "shower rain" || descValue === "rain") {
				document.querySelector(".box").style.backgroundImage = "url('img/rain.jpg')";
			}else if (descValue === "thunderstorm") {
				document.querySelector(".box").style.backgroundImage = "url('img/thunderstorm.jpg')";
			}else if (descValue === "snow") {
				document.querySelector(".box").style.backgroundImage = "url('img/snow.jpg')";
			}else if (descValue === "mist") {
				document.querySelector(".box").style.backgroundImage = "url('img/mist.jpg')";
			}
		})
	.catch(err => alert("Wrong city name"))
})

// Geolocated data

window.addEventListener('load', () => {
	let long;
	let lat;

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			long = position.coords.longitude;
			lat = position.coords.latitude;
			// console.log(long);
			// console.log(lat);

			const base = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid='+api+'&units=metric';
			// console.log(base);
			fetch(base).then(response => response.json())
				// .then(data =>console.log(data))
				.then(data => {
					const place = data['name'];
					const temp = data['main']['temp'];
					const feels = data['main']['feels_like'];
					const tempMin = data['main']['temp_min'];
					const tempMax = data['main']['temp_max'];
					const { description, icon } = data.weather[0];
					const { sunrise, sunset } = data.sys;

					const iconUrl = 'https://openweathermap.org/img/wn/'+icon+'@2x.png';
					const fahrenheit = (temp * 9) / 5 + 32;

					// Converting Epoch(Unix) time to GMT
					const sunriseGMT = new Date(sunrise * 1000);
					const sunsetGMT = new Date(sunset * 1000);

					// Interacting with DOM to show data
					iconImg.src = iconUrl;
					locate.innerHTML = place;
					desc.innerHTML =  description;
					tempC.innerHTML = Math.round(temp)+" &#8451";
					tempF.innerHTML = Math.round(fahrenheit)+" &#8457";
					feel.innerHTML = "Feels like "+Math.round(feels)+" &#8451";
					minMax.innerHTML = "min/max: "+Math.round(tempMin)+"/"+Math.round(tempMax)+" &#8451";

					rise = sunriseGMT.toLocaleDateString()+" "+sunriseGMT.toLocaleTimeString();
					sunrise.textContent = rise.toString();
					// sunrise.innerHTML = sunriseGMT.toLocaleDateString()+" "+sunriseGMT.toLocaleTimeString();
					console.log(rise.toString());
					sunset.innerHTML = sunsetGMT.toLocaleDateString()+" "+ sunsetGMT.toLocaleTimeString();
					console.log(sunsetGMT.toLocaleDateString().toString()+ sunsetGMT.toLocaleTimeString().toString());

					if (description === "clear sky") {
						document.querySelector(".box").style.backgroundImage = "url('img/clear.jpg')";
					}else if(description === "few clouds" || description === "scattered clouds" || description === "broken clouds" || description === "overcast clouds"){
						document.querySelector(".box").style.backgroundImage = "url('img/cloud.jpg')";
					}else if (description === "shower rain" || description === "rain") {
						document.querySelector(".box").style.backgroundImage = "url('img/rain.jpg')";
					}else if (description === "thunderstorm") {
						document.querySelector(".box").style.backgroundImage = "url('img/thunderstorm.jpg')";
					}else if (description === "snow") {
						document.querySelector(".box").style.backgroundImage = "url('img/snow.jpg')";
					}else if (description === "mist") {
						document.querySelector(".box").style.backgroundImage = "url('img/mist.jpg')";
					}
				})
		});
	}
});