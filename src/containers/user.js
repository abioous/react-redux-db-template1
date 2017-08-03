import React, {Component} from 'react';
import {connect} from 'react-redux';


import {fetchAll, persist, remove} from '../actions/user';

import {Grid, Table, Container, Segment, Header, Button, Icon} from 'semantic-ui-react';
import UserModal  from '../components/user/modal';

class UserView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            record:[],
            editModalOpen: false,
        };
    }

    componentDidMount = () => {
        this.fetchAll();
    };




    fetchAll = () => {
        fetchAll(this.props.dispatch);
    };


    persist = (record) => {
        persist(this.props.dispatch, record, this.closeEditModal);
    };


    remove = (record) => {
        remove(this.props.dispatch, record, this.closeEditModal);
    };



    newRecord = () => {
        this.setState({record: {}});
        this.openEditModal()
    };


    editRecord = (row) =>  {
        this.setState({record: row});
        this.openEditModal()
    };


    renderUserRow = (row) => {
        const {id, name, email} = row;
        return (
            <Table.Row onClick={(event) => this.editRecord(row)}>
                <Table.Cell>
                    {id}
                </Table.Cell>
                <Table.Cell>
                    {name}
                </Table.Cell>
                <Table.Cell>
                    {email}
                </Table.Cell>
            </Table.Row>
        );
    };


    render = () => {

        let error;
        if (this.props.action) {
            if (this.props.action.error) {
                error = this.props.action.error;
            }
        }
        return (
            <div>
                <Container>
                    <Segment>
                        <Grid>
                            <Grid.Column width={6}>
                                <Header as='h2'>Users</Header>
                            </Grid.Column>
                            <Grid.Column width={2} floated='right'>
                                <Button content='Add New'
                                        onClick={this.newRecord}
                                        positive
                                />
                            </Grid.Column>
                        </Grid>
                        <Table fixed striped>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Id</Table.HeaderCell>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Email</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {(this.props.records) ? this.props.records.map(this.renderUserRow, this) : ''}
                            </Table.Body>
                        </Table>
                    </Segment>
                </Container>
                <UserModal detail={this.state.record} error={error} persist={this.persist} remove={this.remove} close={this.closeEditModal}
                           open={this.state.editModalOpen}/>
            </div>
        )
    };

    openEditModal = () => {
        this.setState({editModalOpen: true})
    };

    closeEditModal = () => {
        this.setState({editModalOpen: false})
    }

}


function mapStateToProps(storeState) {
    let userStoreState = storeState.user;
    let result = {
        action: userStoreState.action,
    };
    if (userStoreState.records) {
        result['records'] = userStoreState.records;
    }
    return result;
}


export default connect(mapStateToProps)(UserView)
