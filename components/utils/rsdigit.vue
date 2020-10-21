<template>
  <span class="rsdigit" v-bind:style="'width: '+digitMap[digit].w+'px; background-position: '+digitMap[digit].o+'px 0px;'"></span>
</template>

<script>

export default {
  name: 'rsdigit',
  props: ['digit'],
  data () {
    return {
      digitMap: {
        0:{w:7, o:-57},
        1:{w:5, o:0},
        2:{w:7, o:-5},
        3:{w:6, o:-12},
        4:{w:6, o:-18},
        5:{w:6, o:-24},
        6:{w:7, o:-30},
        7:{w:6, o:-37},
        8:{w:7, o:-43},
        9:{w:7, o:-50},
      },
    }
  }
}
</script>

<style lang="scss" scoped>

.rsdigit {
  display: inline-block;
  background-image: url('https://runelite.net/img/numbers.png');
  height: 10px;
}

</style>
