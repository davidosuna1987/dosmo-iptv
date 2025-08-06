import { Main } from "@/components/common/main";
import { XtreamAddForm } from "@/components/xtream/xtream-add-form";

export default function AddIptvPage() {
  return (
    <Main>
      <div className="flex flex-col justify-center items-center pt-[12.5vh]">
        <XtreamAddForm />
      </div>
    </Main>
  );
}
