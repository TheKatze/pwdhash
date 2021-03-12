<template>
  <v-card min-width="300">
    <v-card-title>
      {{ data.title }}
      <v-spacer />
      <v-icon left> mdi-pencil </v-icon>
      <v-icon right @click="removePasswordEntry(data.id)" id="delete">
        mdi-close
      </v-icon>
    </v-card-title>
    <v-card-subtitle> {{ data.url }} </v-card-subtitle>
    <v-card-actions v-if="isUnlocked">
      <v-text-field
        v-model="generatedPassword"
        outlined
        readonly
        :type="isVisible ? 'text' : 'password'"
        label="Password"
      >
        <template v-slot:append>
          <v-icon @click="isVisible = !isVisible">
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
import { Component, Prop, Vue } from "vue-property-decorator";

import { namespace } from "vuex-class";

const main = namespace("main");
const passwords = namespace("passwords");

import forge from "node-forge";
import { MutationMethod } from "vuex/types";

@Component
export default class PasswordEntry extends Vue {
  @Prop() data!: PasswordEntryData;

  @main.State
  public password!: string;

  @main.Getter
  public isUnlocked!: boolean;

  @passwords.Mutation
  public removePasswordEntry!: MutationMethod;

  isVisible = false;

  get generatedPassword(): string {
    const hash = forge.hmac.create();

    hash.start("sha256", this.password);
    hash.update(this.data.url);

    return btoa(hash.digest().bytes());
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
