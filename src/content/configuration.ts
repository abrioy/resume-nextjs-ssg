import Resume from "@/src/content/fr/resume/resume";
import CV from "@/src/content/fr/cv/cv";
import { Configuration } from "@/src/model/configuration.model";

export const configuration: Configuration = new Configuration({
  repoUrl: "https://github.com/abrioy/resume-nextjs-ssg",

  variants: [
    {
      locale: {
        label: "English",
        url: "en",
        navigatorLanguage: /en/,
        htmlLang: "en",
        openGraph: "en_UK",
      },
      infos: {
        anonymousName: "API",
        firstName: "André",
        lastName: "Pinot",
        jobTitle: "House cat",
        pageTitle: (variant) =>
          `${variant.infos.firstName()} ${variant.infos.lastName()} - ${variant.infos.jobTitle()}`,
        pageDesc: (variant) =>
          `Resume of ${variant.infos.firstName()} ${variant.infos.lastName()}`,
        fullName: (variant) =>
          `${variant.infos.firstName()} ${variant.infos.lastName()}`,
        location: "Rennes",
      },
      picture: {
        url: "PINOT_Andre.jpg",
        type: "image/jpeg",
        alt: (variant) =>
          `Photo of ${variant.infos.firstName()} ${variant.infos.lastName()}`,
      },
      socials: {
        linkedIn: "linkedin.com/in/andrépinot",
        github: "github.com/andrépinot",
        gitlab: "gitlab.com/andrépinot",
      },
      documents: [
        {
          singlePage: true,
          headerTitle: "CV",
          pdfName: "CV_PINOT_Andre_house_cat.pdf",
          hoverDownload: "Download resume",
          hoverPrint: "Print resume",
          component: Resume,
        },
      ],
    },

    {
      locale: {
        label: "Français",
        url: "fr",
        navigatorLanguage: /fr/,
        htmlLang: "fr",
        openGraph: "fr_FR",
      },
      infos: {
        anonymousName: "API",
        firstName: "André",
        lastName: "Pinot",
        jobTitle: "Chat domestique",
        pageTitle: (variant) =>
          `${variant.infos.firstName()} ${variant.infos.lastName()} - ${variant.infos.jobTitle()}`,
        pageDesc: (variant) =>
          `CV de ${variant.infos.firstName()} ${variant.infos.lastName()}`,
        fullName: (variant) =>
          `${variant.infos.firstName()} ${variant.infos.lastName()}`,
        location: "Rennes",
      },
      picture: {
        url: "PINOT_Andre.jpg",
        type: "image/jpeg",
        alt: (variant) =>
          `Photo de ${variant.infos.firstName()} ${variant.infos.lastName()}`,
      },
      socials: {
        linkedIn: "linkedin.com/in/andrépinot",
        github: "github.com/andrépinot",
        gitlab: "gitlab.com/andrépinot",
      },
      documents: [
        {
          singlePage: true,
          headerTitle: "CV",
          pdfName: "CV_PINOT_Andre_chat_domestique.pdf",
          hoverDownload: "Télécharger le CV",
          hoverPrint: "Imprimer le CV",
          component: Resume,
        },
        {
          singlePage: false,
          headerTitle: "Dossier de compétence",
          pdfName: "CV_PINOT_Andre_chat_domestique_dossier_de_competences.pdf",
          hoverDownload: "Télécharger le dossier de compétence",
          hoverPrint: "Imprimer le dossier de compétence",
          component: CV,
        },
      ],
    },
  ],
});
