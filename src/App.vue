<template>
  <div v-if="check_logged">
    <router-view/>
  </div>
  <div v-else>
    <Loginpage></Loginpage>
  </div>
</template>

<script>

  import Loginpage from 'pages/Login'
  import {defineComponent} from 'vue'
  import {useStore , mapGetters} from 'vuex'

  export default defineComponent({
    name: 'App',

    data() {
      if (sessionStorage.getItem('username') !== null) {
        const store = useStore()
        store.dispatch('base/Enter_with_session')
      }
      return {
      }
    },

    methods: {},

    computed: {
      ...mapGetters('base' , ['check_logged'])
    },
    components: {
      Loginpage
    }
  })
</script>
<style>
  @font-face {
    font-family: 'myshabnam';
    src: url("./Font/shabnam-font-v2.4.0/Shabnam.ttf");
  }

  @font-face {
    font-family: 'mytanha';
    src: url("./Font/tanha-font-v0.9/Tanha.ttf");
  }

  @font-face {
    font-family: 'myyekan';
    src: url("./Font/yekan-font/Yekan.ttf");
  }

  @font-face {
    font-family: 'myvazir';
    src: url("./Font/vazir-font-v18.0.0/Vazir.ttf");
  }

</style>
