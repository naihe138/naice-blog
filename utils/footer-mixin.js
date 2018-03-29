export default {
  methods: {
    footer() {
      if ($('#mailContent').height() < $(window).height()) {
        this.$store.commit('changeFooterFixed', true)
      } else {
        this.$store.commit('changeFooterFixed', false)
      }
    }
  }
}
