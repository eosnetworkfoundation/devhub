<template>
  <section class="small-courses">
    <figure class="course-category">{{category}}</figure>
    <section class="courses" v-if="courses && courses.length">
      <section class="course" :key="course.slug_hash" v-for="course in courses">
        <NuxtLink :to="`/course/${course.slug}`">
          <section class="image" :style="{'background-image':`url(${$common.thumbnail(course)})`}">
            <!--          <figure class="tag">New</figure>-->
            <figure class="play"><SvgPlay /></figure>
          </section>
          <section class="info">
            <figure class="title">{{ course.title }}</figure>
            <p>{{ course.description }}</p>
          </section>
        </NuxtLink>

      </section>
    </section>
  </section>
</template>

<script>
  export default {
    name: 'SmallCourses',
    props: {
      category: {
        type: String,
        required:true
      },
      courses:{
        type: Array,
        required:true
      }
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  .small-courses {
    padding:100px 100px 0;

    @media only screen and (max-width : 960px) {
      padding:100px 20px 0;
    }

    .courses {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      margin-top:30px;
      column-gap: 30px;
      row-gap: 50px;

      @media only screen and (max-width : 960px) {
        display:block;
      }

      .course {
        text-transform: uppercase;
        cursor: pointer;
        border-radius:var(--radius);
        width:calc(25% - 23px);

        @media only screen and (max-width : 960px) {
          width:100%;
          margin-bottom:30px;
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
  }
</style>
