<template>
  <section>
    <LearnHeader v-on:start="watchFirstVideo" />
    <SmallCourses v-if="continueWatching" category="Continue learning" :courses="continueWatching.slice(0, 4)" />
    <SmallCourses v-if="courses && courses.popular" category="Popular courses" :courses="courses.popular.slice(0, 4)" />
    <SocialsCTA />
    <BigCourses v-if="courses && courses.essential" category="Essential courses" :courses="courses.essential.slice(0, 2)" />
    <DeveloperAlertsCTA />
    <SmallCourses v-if="leftOverCourses && leftOverCourses.length" category="Go deeper" :courses="leftOverCourses" />
  </section>
</template>

<script>
export default {
  data() {return {
    courses: {},
    continueWatching:[],
  }},
  computed:{
    leftOverCourses(){
      if(!this.courses || !this.courses.courses || !this.courses.courses.length){
        return [];
      }

      return this.courses.popular.slice(4, this.courses.popular.length)
        .concat(this.courses.essential.slice(2, this.courses.essential.length))
        .concat(this.courses.courses);
    }
  },
  async fetch() {
    this.courses = await this.$api.getCourses();
    this.continueWatching = await this.$api.getContinueWatching();
  },
  methods:{
    watchFirstVideo(){
      // TODO: Fix continue watching
      this.$router.push(`course/${this.courses.essential[0].slug}`);
    }
  }
}
</script>
