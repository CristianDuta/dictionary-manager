import React, {createContext} from "react";
import {useLocalStorageReducer} from "../hooks/useLocalStorageReducer";
import dictionaryReducer from "../reducers/dictionary.reducer";

const defaultDictionaries = [
    {
        id: "49145347-0ab6-4e16-be6a-f228cf64a2b6",
        title: "Dictionary #1",
        data: [
            {
                rowId: "1570f8b5-e264-470a-8c74-fecaf2cd8332",
                domain: 'Stonegrey',
                range: 'Dark Grey'
            },
            {
                rowId: "f0b9ff3a-68c3-4c55-aaae-9d5ee51e1316",
                domain: 'Anthracite',
                range: 'Dark Grey'
            },
            {
                rowId: "ccb4d6ab-7aff-453b-b0c6-d749c16304a6",
                domain: 'Midnight Blue',
                range: 'Dark Blue'
            }
        ],
        warnings: [],
        errors: []
    },
    {
        id: "0847e3e0-c240-4b22-b8f9-15bc868c70e3",
        title: "Dictionary #2",
        data: [
            {
                rowId: "1570f8b5-e264-470a-8c74-fecaf2cd8332",
                domain: 'Stonegrey',
                range: 'Dark Grey'
            },
            {
                rowId: "f0b9ff3a-68c3-4c55-aaae-9d5ee51e1316",
                domain: 'Anthracite',
                range: 'Dark Grey'
            },
            {
                rowId: "ccb4d6ab-7aff-453b-b0c6-d749c16304a6",
                domain: 'Midnight Blue',
                range: 'Dark Blue'
            },
        ],
        warnings: [],
        errors: []
    },
    {
        id: "75968425-7a45-442c-a968-6a509770a6ac",
        title: "Dictionary #3",
        data: [
            {
                rowId: "1570f8b5-e264-470a-8c74-fecaf2cd8332",
                domain: 'Stonegrey',
                range: 'Dark Grey'
            },
            {
                rowId: "f0b9ff3a-68c3-4c55-aaae-9d5ee51e1316",
                domain: 'Anthracite',
                range: 'Dark Grey'
            },
            {
                rowId: "ccb4d6ab-7aff-453b-b0c6-d749c16304a6",
                domain: 'Midnight Blue',
                range: 'Dark Blue'
            },
            {
                rowId: "93e92ba5-faa7-4983-9f15-197af1edb24b",
                domain: "Midnight Blue",
                range: "Dark Blue",
            }
        ],
        warnings: [
            "ccb4d6ab-7aff-453b-b0c6-d749c16304a6",
            "93e92ba5-faa7-4983-9f15-197af1edb24b"
        ],
        errors: []
    },
    {
        id: "3cf8180c-40d3-430f-9510-114218709ec9",
        title: "Dictionary #4",
        data: [
            {
                rowId: "1570f8b5-e264-470a-8c74-fecaf2cd8332",
                domain: 'Stonegrey',
                range: 'Dark Grey'
            },
            {
                rowId: "f0b9ff3a-68c3-4c55-aaae-9d5ee51e1316",
                domain: 'Anthracite',
                range: 'Dark Grey'
            },
            {
                rowId: "ccb4d6ab-7aff-453b-b0c6-d749c16304a6",
                domain: 'Midnight Blue',
                range: 'Dark Blue'
            },
            {
                rowId: "ce19c5ce-dc1a-47f5-ade8-4909aae3ec40",
                domain: "Dark Grey",
                range: "Stonegrey"
            }
        ],
        warnings: [
            "1570f8b5-e264-470a-8c74-fecaf2cd8332",
            "f0b9ff3a-68c3-4c55-aaae-9d5ee51e1316",
            "ce19c5ce-dc1a-47f5-ade8-4909aae3ec40"
        ],
        errors: [
            "1570f8b5-e264-470a-8c74-fecaf2cd8332",
            "ce19c5ce-dc1a-47f5-ade8-4909aae3ec40"
        ]
    }
];

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
