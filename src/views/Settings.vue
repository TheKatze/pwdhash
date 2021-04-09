<template>
  <v-container>
    <v-card>
      <v-card-title>
        Settings
      </v-card-title>
      <v-card-text>
        <v-expansion-panels accordion>
          <v-expansion-panel>
            <v-expansion-panel-header>
              Generator Settings
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              Changing these settings will alter the password generation. Only
              change these settings if you want to change all your passwords!

              <v-checkbox
                label="I understand"
                v-model="enableDangerousSettings"
              />

              <v-divider class="my-4" />

              <v-form :disabled="!enableDangerousSettings">
                <v-slider
                label="Iterations"
                v-model="iterations"
                min="100000"
                max="5000000"
                step="100000"
                thumb-label
              />
              <v-slider
                label="Key Length"
                v-model="keylen"
                min="16"
                max="64"
                step="16"
                thumb-label
              />
              <v-select
                label="Digest"
                v-model="digest"
                :items="allDigests"
              />
              </v-form>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>
              Other
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-switch label="Enable eager loading" v-model="eagerLoading" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Settings from "@/data/settings";
import { namespace } from "vuex-class";
import { MutationMethod } from "vuex/types";

import crypto from "crypto";

const settingsModule = namespace("settings");
const main = namespace("main");

@Component
export default class SettingsView extends Vue {
  @settingsModule.State
  public settings!: Settings;

  @main.Mutation
  public setPassword!: MutationMethod;

  allDigests = crypto.getHashes();
  enableDangerousSettings = false;

  mustBeNumeric(input: string): boolean {
    return Number.isInteger(Number(input));
  }

  @settingsModule.Mutation
  public setIterations!: MutationMethod;

  get iterations() {
    return this.settings.iterations.toString();
  }
  set iterations(value: string) {
    this.setIterations(Number(value));
    this.applySettings();
  }

  @settingsModule.Mutation
  public setKeyLen!: MutationMethod;

  get keylen(): string {
    return this.settings.keylen.toString();
  }
  set keylen(value: string) {
    this.setKeyLen(Number(value));
    this.applySettings();
  }

  @settingsModule.Mutation
  public setDigest!: MutationMethod;

  get digest() {
    return this.settings.digest;
  }
  set digest(value: string) {
    this.setDigest(value);
    this.applySettings();
  }

  @settingsModule.Mutation
  public setEagerLoading!: MutationMethod;

  get eagerLoading() {
    return this.settings.eagerLoading;
  }
  set eagerLoading(value: boolean) {
    this.setEagerLoading(value);
    this.applySettings();
  }

  applySettings() {
    this.setPassword("");
  }
}
</script>
