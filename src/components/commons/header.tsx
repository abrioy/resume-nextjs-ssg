import Info from "@/src/components/layout/_info";
import { ReactElement, useEffect, useState } from "react";
import { publicInfo } from "@/src/content/public-info";
import { getPrivateInfo, PrivateInfo } from "@/src/model/info";

export default function Header({
  type,
  children,
}: {
  type: "cv" | "resume";
  children?: ReactElement | ReactElement[];
}) {
  const [privateInfo, setPrivateInfo] = useState<PrivateInfo>({});
  useEffect(() => {
    setPrivateInfo(getPrivateInfo() || {});
  }, []);

  return (
    <Info
      isPublic={!privateInfo}
      isAnonymous={false}
      publicInfo={publicInfo}
      privateInfo={privateInfo}
    >
      {children}
    </Info>
  );
}
