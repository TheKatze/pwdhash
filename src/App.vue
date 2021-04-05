<template>
  <v-app>
    <v-navigation-drawer app v-model="navDrawer">
      <v-list>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content> App </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/about">
          <v-list-item-icon>
            <v-icon>mdi-magnify</v-icon>
          </v-list-item-icon>
          <v-list-item-content> About </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app dark elevate-on-scroll>
      <v-app-bar-nav-icon @click="navDrawer = true" />
      <h2>pwdhash</h2>

      <v-spacer />
      <span v-if="$route.path === '/'">
        <v-btn @click="setPassword('')" v-if="isUnlocked">
          Lock
        </v-btn>
        <v-btn color="primary" @click="$refs.dialog.open()" v-else>
          Unlock
        </v-btn>
      </span>
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

  private navDrawer = false;

  created() {
    this.$vuetify.theme.dark = true;
  }
}
</script>

<style lang="scss" scoped></style>
