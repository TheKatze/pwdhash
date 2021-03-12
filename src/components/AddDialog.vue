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
          <v-text-field outlined label="Title" v-model="title" />
          <v-text-field outlined label="URL" v-model="url" />
          <!-- <v-subheader> Options </v-subheader>
          <v-slider thumb-label label="Length" min="8" max="64" />
          <v-switch label="Force Special Characters" /> -->
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

  public title = "";
  public url = "";

  open() {
    this.isOpen = true;
  }

  add() {
    this.addPasswordEntry({ title: this.title, url: this.url });

    this.title = "";
    this.url = "";

    this.isOpen = false;
  }
}
</script>
