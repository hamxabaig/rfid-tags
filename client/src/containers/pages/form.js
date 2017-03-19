import React  from 'react';
import PageWrapper from '../../components/page/PageWrapper';
import { FormGroup , InputGroup, FormControl, Button, Grid , Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap'

export default class Test extends React.Component{
    render(){
        return (


                <form>
                    <FormGroup>
                        <label>Name</label>
                        <FormControl Type="text" placeholder="Enter Person Name" ref="name"></FormControl>
                    </FormGroup>
                    <FormGroup>
                        <label>Army Number</label>
                        <FormControl Type="text" placeholder="Enter Person number" ref="number"></FormControl>
                    </FormGroup>
                    <FormGroup>
                        <label>Date of Birth</label>
                        <FormControl Type="text" placeholder="Enter Person dob" ref="dob"></FormControl>
                    </FormGroup>
                    <FormGroup>
                        <label>Current Unit</label>
                        <FormControl Type="text" placeholder="Enter Current Unit" ref="currentUnit"></FormControl>
                    </FormGroup>
                </form>
        
        );
    }
}
