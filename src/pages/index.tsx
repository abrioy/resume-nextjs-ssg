import { configuration } from "@/src/content/configuration";
import Variant from "@/src/components/variant";

export default function Index() {
  return (
    <>
      <Variant variant={configuration.defaultVariant}></Variant>
    </>
  );
}
