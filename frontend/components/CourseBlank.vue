<template>
  <section class="course-blank">
    <figure class="title">{{ title }}</figure>
    <figure class="description"><p>{{ description }}</p></figure>

    <RatingBar v-if="withPercentage" :percentage="percentage" />
  </section>
</template>

<script>
export default {
  name: 'CourseBlank',
  props: {
    title: {
      type: String,
      default: 'Course Blank'
    },
    description: {
      type: String,
      default: 'This is a blank course'
    },
    withPercentage: {
      type: Boolean,
      default: false
    },
    percentage: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
  .course-blank {
    flex:1;
    position: relative;
    padding:30px;
    border-radius: var(--radius);
    box-shadow:0 0 0 1px rgba(0,0,0,0.1);
    width:calc(33.33333% - 20px);

    display:flex;
    flex-direction: column;

    .title {
      font-size: 1.3rem;
    }

    .description {
      flex:1;
      margin-top:15px;
    }

    .rating-bar {

    }

  }
</style>
