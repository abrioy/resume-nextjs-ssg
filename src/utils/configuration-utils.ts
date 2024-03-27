import {
  ConfigurationTemplate,
  ConfigurationVariant,
} from "@/src/model/configuration.model";

export class ConfigurationUtils {
  static stringTemplateValue(
    variant: ConfigurationVariant,
    templateString: ConfigurationTemplate,
  ): string;
  static stringTemplateValue(
    variant: ConfigurationVariant,
    templateString: ConfigurationTemplate | undefined,
  ): string | undefined;
  static stringTemplateValue(
    variant: ConfigurationVariant,
    templateString: ConfigurationTemplate | undefined,
  ): string | undefined {
    return !templateString || typeof templateString === "string"
      ? templateString
      : templateString(variant);
  }
}
