<template>
  <section class="socials-cta">
    <h2>Start Networking</h2>
    <p>
      Need help or want to help? Maybe you just want to chat with some like-minded developers. Most journeys are less fun alone, join the community.
    </p>
    <section class="socials">
      <a href="https://github.com/eosnetworkfoundation" target="_blank" rel="noopener noreferrer">
        <img class="icons" src="@/assets/images/github-icon.svg" alt="GitHub" />
      </a>
      <a href="https://discord.gg/XjVqej4uT5" target="_blank" rel="noopener noreferrer">
        <img class="icons" src="@/assets/images/discord-icon.svg" alt="Discord" />
      </a>
      <a href="https://t.me/antelopedevs" target="_blank" rel="noopener noreferrer">
        <img class="icons" src="@/assets/images/telegram-icon.svg" alt="Discord" />
      </a>
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

    @media only screen and (max-width : 960px) {
      max-width:100%;
      display:block;
    }

    p {
      margin:30px 0;
      max-width:800px;
    }

    .socials {
      display:flex;
      justify-content: center;
      align-items: center;
      gap: 30px;
      margin-top: 30px;

      .icons {
        filter: invert(1);
        width: 70px;
      }
    }

    .buttons {
      display:flex;
      gap:20px;

      button {
        svg {
          margin-right:10px;
        }
      }

      @media only screen and (max-width : 960px) {
        display:block;

        button {
          width:100%;
          margin:0 0 10px;
        }
      }
    }

  }
</style>
