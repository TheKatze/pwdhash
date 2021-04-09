import PasswordEntryData from "@/data/passwordEntryData";
import { VuexModule, Module, Mutation } from "vuex-module-decorators";

const localStorage = window.localStorage;

@Module({ namespaced: true, name: "passwords" })
export default class Passwords extends VuexModule {
  public passwordList: PasswordEntryData[] = JSON.parse(
    localStorage.getItem("entries") ?? "[]"
  );

  @Mutation
  public addPasswordEntry(entry: PasswordEntryData): void {
    entry.id = this.passwordList.length;
    this.passwordList.push(entry);

    localStorage.setItem("entries", JSON.stringify(this.passwordList));
  }

  @Mutation
  public removePasswordEntry(id: number): void {
    this.passwordList = this.passwordList.filter(entry => entry.id != id);

    this.passwordList.forEach((element, i) => {
      element.id = i;
    });

    localStorage.setItem("entries", JSON.stringify(this.passwordList));
  }
}
