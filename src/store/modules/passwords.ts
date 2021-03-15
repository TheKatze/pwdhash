import PasswordEntryData from "@/data/passwordEntryData";
import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";

@Module({ namespaced: true, name: "passwords" })
export default class Passwords extends VuexModule {
  public passwordList: PasswordEntryData[] = [
    { id: 0, title: "Google", url: "www.google.com", format: null },
  ];

  @Mutation
  public addPasswordEntry(entry: PasswordEntryData): void {
    entry.id = this.passwordList.length;
    this.passwordList.push(entry);
  }

  @Mutation
  public removePasswordEntry(id: number): void {
    this.passwordList = this.passwordList.filter(entry => entry.id != id);

    this.passwordList.forEach((element, i) => {
      element.id = i;
    });
  }
}
