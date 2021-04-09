<template>
  <v-dialog
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    v-model="isOpen"
  >
    <template v:slot:default>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="isOpen = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Add Entry</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="add()">
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-subheader> Entry </v-subheader>
          <v-text-field outlined label="URL" v-model="url" />
          <v-text-field outlined label="Username" v-model="username" />
          <v-subheader> Options </v-subheader>
          <v-slider thumb-label label="Length" min="8" max="32" v-model="length" />
          <v-switch label="Remove Special Characters" v-model="removeSpecialCharacters" />
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts">
import { MutationMethod } from "vuex/types";
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

const passwords = namespace("passwords");

@Component
export default class AddDialog extends Vue {
  @passwords.Mutation
  public addPasswordEntry!: MutationMethod;

  public isOpen = false;

  public url = "";
  public username = "";

  public length = 32;
  public removeSpecialCharacters = false;

  open() {
    this.isOpen = true;
  }

  add() {
    this.addPasswordEntry({ url: this.url, username: this.username });

    this.username = "";
    this.url = "";

    this.isOpen = false;
  }
}
</script>
