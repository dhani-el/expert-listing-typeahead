import { useCallback, useEffect, useRef } from "react";



export default function useDebounceHook(callback:Function,timeoutDuration: number | string){

    const entryTimeoutRef = useRef<NodeJS.Timeout | null >(null);

    const debouncedFunction = useCallback((...args:any[])=>{
         if (entryTimeoutRef.current != null) {
            clearTimeout(entryTimeoutRef.current);
        }

         entryTimeoutRef.current = setTimeout(
                ()=>{
                    callback(...args)
                },
                Number(timeoutDuration)
            );
    },[callback,timeoutDuration])

    useEffect(()=>{
               

       return ()=>{
            if (entryTimeoutRef.current != null)  clearTimeout(entryTimeoutRef.current);
       }   
    },[]);

    return debouncedFunction
}