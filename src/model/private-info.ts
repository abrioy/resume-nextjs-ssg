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
