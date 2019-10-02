import React, {useContext, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {DictionaryContext, DispatchContext} from "../context/dictionary.context";
import {useHistory} from "react-router-dom";
import {useDidUpdateEffect} from "../hooks/useDidUpdateEffect";

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
    },
}));

function AddDictionaryButton() {
    const classes = useStyles();
    const dispatch = useContext(DispatchContext);
    const dictionaries = useContext(DictionaryContext);
    const history = useHistory();

    const lastDictionaryInList = dictionaries[dictionaries.length - 1];
    const [state, setState] = useState(dictionaries.length);

    useDidUpdateEffect(() => {
        history.push(`/dictionary/${lastDictionaryInList.id}`);
    }, [state]);

    return (
        <Fab aria-label="Add Dictionary" className={classes.fab} color="primary">
            <AddIcon onClick={() => {dispatch({type: 'CREATE'}); setState(state+1)}}/>
        </Fab>
    );
}

export default AddDictionaryButton;
