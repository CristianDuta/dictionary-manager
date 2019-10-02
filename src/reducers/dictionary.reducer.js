import uuid from "uuid/v4";
import ValidateDictionary from "../service/dictionary.validator";

const reducer = (state, action) => {
    switch (action.type) {
        case "CREATE":
            return [...state, {id: uuid(), title: `Dictionary #${state.length + 1}`, data: [], errors: [], warnings: []}];
        case "DELETE":
            return state.filter(dictionary => dictionary.id !== action.id);
        case 'UPDATE_TITLE':
            return state.map(dictionary =>
                dictionary.id === action.id ? {
                    ...dictionary,
                    title: action.title
                } : dictionary
            );
        case "ADD_ROW":
            return state.map(dictionary => {
                if (dictionary.id !== action.id) {
                    return dictionary;
                }
                dictionary.data = [
                    ...dictionary.data,
                    {rowId: uuid(), domain: action.domain, range: action.range}
                ];

                dictionary.data.forEach(rowData => ValidateDictionary(dictionary, rowData));
                return dictionary;
            });
        case "REMOVE_ROW":
            return state.map(dictionary => {
                if (dictionary.id !== action.id) {
                    return dictionary;
                }
                dictionary.data = dictionary.data.filter(row => row.rowId !== action.rowId);
                dictionary.errors = dictionary.errors.filter(rowId => rowId !== action.rowId);
                dictionary.warnings = dictionary.warnings.filter(rowId => rowId !== action.rowId);

                dictionary.data.forEach(rowData => ValidateDictionary(dictionary, rowData));
                return dictionary;
            });
        case "UPDATE_ROW":
            const newRow = {rowId: uuid(), domain: action.domain, range: action.range};

            return state.map(dictionary => {
                if (dictionary.id !== action.id) {
                    return dictionary;
                }
                dictionary.data.splice(dictionary.data.findIndex(row => row.rowId === newRow.rowId), 1, newRow);

                dictionary.data.forEach(rowData => ValidateDictionary(dictionary, rowData));
                return dictionary;
            });
        default:
            return state;
    }
};

export default reducer;
