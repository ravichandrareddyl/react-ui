import React from 'react';
import { Router, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute, AppHeader, AppSider } from '../_components';
import { HomePage } from '../HomePage';
import { LoginContainer } from '../LoginContainer';
import { FormContainer, SearchFormContainer } from '../containers'
import { Layout, notification } from 'antd';
const { Content } = Layout;
import './App.css'

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert, user } = this.props;

        return (
            <Layout className="app-container">
                <AppHeader isAuthenticated={user ? true : false}
                    currentUser={user} />
                <Layout style={{ padding: '68px 0', background: '#fff' }}>
                    {user ? <AppSider /> : null}
                    <Content className="app-content">
                        <div className="container">
                            <Switch>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginContainer} />
                                <Route path="/compliance/forms" component={FormContainer} />
                                <Route path="/compliace/search" component={SearchFormContainer}/>
                            </Switch>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    const { alert, authentication } = state;
    const { user } = authentication;
    return {
        alert,
        user
    };
}

const connectedApp = connect(mapStateToProps)(withRouter(App));
export { connectedApp as App }; 