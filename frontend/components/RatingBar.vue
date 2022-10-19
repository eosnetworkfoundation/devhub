<template>
  <section class="rating-bar">
    <figure class="title">Rating</figure>
    <section class="bar-container">
      <section class="bar">
        <figure class="fill" :class="{'red':percentage <= 0.5}" :style="{'width':fillWidth}"></figure>
      </section>
      <figure class="text">{{parseInt((percentage*100).toString())}}/100</figure>
    </section>
  </section>
</template>

<script>
  export default {
    props: {
      percentage: {
        type: Number,
        default: 0
      }
    },
    computed: {
      fillWidth() {
        return `${this.percentage*100}%`
      }
    }
  }
</script>

<style lang="scss" scoped>
  .rating-bar {
    text-align: left;
    margin:20px 0 0;

    .title {

    }

    .bar-container {
      display: flex;
      justify-content: center;
      align-items: center;

      .bar {
        height:6px;
        flex:1;
        background:#e6ebf7;
        border-radius: 50px;
        position: relative;
        overflow: hidden;

        .fill {
          height:6px;
          background:var(--color-secondary);
          position:absolute;
          top:0;
          left:0;
          bottom:0;
          border-radius: 50px;

          &.red {
            background:var(--color-red);
          }
        }
      }

      .text {
        flex:0 0 auto;
        font-size: 0.8rem;
        margin-left:10px;
      }
    }
  }
</style>
