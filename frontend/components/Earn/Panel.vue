<template>
  <section class="panel">
    <figure class="image" :style="{'background-image':`url(${requiredImage})`}"></figure>
    <section class="info">
      <figure class="title">{{ title }}</figure>
      <figure class="description"><p>{{ description }}</p></figure>

      <RouterLink v-if="!isExternalLink" :to="route">
        <Button>{{ buttonText }}</Button>
      </RouterLink>
      <a :href="route" target="_blank" v-else>
        <Button>{{ buttonText }}</Button>
      </a>
    </section>
  </section>
</template>

<script>
export default {
  name: 'Panel',
  props: {
    image: {
      type: String,
    },
    title: {
      type: String,
      default: 'Start Earning'
    },
    description: {
      type: String,
      default: 'YOU HAVE THE SKILLS, NOW USE THEM'
    },
    buttonText: {
      type: String,
      default: 'Start Earning'
    },
    route: {
      type: String,
      default: '/earn'
    }
  },
  computed: {
    isExternalLink() {
      return this.route.indexOf('http') > -1;
    },
    requiredImage() {
      return this.image && this.image.length
        ? this.image.indexOf('http') === 0
          ? this.image
          : require(`~/assets/images/${this.image}`)
        : `https://picsum.photos/800/600?rand=${Math.random() * 1000}`;
    }
  }
}
</script>

<style lang="scss" scoped>
.panel {
  display:flex;
  margin-bottom:150px;

  @media only screen and (max-width : 960px) {
    display: block;
  }


  .image {
    flex:1;
    border-radius: var(--radius);
    background-size: cover;
    background-position: center;

    aspect-ratio: 4 / 2.2;
    position: relative;
  }

  .info {
    display:flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 0 0 50px;
    flex:1;

    @media only screen and (max-width : 960px) {
      width:100%;
      padding:0;
      margin-top:20px;
    }

    .title {
      font-size: 1.8rem;
      font-family: "SuisseIntlBold", sans-serif;
    }

    .description {
      padding:10px 0 30px;
    }

    button {
      display:block;
      flex:0 0 auto;
    }
  }

  &:nth-child(even){
    flex-direction:row-reverse;

    .info {
      padding: 0 50px 0 0;
    }
  }
}
</style>
