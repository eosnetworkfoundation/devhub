<template>
  <section class="user-profile horizontal-limiter">

    <section class="sidebar" v-if="profile">
      <figure class="avatar">
        <img :src="profile.graphics.avatar" referrerpolicy="no-referrer" />
      </figure>
      <figure class="name">{{ profile.name }}</figure>
      <section class="info">
<!--        <figure>Rank: <b>Expert</b></figure>-->
        <figure v-for="account in profile.linked_accounts">
          {{account.network}}: <b>{{account.account}}</b>
        </figure>
      </section>
      <hr />
<!--      <section class="trophies">-->
<!--        <figure class="course-category">Trophies</figure>-->
<!--      </section>-->
    </section>

    <section class="content">
      <section v-if="unfinishedCourses.length">
        <figure class="course-category">Keep learning</figure>
        <section class="courses">
          <NuxtLink :to="`/course/${progress.course.slug}`" :key="progress.course.course_slug_hash" v-for="progress in unfinishedCourses">
            <CourseBlank :withPercentage="true"
                         :title="progress.course.title"
                         :description="progress.course.description" />
          </NuxtLink>
        </section>
      </section>

      <section v-if="finishedCourses.length">
        <figure class="course-category">Completed courses</figure>
        <section class="courses">
          <NuxtLink :to="`/course/${progress.course.slug}`" :key="progress.course.course_slug_hash" v-for="progress in finishedCourses">
            <CourseBlank :withPercentage="true"
                         :percentage="progress.score"
                         :title="progress.course.title"
                         :description="progress.course.description" />
          </NuxtLink>
        </section>
      </section>

      <section v-if="!finishedCourses.length && !unfinishedCourses.length">
        <figure class="course-category">No courses yet</figure>
        <p>Head over to the learn section and start taking courses!</p>
      </section>


    </section>

  </section>
</template>

<script>
export default {
  name: 'UserProfile',
  data(){return {
    profile: null,
    progresses:[]
  }},
  head() {
    return this.$common.head();
  },
  methods:{
    goToCourse(course){
      this.$router.push(`/course/${course.slug}`)
    }
  },
  computed:{
    unfinishedCourses(){
      return this.progresses.filter(x => !x.finished);
    },
    finishedCourses(){
      return this.progresses.filter(x => x.finished);

    }
  },
  async fetch() {
    this.profile = await this.$api.getProfile(this.$route.params.id);
    if(!this.profile) return this.$router.push('/');

    this.progresses = await this.$api.getAllUserCourseProgresses(this.$route.params.id);
  },

}
</script>

<style lang="scss" scoped>
  .user-profile {
    padding:100px 0;
    display:flex;
    flex-direction:row;


    @media only screen and (max-width : 960px) {
      padding:50px 0;
      display: block;
    }

    .sidebar {


      @media only screen and (max-width : 960px) {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }

      .avatar {
        width:280px;
        height:280px;
        background:#222;
        border-radius:50%;
        margin-bottom:30px;
        background-size: cover;
        overflow: hidden;

        @media only screen and (max-width : 960px) {
          width:180px;
          height:180px;
        }

        img {
          width:100%;
          height:100%;
          object-fit: cover;
        }
      }

      .name {
        font-size: 1.3rem;
        font-family: "SuisseIntlBold", sans-serif;
      }

      .info {

        figure {
          margin-top:10px;
          font-size: 1rem;
        }
      }

    }

    .content {
      padding-left:60px;
      @media only screen and (max-width : 960px) {
        padding-left:0;
      }

      .courses {
        display:flex;
        flex-wrap:wrap;
        margin-top:20px;
        margin-bottom:80px;
        gap:20px;

        @media only screen and (max-width : 960px) {
          display: block;
          margin-bottom:20px;
        }
      }
    }
  }
</style>
