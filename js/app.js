new Vue({
  el: '#app',

  data: {
    message: 'Weather',
    url: 'http://api.openweathermap.org/data/2.5/weather',
    lat: '40.71',
    lon: '-74.01',
    appid: '27b9d671b0ca0fca771aff7c42a8d968',
    units: 'imperial',
    city: {},
    weather: {},
    clock: '12:00:00'
  },

  ready: function() {
    this.geolocation()
  },

  watch: {
    lat: function() {
      this.update()
      this.time()
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
        this.weather = this.city.weather[0]
      }, function (response) {
        console.log('fail')
      })
    },

    geolocation: function() {
      var that = this
      navigator.geolocation.getCurrentPosition( function(position) {
        that.lat = position.coords.latitude.toFixed(2)
        that.lon = position.coords.longitude.toFixed(2)
      })
    },

    time: function() {
      var today = new Date()
      var h = today.getHours()
      var m = today.getMinutes()
      var s = today.getSeconds()
      m = this.parsetime(m)
      s = this.parsetime(s)
      this.clock = h + ":" + m + ":" + s
      var t = setTimeout(this.time, 500)
    },

    parsetime: function(i) {
      if (i < 10) {i = "0" + i}  // add zero in front of numbers < 10
      return i
    }


  }

});
