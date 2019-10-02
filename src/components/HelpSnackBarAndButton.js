import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Help from '@material-ui/icons/Help';
import {Fab, Button, Snackbar} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
    }
}));

function HelpSnackBarAndButton() {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState();

    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    return (
        <React.Fragment>
            <Fab color="secondary" className={classes.fab} onClick={onOpen}>
                <Help/>
            </Fab>
            <Snackbar
                open={isOpen}
                message={
                    <>
                        A dictionary is said to be consistent if none of the following problems occurs:
                        <ul>
                            <li>
                                <b>Duplicates</b>. Duplicate Domain - Range pairs: Two rows in the dictionary map to the
                                same value, simply resulting in duplicate content.
                            </li>
                            <li>
                                <b>Forks</b>. Duplicate Domains with different Ranges: Two rows in the dictionary map to
                                different values, resulting in an ambiguous transformation.
                            </li>
                            <li>
                                <b>Cycles</b>. Two or more rows in a dictionary result in cycles, resulting in a
                                never-ending transformation.
                            </li>
                            <li><
                                b>Chains</b>. A chain structure in the dictionary (a value in Range column also appears
                                in Domain column of another entry), resulting in inconsistent transformation.
                            </li>
                        </ul>
                    </>
                }
                action={(
                    <Button color="secondary" size="small" onClick={onClose}>
                        Close
                    </Button>
                )}
            />
        </React.Fragment>
    );
}

export default HelpSnackBarAndButton;
