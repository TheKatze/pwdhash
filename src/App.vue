<template>
  <v-app>
    <v-navigation-drawer
      :expand-on-hover="!$vuetify.breakpoint.mobile"
      app
      v-model="navDrawer"
    >
      <v-list>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content> App </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/settings">
          <v-list-item-icon>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-content> Settings </v-list-item-content>
        </v-list-item>
      </v-list>
      <template slot="append">
        <v-list-item link to="/contribute">
          <v-list-item-icon>
            <v-icon>mdi-github</v-icon>
          </v-list-item-icon>
          <v-list-item-content> Contribute </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/about">
          <v-list-item-icon>
            <v-icon>mdi-information</v-icon>
          </v-list-item-icon>
          <v-list-item-content> About </v-list-item-content>
        </v-list-item>
      </template>
    </v-navigation-drawer>
    <v-app-bar app dark elevate-on-scroll>
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.mobile"
        @click="navDrawer = true"
      />
      <h2>pwdhash</h2>
      <sup> BETA </sup>

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

  private navDrawer = null;

  created() {
    this.$vuetify.theme.dark = true;
  }
}
</script>

<style lang="scss" scoped></style>
