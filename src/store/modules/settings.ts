import { VuexModule, Module, Mutation } from "vuex-module-decorators";

import Settings from "@/data/settings";

const defaultSettings: Settings = {
  iterations: 100000,
  keylen: 32,
  digest: "sha512",
  eagerLoading: false,
};

const localStorage = window.localStorage;

@Module({ namespaced: true, name: "settings" })
export default class SettingsModule extends VuexModule {
  public settings: Settings = JSON.parse(
    localStorage.getItem("settings") ?? JSON.stringify(defaultSettings)
  );

  @Mutation
  public setSettings(settings: Settings): void {
    this.settings = settings;

    console.log(settings);

    localStorage.setItem("settings", JSON.stringify(this.settings));
  }

  @Mutation
  public setIterations(iterations: number): void {
    this.settings.iterations = iterations;

    localStorage.setItem("settings", JSON.stringify(this.settings));
  }

  @Mutation
  public setKeyLen(keylen: number): void {
    this.settings.keylen = keylen;

    localStorage.setItem("settings", JSON.stringify(this.settings));
  }

  @Mutation
  public setDigest(digest: string): void {
    this.settings.digest = digest;

    localStorage.setItem("settings", JSON.stringify(this.settings));
  }

  @Mutation
  public setEagerLoading(eagerLoading: boolean): void {
    this.settings.eagerLoading = eagerLoading;

    localStorage.setItem("settings", JSON.stringify(this.settings));
  }
}
