const API = {
  getNearbyPlaces: async (location) => {
    try {
      const response = await fetch(`/api/places?location=${encodeURIComponent(location)}`);
      const data = await response.json();
      
      return data.map(item => ({
        name: item.display_name,
        lat: item.lat,
        lon: item.lon,
        type: item.type,
        class: item.class,
        address: item.address
      }));
      
    } catch (error) {
      console.error('Error fetching location data:', error);
      throw error;
    }
  },

  getWeather: async (lat, lon) => {
    try {
      const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
      const data = await response.json();
      
      return {
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        wind_speed: data.wind.speed,
        city: data.name
      };
      
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }
};