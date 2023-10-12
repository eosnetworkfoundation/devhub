<template>
  <section class="dev-alerts-cta">
    <h2>Boost Your App! 🚀</h2>
    <p>
      Submit your app to our ecosystem page and reach a wider audience, gain exposure, and attract new users to your already built application.
    </p>
    <a href="https://eosnetwork.com/#ecosystem-intake" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
      <Button type="button">
        <Translate>INTAKE FORM</Translate>
      </Button>
    </a>
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
