export interface PublicInfo {
  // Main language for this page
  lang: string;

  // Title for the web page
  pageTitle: string;
  // Description for the web page
  pageDesc: string;
  // Initials or some other short text to show in place of the full name
  anonymousName: string;
  // Full name
  fullName: string;
  firstName: string;
  lastName: string;
  // Full job title
  jobTitle: string;
  // Address, may be overridden in PrivateInfo
  city?: string;
  // Profile picture
  picture?: {
    url: string;
    type: string;
    alt: string;
  };

  // Link to a LinkedIn profile
  linkedIn?: string;
  // Link to a GitHub profile
  github?: string;
  // Link to a GitLab profile
  gitlab?: string;

  // Link to the GitHub repo of this project
  repoUrl?: string;

  // File name for the exported resume pdf
  resumePdfName: string;
  // Short text to display next to the pdf link
  resumeDesc: string;
  // Longer text to show when hovering the pdf download button
  resumeHoverDownload: string;
  // Longer text to show when hovering the print button
  resumeHoverPrint: string;

  // File name for the exported cv pdf
  cvPdfName: string;
  // Short text to display next to the pdf link
  cvDesc: string;
  // Longer text to show when hovering the pdf download button
  cvHoverDownload: string;
  // Longer text to show when hovering the print button
  cvHoverPrint: string;

  // Open Graph info
  og: {
    lang: string;
    title: string;
    siteName: string;
  };
}

export interface PrivateInfo {
  // First address line
  address1?: string;
  // Second address line
  address2?: string;
  // Phone number to display
  phone?: string;
  // International phone number to add a clickable link
  phoneInt?: string;
  // email address
  email?: string;
}

const privateInfoKeys: Array<keyof PrivateInfo> = [
  "address1",
  "address2",
  "phone",
  "phoneInt",
  "email",
];

export const getPrivateInfo = (): PrivateInfo | null => {
  const params = new URLSearchParams(
    typeof window === "object" ? window.location.search : "",
  );
  const result: PrivateInfo = {};
  for (const key of privateInfoKeys) {
    const value = params.get(key);
    if (value) {
      result[key] = value;
    }
  }
  if (Object.keys(result).length > 0) {
    return result;
  }
  return null;
};
