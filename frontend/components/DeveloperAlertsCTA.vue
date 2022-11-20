<template>
  <section class="dev-alerts-cta">
    <h2>Sign up for developer alerts</h2>
    <p><b>Don't be caught with your pants down</b>. Breaking changes will happen. If you want to stay on top of things when they do make sure to sign up for developer alerts emails.</p>
    <form class="email-form" ref="form" action="https://eosnetwork.us8.list-manage.com/subscribe/post" method="POST">
      <input type="hidden" name="u" value="d65a053d24b3cc087dfb925bb">
      <input type="hidden" name="id" value="be3f545626">
      <input type="hidden" name="orig-lang" value="1">
      <section class="input">
        <figure class="icon">
          <SvgEmail />
        </figure>
        <input type="email" placeholder="Enter your email" autocapitalize="off" autocorrect="off" name="MERGE0" id="MERGE0" size="25" value="">
      </section>
      <Button @click.native="submitForm">Alert me</Button>
    </form>
  </section>
</template>

<script>
export default {
  methods:{
    submitForm(){
      this.$refs.form.submit();
    }
  }
}
</script>

<style lang="scss" scoped>
  .dev-alerts-cta {
    max-width:60%;
    margin:0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align:center;
    padding:180px 30px 40px;

    @media only screen and (max-width : 960px) {
      max-width:100%;
      display:block;
      padding:180px 20px 40px;
    }

    p {
      margin:30px 0;
      max-width:800px;
    }

    .email-form {
      display: flex;
      justify-content: center;
      align-items: center;

      @media only screen and (max-width : 960px) {
        display:block;
      }

      .input {
        height:74px;
        display:flex;
        background:rgba(0,0,0,0.02);
        border-top-left-radius:var(--radius);
        border-bottom-left-radius:var(--radius);
        padding:0 30px;
        min-width: 300px;

        @media only screen and (max-width : 960px) {
          width:100%;
          min-width: 0;
        }

        .icon {
          width:30px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right:15px;

          svg {
            fill:rgba(0,0,0,0.2);
          }
        }

        input {
          background:transparent;
          border:0;
          outline:0;
        }
      }
      button {
        flex:0 0 auto;

        @media only screen and (max-width : 960px) {
          width:100%;
          margin-top:10px;
        }
      }
    }
  }
</style>
