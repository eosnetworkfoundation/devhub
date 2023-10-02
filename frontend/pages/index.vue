<template>
  <section>
    <LearnHeader v-on:start="watchFirstVideo" />
<!--    <SmallCourses v-if="continueWatching" category="Continue learning" :courses="continueWatching.slice(0, 4)" />-->
<!--    <SmallCourses v-if="courses && courses.popular" category="Popular courses" :courses="courses.popular.slice(0, 4)" />-->
<!--    <SocialsCTA />-->
<!--    <BigCourses v-if="courses && courses.essential" category="Essential courses" :courses="courses.essential.slice(0, 2)" />-->
    <SmallCourses v-if="courses && courses.length" category="Popular courses" :courses="courses.slice(0, 4)" />
    <SocialsCTA />
    <SmallCourses v-if="courses && courses.length > 4" category="Go deeper" :courses="courses.slice(4, courses.length)" />
    <DeveloperAlertsCTA />
  </section>
</template>

<script>
export default {
  data() {return {
    courses: {},
    continueWatching:[],
  }},
  head() {
    return this.$common.head();
  },
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
    let allCourses = await this.$api.getCourses();
    const _courses = allCourses.popular.concat(allCourses.essential).concat(allCourses.courses);
    this.courses = _courses.reduce((acc, course) => {
      if(acc.find(c => c.slug === course.slug)) return acc;
      acc.push(course);
      return acc;
    }, []).sort((a, b) => a.created_at - b.created_at);
  },
  methods:{
    watchFirstVideo(){
      // TODO: Fix continue watching
      this.$router.push(`course/${this.courses[0].slug}`);
    }
  }
}
</script>
