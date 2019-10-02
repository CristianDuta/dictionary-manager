import React, {useContext} from "react";
import Paper from "@material-ui/core/Paper";
import {DictionaryContext, DispatchContext} from "../context/dictionary.context";
import MaterialTable from "material-table";
import {makeStyles, TextField} from "@material-ui/core";
import {useParams, useLocation, useHistory} from "react-router-dom";
import {orange, red} from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
    textField: {
        margin: theme.spacing(0)
    },
}));

function Dictionary() {
    const classes = useStyles();
    const {id} = useParams();
    const location = useLocation();
    const history = useHistory();
    const searchParams = new URLSearchParams(location.search);
    const dispatch = useContext(DispatchContext);
    const dictionaries = useContext(DictionaryContext);
    const dictionary = dictionaries.find(dictionary => dictionary.id === id);

    const dispatchTableAction = (action, data) => Promise.resolve(dispatch({
        type: action, id: dictionary.id, ...data
    }));

    const customFilterAndSearch = (term, rowData) => {
        let decodedTerm;

        try {
            decodedTerm = JSON.parse(decodeURIComponent(term));
        } catch (e) {
            decodedTerm = term;
        }

        const termIsMatchedInRowData = (term) => {
            return ["domain", "range"].some((k) => rowData[k].toLowerCase().includes(term.toLowerCase()));
        };

        if (Array.isArray(decodedTerm)) {
            return decodedTerm.some((term) => termIsMatchedInRowData(term));
        } else {
            return termIsMatchedInRowData(term);
        }
    };

    return (
        <Paper>
            <MaterialTable
                title={(
                    <TextField
                        className={classes.textField}
                        defaultValue={dictionary.title}
                        margin="normal"
                        inputProps={{'aria-label': 'bare'}}
                        onChange={(event) => {
                            dispatch({type: 'UPDATE_TITLE', id: dictionary.id, title: event.target.value})
                        }}
                    />
                )}
                columns={[
                    {title: 'Domain', field: 'domain', defaultFilter: searchParams.get('terms'), customFilterAndSearch},
                    {title: 'Range', field: 'range', defaultFilter: searchParams.get('terms'), customFilterAndSearch}
                ]}
                data={
                    dictionary.data
                }
                editable={{
                    onRowAdd: rowData => dispatchTableAction('ADD_ROW', rowData),
                    onRowUpdate: rowData => dispatchTableAction('UPDATE_ROW', rowData),
                    onRowDelete: rowData => dispatchTableAction('REMOVE_ROW', rowData)
                }}
                options={{
                    rowStyle: rowData => ({
                        backgroundColor: dictionary.errors.includes(rowData.rowId) ? red[400] :
                            dictionary.warnings.includes(rowData.rowId) ? orange[200] : '#FFF'
                    }),
                    actionsColumnIndex: -1
                }}
                actions={[
                    rowData => ({
                        icon: 'search',
                        tooltip: 'Find offenders',
                        onClick: (event, rowData) => {
                            const termsQuery = encodeURIComponent(JSON.stringify([rowData.domain, rowData.range]));
                            history.push(`/dictionary/${dictionary.id}?terms=${termsQuery}`)
                        }
                    })
                ]}

            />
        </Paper>
    );
}

export default Dictionary;
