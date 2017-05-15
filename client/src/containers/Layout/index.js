
/**
 * Created by uzysjung on 2016. 10. 21..
 */
import React ,{ Component, PropTypes }from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import { connect } from 'react-redux'
import superagent from 'superagent';
import NotificationSystem from 'react-notification-system';
import { Link, browserHistory } from 'react-router'
import Radium from 'radium'
import { signoutUser } from '../../actions/user.js'

const menuItem = [
    {
        key : 1,
        title : 'View Personnel',
        url : '/displayPersonnel',
        subMenu : null
    },
    {
        key : 2,
        title : 'Add Personnel',
        url : '/addPersonnel',
        subMenu : null
    },
    {
        key : 3,
        title : 'Weapon Issue',
        subMenu : [
            {
                key :3.1,
                title : 'Add Finger Print',
                url : `/addFingerprint`
            },
            {
                seperator : true
            },
            {
                key :3.2,
                title : 'View Finger Prints',
                url : '/fingers'
            }

        ]
    }


];

const loginMenu =
    {
        noLogin : {
            key : 100 ,
            title : 'Login',
            url : '/login'
        },
        Login : {
            key : 200 ,
            title : 'username',
            subMenu :[

                {
                    key :200.1,
                    title : 'Logout',
                    url : '/logout'
                }
            ]
        }
    };

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMenuKey : 1,
            loginTitle : 'userName'
        };

        this.handleMenuclick = this.handleMenuclick.bind(this);
    }

    handleMenuclick(mainKey,event) {

        if(mainKey < 100) {
            this.setState({
                selectedMenuKey : mainKey
            })
            const url = this.getURLfromMenu(mainKey);
            browserHistory.push(url);
        } else {
            //Login Menu
            if(this.props.authenticated) {
                //Login Menu
                for(const subItem of loginMenu.Login.subMenu) {
                    if(subItem.key.toString() == '200.1') {
                        console.log('signPit')
                        this.props.signoutUser()
                    }
                }
            } else {
                //NoLoginMenu
                browserHistory.push(loginMenu.noLogin.url);
            }
        }


    }
    getURLfromMenu( key ) {

        for ( const item of menuItem ) {
            if( key === item.key ) return item.url;
            if( item.subMenu && item.subMenu.length > 0 ) {
                for( const subItem of item.subMenu) {
                    if(key === subItem.key) return subItem.url;
                }
            }
        }



    }
    setselectedMenuKey(url) {

        for ( const item of menuItem ) {
            if(_.hasIn(item,'url')) {

                if( item.url.length === 1 && url == item.url || item.url.length > 1 && _.startsWith( url ,item.url) ) {

                    return item.key;
                }

            }
            if( item.subMenu && item.subMenu.length > 0 ) {
                for( const subItem of item.subMenu) {
                    if(_.hasIn(subItem,'url')) {
                        if( subItem.url.length === 1 && url == subItem.url || subItem.url.length > 1 && _.startsWith( url ,subItem.url) )
                        {
                            return subItem.key;
                        }

                    }
                }
            }
        }

    }
    componentWillMount() {
        if (!localStorage.getItem('jwt')) {
            return browserHistory.push('/login');
        }
        const curMenuKey = this.setselectedMenuKey(this.props.location.pathname);

        this.setState({
            selectedMenuKey : curMenuKey
        });


        var socket = io();
        setTimeout(() => {
            socket.on('connection', () => {
                console.log('a user connected');
            });
            console.log('Connected with Server');

            socket.on('enrolling', () => {
                console.log('enrooledd');
                this.notificationSystem.addNotification({
                    message: 'Someone is trying to enroll, kindly authorize',
                    level: 'success',
                    action: {
                        label: 'Authorize',
                        callback: () => {
                            console.log('auth');
                            socket.emit('enroll_ack', 'asdf');
                        }
                    }
                });
            });
            socket.on('enrolled', (data) => {
                console.log('enrolled', data);
                try {
                    const d = JSON.parse(data);
                    superagent.post('/api/soldier_finger').send({finger_id: d.FingerID});
                } catch (e) {

                }
                this.notificationSystem.addNotification({
                    message: 'Enrolling completed successfully',
                    level: 'success',
                    action: {
                        label: 'Navigate',
                        callback: () => {

                        }
                    }
                });
            });
            socket.on('broadcast', (data) => {
                console.log(data); // contains RFID and FINGER ID
                superagent.post('/api/fingers').send({finger_id: data.FingerID, rfid: data.RFID}).set('Authorization', localStorage.getItem('jwt')).end(() => {});
                this.notificationSystem.addNotification({
                    message: 'A suspicious person is trying to put his fucking finger on scanner',
                    level: 'success',
                    action: {
                        label: 'Navigate',
                        callback: () => {
                            browserHistory.push('/fingers');
                            console.log('Notification button clicked!');
                        }
                    }
                });
                if (window.location.pathname && location.pathname.indexOf('/fingers') >= 0) {
                    setTimeout(() => {
                        window.location.reload(true);
                    }, 100);
                }
                // send request to /api/fingers POST with data finger_id and name
                socket.emit('issueWeapon', 'YES');
            });
            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
            socket.on('connect_error', (e) => {
                console.log(e, 'err')
            });
        }, 1000);


        loginMenu.Login.title = this.props.userEmail;

    }
    componentDidMount() {

    }


    render() {
        return (
            <div>
                <NotificationSystem ref={(e) => this.notificationSystem = e} />
                <Header menu={menuItem} handleMenuclick={this.handleMenuclick} selectedMenuKey={this.state.selectedMenuKey} isAuthenticated={this.props.authenticated} loginMenu={loginMenu} />
                {this.props.children}
                <Footer />
            </div>
        );
    }

}

Layout.propTypes = {
    children: PropTypes.node
};


function mapStateToProps(state, ownProps) {

    return {
        authenticated : state.auth.authenticated,
        userEmail : state.auth.email || 'username'
    };

}

export default connect(mapStateToProps, { signoutUser })(Radium(Layout));
