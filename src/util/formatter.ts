import FormattingRules from "@/data/formattingRules";

export default class Formatter {
  static format(password: string, rules: FormattingRules): string {
    if (rules.noSpecialChars) {
      password = password.replace(/\W/g, "");
    }

    return password.substr(0, rules.length);
  }
}
