import React, {Component} from 'react';
import {Button, Header, Input, Modal} from 'semantic-ui-react';
import ErrorMessage  from './../error_message';

class UserModal extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange = (event) => {
        let state = {};
        state[event.target.name] = event.target.value
        state['changed$' + event.target.name] = event.target.name;
        this.setState(state);
    };


    persist = () => {
        let record = {};
        for (let k in this.state) {
            if (k.substr(0, 8) === 'changed$') {
                var attr = this.state[k];
                record[attr] = this.state[attr];
            }
        }
        if (Object.keys(record).length > 0) {
            record['id'] = this.props.detail.id;
            this.props.persist(record);
            this.state = {};
            this.setState({});
        }
    };


    remove = () => {
            if(this.props.detail) {
                let record = {'id': this.props.detail.id}
                this.props.remove(record);
                this.state = {};
                this.setState({});
            }
    };

    render = () => {
        if(!this.props.open) {
            return null
        }

        let state = {
            ...this.props.detail, ...this.state
        };
        return (
            <div>
                <Modal size={'large'} open={this.props.open}>
                    <Modal.Header>User

                        </Modal.Header>

                    <Modal.Content>

                        {this.props.error ? (ErrorMessage(this.props.error)) : ''}

                        <Header as='h3'>Id</Header>
                        <Input fluid placeholder='Id' name="id" value={state.id}/>
                        <Header as='h3'>Name</Header>
                        <Input fluid placeholder='Name' name="name" onChange={this.handleChange}
                               value={state.name}/>
                        <Header as='h3'>Email</Header>
                        <Input fluid placeholder='Email' name="email" onChange={this.handleChange}
                               value={state.email}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button content='Save' onClick={this.persist} positive/>
                        {this.props.detail.id? (<Button content='Remove' onClick={this.remove} negative/>):(null)}
                        <Button content='Close' onClick={this.props.close} negative/>

                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}


export default UserModal
