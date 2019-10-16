import React, {useContext} from 'react';
import {Card, CardHeader, CardContent, CardActions} from '@material-ui/core';
import {Avatar, IconButton} from '@material-ui/core';
import {Table, TableBody, TableCell, TableRow} from "@material-ui/core";
import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    Check as CheckIcon,
    Warning as WarningIcon,
    Close as CloseIcon
} from '@material-ui/icons';
import {green, orange, red} from '@material-ui/core/colors';
import {makeStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import {DispatchContext} from "../context/dictionary.context";

const useStyles = makeStyles(() => ({
    green: {
        backgroundColor: green[500],
    },
    orange: {
        backgroundColor: orange[500],
    },
    red: {
        backgroundColor: red[500],
    },
}));

function DictionaryItem({dictionary}) {
    const classes = useStyles();
    const dispatch = useContext(DispatchContext);

    let avatar = (
        <Avatar className={classes.green} data-test-id="dictionary-success-icon">
            <CheckIcon/>
        </Avatar>
    );

    if (dictionary.errors.length > 0) {
        avatar = (
            <Avatar className={classes.red} data-test-id="dictionary-error-icon">
                <CloseIcon/>
            </Avatar>
        );
    } else if (dictionary.warnings.length > 0) {
        avatar = (
            <Avatar className={classes.orange} data-test-id="dictionary-warning-icon">
                <WarningIcon/>
            </Avatar>
        );
    }

    return (
        <Card>
            <CardHeader
                avatar={avatar}
                title={dictionary.title}
            />
            <Table className={classes.table} size="small">
                <TableBody>
                    {dictionary.data.slice(0, 3).map(row => (
                        <TableRow key={row.rowId}>
                            <TableCell>{row.domain}</TableCell>
                            <TableCell>{row.range}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <CardContent>

            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="Modify Dictionary" component={Link} to={`/dictionary/${dictionary.id}`}>
                    <EditIcon/>
                </IconButton>
                <IconButton aria-label="Remove Dictionary" onClick={() => {
                    dispatch({type: 'DELETE', id: dictionary.id})
                }}>
                    <DeleteIcon/>
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default DictionaryItem;
