import Vue from "vue";
import Vuex from "vuex";

import Main from "@/store/modules/main";
import Passwords from "@/store/modules/passwords";
import Settings from "@/store/modules/settings";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    main: Main,
    passwords: Passwords,
    settings: Settings,
  },
});
