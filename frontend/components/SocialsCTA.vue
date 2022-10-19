<template>
  <section class="socials-cta">
    <h2>Join the community</h2>
    <p>We're more than just some numbers on a spread sheet.</p>
    <section class="buttons">
      <a href="https://discord.gg/XjVqej4uT5" target="_blank"><Button><SvgDiscord /> Discord</Button></a>
      <a href="https://twitter.com/EosNFoundation" target="_blank"><Button :secondary="true"><SvgTwitter /> Twitter</Button></a>
    </section>
  </section>
</template>

<style lang="scss" scoped>
  .socials-cta {
    max-width:60%;
    margin:0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align:center;
    padding:180px 30px 40px;

    p {
      margin:30px 0;
      max-width:800px;
    }

    .buttons {
      display:flex;
      gap:20px;

      button {
        svg {
          margin-right:10px;
        }
      }
    }

  }
</style>
