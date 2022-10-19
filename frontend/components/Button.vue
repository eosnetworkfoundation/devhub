<template>
  <button :class="{'secondary':!!secondary}">
    <SvgSpinner v-if="busy" />
    <slot v-else />
  </button>
</template>

<script>
  export default {
    name: 'Button',
    props: {
      secondary: {
        type: Boolean,
        default: false
      },
      busy: {
        type: Boolean,
        default: false
      },
    }
  }
</script>

<style lang="scss" scoped>

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    height:74px;
    border:0;
    padding:0 60px;
    border-radius:var(--radius);
    background:var(--color-primary);
    color:var(--color-primary-negative);
    fill:var(--color-primary-negative);
    stroke:var(--color-primary-negative);
    text-transform: uppercase;
    cursor: pointer;
    font-size: 1rem;

    transition: transform 0.1s ease;

    &.secondary {
      box-shadow:inset 0 0 0 3px var(--color-secondary);
      background:transparent;
      color:var(--color-secondary);
      fill:var(--color-secondary);
      stroke:var(--color-secondary);
    }

    &:hover {
      transform:translateY(-1px);
    }

    &:active {
      transform:translateY(1px);
    }
  }
</style>
