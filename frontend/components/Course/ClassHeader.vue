<template>
  <section class="course-class-header">
    <section class="inner-container" v-if="selectedCourse">
      <h1><b>{{ selectedCourse.title }}</b></h1>
      <h3>Instructor: {{ selectedCourse.instructor }}</h3>

      <p>{{ selectedCourse.description }}</p>

      <section class="buttons">
        <Button @click.native="goToFirstEpisode">Start Class</Button>
        <Button v-if="selectedCourse.resources_url" :secondary="true" @click.native="downloadResources">Download Resources</Button>
      </section>
    </section>
  </section>
</template>

<script>
export default {
  name: 'CourseClassHeader',
  computed: {
    selectedCourse() {
      return this.$store.state.selectedCourse;
    },
  },
  methods:{
    downloadResources(){
      // TODO:
      alert('TODO');
    },
    goToFirstEpisode(){
      this.$emit('start');
    },
  }
}
</script>

<style lang="scss" scoped>
  .course-class-header {
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
        margin: 50px auto;
        max-width:700px;
      }

      .buttons {
        display:flex;
        gap:20px;
        align-items: center;
        justify-content: center;
      }
    }




  }
</style>
