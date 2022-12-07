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

    <figure class="video">
      <!--        <section class="image" :style="{'background-image':`url(https://img.youtube.com/vi/RsSZ0PxfioY/hqdefault.jpg)`}">-->
      <!--          &lt;!&ndash;          <figure class="tag">New</figure>&ndash;&gt;-->
      <!--          <figure class="play"><SvgPlay /></figure>-->
      <!--        </section>-->
      <figure @click="goToBasicsCourse" class="video-over-click"></figure>
      <iframe :src="video_url" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </figure>
  </section>
</template>

<script>
  export default {
    name: 'LearnHeader',
    props: {
      video_url: {
        type: String,
        default: 'https://www.youtube.com/embed/RsSZ0PxfioY'
      }
    },
    methods: {
      goToBasicsCourse() {

        this.$router.push('/course/getting-started-with-eos')
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

    @media only screen and (max-width : 960px) {
      display:block;
    }


    .cta-container {
      flex:1;
      text-align:center;

      .padder {
        padding:60px 100px;

        @media only screen and (max-width : 960px) {
          padding:60px 20px;
        }
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

        @media only screen and (max-width : 960px) {
          display:block;

          button {
            width:100%;
            margin:0 0 10px;
          }
        }
      }
    }

    .video {
      flex:1.5;
      aspect-ratio: 16 / 9;
      background:var(--color-primary);
      min-height:100%;
      align-self: stretch;
      position: relative;

      .video-over-click {
        position:absolute;
        top:0;
        bottom:0;
        left:0;
        right:0;
        z-index:1;
        cursor:pointer;
      }

      iframe, video {
        width: 100%;
        height: 100%;
        border: 0;
      }

      .image {
        width:100%;
        aspect-ratio: 16 / 9;
        border-radius:var(--radius);
        overflow: hidden;
        position: relative;
        background-size: cover;
        background-position: center;

        .play {
          position:absolute;
          top:0;
          bottom:0;
          left:0;
          right:0;
          display:flex;
          justify-content:center;
          align-items:center;
          background:rgba(0,0,0,0.4);
          opacity:0;

          transition: opacity 0.1s ease;

          svg {
            width:40px;
            fill:#fff;
          }
        }
      }

      &:hover {
        .play {
          opacity:1;
        }
      }

      .info {
        margin-top:15px;

        .title {
          font-size:1.2rem;
          font-family: "SuisseIntlBold", sans-serif;
          margin-bottom:10px;
        }

        p {
          font-size: 1rem;
        }
      }
    }
  }
</style>
