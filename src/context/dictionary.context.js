import React, {createContext} from "react";
import {useLocalStorageReducer} from "../hooks/useLocalStorageReducer";
import dictionaryReducer from "../reducers/dictionary.reducer";
import defaultDictionaries from "../fixtures/dictionaries";

export const DictionaryContext = createContext();
export const DispatchContext = createContext();

export function DictionaryProvider(props) {
    const [dictionaries, dispatch] = useLocalStorageReducer(
        "dictionaries",
        defaultDictionaries,
        dictionaryReducer
    );
    return (
        <DictionaryContext.Provider value={dictionaries}>
            <DispatchContext.Provider value={dispatch}>
                {props.children}
            </DispatchContext.Provider>
        </DictionaryContext.Provider>
    );
}
