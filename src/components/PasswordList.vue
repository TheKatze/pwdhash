<template>
  <v-row>
    <v-col v-if="passwordList.length === 0">
      <v-card class="mx-auto" max-width="500">
        <v-card-title>Welcome to pwdhash</v-card-title>
        <v-card-text>
          You don't have any passwords saved on this device yet, do you want a
          quick introduction? <br />
          If you're already familiar with pwdhash, just add a password and this
          box will disappear.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text link to="/about" color="primary">
            Open Guide
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col v-else v-for="(entry, i) in passwordList" :key="i">
      <password-entry :data="entry" />
    </v-col>

    <v-btn
      fab
      fixed
      bottom
      right
      color="primary"
      @click="$refs.addDialog.open()"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <add-dialog ref="addDialog" />
    <v-snackbar v-model="isSnackbarOpen" timeout="3000">
      Password copied!
      <template v-slot:action>
        <v-btn text @click="isSnackbarOpen = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PasswordEntry from "./PasswordEntry.vue";
import AddDialog from "./AddDialog.vue";
import PasswordEntryData from "@/data/passwordEntryData";

import SnackbarService from "@/util/snackbarService";

import { namespace } from "vuex-class";

const passwords = namespace("passwords");

@Component({
  components: {
    PasswordEntry,
    AddDialog,
  },
})
export default class PasswordList extends Vue {
  @passwords.State
  passwordList!: PasswordEntryData[];

  isSnackbarOpen = false;

  created() {
    SnackbarService.register(this.openSnackbar);
  }

  openSnackbar() {
    this.isSnackbarOpen = true;
  }
}
</script>
