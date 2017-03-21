
/**
 * Created by uzysjung on 2016. 10. 21..
 */
import React, { PropTypes,Component } from 'react';
import Box from '../../components/widget/Box'
import { Link, browserHistory } from 'react-router'
import superagent from 'superagent';
import { Form , FormGroup, Col, Button, FormControl, Checkbox, ControlLabel , PageHeader, Alert } from 'react-bootstrap'

const styleLogin = {

    panel : {
        maxWidth : 600,
        position : 'absolute',
        top : '50%',
        left : '50%',
        transform : 'translate(-50%,-50%)'
    },
    header : {
        maxHeight : 40,
        bottomMargin : 100,
        borderBottom : '1px solid #bababa'

    }
};

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            password : ''
        }
    }

    componentWillMount() {
        const { authenticated, replace, redirect } = this.props;
        if (authenticated) {
            replace(redirect)
        }
    }
    componentDidMount() {
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        setTimeout(() => this.setState({error: false}), 3000);

        if ( !email || email.length < 1) {
            this.setState({error: 'Insert Email address'});
            return;
        }

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            this.setState({error: 'Please check whether this email is valid'});
            return;
        }
        if (!password) {
            this.setState({error: 'Insert Password'});
            return;
        }
        if ( password && password.length < 5 ) {
            this.setState({error: 'Password must be longer than 5 characters'});
            return;
        }

        superagent.post('/api/login').send({login_email: email, login_pw: password}).end((err, result) => {
            if (!err) {
                localStorage.setItem('jwt', result.body.token);
                browserHistory.push('/');
            } else {
                this.setState({error: 'Login email/password incorrect :('});
            }
        });
    };
    handleForChange = (e) => {
        console.log('e.target.id',e.target.id);
        switch(e.target.id) {
            case 'formHorizontalEmail' :
                this.setState( { email : e.target.value } );
                break;
            case 'formHorizontalPassword' :
                this.setState( { password : e.target.value } );
                break;
        }
    };

    renderAlert() {
        if (this.state.error) {
            return (
                <Alert bsStyle="danger">
                    {this.state.error}
                </Alert>
            )
        }
        return null;
    }
    render() {
        return (
                <div style={styleLogin.panel}>
                    <PageHeader style={styleLogin.header}>Weapon Management System</PageHeader>
                    <Box
                        title="Login"
                        status="info"
                        solid
                        >
                        <Form onSubmit={this.handleFormSubmit} horizontal>
                            <FormGroup controlId="formHorizontalEmail">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Email
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="email" placeholder="Email" value={this.state.email} onChange={this.handleForChange} />
                                </Col>
                            </FormGroup>

                            <FormGroup controlId="formHorizontalPassword">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Password
                                </Col>
                                <Col sm={10}>
                                    <FormControl type="password" placeholder="Password"  value={this.state.password} onChange={this.handleForChange}  />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Checkbox>Remember me</Checkbox>
                                </Col>
                            </FormGroup>
                            {this.renderAlert()}
                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button className="btn btn-success" type="submit">
                                        Sign in
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Box>



                </div>
        );
    }

}

export default LoginPage;
