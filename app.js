var app = new Vue({
  el: '#app',
  data: {
    styleTxt: '',
    parseError: null,
    validateError: null
  },
  mounted: function() {
    this.map = new mapboxgl.Map({
      container: 'map'
    })
    this.map.fitBounds([[-5, 41], [10, 51.5]])
    this.map.on('styledata', (s) => {
      localStorage.setItem('lastStyle', JSON.stringify(s.style.stylesheet, null, 2));
      this.validateError = null
    })
    this.map.on('error', (e) => {
      if (e.error.message !== 'Error') {
        this.validateError = e.error.message
      } else {
        console.log(e)
      }
    })
    this.styleTxt = localStorage.getItem('lastStyle') || '';
  },
  watch: {
    styleTxt: function() {
      this.parseError = null
      try {
        const style = JSON.parse(this.styleTxt)
        this.map.setStyle(style)
      } catch(e) {
        this.parseError = e.message
      }
    }
  }
})
