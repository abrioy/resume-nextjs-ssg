export interface PublicInfo {
  anonymousName: string;
  name: string;
  title: string;
  city?: string;
  linkedIn?: string;
  github?: string;
  pictureUrl?: string;
  cvPdfName: string;
  cvDesc: string;
  cvHoverDownload: string;
  cvHoverPrint: string;
  resumePdfName: string;
  resumeDesc: string;
  resumeHoverDownload: string;
  resumeHoverPrint: string;
}

export interface PrivateInfo {
  address1?: string;
  address2?: string;
  phone?: string;
  phoneInt?: string;
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
