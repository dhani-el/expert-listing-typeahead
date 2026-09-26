'use client'
import { useEffect, useState, useRef } from "react";
import { CloseCircle, Refresh2 } from "iconsax-reactjs";
import useDebounceHook from "@/hooks/useDebounceHook";


export interface PhotonGeometry {
  type: "Point";
  coordinates: [number, number]; 
}

export interface PhotonProperties {
  osm_id: number;
  osm_type: "N" | "W" | "R"; 
  osm_key?: string;          
  osm_value?: string;        
  name: string;
  country?: string;
  countrycode?: string;
  state?: string;
  city?: string;
  district?: string;
  locality?: string;
  street?: string;
  housenumber?: string;
  postcode?: string;
}

export interface PhotonFeature {
  type: "Feature";
  geometry: PhotonGeometry;
  properties: PhotonProperties;
}

export interface PhotonResponse {
  type: "FeatureCollection";
  features: PhotonFeature[];
}

interface SearchbarProps{
    raiseResult:(result:PhotonResponse|null)=>void
}

enum requestStatus{pending, error,done,init}

export default function Searchbar({raiseResult}:SearchbarProps){
    const [searchbarValue,setSearchBarValue] = useState("");
    const [searchStatus,setSearchStatus] = useState<requestStatus>(requestStatus.init);
    const searchResultLimit = 5;
    const AbortControlSignal = useRef<AbortController|null>(null);

    function handleInputChange(input:string){
        setSearchBarValue(()=>input);
    }

    async function searchLocation(){
        try{
            setSearchStatus((init)=>(requestStatus.pending))
            const response = await fetch(`https://photon.komoot.io/api/?q=${searchbarValue}&limit=${searchResultLimit}`,{signal:AbortControlSignal?.current?.signal});
            const parsedResponse:PhotonResponse = await response.json();
            setSearchStatus((init)=>(requestStatus.done))
            raiseResult(parsedResponse);
        }catch(error){
            console.log(error);
            setSearchStatus((init)=>(requestStatus.error));
        }
    }

    const debouncedSearchLocation = useDebounceHook(searchLocation,400)

    function clearSearchBar(){
        setSearchBarValue(()=>"");
        raiseResult(null);
    }

    useEffect(()=>{
        AbortControlSignal.current = new AbortController()
        if (searchbarValue.trim().length == 0) return;
        debouncedSearchLocation();

        return ()=>{
            AbortControlSignal.current?.abort("effect unmount")
        }
    },[searchbarValue])

    return (
        <div className="flex flex-col items-center gap-2" >
            <div className="flex items-center bg-amber-100 border rounded-md p-2 justify-between" >
                <input className=" text-black outline-0 border-none" placeholder="Enter your location" onChange={(e)=>handleInputChange(e.currentTarget.value)}
                    value={searchbarValue}
                type="text" />

                <span>
                    {
                        searchStatus == requestStatus.pending? <Refresh2 className="animate-spin"  /> :<CloseCircle onClick={clearSearchBar}/>
                    }
                </span>
            </div>
            {searchStatus == requestStatus.error && <button tabIndex={0} className="bg-amber-800 rounded-md p-2 text-white" onClick={searchLocation}>Retry</button>}
        </div>
    )
}