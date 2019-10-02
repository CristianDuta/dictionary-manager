import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Typography, Breadcrumbs, Link} from '@material-ui/core';
import {Link as RouterLink, Route, useLocation} from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home';
import {DictionaryContext} from "../context/dictionary.context";

const useStyles = makeStyles(theme => ({
    root: {
        paddingBottom: theme.spacing(2,),
    },
    link: {
        display: 'flex',
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    },
}));

function NavigationBreadcrumbs() {
    const classes = useStyles();
    const dictionaries = useContext(DictionaryContext);
    const location = useLocation();
    const searchTerms = new URLSearchParams(location.search).get('terms');

    return (
        <div className={classes.root}>
            <Route
                path="/"
                exact
                render={() => (
                    <Breadcrumbs aria-label="breadcrumb">
                        <Typography color="textPrimary" className={classes.link}>
                            <HomeIcon className={classes.icon}/>
                            Dictionary List
                        </Typography>
                    </Breadcrumbs>
                )}
            />
            <Route
                path="/dictionary/:id"
                exact
                render={({match}) => {
                    const {id} = match.params;
                    const dictionary = dictionaries.find(dictionary => dictionary.id === id);

                    const breadcrumbs = [{
                        el: <><HomeIcon className={classes.icon}/>Dictionary List</>,
                        path: '/'
                    }, {
                        el: <>{dictionary.title}</>,
                        path: `/dictionary/${dictionary.id}`
                    }];

                    if (searchTerms) {
                        breadcrumbs.push({
                            el: <>{searchTerms}</>,
                            path: ''
                        });
                    }

                    return (
                        <Breadcrumbs aria-label="breadcrumb">
                            {breadcrumbs.map((breadcrumb, index, {length}) => (
                                index < length - 1 ? (
                                    <Link color="inherit" to={breadcrumb.path} className={classes.link} component={RouterLink}
                                          key={index}>
                                        {breadcrumb.el}
                                    </Link>
                                ) : (
                                    <Typography color="textPrimary" className={classes.link} key={index}>
                                        {breadcrumb.el}
                                    </Typography>
                                )
                            ))}
                        </Breadcrumbs>
                    );
                }}
            />
        </div>
    );
}

export default NavigationBreadcrumbs;
