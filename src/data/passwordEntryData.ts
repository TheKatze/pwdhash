import FormattingRules from "./formattingRules";

export default interface PasswordEntryData {
  id: number;
  url: string;
  username: string;

  format: FormattingRules | null;
}
