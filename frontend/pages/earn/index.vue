<template>
  <section class="earn">
    <GenericHeader
        title="Start Earning"
        subtitle="YOU HAVE THE SKILLS, NOW USE THEM"
        text="It takes a <b>digital village</b> to raise a network. So with the help of people all around the world, we're building one. A place where you can unleash your unhindered creativity, no matter where it takes you."
    />

    <div style="padding-top:100px;"></div>

    <section class="panels horizontal-limiter">
      <EarnPanel :key="i" v-for="(panel, i) in panels.slice(0, 2)" :image="panel.image"
        :title="panel.title" :description="panel.description" :button-text="panel.buttonText" :route="panel.route" />
    </section>

<!--    <EarnEarners />-->


    <section class="panels horizontal-limiter">
      <EarnPanel :key="i" v-for="(panel, i) in panels.slice(2)" :image="panel.image"
                 :title="panel.title" :description="panel.description" :button-text="panel.buttonText" :route="panel.route" />
    </section>

  </section>
</template>

<script>
export default {
  name: 'Earn',
  data(){return {
    panels:[
      // {
      //   title:'Become an Advocate',
      //   description:"Advocates are the bread and butter of a network. You'll be participating in conferences, meetups, hackathons, online panels and discussions and meeting interesting new people.",
      //   buttonText:'Apply',
      //   route:'/earn/advocate',
      //   image:null,
      // },
      // {
      //   title:'Become a Teacher',
      //   description:"It's hard to learn without teachers. Without tutorials, courses, videos and other educational materials it's hard for any newcomer to embrace a new technology. You can help.",
      //   buttonText:'Find out how',
      //   route:'/earn/teach',
      //   image:`teach_splash.jpg`,
      // },
      // {
      //   title:'Port an application',
      //   description:"Creating new things is important, but making sure that we also have the things which are proven to be loved by users on other networks is just as necessary to grow the ecosystem.",
      //   buttonText:'See the apps',
      //   route:'/earn/port',
      //   image:`port_splash.jpg`,
      // },
      // {
      //   title:'Build Open-Source Tools',
      //   description:"Tools such as frameworks, SDKs, and protocols are the bones of a network. There's always something missing, and in order to move past the gaps we must fill them.",
      //   buttonText:"See what's needed",
      //   route:'/earn/teach',
      //   image:null,
      // },
      {
        title:'Get community funding',
        description:"We have easy to use tools that you can take advantage of for community sourcing funds. As long as your projects meets the criteria, you can take part in a pool matching funding process.",
        buttonText:"Go to Pomelo",
        route:'https://pomelo.io',
        image:`community_funding_splash.jpg`,
      },
      {
        title:'Apply for a Grant',
        description:"If you are creating public good for the network then you may quality for a streamlined grant. This could mean big bucks for your project.",
        buttonText:"Grant Framework",
        route:'https://github.com/eosnetworkfoundation/grant-framework/',
        image:`grant_splash.jpg`,
      },
      {
        title:'Help grow the community',
        description:"Earn money by helping to expand the EOS community!",
        buttonText:"Find out more",
        route:'https://eosnetwork.com/blog/the-road-to-10k-growing-the-eos-discord-community/',
        image:`https://eosnetwork.com/wp-content/uploads/2022/08/Road_To_10k-1024x576.png`,
      },
      // {
      //   title:'Compete for prizes',
      //   description:"Take part in online hackathons where you can with $125k in prizes",
      //   buttonText:"Find out more",
      //   route:'https://eosnetwork.com/blog/evmxideathon-dream-it-build-it/',
      //   image:`https://eosnetwork.com/wp-content/uploads/2022/08/hackathon-1024x576.png`,
      // }
    ].sort( () => .5 - Math.random() )
  }}
}
</script>

<style lang="scss" scoped>
  .earn {

    .panels {


    }


  }

</style>
