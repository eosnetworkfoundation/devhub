<template>
  <section class="learn-header">
    <section class="cta-container">
      <section class="padder">
        <h1><b>Learn<br/>& Earn</b></h1>

        <p>
          <b>Learn web3 development and change your life.</b>
          We not only make it easy to learn, but also provide ways for you to instantly utilize your new skills to earn money.
        </p>

        <section class="buttons">
          <Button @click.native="$emit('start')">Learn</Button>
          <Button :secondary="true" @click.native="$router.push('/earn')">Earn</Button>
        </section>
      </section>
    </section>

    <section class="video">
      <iframe :src="video_url" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </section>
  </section>
</template>

<script>
  export default {
    name: 'LearnHeader',
    props: {
      video_url: {
        type: String,
        default: 'https://www.youtube.com/embed/YZmTEuOdffs'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .learn-header {
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    width:100%;
    position: relative;
    background:#fff;
    border-bottom:1px solid rgba(0,0,0,0.1);


    .cta-container {
      flex:1;
      text-align:center;

      .padder {
        padding:60px 100px;
      }

      p {
        margin:10px 0 50px;
      }

      .buttons {
        display: flex;
        justify-content: center;

        button {
          margin:0 8px;
          padding:0 80px;
        }
      }
    }

    .video {
      flex:1.5;
      aspect-ratio: 16 / 9;
      background:var(--color-primary);
      min-height:100%;
      align-self: stretch;

      iframe, video {
        width: 100%;
        height: 100%;
        border: 0;
      }
    }
  }
</style>
