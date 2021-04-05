<template>
  <v-card min-width="300">
    <v-card-title>
      {{ data.url }}<v-spacer />
      <v-btn
        :disabled="!isUnlocked"
        icon
        @click="removePasswordEntry(data.id)"
        id="delete"
      >
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
    </v-card-title>
    <v-card-subtitle>{{ data.username }}</v-card-subtitle>
    <v-card-actions v-if="isUnlocked">
      <v-text-field
        v-model="shownPassword"
        outlined
        readonly
        :type="isVisible ? 'text' : 'password'"
        label="Password"
      >
        <template v-slot:append>
          <v-icon @click="togglePassword()">
            {{ isVisible ? "mdi-eye" : "mdi-eye-off" }}
          </v-icon>
        </template>
        <template v-slot:append-outer>
          <v-icon @click="copyToClipboard" left> mdi-clipboard-text </v-icon>
        </template>
      </v-text-field>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import PasswordEntryData from "@/data/passwordEntryData";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { MutationMethod } from "vuex/types";

import pbkdf2 from "pbkdf2";

import { namespace } from "vuex-class";

const main = namespace("main");
const passwords = namespace("passwords");

@Component
export default class PasswordEntry extends Vue {
  @Prop() data!: PasswordEntryData;

  @main.State
  public password!: string;

  @main.Getter
  public isUnlocked!: boolean;

  @passwords.Mutation
  public removePasswordEntry!: MutationMethod;

  isVisible: boolean | null = null;

  shownPassword = "thisIsAPlaceholderPassword";

  get generatedPassword(): string {
    const key = pbkdf2.pbkdf2Sync(
      this.password,
      this.data.url + this.data.username,
      10000,
      32,
      "sha512"
    );

    return key.toString("base64");
  }

  @Watch("isUnlocked")
  onLock(value: boolean, oldValue: boolean | null) {
    if (value) {
      this.isVisible = null;
      this.shownPassword = "thisIsAPlaceholderPassword";
    }
  }

  togglePassword() {
    if (this.isVisible === null) {
      this.shownPassword = this.generatedPassword;
    }

    this.isVisible = !this.isVisible;
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.generatedPassword);
  }
}
</script>

<style scoped lang="scss">
#delete {
  &:hover {
    color: rgb(230, 49, 49);
  }
}
</style>
