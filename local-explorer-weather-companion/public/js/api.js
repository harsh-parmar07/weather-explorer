const API = {
    getNearbyPlaces: async (location) => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)}&format=json&addressdetails=1&limit=10&countrycodes=us,ca,gb,au`);
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
        const apiKey = 'c12e4ba955e510309299cd641a479bc4';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
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