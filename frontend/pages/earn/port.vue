<template>
  <section class="earn-template">
    <GenericHeader
      title="Port an application"
      subtitle="Because proof pudding is tasty"
      text="Popular applications are popular for a reason. Users love them, and developers make bank on them. There's no reason to miss out on their potential."
    >
    </GenericHeader>

    <section class="full-width-image">
      <img :src="`https://picsum.photos/1980/300?rand=${Math.random() * 1000}`" />
    </section>

    <section class="top-pad horizontal-limiter">
      <h2>Which apps can I port?</h2>
      <br />
      <p>
        At the bottom of this page are a list of applications which we are funding to be ported. It's important that you only
        select apps from that list if you want to win the bounty. Each app is different and might require different skills. If you are
        serious about taking on one of the applications, you should read the app's description carefully and then make sure you have
        the skills required to port it.
        <br />
        <br />

        You will likely also benefit from creating a team to work with as these applications that you are porting are proven to be
        successful on other chains and will need a team to maintain.
      </p>
    </section>

    <section class="top-pad horizontal-limiter">
      <h2>What are the rules?</h2>
      <br />
      <p>
        There aren't many rules, but the ones there are <b>must</b> be followed. Since you only get paid for the <i>good</i> work you do, not following
        the directions will result in you losing the entire bounty.
      </p>
      <ul>
        <li>You may not steal assets (branding, images, etc)</li>
        <li>The application should be as close to the original as possible</li>
        <li>You can not port the same app multiple times</li>
        <li>You must port apps to the EOS Mainnet</li>
        <li>You can not do a token sale</li>
      </ul>
    </section>

    <section class="top-pad horizontal-limiter">
      <h2>How do I get paid?</h2>
      <br />
      <p>
        Once you have completed porting one of the requested applications, you can click the "Claim" button below to request a payout. You will
        be paired up with one of our advocates who will review the application with you. They will record the session and will forward that one to
        a committee of reviewers who will then grade the application. If you pass the threshold for approval, you will be paid in EOS.
      </p>
    </section>

    <section class="item-list horizontal-limiter">
      <figure class="course-category">Requested Applications</figure>
      <br />

      <section class="entry" v-for="i in [1,2,3]">
        <section class="info">
          <figure class="col">
<!--            <figure class="tag">SPONSORED</figure>-->
            Open source NFT marketplace
          </figure>
          <figure class="col"><b>$5000</b></figure>
          <Button>Claim</Button>
        </section>
      </section>
    </section>


  </section>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/earn.scss";
</style>
