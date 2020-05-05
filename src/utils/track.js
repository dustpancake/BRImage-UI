
module.exports = {

    track: (label) => {
        this.$gtag.event('select_content', {
          'event_category': 'engagement',
          'event_label': label,
          'value': 1
        });
    },

    time: (count) => {
      this.$gtag.time({
        'name' : 'loadFM',
        'value' : (count * 500),
        'event_category' : 'backend_process'
      })
    }

}