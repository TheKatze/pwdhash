<template>
  <v-container>
    <password-list />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PasswordList from "@/components/PasswordList.vue";

@Component({
  components: {
    PasswordList,
  },
})
export default class Home extends Vue {}
</script>
