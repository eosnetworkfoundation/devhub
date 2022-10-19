<template>
  <section class="earn-template">
    <GenericHeader
      title="Become an Advocate"
      subtitle="If you can learn, you can teach"
      text="Whether you can write tutorials, or are comfortable in front of a camera, you can become a teacher. You can help people learn new things, and you can also earn money by doing so."
    >
<!--      <br />-->
<!--      <br />-->
<!--      <Button>Apply</Button>-->
    </GenericHeader>

    <section class="full-width-image">
      <img :src="`https://picsum.photos/1980/300?rand=${Math.random() * 1000}`" />
    </section>

    <section class="top-pad horizontal-limiter">
      <h2>What can I do?</h2>
      <br />
      <p>
        Currently there are two main ways that you can earn via teaching on this platform.
      </p>
      <ul>
        <li>Craft course materials</li>
        <li>Record courses in various languages</li>
      </ul>
      <p>
        We have a selection of already existing course materials which need someone to create raw videos for them which we will edit into courses.
        We also have a list of topics which need turning into course materials, which others will then take and turn into videos.
      </p>
    </section>

    <section class="top-pad horizontal-limiter">
      <h2>How easy is it?</h2>
      <br />
      <p>Let's talk about each path individually, as they're both fairly simple but in different ways.</p>
      <br />
      <br />


      <h4>Create courses</h4>
      <br />
      <p>
        Course materials on the devhub have a simple and rigid format which is written in JSON.
        In general, the process goes as follows:
      </p>
      <ul>
        <li>Define the course subject</li>
        <li>Define the course episodes</li>
        <li>Define each episode's questions and answers</li>
        <li>Define any additional course materials like code snippets or graphics</li>
        <li>Submit the course materials</li>
        <li>If approved, <b>you get paid</b></li>
      </ul>
      <br />
      <Button>Submit a course</Button>
      <br />
      <br />


      <h4>Become an instructor</h4>
      <br />
      <p>
        Shooting videos isn't for everyone. You need to be able to record videos in high definition, and you need to be able to communicate with the audience clearly and effectively.
        However, if you have the capabilities and the ability to do so, you could get paid a premium to record instructional videos based on course materials either submitted by the
        foundation, or by course creators.
        <br />
        <br />
        Here's what you'll need:
      </p>
      <ul>
        <li>You must be able to record HD video in either 1080p or above</li>
        <li>You must be fluent in the subject matter</li>
        <li>You must be a native speaker of the requested language</li>
      </ul>
      <br />
      <Button :secondary="true">Watch Video</Button>
    </section>

    <section class="item-list horizontal-limiter">
      <figure class="course-category">Course bounties</figure>
      <br />

      <section class="entry" v-for="i in [1,2,3]">
        <section class="info">
          <figure class="col">
            <figure class="tag">SPONSORED</figure>
            Creating an NFT marketplace
          </figure>
          <figure class="col"><b>$5000</b></figure>
          <Button>Apply</Button>
        </section>
      </section>
    </section>


  </section>
</template>

<style lang="scss" scoped>
  @import "../../assets/css/earn.scss";
</style>
