new Vue({
  el: '#app',

  data: {
    message: 'Weather',
    url: 'http://api.openweathermap.org/data/2.5/weather',
    location: 'NewYork',
    units: 'imperial',
    appid: '27b9d671b0ca0fca771aff7c42a8d968',
    city: {},
    weather: {},
    query: ''
  },

  ready: function() {
    this.update()
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
          q: this.location,
          units: this.units,
          appid: this.appid
        }
     }).then(function (result) {
        this.city = result.data
        this.weather = this.city.weather[0]
      }, function (response) {
        console.log('fail')
      })
    },

    changeCity: function() {
      this.location = this.query.replace(/\s/g, '')
      this.update()
    }
  }

});
