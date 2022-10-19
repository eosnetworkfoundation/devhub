<template>
  <section class="earners">
    <section class="slider horizontal-limiter">

      <section class="slide">
        <figure class="image"></figure>
        <section class="info">
          <section class="navigation">
            <figure class="arrow">‹</figure>
            <figure class="arrow">›</figure>
          </section>

          <section class="title">John Doe</section>
          <section class="description">
            <p>
              Being able to earn stable income from blockchain without having to join a company is awesome!
            </p>
          </section>
          <section class="bottom">
            <section class="earnings">
              <figure class="value">$87,000</figure>
              <figure class="text">Total earnings</figure>
            </section>
            <Button>Visit Profile</Button>
          </section>
        </section>
      </section>

      <section class="progress-bar">
        <section class="text">01</section>
        <section class="bars">
          <figure class="bar active"></figure>
          <figure class="bar"></figure>
          <figure class="bar"></figure>
          <figure class="bar"></figure>
          <figure class="bar"></figure>
        </section>
        <section class="text">05</section>
      </section>

    </section>
  </section>
</template>

<style lang="scss" scoped>
  .earners {
    background:rgba(0,0,255,0.02);
    padding:60px 0;
    margin-bottom:100px;

    .slider {

      .slide {
        display:flex;

        .image {
          height:320px;
          aspect-ratio: 1 / 1;
          background:red;
          border-radius:var(--radius);
          overflow: hidden;
          background-size: cover;
          flex:0 0 auto;
        }

        .info {
          position: relative;
          padding:40px 20px 40px 50px;
          display:flex;
          flex-direction: column;
          width:100%;

          .navigation {
            position: absolute;
            right:20px;
            top:0;
            display:flex;
            gap: 10px;

            .arrow {
              width:40px;
              height:40px;
              border-radius:50%;
              background:var(--color-primary);
              color:var(--color-primary-negative);
              cursor:pointer;
              display:flex;
              align-items: center;
              justify-content: center;
              font-size: 20px;
              opacity:0.2;

              transition: opacity 0.1s ease;

              &:hover {
                opacity:1;
              }
            }
          }

          .title {
            font-size: 1.8rem;
            font-family: "SuisseIntlBold", sans-serif;
          }

          .description {
            flex:1;
            max-width:500px;
          }

          .bottom {
            display:flex;

            .earnings {
              flex:1;

              .value {
                font-size: 2.5rem;
                font-family: "SuisseIntlBold", sans-serif;
                color:var(--color-secondary);

              }

              .text {
                font-size: 0.8rem;
                font-family: "SuisseIntlBold", sans-serif;
                text-transform: uppercase;
              }
            }

            button {
              flex:0 0 auto;
            }
          }
        }


      }

      .progress-bar {
        display:flex;
        margin-top:30px;
        align-items: center;

        .text {
          font-size: 1.5rem;
        }

        .bars {
          padding:0 30px;
          flex:1;
          display:flex;
          gap:20px;

          .bar {
            flex:1;

            padding:20px 0;
            position: relative;
            cursor: pointer;

            display:flex;
            align-items: center;
            justify-content: center;

            &:after {
              content:'';
              height:2px;
              width:100%;
              background:rgba(0,0,0,0.2);
              border-radius:var(--radius);
            }

            &.active, &:hover {
              &:after {
                background:var(--color-primary);
              }

            }
          }
        }
      }
    }
  }
</style>
