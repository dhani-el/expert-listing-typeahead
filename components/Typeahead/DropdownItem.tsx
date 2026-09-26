
import type { PhotonFeature } from "./Searchbar"

interface DropDownItemProps{
    item:PhotonFeature
}


export default function DropDownItem({item}:DropDownItemProps){
    const properties = item.properties
    return (
        <div  className="p-2 rounded-b-md bg-amber-200 border border-amber-800">
            <p>{`${properties?.street ?? ""} ${properties?.district ??""}`}</p>
            <p>{`${properties.state ?? ""} ${properties.country ?? ""}`}</p>
        </div>
    )
}