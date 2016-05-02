new Vue({
  el: '#app',

  data: {
    message: 'Weather',
    url: 'http://api.wunderground.com/api/',
    lat: '40.71',
    lon: '-74.01',
    appid: '09d7033777846fa8',
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
        url: this.url + this.appid + '/conditions/q/' + this.lat + ',' + this.lon + '.json',
        method: 'GET'
     }).then(function (result) {
        this.city = result.data.current_observation
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
