import React, { Component } from 'react';



import { BrowserRouter as Router, Route, Link, Redirect, withRouter, Switch  } from 'react-router-dom';

import User from './user';

import AppMenu from './../components/menu';

class App extends Component {
    render() {
        return (
            <Router>
                <AppMenu >
                    <Switch>
                        <Route path='/user' component={User} />
                    </Switch>
                </AppMenu>
            </Router>
        );
    }
}

export default App;
