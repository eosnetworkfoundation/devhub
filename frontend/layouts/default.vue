<template>
  <section>
    <Nav />
    <section class="page-body">
      <Nuxt />
    </section>
    <Footer />
  </section>
</template>

<script>
export default {
  head() {
    return {
      title: "Developers - EOS Network"
    };
  },
  created() {
    this.redirectBack();
  },
  watch: {
    $route(to, from) {
      this.redirectBack();
    },
  },
  methods:{
    redirectBack(){
      if(this.$route.hash.indexOf('access_token') > -1) {
        this.$router.replace({hash: null});
        this.$common.redirectBack();
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .page-body {
    min-height: 50vh;
  }
</style>
