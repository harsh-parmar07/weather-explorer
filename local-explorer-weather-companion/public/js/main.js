document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    const locationInput = document.getElementById('locationInput');
    const resultsContainer = document.getElementById('resultsContainer');
    const weatherInfo = document.getElementById('weatherInfo');
    const placesList = document.getElementById('placesList');
    const errorContainer = document.getElementById('errorContainer');
    const resultsTitle = document.getElementById('resultsTitle');
  
    searchButton.addEventListener('click', handleSearch);
  
    async function handleSearch() {
      const location = locationInput.value.trim();
      
      if (!location) {
        showError('Please enter a location');
        return;
      }
  
      try {
        // Clear previous results
        clearResults();
        
        // Show loading state
        resultsTitle.textContent = `Searching for "${location}"...`;
        resultsContainer.classList.remove('hidden');
        
        // Get location data
        const places = await API.getNearbyPlaces(location);
        
        if (places && places.length > 0) {
          // Update results title
          resultsTitle.textContent = `Results for "${location}"`;
          
          // Get weather data (using first result's coordinates)
          const weather = await API.getWeather(places[0].lat, places[0].lon);
          displayWeather(weather);
          
          // Display places
          displayPlaces(places);
        } else {
          showError('No places found for the specified location');
        }
        
      } catch (error) {
        console.error('Search error:', error);
        showError('An error occurred while fetching data');
      }
    }
  
    function displayWeather(weather) {
      const weatherContent = weatherInfo.querySelector('.weather-content');
      weatherContent.innerHTML = `
        <div class="weather-main">
          <img src="https://openweathermap.org/img/wn/${weather.icon}@2x.png" alt="${weather.description}">
          <div>
            <p class="temperature">${Math.round(weather.temp)}°C</p>
            <p class="description">${weather.description}</p>
          </div>
        </div>
        <div class="weather-details">
          <p>Feels like: ${Math.round(weather.feels_like)}°C</p>
          <p>Humidity: ${weather.humidity}%</p>
          <p>Wind: ${weather.wind_speed} m/s</p>
          <p>Location: ${weather.city}</p>
        </div>
      `;
      weatherInfo.classList.remove('hidden');
    }
  
    function displayPlaces(places) {
      const placesContainer = placesList.querySelector('.places-container');
      placesContainer.innerHTML = '';
      
      places.forEach(place => {
        const placeElement = document.createElement('div');
        placeElement.className = 'place-card';
        placeElement.innerHTML = `
          <h4>${place.name}</h4>
          <p>Type: ${place.type}</p>
          ${place.address ? `<p>Address: ${formatAddress(place.address)}</p>` : ''}
          <p>Coordinates: ${place.lat}, ${place.lon}</p>
        `;
        placesContainer.appendChild(placeElement);
      });
      
      placesList.classList.remove('hidden');
    }
  
    function formatAddress(address) {
      const parts = [];
      if (address.road) parts.push(address.road);
      if (address.city) parts.push(address.city);
      if (address.state) parts.push(address.state);
      if (address.country) parts.push(address.country);
      return parts.join(', ');
    }
  
    function clearResults() {
      weatherInfo.classList.add('hidden');
      placesList.classList.add('hidden');
      errorContainer.classList.add('hidden');
      errorContainer.textContent = '';
    }
  
    function showError(message) {
      errorContainer.textContent = message;
      errorContainer.classList.remove('hidden');
      resultsContainer.classList.add('hidden');
    }
  });