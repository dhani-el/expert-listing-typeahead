'use client'

import { useState, useCallback } from "react"

export default function TypeAhead(){
    const [searchResult, setSearchResult] = useState();

    const searchResultSetter = useCallback(setSearchResult,[])

    return (
        <div>
            
        </div>
    )
}