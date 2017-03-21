import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import PageWrapper from '../../components/page/PageWrapper';
import { FormGroup , InputGroup, FormControl, Button, Grid , Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap'
import superagent from 'superagent';
import NotificationSystem from 'react-notification-system';
export default class Test extends React.Component{
    componentDidMount(){
    }
constructor(props) {
  super(props);
}
componentDidMount(){
}
    render(){
        return (

                <form ref={(e) =>this.form =e}>
                    <NotificationSystem ref="notificationSystem" />
                    <FormGroup>
                        <label>Name</label>
                        <FormControl name="name" Type="text" placeholder="Enter Person Name" inputRef={(e) => this.name = e}></FormControl>
                    </FormGroup>
                    <FormGroup>
                        <label>Army Number</label>
                        <FormControl Type="number" placeholder="Enter Person number" inputRef={(e) => this.armyNumber = e}></FormControl>
                    </FormGroup>
                    <FormGroup>
                        <label>Date of Birth</label>
                        <FormControl Type="text" placeholder="Enter Person dob" inputRef={(e) => this.dob = e}></FormControl>
                    </FormGroup>
                    <FormGroup>
                        <label>Current Unit</label>
                        <FormControl Type="text" placeholder="Enter Current Unit" inputRef={(e) => this.currentUnit = e}></FormControl>
                    </FormGroup>
                    <FormGroup>
                        <label>Rank</label>
                        <FormControl Type="text" placeholder="Enter Current Rank" inputRef={(e) => this.rank = e}></FormControl>
                    </FormGroup>
                    <FormGroup>
                        <label>Batch no</label>
                        <FormControl Type="number" placeholder="Enter Batch Number" inputRef={(e) => this.batchNo = e}></FormControl>
                    </FormGroup>
                    <FormGroup>
                        <label>Medical Category</label>
                        <FormControl Type="text" placeholder="Enter Medical Category" inputRef={(e) => this.medCat = e}></FormControl>
                    </FormGroup>
                    <FormGroup>
                        <label>Trade </label>
                        <FormControl Type="text" placeholder="Enter Trade" inputRef={(e) => this.trade = e}></FormControl>
                    </FormGroup>
                    <FormGroup>
                        <label>Military Courses</label>
                        <FormControl Type="text" placeholder="Enter Militarty courses" inputRef={(e) => this.courses = e}></FormControl>
                    </FormGroup>
                    <FormGroup>
                        <label>Children</label>
                        <FormControl Type="text" placeholder="Enter Children" inputRef={(e) => this.children = e}></FormControl>
                    </FormGroup>
                    <FormGroup>
                        <label>Parents </label>
                        <FormControl Type="text" placeholder="Enter Parents" inputRef={(e) => this.parents = e}></FormControl>
                    </FormGroup>
                    <InputGroup.Button>
                        <Button id='submit' bsStyle="success" onClick={this.handleSubmit}>Add Person  </Button>
                    </InputGroup.Button>
                </form>

        );

    }
    handleSubmit = (event) => {

        event.preventDefault();
        const name = (this.name).value.trim();
        const  army_number= (this.armyNumber).value.trim();
        const dob = (this.dob).value.trim();
        const current_unit = (this.currentUnit).value.trim();
        const rank =(this.rank).value.trim();
        const batch_no =(this.batchNo).value.trim();
        const med_cat = (this.medCat).value.trim();
        const trade =(this.trade).value.trim();
        const mil_courses = [(this.courses).value.trim()];
        const children = [(this.children).value.trim()];
        const parents =[(this.parents).value.trim()];
        this.form.reset();


        superagent.post("/api/persons").set('Authorization', localStorage.getItem('jwt')).send({
            name,
            army_number,
            dob,
            current_unit,
            rank,
            batch_no,
            med_cat,
            trade,
            mil_courses,
            children,
            parents
        }).end(function(error,result){
            if(!error){
                console.log("Inserted");
                console.log(result);
                //Todo state Update Successfull
                //todo empty form
                ReactDOM.findDOMNode(this.name).value = '';

            }else{
                console.log("An error occured");
            }
        });
        this.refs.notificationSystem.addNotification({
          message: 'successully added',
          level: 'success'
        });
    }
}
