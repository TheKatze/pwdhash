<template>
  <v-app>
    <v-app-bar app dark elevate-on-scroll>
      <h2>pwdhash</h2>

      <v-spacer />
      <v-btn @click="setPassword('')" v-if="isUnlocked">
        Lock
      </v-btn>
      <v-btn color="primary" @click="$refs.dialog.open()" v-else>
        Unlock
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
      <password-dialog ref="dialog" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MutationMethod } from "vuex/types";

import { namespace } from "vuex-class";

import PasswordDialog from "@/components/PasswordDialog.vue";

const main = namespace("main");

@Component({
  components: {
    PasswordDialog,
  },
})
export default class App extends Vue {
  @main.Getter
  public isUnlocked!: boolean;

  @main.Mutation
  public setPassword!: MutationMethod;

  created() {
    this.$vuetify.theme.dark = true;
  }
}
</script>

<style lang="scss" scoped></style>
