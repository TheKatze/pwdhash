import FormattingRules from "./formattingRules";

export default interface PasswordEntryData {
  id: number;
  title: string;
  url: string;

  format: FormattingRules | null;
}
