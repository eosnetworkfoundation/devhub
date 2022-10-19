<template>
  <section class="course-status">
    <CourseStatusHeader />

    <section class="info horizontal-limiter" v-if="formattedBadAnswers.length">
      <h2>You had wrong answers!</h2>
      <p>
        Some of the answers you gave for episode tests were wrong. Check out which ones so that you can correct
        your understanding of the material and better grasp the course you just finished.
      </p>


      <section class="wrong-answer" :key="badAnswer.id" v-for="badAnswer in formattedBadAnswers">
        <h5>{{ badAnswer.question }}</h5>
        <p class="small">
          You chose <b class="incorrect">"{{ badAnswer.given_answer }}"</b> but the correct answer was <b class="correct">"{{ badAnswer.correct_answer }}"</b>
        </p>
      </section>


    </section>

    <section class="info horizontal-limiter" v-else>
      <h2>You had no bad answers!</h2>
      <p>
        You got every answer in this course correct. Way to go!
      </p>
    </section>




  </section>
</template>

<script>
export default {
  name: 'CourseStatus',
  computed: {
    course() {
      return this.$store.state.selectedCourse;
    },
    progress() {
      return this.$store.state.courseProgress;
    },
    formattedBadAnswers() {
      return this.badAnswers.map(({ question, correct_answer, given_answer }) => {
        const rawQuestion = this.course.episodes.find(episode => episode.questions.find(x => x.id == question)).questions.find(q => q.id == question);

        return {
          id: question,
          question: rawQuestion.text,
          correct_answer: rawQuestion.possible_answers[correct_answer],
          given_answer: rawQuestion.possible_answers[given_answer],
        }
      });
    },
  },
  data(){return {
    badAnswers:[],
  }},
  mounted() {
    if(!this.$auth.loggedIn) this.$router.push('/');
    this.setCourse();
  },
  methods:{
    async setCourse(){

      if(this.course && this.course.slug === this.$route.params.id) return Promise.all([
        this.getProgress(),
        this.getBadAnswers()
      ])

      const course = await this.$api.getCourse(this.$route.params.id).catch(err => {
        console.error(err);
        return null;
      });

      if(course){
        await this.$store.dispatch('setSelectedCourse', course);
        await Promise.all([
          this.getProgress(),
          this.getBadAnswers()
        ])
      } else {
        console.error('no course found');
        await this.$router.push('/');
      }
    },
    async getProgress(){
      const progress = await this.$api.getProgress(this.course.slug_hash).catch(err => {
        console.error(err);
        return null;
      });
      if(progress){
        await this.$store.dispatch('setCourseProgress', progress);
      } else {
        console.error('error getting progress');
        await this.$router.push(`course/${this.selectedCourse.slug}`);
      }
    },
    async getBadAnswers(){
      this.badAnswers = await this.$api.getBadAnswers(this.course.slug_hash).catch(err => {
        console.error(err);
        return [];
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.course-status {

  .info {
    padding:100px 30px;

    h2 {
      margin-bottom:20px;
    }

    .wrong-answer {
      margin-top:30px;
      padding:40px;
      box-shadow:0 0 0 1px rgba(0,0,0,0.1);
      border-radius:var(--radius);
      background:var(--color-primary-negative);

      p {
        margin-top:20px;
      }

      .incorrect {
        color:red;
      }
      .correct {
        color:blue;
      }
    }
  }

}
</style>

