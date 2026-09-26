'use client'
import { useState, useRef, useEffect, useCallback } from "react";
import type { PhotonFeature } from "./Searchbar";
import DropDownItem from "./DropdownItem";

interface DropDownItemListProps{
    list:PhotonFeature[]
}

export default function DropDownItemList({list}:DropDownItemListProps){
    const [selectedIndex, setSelectedIndex] = useState(0);

useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => Math.min(prev + 1, list.length - 1));
    }

    if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [list.length]);

useEffect(() => {
  document.getElementById(String(selectedIndex))?.focus();
}, [selectedIndex]);

    return (
        <div className="flex flex-col gap-2">
            {
                list.map((item,id)=>{
                    return <div tabIndex={0} id={String(id)} key={item.properties.osm_id} className="focus:border-[2px] border-solid focus:border-red-500">
                        <DropDownItem  item={item}  />
                    </div>
                })
            }
        </div>
    )
}