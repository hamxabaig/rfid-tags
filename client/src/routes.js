import React from 'react'
import { Route, Router, IndexRoute, browserHistory  } from 'react-router'
import { routerActions } from 'react-router-redux'

import { UserAuthWrapper } from 'redux-auth-wrapper'

import NotFoundPage from './containers/pages/NotFoundPage'
import Layout from './containers/Layout'
import HomePage from './containers/pages/HomePage'
import GithubPage from './containers/pages/GithubPage'
import LoginPage from './containers/pages/LoginPage'
import SignupPage from './containers/pages/SignupPage.js'
import SamplePage from './containers/pages/SamplePage.js'
import form from './containers/pages/form.js';
import display from './containers/pages/displayPersonnel.js';
import bootform from './containers/pages/bootStrapForm.js';

export default function (props = {}) {
    return (
        <Router history={browserHistory}>

            <Route path='/' component={Layout}>
                <IndexRoute component={HomePage} />
                <Route path='/github' component={GithubPage} />
                <Route path='/sample/:id' component={SamplePage} />
                <Route path='/addPersonnel' component={form} />
                <Route path='/bootForm' component={bootform} />
                <Route path='/displayPersonnel' component={display} />

            </Route>
            <Route path='/login' component={LoginPage} />
            <Route path='*' component={NotFoundPage} />
        </Router>
    )
}
