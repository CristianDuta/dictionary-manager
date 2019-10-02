import React from "react";
import {AppBar, Grid, Paper, Toolbar, Typography, Container} from "@material-ui/core";
import {DictionaryProvider} from "./context/dictionary.context";
import Dictionary from "./components/Dictionary";
import DictionaryList from "./components/DictionaryList";
import {HashRouter as Router, Switch, Route} from "react-router-dom";
import AddDictionaryButton from "./components/AddDictionaryButton";
import NavigationBreadcrumbs from "./components/NavigationBreadcrumbs";
import HelpSnackBarAndButton from "./components/HelpSnackBarAndButton";

function App() {
    return (
        <Paper
            style={{
                padding: 0,
                margin: 0,
                height: "100vh",
                backgroundColor: "#fafafa"
            }}
            elevation={0}
        >
            <AppBar color='primary' position='static' style={{height: "64px"}}>
                <Toolbar>
                    <Typography color='inherit'>Dictionary Manager</Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg">
                <Grid container justify='center' style={{marginTop: "1rem"}}>
                    <Grid item xs={11}>
                        <DictionaryProvider>
                            <Router basename="/dictionary-manager">
                                <NavigationBreadcrumbs/>
                                <Switch>
                                    <Route exact path="/">
                                        <DictionaryList/>
                                        <AddDictionaryButton/>
                                    </Route>
                                    <Route exact path="/dictionary/:id">
                                        <Dictionary/>
                                        <HelpSnackBarAndButton/>
                                    </Route>
                                </Switch>
                            </Router>
                        </DictionaryProvider>
                    </Grid>
                </Grid>
            </Container>
        </Paper>
    );
}

export default App;
