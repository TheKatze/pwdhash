<template>
  <v-dialog v-model="isOpen" max-width="500">
    <template v:slot:default>
      <v-card>
        <v-card-title> Unlock </v-card-title>
        <v-card-subtitle>
          Enter your password to unlock your vault
        </v-card-subtitle>
        <v-card-text>
          <v-text-field
            v-model="passwordEntry"
            outlined
            :type="isPasswordVisible ? 'text' : 'password'"
            label="Password"
          >
            <template v-slot:append>
              <v-icon @click="isPasswordVisible = !isPasswordVisible">
                {{ isPasswordVisible ? "mdi-eye" : "mdi-eye-off" }}
              </v-icon>
            </template>
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="unlockVault()">
            Unlock Vault
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts">
import { MutationMethod } from "vuex/types";
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const main = namespace("main");

@Component
export default class PasswordDialog extends Vue {
  @main.Mutation
  public setPassword!: MutationMethod;

  isOpen = false;

  public passwordEntry = "";
  public isPasswordVisible = false;

  open() {
    this.isOpen = true;
  }

  unlockVault() {
    this.setPassword(this.passwordEntry);
    this.passwordEntry = "";

    this.isOpen = false;
  }
}
</script>
