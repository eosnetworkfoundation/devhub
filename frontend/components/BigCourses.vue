<template>
  <section class="big-courses">
    <figure class="course-category">{{category}}</figure>
    <section class="courses" v-if="courses && courses.length">
      <section class="course" :key="course.slug_hash" v-for="course in courses.slice(0, 2)">
        <NuxtLink :to="`/course/${course.slug}`">
          <section class="image" :style="{'background-image':`url(${$common.thumbnail(course)})`}">
            <figure class="tag">New</figure>
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
    name: 'BigCourses',
    props: {
      category: {
        type: String,
        required:true,
        default: 'Unknown category'
      },
      courses:{
        type: Array
      },
    }
  }
</script>

<style lang="scss" scoped>
  .big-courses {
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
        flex:1;
        cursor: pointer;
        position: relative;
        width:calc(50% - 15px);

        @media only screen and (max-width : 960px) {
          width:100%;
          margin-bottom:30px;
        }

        .image {
          position:relative;
          aspect-ratio: 16 / 7;
          border-radius:var(--radius);
          overflow: hidden;
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
            font-size:2rem;
            font-family: "SuisseIntlBold", sans-serif;
          }

          .description {
            font-size: 0.95rem;
          }
        }
      }
    }
  }
</style>
