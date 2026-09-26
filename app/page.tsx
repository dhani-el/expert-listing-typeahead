
import TypeAhead from "@/components/Typeahead/Typeahead";
import SelectedLocation from "@/components/SelectedLocation/SelectedLocation";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <TypeAhead/>
        <SelectedLocation/>
    </div>
  );
}
