import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";

@Module({ namespaced: true, name: "main" })
export default class Main extends VuexModule {
  public password = "";
  get isUnlocked() {
    return this.password != "";
  }

  @Mutation
  public setPassword(newPassword: string): void {
    this.password = newPassword;
  }
}
