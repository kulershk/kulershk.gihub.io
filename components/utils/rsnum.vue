<template>
  <div class="rsnum">
    <template v-for="(entry) in this.number.toString().split('')">
      <rsdigit v-bind:digit="entry" />
    </template>
  </div>
</template>

<script>


import Rsdigit from "@/components/utils/rsdigit";
export default {
  name: 'rsnum',
  components: {Rsdigit},
  props: [ 'number']
}
</script>

<style scoped>
  .rsnum {
    position: relative;
    top: 15px;
  }
</style>
