<template>
  <section class="generic-header">
    <section class="inner-container">
      <h1><b>{{ title }}</b></h1>
      <h3>{{ subtitle }}</h3>

      <p v-html="text"></p>

      <section class="slot-container">
        <slot />
      </section>
    </section>
  </section>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      subtitle: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
    },
  }
</script>

<style lang="scss" scoped>
  .generic-header {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding:120px 0;
    width:100%;
    position: relative;
    background:#fff;
    border-bottom:1px solid rgba(0,0,0,0.1);

    min-height:50vh;

    .inner-container {
      max-width:900px;
      margin:0 auto;
      text-align: center;
      padding:0 30px;

      h3 {
        margin-top:10px;
      }

      p {
        margin: 50px auto 0;
        max-width:700px;
      }
    }


    .slot-container {
      display:flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

  }
</style>
