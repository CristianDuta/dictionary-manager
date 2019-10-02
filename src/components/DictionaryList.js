import React, {useContext} from "react";
import Grid from '@material-ui/core/Grid';
import {DictionaryContext} from "../context/dictionary.context";
import DictionaryItem from "./DictionaryItem";

function DictionaryList() {
    const dictionaries = useContext(DictionaryContext);
    return (
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            spacing={2}
        >
            {dictionaries.map(dictionary => (
                <Grid key={dictionary.id} item xs={12} sm={6} md={4} lg={3}>
                    <DictionaryItem dictionary={dictionary}/>
                </Grid>
            ))}
        </Grid>
    );
}

export default DictionaryList;
