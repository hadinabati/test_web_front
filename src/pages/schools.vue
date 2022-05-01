<template>
  <div class="container">
    <div class="row">
      <h5 class="">تنظیمات مدارس</h5>

      <div class="col-md-6 col-xs-12">
        <p>ساخت مدرسه</p>
        <q-input
          style="text-align: right"
          label-color="deep-purple-9"
          dense
          class="normalinput"
          rounded
          filled
          v-model="school_info.name"
          label="نام مدرسه"
        />
        <q-select
          label-color="deep-purple-9"
          dense
          class="normalinput"
          rounded
          filled
          v-model="school_info.kind"
          :options="Option"
          label="نوع مدرسه"
        />
        <q-input
          style="text-align: right"
          label-color="deep-purple-9"
          dense
          class="normalinput"
          rounded
          filled
          v-model="school_info.address"
          label="آدرس"
        />
        <q-select
          label-color="deep-purple-9"
          dense
          class="normalinput"
          rounded
          filled
          v-model="school_info.paye"
          :options="Option2"
          label="پایه تحصیلی مدرسه"
        />
        <q-btn
          dense
          style="background: #088a29; color: white"
          class="normalinput"
          label="ثبت مدرسه جدید"
          @click="insert_school"
        />
        <q-btn
          @click="clear"
          dense
          style="background: #ff0080; color: white"
          class="normalinput"
          label="پاک کردن اطلاعات"
        />
      </div>
      <div class="col-md-6 col-xs-12 flex flex-center">
        <img src="../assets/logo2.png" alt="logo" />
      </div>
    </div>

    <hr />
    <hr />

    <div class="row">
      <div class="col-md-12 col-xs-12" style="height: 80hv">
        <p>لیست مدارس</p>
        <div class="q-pa-md">
          <q-table
            title="مدارس ثبت شده"
            class="normalATable"
            :rows="rows"
            :columns="columns"
            row-key="name"
          >
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th auto-width />
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>

            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td auto-width>
                  <q-btn
                    size="sm"
                    color="accent"
                    round
                    dense
                    @click="props.expand = !props.expand"
                    :icon="props.expand ? 'remove' : 'add'"
                  />
                </q-td>
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.value }}
                </q-td>
              </q-tr>
              <q-tr v-show="props.expand" :props="props">
                <q-td colspan="100%">
                  <div class="text-left">
                    <div class="row" style="text-align: right">
                      <div class="col-12">
                        <p style="display: inline; margin-left: 10px">
                          آیا میخواهید مدرسه
                        </p>
                        <span
                          style="display: inline; color: red; margin-left: 10px"
                        >{{ props.row.name }}</span
                        >
                        <p style="display: inline">حذف شود ؟</p>
                      </div>
                    </div>
                    <div class="row q-mt-md q-mb-md">
                      <q-btn
                        style="background: #ff0080; color: white"
                        label="حذف مدرسه"
                        @click="deleted(props.row.token)"
                      />
                    </div>
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ref, reactive} from "vue";
import {useQuasar} from "quasar";
import {useStore} from "vuex";
import axios from "axios";
import Urls from "../URL/urls";

export default {
  name: "schools",

  computed :{

    rows(){
      return this.store.getters['base/school_list'].info[0]
    }
  },


  data() {
    const school_info = reactive({
      name: "",
      kind: "",
      paye: "",
      address: "",
    });

    const columns = [
      {
        name: "name",
        required: true,
        label: "نام مدرسه",
        align: "center",
        field: (row) => row.name,
        format: (val) => `${val}`,
        sortable: false,
      },
      {
        name: "paye",
        align: "center",
        label: "مقطع",
        field: "paye",
        sortable: false,
      },
      {
        name: "Kind",
        align: "center",
        label: "نوع مدرسه",
        field: "Kind",
        sortable: false,
      },
      {
        name: "address",
        align: "center",
        label: "آدرس",
        field: "address",
        sortable: false,
      },
    ];
    // let rows = []
    const store = useStore();
    const $q = new useQuasar();

    $q.notify.registerType("total", {
      classes: "notifyclass",
    });

    function search_schools() {
      const address = new Urls();
      const datas = store.getters["base/school_list"];
      if (!datas.is_updated) {
        axios
          .post(address.search_school(), {
            manager_code: store.getters["base/manager_code"],
          })
          .then((x) => {
            if (x.data.OK === true && x.data.result === true) {
              store.commit("base/update_school", x.data.items);
              $q.notify({
                type: "total",
                message: "بروزرسانی انجام شد",
                color: "grren",
                textColor: "white",
              });
            } else {
              $q.notify({
                type: "total",
                message: "خطا در انجام بروز رسانی",
                color: "red",
                textColor: "white",
              });
            }
          });
      }
    }

    search_schools()

    return {
      search_schools,
      store,
      warning() {
        $q.notify({
          type: "total",
          message: "لطفا تمام فیلد ها را کامل نمایید",
          color: "yellow",
          textColor: "black",
        });
      },
      error() {
        $q.notify({
          type: "total",
          message: "خطا در انجام عملیات",
          color: "red",
          textColor: "white",
        });
      },

      success() {
        $q.notify({
          type: "total",
          message: "عملیات با موفیت انجام شد",
          color: "green",
          textColor: "white",
        });
      },

      school_info,
      Option: ["دخترانه", "پسرانه "],
      Option2: ["متوسطه دوم", "متوسطه اول", "دبستان"],
      columns,
      slide: ref("style"),
      lorem:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.",
    };
  },

  methods: {
    insert_school() {
      if (
        this.school_info.name !== "" &&
        this.school_info.kind !== "" &&
        this.school_info.paye !== "" &&
        this.school_info.address !== ""
      ) {
        let check = true;
        if (this.school_info.kind === "دخترانه") {
          check = false;
        }
        const address = new Urls();

        axios
          .post(address.add_school(), {
            name: this.school_info.name,
            kind: check,
            paye: this.school_info.paye,
            address: this.school_info.address,
            manager_code:this.store.getters["base/manager_code"],
          })
          .then((x) => {
            if (x.data.OK === true) {
              this.success();
              this.search_schools();
            } else {
              this.error();
            }
          });
      } else {
        this.warning();
      }
    },

    clear() {
      this.school_info.kind = "";
      this.school_info.name = "";
      this.school_info.paye = "";
      this.school_info.address = "";
    },

    deleted(token) {
      console.log('manager code = > '+ this.store.getters["base/manager_code"])
      console.log('school code = > '+token)
      const address = new Urls();
      axios
        .delete(address.delete_school(),{
          data:{
            manager_code:this.store.getters["base/manager_code"],
            school_code: token,
          },
        })
        .then((x) => {
          console.log(x.data)
          if (x.data.OK === true && x.data.result === true) {
            this.success()
            this.search_schools()
          } else {
            this.error()
          }
        });
    },
  },
};
</script>

<style scoped>
h5 {
  text-align: center;
  width: 100%;
  font-family: "myyekan";
}

.normalATable {
  font-family: mytanha;
  width: 80%;
  margin-right: 10%;
}

.normalinput {
  font-family: mytanha;
  width: 60%;
  margin-left: 20%;
  margin-right: 20%;
  text-align: center;
  margin-top: 1rem;
  display: block;
}

p {
  text-align: center;
  font-family: myyekan;
}

hr {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.notifyclass {
  font-family: mytanha;
}
</style>
