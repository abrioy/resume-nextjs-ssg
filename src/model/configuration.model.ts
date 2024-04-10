import { MDXComponents } from "mdx/types";
import { ConfigurationUtils } from "@/src/utils/configuration-utils";
import { Constant } from "@/src/model/constant.model";

export type ConfigurationTemplate =
  | string
  | ((variant: ConfigurationVariant) => string);

export class Configuration {
  readonly variants = this.conf.variants.map(
    (variant) => new ConfigurationVariant(variant),
  );
  readonly defaultVariant = this.variants[0];
  readonly repoUrl = this.conf.repoUrl;

  constructor(
    private conf: {
      // Language specific variants
      variants: ConfigurationVariantInit[];
      // Link to the GitHub repo of this project
      repoUrl?: string;
    },
  ) {}
}

export class ConfigurationVariant {
  readonly locale = this.conf.locale;

  readonly infos = {
    pageTitle: () =>
      ConfigurationUtils.stringTemplateValue(this, this.conf.infos.pageTitle),
    pageDesc: () =>
      ConfigurationUtils.stringTemplateValue(this, this.conf.infos.pageDesc),
    anonymousName: () =>
      ConfigurationUtils.stringTemplateValue(
        this,
        this.conf.infos.anonymousName,
      ),
    firstName: () =>
      ConfigurationUtils.stringTemplateValue(this, this.conf.infos.firstName),
    lastName: () =>
      ConfigurationUtils.stringTemplateValue(this, this.conf.infos.lastName),
    fullName: () =>
      ConfigurationUtils.stringTemplateValue(this, this.conf.infos.fullName),
    jobTitle: () =>
      ConfigurationUtils.stringTemplateValue(this, this.conf.infos.jobTitle),
    location: () =>
      ConfigurationUtils.stringTemplateValue(this, this.conf.infos.location),
  };

  readonly picture = {
    url: () =>
      ConfigurationUtils.stringTemplateValue(this, this.conf.picture?.url),
    type: () =>
      ConfigurationUtils.stringTemplateValue(this, this.conf.picture?.type),
    alt: () =>
      ConfigurationUtils.stringTemplateValue(this, this.conf.picture?.alt),
  };

  readonly socials = {
    linkedIn: () =>
      ConfigurationUtils.stringTemplateValue(this, this.conf.socials.linkedIn),
    github: () =>
      ConfigurationUtils.stringTemplateValue(this, this.conf.socials.github),
    gitlab: () =>
      ConfigurationUtils.stringTemplateValue(this, this.conf.socials.gitlab),
  };

  readonly documents = this.conf.documents;

  get baseUrlRoot(): string {
    return `${Constant.baseUrl}`;
  }

  get baseUrlAssets(): string {
    return `${this.baseUrlRoot}/assets/${this.locale.url}`;
  }

  constructor(private conf: ConfigurationVariantInit) {}
}

export interface ConfigurationVariantInit {
  locale: {
    // Label to show in the top bar for this locale
    label: string;
    // Url subpath for this locale
    url: string;
    // RegExp to redirect a browser to this locale
    navigatorLanguage: RegExp;
    // Value for the lang html attribute of this locale
    htmlLang: string;
    // Locale for OpenGraph (en_US, en_UK, etc.)
    openGraph: string;
  };

  infos: {
    // Title for the web page
    pageTitle: ConfigurationTemplate;
    // Description for the web page
    pageDesc: ConfigurationTemplate;
    // Initials or some other short text to show in place of the full name
    anonymousName: ConfigurationTemplate;
    // Full name
    firstName: ConfigurationTemplate;
    lastName: ConfigurationTemplate;
    fullName: ConfigurationTemplate;
    // Full job title
    jobTitle: ConfigurationTemplate;
    // Address, may be overridden in PrivateInfo
    location?: ConfigurationTemplate;
  };

  picture?: {
    // Relative profile picture url
    url: string;
    // MIME type for the profile picture (image/jpeg, image/png, etc.)
    type: string;
    // Alt text for the profile picture
    alt: ConfigurationTemplate;
  };

  socials: {
    // Link to a LinkedIn profile
    linkedIn?: ConfigurationTemplate;
    // Link to a GitHub profile
    github?: ConfigurationTemplate;
    // Link to a GitLab profile
    gitlab?: ConfigurationTemplate;
  };

  // List of resumes for this locale
  documents: VariantDocument[];
}

export interface VariantDocument {
  // Forces the document to be printed on a single page
  singlePage: boolean;
  // Short text to display next to the pdf link
  headerTitle: string;
  // File name for the exported resume pdf
  pdfName: string;
  // Longer text to show when hovering the pdf download button
  hoverDownload: string;
  // Longer text to show when hovering the print button
  hoverPrint: string;
  // Component to render
  component: (conf: VariantDocumentComponentArgs) => JSX.Element;
}

export type VariantDocumentComponentArgs = {
  variant: ConfigurationVariant;
  variantDocument: VariantDocument;
  components?: MDXComponents;
};
