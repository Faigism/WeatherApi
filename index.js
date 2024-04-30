const container = document.querySelector('.container')
const search = document.querySelector('.search-box button')
const input = document.querySelector('.search-box input')
const image = document.querySelector('.weather-box img')
const cityName = document.querySelector('.weather-box h2')
const temperature = document.querySelector('.weather-box .temperature')
const description = document.querySelector('.weather-box .description')
const humidity = document.querySelector('.weather-details .humidity span')
const wind = document.querySelector('.weather-details .wind span')
const weatherBox = document.querySelector('.weather-box')
const weatherDetails = document.querySelector('.weather-details')
const error404 = document.querySelector('.not-found')

search.addEventListener('click', async () => {
  await searchWeather()
})
input.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') await searchWeather()
})
input.addEventListener('input', function () {
  this.value = this.value.trimStart()
  if (this.value.length > 20) {
    this.value = this.value.slice(0, 20)
  }
})

async function searchWeather() {
  const inputValue = document.querySelector('.search-box input').value.trim()
  const Api_Key = `46aac3f9afd9ff022002a086d911f752`
  if (inputValue == '') return
  try {
    const request = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${Api_Key}&units=metric`
    )
    const response = await request.json()
    if (response.cod == '404') {
      container.style.height = '400px'
      weatherBox.classList.remove('active')
      weatherDetails.classList.remove('active')
      error404.classList.add('active')
      document.querySelector('.search-box input').value = ''
      return
    }
    container.style.height = '555px'
    weatherBox.classList.add('active')
    weatherDetails.classList.add('active')
    error404.classList.remove('active')

    cityName.textContent = response.name

    switch (response.weather[0].main) {
      case 'Clear':
        image.src = 'images/clear.png'
        break
      case 'Rain':
        image.src = 'images/rain.png'
        break
      case 'Clouds':
        image.src = 'images/cloud.png'
        break
      case 'Snow':
        image.src = 'images/snow.png'
        break
      case 'Mist':
        image.src = 'images/mist.png'
        break
      default:
        image.src = ''
        break
    }
    temperature.innerHTML = `${parseInt(response.main.temp)}<span>°C</span>`
    description.innerHTML = `${response.weather[0].description}`
    humidity.innerHTML = `${response.main.humidity}%`
    wind.innerHTML = `${parseInt(response.wind.speed)}Km/h`
  } catch (error) {
    console.log(error)
  }
}
