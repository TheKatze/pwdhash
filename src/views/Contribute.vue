<template>
  <v-container>
    <v-card class="mx-auto my-2" max-width="500">
      <v-card-title>
        Contribute to pwdhash
      </v-card-title>
      <v-card-text>
        As a single full-time employed developer maintaining all my projects is
        hard, you can help me out in various ways listed here!
      </v-card-text>
    </v-card>
    <v-card
      class="mx-auto my-2"
      max-width="500"
      link
      target="_blank"
      href="https://github.com/TheKatze/pwdhash/issues/new?assignees=TheKatze&labels=bug&template=bug_report.md&title="
    >
      <v-card-title>
        Report a bug
        <v-spacer />
        <v-icon>mdi-open-in-new</v-icon>
      </v-card-title>
      <v-card-text>
        Report a bug you found.
      </v-card-text>
    </v-card>
    <v-card
      class="mx-auto my-2"
      max-width="500"
      link
      target="_blank"
      href="https://github.com/TheKatze/pwdhash/issues/new?assignees=TheKatze&labels=enhancement&template=feature_request.md&title="
    >
      <v-card-title>
        Request a feature
        <v-spacer />
        <v-icon>mdi-open-in-new</v-icon>
      </v-card-title>
      <v-card-text>
        Alternative title: Request new bugs.
      </v-card-text>
    </v-card>
    <v-card
      class="mx-auto my-2"
      max-width="500"
      link
      target="_blank"
      href="https://github.com/TheKatze/pwdhash"
    >
      <v-card-title>
        Create a pull request
        <v-spacer />
        <v-icon>mdi-open-in-new</v-icon>
      </v-card-title>
      <v-card-text>
        The do-it-yourself approach.
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Contribute extends Vue {}
</script>
