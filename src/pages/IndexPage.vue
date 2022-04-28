<template>
  <div id="q-app" style="min-height: 100vh;">
    <div class="q-pa-md">
      <q-btn color="purple" @click="showNotif" label="Show Notification"></q-btn>
    </div>
  </div>
</template>

<script>
  import {Notify, useQuasar} from 'quasar'

  export default {
    setup () {
      const $q = useQuasar()
      Notify.setDefaults({
        classes:'text'
      })
      return {
        showNotif () {
          $q.notify({
            message: 'فونت فارسی.',
            color: 'purple'
          })
        }
      }
    }
  }
</script>

<style>
  .text {
    text-align: center;
    font-family: mytanha;
  }

</style>
