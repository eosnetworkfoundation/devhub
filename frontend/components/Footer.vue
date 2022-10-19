<template>
  <footer>
    <section>
      <section class="logo">
        <img src="@/assets/logo_white.png" alt="logo" />
      </section>

      <section class="middle">

      </section>

      <section class="right">
<!--        <NuxtLink class="link" to="/">T&C</NuxtLink>-->
<!--        <NuxtLink class="link" to="/">Privacy</NuxtLink>-->
      </section>
    </section>

    <section>
      @2022 - EOS Network Foundation
    </section>
  </footer>
</template>

<style lang="scss" scoped>
  footer {
    background:var(--color-primary);
    padding:50px;
    color:var(--color-primary-negative);
    margin-top:150px;

    > section {
      display:flex;
      align-items: center;
      justify-content: center;
    }

    .logo {
      img {
        height:120px;
      }
    }

    .middle {
      flex:1;
    }
    .right {
      display:flex;
      align-items: center;

      .link {
        margin-left:10px;
      }

    }
  }
</style>
