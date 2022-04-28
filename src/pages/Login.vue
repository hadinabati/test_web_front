<template>
  <div
    class="row"
    style="
      height: 100vh;
      background-image: url(https://images.pexels.com/photos/32237/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260);
    "
  >
    <div class="col-md-3 col-xs-1"></div>
    <div class="col-md-6 col-xs-10">
      <q-layout
        view="p"
        container
        style="height: 650px; background-color: #fbfffb; margin-top: 3rem"
        class="shadow-2 rounded-borders"
      >
        <h5 style="font-family: mytanha; text-align: center">تصحیح برگ آسان</h5>
        <div v-show="gettersname">
          <q-banner inline-actions class="text-white bg-red text">
            کاربری با این مشخصات یافت نشد
          </q-banner>
        </div>

        <q-input
          class="myclass"
          v-model="username"
          dense="dense"
          label="نام کاربری"
        />
        <q-input
          type="password"
          class="myclass"
          v-model="passwords"
          dense="dense"
          label="رمز عبور"
        />
        <q-btn
          @click="checkloggin({ username: username, passwords: passwords })"
          color="blue-13"
          class="myclass"
          icon-right="send"
          label="ورود"
          rounded
        />

        <div class="q-pa-md q-gutter-sm">
          <q-btn
            text-color="black"
            color="amber-4"
            icon-right="add_comment"
            class="myclass"
            label="ثبت نام"
            @click="show = true"
            rounded
          />
          <q-dialog v-model="show">
            <q-card>
              <q-card-section>
                <div class="text-h6" style="font-family: mytanha">
                  فرم ثبت نام
                </div>
              </q-card-section>
              <q-card-section
                class="q-pt-none"
                style="width: 300px; text-align: "
              >
                <p class="text">ثبت نام کاربری</p>
                <q-input
                  class="text2"
                  style="width: 100%; text-align: right"
                  standout="bg-teal text-white"
                  v-model="register.name"
                  rounded
                  dense="dense"
                  label="نام و نام خانوادگی"
                />
                <q-input
                  class="text2"
                  style="width: 100%"
                  standout="bg-teal text-white"
                  v-model="register.username"
                  rounded
                  dense="dense"
                  label="نام کاربری"
                />
                <q-input
                  class="text2"
                  style="width: 100%"
                  standout="bg-teal text-white"
                  v-model="register.passwords"
                  rounded
                  dense="dense"
                  label="رمز عبور"
                />
                <q-input
                  class="text2"
                  style="width: 100%"
                  standout="bg-teal text-white"
                  v-model="register.phone"
                  rounded
                  dense="dense"
                  label="شماره همراه"
                />
                <q-input
                  class="text2"
                  style="width: 100%"
                  standout="bg-teal text-white"
                  v-model="register.email"
                  rounded
                  dense="dense"
                  label="ایمیل"
                />
              </q-card-section>
              <q-card-actions align="right">
                <q-btn
                  flat
                  label="ثبت نام"
                  @click="registerbtn"
                  color="primary"
                  class="text"
                />
                <q-btn
                  flat
                  label="خروج"
                  color="red"
                  class="text"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>

        <div class="q-pa-md q-gutter-sm">
          <q-btn
            color="deep-orange-7"
            icon-right="recycling"
            class="myclass"
            label="بازیابی کلمه عبور"
            @click="alert2 = true"
            rounded
          />
          <q-dialog v-model="alert2">
            <q-card>
              <q-card-section>
                <div class="text-h6" style="font-family: mytanha">
                  بازیابی کلمه عبور
                </div>
              </q-card-section>
              <q-card-section class="q-pt-none" style="width: 100%">
                <p class="text">لطفا شماره همراه خود را وارد نمایید</p>
                <q-input
                  class="text"
                  style="width: 100%"
                  v-model="mobile"
                  dense="dense"
                  label="شماره همراه"
                />
              </q-card-section>
              <q-card-actions align="right">
                <q-btn
                  @click="forget"
                  flat
                  label="ارسال درخواست"
                  color="primary"
                  class="text"
                  v-close-popup
                />
                <q-btn
                  flat
                  label="خروج"
                  color="red"
                  class="text"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </div>

        <div class="col-md-6 col-xs-12 flex flex-center">
          <img src="../assets/logo2.png" alt="logo" />
        </div>
      </q-layout>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { mapActions, mapGetters } from "vuex";
import axsios from 'axios'
import urls from "../URL/urls";
import { useQuasar } from "quasar";

export default {
  name: "Login_page",
  data() {
    const register = reactive({
      name: "",
      username: "",
      passwords: "",
      phone: "",
      email: "",
    });

    const $q = useQuasar();
    $q.notify.registerType("total", {
      classes: "notifyclass",
    });
    const username = ref("");
    const passwords = ref("");
    const mobile = ref("");
    const show = ref(false);

    const check = false;
    return {
      alert: ref(false),
      alert2: ref(false),
      username,
      passwords,
      mobile,
      check,
      register,
      show,

      showNotif() {
        $q.notify({
          type: "total",
          message: "رمز جدید ارسال شد",
          color: "green",
        });
      },

      showNotif_sucsess() {
        $q.notify({
          type: "total",
          message: "ثبت نام با موفقیت انجام شد",
          color: "green",
        });
      },

      showNotif_error() {
        $q.notify({
          type: "total",
          message: "خطا در انجام عملیات",
          color: "red",
        });
      },

      showNotifError() {
        $q.notify({
          type: "total",
          message: "خطا در انجام عملیات",
          color: "red",
        });
      },
      showNotifwarning() {
        $q.notify({
          type: "total",
          message: "لطفا تمام فیلد ها را کامل نمایید",
          color: "yellow",
          textColor: "black",
          classes: "notifyclass",
        });
      },
    };
  },
  computed: {
    ...mapGetters("base", ["gettersname"]),
  },

  methods: {
    persistent: ref(false),

    ...mapActions("base", ["checkloggin"]),

    forget() {
      if (this.mobile !== "") {
        const url = new urls();
        axsios.post(url.forget()) , {
          phone: this.mobile,
        }.then((x) => {
            if (x.data.OK === true && x.data.result === 1) {
              this.showNotif();
            } else {
              this.showNotifError();
            }
          });
      }else{
        this.showNotifwarning()
      }
    },



    registerbtn() {
      const utl = new urls();

      try {
        if (
          this.register.name !== "" &&
          this.register.username !== "" &&
          this.register.phone !== "" &&
          this.register.passwords !== "" &&
          this.register.email !== ""
        ) {

          axsios.post(utl.register(), {
            name: this.register.name,
            phone: this.register.phone,
            email: this.register.email,
            username: this.register.username,
            passwords: this.register.passwords,
          }).then(x => {
              console.log(x.data)
              if (x.data.OK  === true) {
                this.show = false;
                this.showNotif_sucsess();
                this.register.name = "";
                this.register.phone = "";
                this.register.email = "";
                this.register.username = "";
                this.register.passwords = "";
              } else {
                this.showNotif_error();
              }
            });
        } else {
          this.showNotifwarning();
        }
      }
      catch (e) {
        console.log(e)
      }


    },
  },
};
</script>

<style scoped>
body {
  background-color: #ffcd67;
}

.myclass {
  text-align: center;
  margin-top: 1.2rem;
  margin-right: 25%;
  width: 50%;
  margin-left: 25%;
  font-family: myshabnam;
}
.notifyclass {
  font-family: fantasy;
}

.text {
  text-align: center;
  font-family: mytanha;
}

.text2 {
  font-family: mytanha;
  text-align: right;
  margin-top: 0.3rem;
}
</style>
