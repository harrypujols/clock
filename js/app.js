new Vue({
  el: '#app',

  data: {
    url: 'http://api.wunderground.com/api/',
    lat: '40.71',
    lon: '-74.01',
    appid: '09d7033777846fa8',
    city: {},
    clock: '00:00:00',
    format: '12hr',
    degrees: 'farenheit'
  },

  ready: function() {
    this.geolocation()
  },

  watch: {
    lat: function() {
      this.update()
      this.time()
    },

    'city.icon_url': function(result) {
      if( result.indexOf('nt') >= 0 && this.city.icon == 'clear' ) {
        this.city.icon = 'moon'
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
      var p = 'am'

      if (this.format == '12hr') {

        // if (h > 12) {
        //   p = 'pm'
        // }

        h = h % 12 || 12
      }

      // h = this.parsetime(h)
      m = this.parsetime(m)
      s = this.parsetime(s)

      if (this.format == '12hr') {
        this.clock = h + ":" + m + ":" + s // + p
      } else {
        this.clock = h + ":" + m + ":" + s
      }

      var t = setTimeout(this.time, 500)
    },

    parsetime: function(i) {
      if (i < 10) {i = "0" + i}
      return i
    }
  }

});
