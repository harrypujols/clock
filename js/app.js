new Vue({
  el: '#app',

  data: {
    message: 'Weather',
    url: 'http://api.openweathermap.org/data/2.5/weather?',
    location: 'NewYork',
    units: 'imperial',
    appid: '27b9d671b0ca0fca771aff7c42a8d968',
    city: '',
    cloud: ['few clouds', 'scattered clouds', 'broken clouds', 'mist'],
    umbrella: ['shower rain', 'rain', 'thunderstorm', 'snow'],
    weather: 'clear sky',
    icon: 'icon-sun'
  },

  ready: function() {
    this.getData()
  },

  watch: {
    weather: function(nuval, olval) {
      if (this.cloud.indexOf(nuval) > -1) {
        this.icon = 'icon-cloud'
      } else if (this.umbrella.indexOf(nuval) > -1) {
        this.icon = 'icon-umbrella'
      }
    }
  },

  filters: {
    rounded: function(val) {
      return typeof val == 'undefined' ? 0 : val.toFixed(0)
    }
  },

  methods: {
    getData: function() {
      this.$http({
        url: this.url,
        method: 'GET',
        params: {
          q: this.location,
          units: this.units,
          appid: this.appid
        }
     }).then(function (result) {
        this.city = result.data
        this.weather = this.city.weather[0].description
      }, function (response) {
        console.log('fail')
      })
    }
  }

});
