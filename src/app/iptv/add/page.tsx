import { Main } from "@/components/common/main";
import { IptvForm } from "@/components/iptv/iptv-form";

export default function AddIptvPage() {
  return (
    <Main>
      <div className="flex justify-center items-center pt-[12.5vh]">
        <IptvForm />
      </div>
    </Main>
  );
}