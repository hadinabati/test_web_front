<template>

  <q-layout view="hHh lpR lfr" style="direction: rtl">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu"/>
        <q-toolbar-title style="text-align: center ; font-family:mytanha">
          تصحیح پاسخبرگ
        </q-toolbar-title>
        <div class="q-pa-md">
          <q-btn-dropdown
            color="blue-grey-9"
            rounded
            push
            class="text"
            icon="person"
            label="پروفایل"
          >
            <div class="row no-wrap q-pa-md">
              <div class="column">
                <div class="text-h6 q-mb-md">Settings</div>
                <q-btn color="deep-orange" class="text" glossy label="تنظیمات"/>
                <div class="flex flex-center">
                  <img src="../assets/logo2.png" alt="logo" style="width: 80px ; height: 80px">
                </div>
              </div>

              <q-separator vertical inset class="q-mx-lg"/>

              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs text">{{enter_info.name}}</div>
                <q-btn
                  class="text"
                  color="red"
                  label="خروج"
                  push
                  @click="Exit"
                  rounded
                  size="sm"
                  v-close-popup
                />
              </div>
            </div>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>



    <q-drawer
      v-model="drawer"
      show-if-above
      side="right"
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"

      :width="200"
      :breakpoint="500"
      bordered
      class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="school"/>
            </q-item-section>

            <q-item-section style="font-family: mytanha">
            <router-link to="/schools" style="text-decoration: none ; color: black" >مدرسه</router-link>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="book"/>
            </q-item-section>

            <q-item-section style="font-family: mytanha">
              <router-link to="/books" style="text-decoration: none ; color: black" >کتاب</router-link>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="person_add"/>
            </q-item-section>

            <q-item-section style="font-family: mytanha">
               دانش آموز
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="group_work"/>
            </q-item-section>

            <q-item-section style="font-family: mytanha">
              دسته بندی
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="quiz"/>
            </q-item-section>

            <q-item-section style="font-family: mytanha">
              آزمون
            </q-item-section>
          </q-item>
          <q-separator/>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="movie"/>
            </q-item-section>

            <q-item-section style="font-family: mytanha">
              آموزش
            </q-item-section>
          </q-item>

        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container style="direction: rtl">
      <router-view/>
    </q-page-container>
    <q-footer elevated>
      <q-toolbar>
        <q-toolbar-title style="text-align: center">www.isa361.ir</q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
  import {defineComponent, ref} from 'vue'
  import {reactive} from 'vue'
  import {useStore, mapActions} from 'vuex'

  export default defineComponent({
    name: 'MainLayout',

    components: {},

    methods: {
      ...mapActions('base', ['Exit'])
    },

    data() {
      const vuexdata = useStore()
      const enter_info = reactive({
        name: vuexdata.state.base.info.name,
        token: vuexdata.state.base.info.token
      })

      const leftDrawerOpen = ref(false)
      return {
        drawer: ref(false),
        miniState: ref(true),
        enter_info,
        leftDrawerOpen,
        toggleLeftDrawer() {
          leftDrawerOpen.value = !leftDrawerOpen.value
        }
      }
    }
  })
</script>

<style>
  .text {
    font-family: mytanha;
    text-align: center;
  }

  i {
    margin-left: .4rem;
  }

</style>
