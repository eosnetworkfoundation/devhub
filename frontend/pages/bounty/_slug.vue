<template>
  <section class="bounty">
    <section v-if="bounty">
      <GenericHeader
        :title="bounty.localizations[lang].title"
        :subtitle="bounty.localizations[lang].subtitle"
        :text="bounty.localizations[lang].header_text"
      />

      <section class="horizontal-limiter top-pad">
        <section v-html="$md.render(bounty.localizations[lang].markdown)"></section>
      </section>
    </section>
  </section>
</template>

<script>
export default {
  name: 'Bounty',
  props: {
    bounty: {
      type: Object,
      required: false
    }
  },
  data(){return {
      lang:'en',
  }},
  async beforeMount() {
    if(!this.bounty){
      this.bounty = {
        slug:'hello',
        slug_hash:'hello-hash',
        price:100,
        type:0,
        localizations:{
          en:{
            title:'Hello',
            subtitle:'Hello subtitle',
            header_text:'Hello header text',
            markdown:'## hello markdown \r\n\r\n hello markdown',
          }
        }
      }
      // this.bounty = await this.$api.getBounty(this.$route.params.slug);
      // if(!this.bounty) return this.$router.push('/');
    }
  }
}
</script>

<style lang="scss" scoped>
  .bounty {


  }

</style>
