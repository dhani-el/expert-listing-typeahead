
'use client'

import TypeAhead from "@/components/Typeahead/Typeahead";
import SelectedLocation from "@/components/SelectedLocation/SelectedLocation";
import { useState } from "react";

export default function Home() {
  const [selectedValue, setSelectedValue] = useState();
  
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans ">
        <TypeAhead/>
        <SelectedLocation/>
    </div>
  );
}
