<template>
  <section>
    <section class="course-overview" v-if="!!selectedCourse">
      <NuxtChild v-if="!!$route.params.episode" />
      <section v-else>
        <CourseClassHeader @start="() => setSelectedEpisode(selectedCourse.episodes[nextVideo])" />

        <section class="syllabus horizontal-limiter">
          <figure class="course-category">Course syllabus</figure>

          <CourseCard @click.native="setSelectedEpisode(episode)"
                      :course="selectedCourse" :episode="episode"
                      :key="episode.id" :clickable="index <= nextVideo" v-for="(episode, index) in selectedCourse.episodes" />
        </section>
      </section>

    </section>
  </section>
</template>

<script>

export default {
  name: 'CourseOverview',
  props: {
    injectedCourse: {
      type: Object,
    },
  },
  computed: {
    selectedCourse() {
      return this.$store.state.selectedCourse;
    },
    courseProgress() {
      return this.$store.state.courseProgress;
    },
    nextVideo(){
      if(!this.courseProgress) return 0;
      const answered = Object.keys(this.courseProgress.answers).length;
      if(answered === 0) return 0;

      let questions = 0;
      for(let i = 0; i < this.selectedCourse.episodes.length; i++){
        const episode = this.selectedCourse.episodes[i];
        questions += episode.questions.length;
        if(answered <= questions) return i+1;
      }
    }
  },
  async fetch() {
    if(this.injectedCourse){
      await this.$store.dispatch('setSelectedCourse', this.injectedCourse);
    } else {
      const course = await this.$api.getCourse(this.$route.params.id);
      if(course){
        await this.$store.dispatch('setSelectedCourse', course);
      } else {
        console.error('no course found');
        await this.$router.push('/');
      }
    }

    if(this.$route.params.episode){
      const episode = this.selectedCourse.episodes.find(x => x.id === this.$route.params.episode);
      if(episode){
        await this.$store.dispatch('setSelectedEpisode', episode);
      } else {
        console.error('no episode found');
        await this.$router.push(`course/${this.selectedCourse.slug}`);
      }
    }

    if(this.$auth.loggedIn) {
      const progress = await this.$api.getProgress(this.selectedCourse.slug_hash).catch(err => {
        console.error("Error fetching progress", err);
        return null;
      });
      await this.$store.dispatch('setCourseProgress', progress);
    }
  },
  head() {
    if(!this.selectedCourse) return;

    return {
      title: `EOS Learn - ${this.selectedCourse.title}`,
      meta: [
        { hid: 'description', name: 'description', content: this.selectedCourse.description },
        { hid: 'og:title', property: 'og:title', content: this.selectedCourse.title },
        { hid: 'og:description', property: 'og:description', content: this.selectedCourse.description },
        { hid: 'og:image', property: 'og:image', content: this.$common.thumbnail(this.selectedCourse) },
        { hid: 'twitter:title', name: 'twitter:title', content: this.selectedCourse.title },
        { hid: 'twitter:description', name: 'twitter:description', content: this.selectedCourse.description },
        { hid: 'twitter:image', name: 'twitter:image', content: this.$common.thumbnail(this.selectedCourse) },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' }
      ],
    };
  },
  methods: {
    async setSelectedEpisode(episode) {
      let index = this.selectedCourse.episodes.findIndex(x => x.id === episode.id);
      if(index > this.nextVideo) return;
      if(!index) index = 0;

      await this.$store.dispatch('setSelectedEpisode', episode);
      this.$forceUpdate();
      await this.$router.push(`/course/${this.selectedCourse.slug}/episode/${episode.id}`);
      window.scrollTo(0,0);
    },
  },
}
</script>

<style lang="scss" scoped>
  .course-overview {

    .syllabus {
      padding-top:100px;
      position: relative;


      .course-category {
        margin-bottom:20px;
      }
    }

  }
</style>

