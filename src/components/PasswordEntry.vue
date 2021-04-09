<template>
  <v-card min-width="300" :loading="isWorking">
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
import Settings from "@/data/settings";

import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { MutationMethod } from "vuex/types";

import SnackbarService from "@/util/snackbarService";
import Formatter from "@/util/formatter";

import pbkdf2 from "pbkdf2";

import { namespace } from "vuex-class";

const pbkdf2Async = (
  password: string,
  salt: string,
  iterations: number,
  keylen: number,
  digest: string
) => {
  return new Promise<string>((resolve, reject) => {
    pbkdf2.pbkdf2(password, salt, iterations, keylen, digest, (err, data) => {
      if (err) return reject(err);
      resolve(data.toString("base64"));
    });
  });
};

const main = namespace("main");
const passwords = namespace("passwords");
const settingsModule = namespace("settings");

@Component
export default class PasswordEntry extends Vue {
  @Prop() data!: PasswordEntryData;

  @main.State
  public password!: string;

  @main.Getter
  public isUnlocked!: boolean;

  @passwords.Mutation
  public removePasswordEntry!: MutationMethod;

  @settingsModule.State
  public settings!: Settings;

  isWorking = false;

  isVisible: boolean | null = null;

  shownPassword = "thisIsAPlaceholderPassword";

  get generatedPassword(): Promise<string> {
    return pbkdf2Async(
      this.password,
      this.data.url + this.data.username,
      this.settings.iterations,
      this.settings.keylen,
      this.settings.digest
    );
  }

  @Watch("isUnlocked")
  async onLock(value: boolean) {
    if (value) {
      this.isVisible = null;

      if (this.settings.eagerLoading) {
        this.shownPassword = await this.getGeneratedPassword();
      } else {
        this.shownPassword = "thisIsAPlaceholderPassword";
      }
    }
  }

  async getGeneratedPassword(): Promise<string> {
    this.isWorking = true;
    const pass = await this.generatedPassword;
    this.isWorking = false;

    return Formatter.format(pass, this.data.format);
  }

  async togglePassword() {
    if (this.isVisible === null) {
      this.shownPassword = await this.getGeneratedPassword();
    }

    this.isVisible = !this.isVisible;
  }

  async copyToClipboard() {
    navigator.clipboard.writeText(await this.getGeneratedPassword());
    SnackbarService.open();
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
