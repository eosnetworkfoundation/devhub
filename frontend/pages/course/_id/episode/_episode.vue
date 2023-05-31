<template>
  <section class="course-episode">
    <section v-if="episode && localCourseProgress">
      <section class="header">
        <section class="video">
          <iframe :src="episode.video_url" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </section>
      </section>

      <section class="test horizontal-limiter" v-if="!user">
        <h2>You must log in to continue</h2>
        <p>To take the test and progress to the next video you will need to log in</p>
      </section>

      <section class="test horizontal-limiter" v-else>
        <h3 @click="goToCourse">Course: {{ course.title }}</h3>
        <h2>{{ episode.title }}</h2>
        <p>{{ episode.description }}</p>

        <hr />

        <section class="question" :key="question.id" v-for="question in episode.questions">
          <h4>{{ question.text }}</h4>

          <section class="answer" :class="{'selected':localCourseProgress.answers[question.id] === key}"
                   @click="selectAnswer(question.id, key)"
                   :key="answer" v-for="(answer, key) in question.possible_answers">
            <figure class="circle"></figure>
            <figure class="text">{{ answer }}</figure>
          </section>
        </section>

        <hr />

        <h4>Make sure to watch the video first before you answer!</h4>
        <p style="margin-top:-15px; margin-bottom:20px;">Anyone who sees your profile will be able to see your score for this course, so take the time to understand the content.</p>
        <p v-if="error" class="error"><b>{{ error }}</b> <br /><br /></p>
        <Button :busy="busy" @click.native="submitCourseProgress">Continue</Button>

      </section>
    </section>
  </section>
</template>

<script>
export default {
  name: 'CourseEpisode',
  computed: {
    episode() {
      return this.$store.state.selectedEpisode;
    },
    course() {
      return this.$store.state.selectedCourse;
    },
    user() {
      return this.$store.state.user;
    },
  },
  head() {
    if(!this.episode) return;

    return {
      title: `EOS Learn - ${this.episode.title}`,
      meta: [
        { hid: 'description', name: 'description', content: this.episode.description },
        { hid: 'og:title', property: 'og:title', content: this.episode.title },
        { hid: 'og:description', property: 'og:description', content: this.episode.description },
        { hid: 'og:image', property: 'og:image', content: this.$common.episodeThumbnail(this.episode) },
        { hid: 'twitter:title', name: 'twitter:title', content: this.episode.title },
        { hid: 'twitter:description', name: 'twitter:description', content: this.episode.description },
        { hid: 'twitter:image', name: 'twitter:image', content: this.$common.episodeThumbnail(this.episode) },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' }
      ],
    };
  },
  data(){return {
    localCourseProgress: null,
    error:null,
    busy:false,
  }},
  mounted() {
    this.localCourseProgress = {
      course_slug_hash: this.course.slug_hash,
      answers: {},
    }
  },
  updated() {
    if(!this.localCourseProgress) this.localCourseProgress = {
      course_slug_hash: this.course.slug_hash,
      answers: {},
    }
  },
  methods: {
    selectAnswer(question_id, key) {
      this.localCourseProgress.answers[question_id] = key;
      this.$forceUpdate();
    },
    async submitCourseProgress(){
      if(this.busy) return;

      this.busy = true;
      this.error = null;

      if(Object.keys(this.localCourseProgress.answers).length !== this.episode.questions.length){
        this.error = "You have not answered all the questions!";
        this.busy = false;
        return;
      }

      this.$api.submitAnswers(this.localCourseProgress).then(() => {

        const currentEpisodeIndex = this.course.episodes.findIndex(x => x.id === this.episode.id);
        if(currentEpisodeIndex === this.course.episodes.length - 1){
          this.$api.finishedCourse(this.course.slug_hash).then(finalProgress => {
            this.$router.push(`/course/status/${this.course.slug}`);
          }).catch(err => {
            this.error = err;
            console.error(err);
          });
        } else {
          this.$store.dispatch('setSelectedEpisode', this.course.episodes[currentEpisodeIndex+1]);
          this.$router.push(`/course/${this.course.slug}/episode/${this.course.episodes[currentEpisodeIndex+1].id}`);
          window.scrollTo(0,0);

          this.localCourseProgress = {
            course_slug_hash: this.course.slug_hash,
            answers: {},
          }
        }
      }).catch(err => {
        this.error = err;
        console.error(err);
      });

      this.busy = false;
    },
    goToCourse(){
      this.$router.push(`/course/${this.course.slug}`);
    }
  },
  watch:{
    $route: function(to, from) {
      if(this.$route.params.episode){
        if(this.episode.id !== this.$route.params.episode){
          this.$store.dispatch('setSelectedEpisode', this.course.episodes.find(x => x.id === this.$route.params.episode));
          this.$forceUpdate();
        }
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  .course-episode {

    .header {
      background:#fff;
      border-bottom:1px solid rgba(0,0,0,0.1);
      align-self: stretch;
      position: relative;

      .video {
        aspect-ratio: 16 / 9;
        align-self: stretch;
        max-height:720px;
        margin:0 auto;

        iframe, video {
          width: 100%;
          height: 100%;
          border: 0;
        }
      }

    }

    .test {
      padding-top:100px;

      h3 {
        margin-bottom:20px;
        cursor: pointer;
      }

      h2 {
        margin-bottom:30px;
      }

      h4 {
        margin-bottom:20px;
      }

      .question {
        margin-bottom:70px;

        .answer {
          display: flex;
          align-items: center;
          margin-top:15px;
          cursor: pointer;

          .circle {
            flex:0 0 auto;
            width:30px;
            height:30px;
            border-radius:50%;
            box-shadow: inset 0 0 0 1px rgba(0,0,0,0.1);
            margin-right:15px;
            background: transparent;

            transition: box-shadow 0.2s ease;
          }

          .text {
            font-size: 1rem;
            font-family: "SuisseIntlLight", sans-serif;
          }

          &:hover, &.selected {
            .circle {
              box-shadow: inset 0 0 0 40px var(--color-primary);
            }
          }
        }
      }

    }
  }
</style>

