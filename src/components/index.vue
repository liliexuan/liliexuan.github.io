<template>
  <div class="fireworks">
    <p><a href="#">{{msg}}</a></p>
  </div>
</template>

<script>
import $ from 'jquery'
import '@/common/js/jquery.fireworks'
export default {
  name: 'index',
  data () {
    return {
      msg: '老婆,爱你么么哒哟！'
    }
  },
  methods: {

  },
  mounted () {
    console.log($().fireworks())
    $('.fireworks').fireworks({
      sound: true, // sound effect
      opacity: 0.9,
      width: '100%',
      height: '100%'
    })
    $.fn.typewriter = function() {
      this.each(function() {
        var $ele = $(this), str = $ele.html(), progress = 0
        $ele.html('')
        var timer = setInterval(function () {
          var current = str.substr(progress, 1)
          if (current === '<') {
            progress = str.indexOf('>', progress) + 1
          } else {
            progress++
          }
          $ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''))
          if (progress >= str.length) {
            clearInterval(timer)
          }
        }, 75)
      })
      return this
    }
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
a:hover{
color:#ffffff;  
}

@font-face {
  font-family: 'Audiowide';
  font-style: normal;
  font-weight: 400;
  src: local('Audiowide'), local('Audiowide-Regular'), url(http://themes.googleusercontent.com/static/fonts/audiowide/v2/8XtYtNKEyyZh481XVWfVOj8E0i7KZn-EPnyo3HZu7kw.woff) format('woff');
}

a{
  color:#FF9900;
  font-family:Audiowide;
}
a:hover{
  -webkit-animation: neon5 1.5s ease-in-out infinite alternate;
  -moz-animation: neon5 1.5s ease-in-out infinite alternate;
  animation: neon5 1.5s ease-in-out infinite alternate; 
}

p{
  text-align:center;
  font-size:7em;
  margin:20px 0 20px 0; 
}

a{
  text-decoration:none; 
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  transition: all 0.5s;
}

@-moz-keyframes neon5 {
  from {
    text-shadow: 0 0 10px #fff,
               0 0 20px  #fff,
               0 0 30px  #fff,
               0 0 40px  #FF9900,
               0 0 70px  #FF9900,
               0 0 80px  #FF9900,
               0 0 100px #FF9900,
               0 0 150px #FF9900;
  }
  to {
    text-shadow: 0 0 5px #fff,
               0 0 10px #fff,
               0 0 15px #fff,
               0 0 20px #FF9900,
               0 0 35px #FF9900,
               0 0 40px #FF9900,
               0 0 50px #FF9900,
               0 0 75px #FF9900;
  }
}
</style>
