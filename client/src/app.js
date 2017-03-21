/**
 * Created by uzysjung on 16. 7. 9..
 */

import React ,{ Component, PropTypes }from 'react'
import { Provider } from 'react-redux'
import NotificationSystem from 'react-notification-system';
import { store , history } from './store'
import localStore from '../../node_modules/store/store.js'
import 'font-awesome-webpack2'
// import '../../node_modules/bootstrap/dist/js/bootstrap'
import Routes from './routes'
import { authUser } from './actions/user.js';
import superagent from 'superagent';

var socket = io();
if(localStore.get('token')) {
    store.dispatch(authUser());
}
setTimeout(function () {
    socket.on('connection', function() {
        console.log('a user connected');
    });
    console.log('Connected with Server');

    socket.on('broadcast', function (data) {
        console.log(data); // contains RFID and FINGER ID
        const issueWeapon = prompt(data);
        if (issueWeapon === 'yes') {
            superagent.post('/api/fingers').send({finger_id: data.FingerID})
            // send request to /api/fingers POST with data finger_id and name
            socket.emit('issueWeapon', 'YES');
        }
    });
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('connect_error', function (e) {
        console.log(e, 'err')
    });
}, 1000);


export default function App() {
    return (

        <Provider store={store}>
            <Routes history={history} />
        </Provider>
    );
}
const propTypes = {
    store: PropTypes.object,
    history : PropTypes.object,
    // layout : PropTypes.component
};
App.propTypes = propTypes;
