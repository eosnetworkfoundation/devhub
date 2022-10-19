<template>
  <section>
    <section class="course-card" :class="{'un-clickable':!clickable}">
      <section class="image" :style="{'background-image':`url(${$common.episodeThumbnail(episode)})`}">
        <figure class="play"><SvgPlay /></figure>
      </section>

      <section class="details">
        <figure class="title"><b>{{ episode.title }}</b></figure>
        <p>{{ episode.description }}</p>
      </section>
    </section>
  </section>
</template>

<script>
  export default {
    name: 'CourseCard',
    props: {
      course: {
        type: Object,
        required: true
      },
      episode: {
        type: Object,
        required: true
      },
      clickable: {
        type: Boolean,
        required: true
      },
    },

  }
</script>

<style lang="scss" scoped>
  .course-card {
    display:flex;
    margin-bottom:20px;
    cursor: pointer;
    width:100%;

    &.un-clickable {
      cursor: not-allowed;
      opacity: 0.2;
    }

    .image {
      flex:1.2;
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

    .details {
      flex:2;
      padding:30px;
      align-self: center;

      .title {
        font-size: 1.5rem;
        margin-bottom:5px;
      }

      p {

      }
    }
  }
</style>
