<template>
  <section class="course-status-header">
    <section class="inner-container" v-if="course && progress">
      <h1><b>Weeeee!</b></h1>
      <h3>You finished: <u>{{ course.title }}</u></h3>

      <RatingBar :percentage="parseFloat(progress.score)" />

      <p>
        You got <b>{{ percentage }}</b> of the test questions right {{ progress.score > 0.5 ? '🎉' : '😐' }}
      </p>

<!--      <h4>Next up: Getting started with smart contracts</h4>-->


      <section class="buttons">
        <!-- TODO: Add logic for next course -->
        <Button @click.native="$router.push('/')">Start next course</Button>

        <!-- TODO: Add popup for multi-network sharing -->
        <!-- Similar to this: https://dribbble.com/shots/17569361-Web-UI/attachments/12715900?mode=media -->
        <ShareNetwork network="twitter"
                      :url="shareUrl"
                      :title="`This '${course.title}' course wasn't easy, but I still got ${percentage} of the questions right!`"

        >
          <Button :secondary="true" @click.native="sharing = !sharing">Share</Button>
        </ShareNetwork>
      </section>
    </section>
  </section>
</template>

<script>
export default {
  name: 'CourseStatusHeader',
  data(){return {
    sharing:false,
  }},
  computed:{
    shareUrl(){
      if(!this.course) return null;
      if(location.hostname === 'localhost'){
        return `https://dev.eosnetwork.com/course/${this.course.slug}`;
      }

      return `${location.protocol}//${location.host}/course/${this.course.slug}`;
    },
    percentage(){
      if(!this.progress) return `0%`;
      return `${Math.round(this.progress.score * 100).toFixed(0)}%`;
    },
    course() {
      return this.$store.state.selectedCourse;
    },
    progress() {
      return this.$store.state.courseProgress;
    },
  }
}
</script>

<style lang="scss" scoped>
  .course-status-header {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding:120px 0;
    width:100%;
    position: relative;
    background:#fff;
    border-bottom:1px solid rgba(0,0,0,0.1);

    @media only screen and (max-width : 960px) {
      display: block;
    }

    min-height:50vh;

    .inner-container {
      max-width:900px;
      margin:0 auto;
      text-align: center;
      padding:0 30px;

      h3 {
        margin-top:10px;
      }

      .rating-bar {
        margin-top:50px;
      }

      p {
        max-width:600px;
        margin:10px auto 50px auto;
      }

      h4 {
        margin-bottom:20px;
      }

      .buttons {
        display:flex;
        gap:20px;
        align-items: center;
        justify-content: center;

        @media only screen and (max-width : 960px) {
          display: block;

          button {
            width:100%;
            margin-bottom:10px;
          }
        }
      }
    }




  }
</style>
