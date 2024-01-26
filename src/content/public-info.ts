import { PublicInfo } from "@/src/model/info";

const firstName = "André";
const lastName = "Pinot";
const jobTitle = "Chat domestique";

export const publicInfo: PublicInfo = {
  lang: "fr",
  anonymousName: "API",
  firstName,
  lastName,
  jobTitle,
  pageTitle: `${firstName} ${lastName} - ${jobTitle}`,
  pageDesc: `Page du CV de ${firstName} ${lastName}`,
  fullName: `${firstName} ${lastName}`,
  city: "Rennes",
  linkedIn: "linkedin.com/in/andrépinot",
  github: "github.com/andrépinot",
  picture: {
    url: "PINOT_Andre.jpg",
    type: "image/jpeg",
    alt: `Photo de ${firstName} ${lastName}`,
  },
  cvPdfName: "CV_PINOT_Andre_chat_domestique_dossier_de_competences.pdf",
  resumePdfName: "CV_PINOT_Andre_chat_domestique.pdf",

  cvDesc: "Dossier de compétence",
  cvHoverDownload: "Télécharger le dossier de compétence",
  cvHoverPrint: "Imprimer le dossier de compétence",
  resumeDesc: "CV",
  resumeHoverDownload: "Télécharger le CV",
  resumeHoverPrint: "Imprimer le CV",

  og: {
    lang: "fr_FR",
    title: `CV - ${jobTitle}`,
    siteName: `${firstName} ${lastName}`,
  },

  repoUrl: "https://github.com/abrioy/resume-nextjs-ssg",
};
