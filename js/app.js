new Vue({
  el: '#app',

  data: {
    message: 'Weather',
    url: 'http://api.openweathermap.org/data/2.5/weather',
    lat: '',
    lon: '',
    units: 'imperial',
    appid: '27b9d671b0ca0fca771aff7c42a8d968',
    city: '',
    cloud: ['overcast clouds', 'scattered clouds', 'broken clouds', 'mist'],
    umbrella: ['shower rain', 'rain', 'thunderstorm', 'snow'],
    weather: 'clear sky',
    icon: 'icon-sun',
    time: '',
    query: ''
  },

  ready: function() {
    this.geolocation()
  },

  watch: {
    lat: function() {
      this.update()
    },

    weather: function(nuval, olval) {
      if (this.cloud.indexOf(nuval) > -1) {
        this.icon = 'icon-cloud'
      } else if (this.umbrella.indexOf(nuval) > -1) {
        this.icon = 'icon-umbrella'
      }
    },

    time: function(nuval, olval) {
      if (this.weather == 'clear sky') {
        if (nuval > this.city.sys.sunrise || nuval < this.city.sys.sunset) {
          this.icon = 'icon-moon'
        } else {
          this.icon = 'icon-sun'
        }
      }
    }
  },

  filters: {
    rounded: function(val) {
      return typeof val == 'undefined' ? 0 : val.toFixed(0)
    }
  },

  methods: {
    update: function() {
      this.$http({
        url: this.url,
        method: 'GET',
        params: {
          lat: this.lat,
          lon: this.lon,
          units: this.units,
          appid: this.appid
        }
     }).then(function (result) {
        this.city = result.data
        this.weather = this.city.weather[0].description
        this.time = this.city.dt
      }, function (response) {
        console.log('fail')
      })
    },

    geolocation: function() {
      var that = this
      navigator.geolocation.getCurrentPosition(location)
      function location(position) {
        that.lat = position.coords.latitude
        that.lon = position.coords.longitude
      }
    }
  }

});
