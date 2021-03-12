<template>
  <v-row>
    <v-col v-for="(entry, i) in passwordList" :key="i">
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
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PasswordEntry from "./PasswordEntry.vue";
import AddDialog from "./AddDialog.vue";
import PasswordEntryData from "@/data/passwordEntryData";

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
}
</script>
