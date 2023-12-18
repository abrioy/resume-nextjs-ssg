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
  const [privateInfo, setPrivateInfo] = useState<PrivateInfo | null>(null);
  useEffect(() => {
    setPrivateInfo(getPrivateInfo());
  }, []);

  return (
    <Info
      isPublic={!privateInfo}
      isAnonymous={false}
      anonymousName={publicInfo.anonymousName}
      name={publicInfo.name}
      title={publicInfo.title}
      city={publicInfo.city}
      linkedIn={publicInfo.linkedIn}
      github={publicInfo.github}
      pictureUrl={type === "resume" && publicInfo.pictureUrl}
      address1={privateInfo?.address1}
      address2={privateInfo?.address2}
      phone={privateInfo?.phone}
      phoneInt={privateInfo?.phoneInt}
      email={privateInfo?.email}
    >
      {children}
    </Info>
  );
}
