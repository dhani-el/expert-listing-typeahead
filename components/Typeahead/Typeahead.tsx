'use client'
import Searchbar from "./Searchbar";
import DropDownItemList from "./DropdownList";
import type { PhotonResponse } from "./Searchbar";
import { useState, useCallback, useEffect, memo } from "react"

const MemoSearchBar = memo(Searchbar);

export default function TypeAhead(){
    const [searchResult, setSearchResult] = useState<PhotonResponse | null>();
    const resultIsEmpty = (searchResult != null) && searchResult?.features.length < 1;

    const searchResultSetter = useCallback((result:PhotonResponse |null)=>{
        setSearchResult(()=>result);
    }
    ,[]);

    
    return (
        <div className="text-black">
            <MemoSearchBar  raiseResult={searchResultSetter} />
            {searchResult?.features && <DropDownItemList list={searchResult?.features} />}
            {resultIsEmpty && <p className="text-center">No Result</p>}
        </div>
    )
}