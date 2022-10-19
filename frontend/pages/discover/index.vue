<template>
  <section class="discover">
    <GenericHeader
      title="Discover The Ecosystem"
      subtitle="EVERY UNIVERSE HAS BUILDING BLOCKS"
      text="<b>It's easier to build a puzzle if you know what pieces you have.</b> We've curated every piece of the ecosystem at your disposal. All you have to do is put the pieces together in a way that makes sense, for you."
    >

      <br />
      <br />
      <section class="switcher">
        <RouterLink :to="`?type=${panelType}`" :key="panelType" v-for="panelType in PANELS" :class="{'active':$route.query.type === panelType}">
          {{ panelType }}
        </RouterLink>
      </section>
    </GenericHeader>


    <section class="discover-items horizontal-limiter">
      <section class="category" :key="category" v-for="(items, category) in categories">
        <figure class="course-category">{{category}}</figure>
        <section class="items">
          <section class="item" :key="item.title" v-for="item in items">
            <figure class="title">{{ item.title }}</figure>
            <figure class="description">
              <p>{{ item.description }}</p>
            </figure>
          </section>
        </section>
      </section>

    </section>

  </section>
</template>

<script>
  const PANELS = {
    TOOLS:'tools',
    EVENTS:'events',
    EDUCATORS:'educators',
    TEMPLATES:'templates',
  }
  export default {
    data() {
      return {
        PANELS,
        categories:{
          'Wallets':[
            {title:'Anchor', description:'The leading EOSIO desktop wallet'},
            {title:'Wombat', description:'A chrome extension wallet for everyday use'},
          ],
          'SDKs':[
            {title:'eosjs', description:'The leading EOSIO desktop wallet'},
            {title:'greymass-eosio', description:'A chrome extension wallet for everyday use'},
            {title:'greymass-eosio', description:'A chrome extension wallet for everyday use'},
          ]
        },
      }
    },
  }
</script>

<style lang="scss" scoped>
  .discover {
    position: relative;


    .switcher {
      margin:0 auto;
      position:absolute;
      bottom:0;
      left:0;
      right:0;
      display:flex;
      justify-content:center;
      align-items:center;
      padding-bottom:5px;

      > a {
        font-family: "SuisseIntlLight", sans-serif;
        font-size: 1.5rem;
        margin:0 10px;
        padding:5px 20px 10px;
        cursor: pointer;
        box-shadow:0 0 rgba(0,0,0,0);
        text-transform: capitalize;

        transition: box-shadow 0.1s ease;

        &.active, &:hover {
          box-shadow:0 5px rgba(0,0,0,1);
        }
      }
    }

    .discover-items {
      display:flex;
      flex-direction: column;
      padding-top:50px;

      .category {
        margin-bottom:50px;

        .items {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          gap:20px;
          margin-top:10px;
          cursor: pointer;

          .item {
            position: relative;
            padding:30px;
            border-radius: var(--radius);
            box-shadow:0 0 0 1px rgba(0,0,0,0.1);
            width:calc(33.33333% - 20px);

            .title {
              font-size: 1.5rem;
            }

            .description {
              margin-top:15px;
            }

            &:hover {
              .title {
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
</style>
