<template>
  <section class="admin-panel horizontal-limiter">

    <section class="panel">

      <h4>Create course</h4>
      <br />
      <textarea v-model="courseJson"></textarea>
      <br />
      <Button @click.native="submitCourse">Submit</Button>

    </section>

    <section class="panel">

      <h4>Create bounty</h4>
      <br />
      <textarea v-model="bountyJson"></textarea>
      <br />
      <Button @click.native="submitBounty">Submit</Button>

    </section>

  </section>
</template>

<script>
export default {
  name: 'Admin Panel',
  data(){return {
    courseJson:'',
    bountyJson:'',
  }},
  async mounted() {

  },
  methods:{
    async submitCourse(){
      try {
        const course = JSON.parse(this.courseJson)
        this.$api.POST('course', course);
      } catch(e) {
        console.error(e);
      }
    },
    async submitBounty(){
      try {
        const bounty = JSON.parse(this.bountyJson)
        this.$api.POST('bounty', bounty);
      } catch(e) {
        console.error(e);
      }
    },
  }

}
</script>

<style lang="scss" scoped>
  .admin-panel {
    padding:100px 0;
    display:flex;
    flex-direction:row;

    .panel {
      width:50%;
      padding:20px;
      background-color:#fff;
      border-radius:5px;
      box-shadow:0 0 5px #ccc;
      margin-right:10px;

      textarea {
        width:100%;
        resize: vertical;
        min-height:100px;
        padding:10px;
      }
    }
  }
</style>
