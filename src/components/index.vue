<template>
  <div class="fireworks">
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
import $ from 'jquery'
import '@/common/js/jquery.fireworks'
export default {
  name: 'index',
  data () {
    return {
      msg: '老婆爱你么么哒哟！'
    }
  },
  methods: {

  },
  mounted () {
    console.log($().fireworks())
    $('.fireworks').fireworks({
      sound: false, // sound effect
      opacity: 0.9,
      width: '100%',
      height: '100%'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
