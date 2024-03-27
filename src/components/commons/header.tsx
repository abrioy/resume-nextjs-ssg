import Info from "@/src/components/layout/_info";
import { ReactElement, useEffect, useState } from "react";
import { getPrivateInfo, PrivateInfo } from "@/src/model/private-info";
import { ConfigurationVariant } from "@/src/model/configuration.model";

export default function Header({
  variant,
  children,
}: {
  variant: ConfigurationVariant;
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
      variant={variant}
      privateInfo={privateInfo}
    >
      {children}
    </Info>
  );
}
