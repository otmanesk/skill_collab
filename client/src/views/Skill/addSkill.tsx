import { Grid } from '@material-ui/core';
import { Button } from '../../components';
import React from 'react';
import { connect } from 'react-redux';

import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import Modal from 'react-awesome-modal';
import PropTypes from 'prop-types';

const GET_USERS = gql`
  query User($Id: String) {
    User(id: $Id) {
      id
      skills {
        id
        name
        value
      }
    }
  }
`;
const ADD_SKILL = gql`
  mutation addSkill($id: String!, $skills: [SkillInput]) {
    addSkill(id: $id, skills: $skills) {
      skills {
        id
        name
        value
      }
    }
  }
`;

class addSkill extends React.Component<any, any> {
  static propTypes: {
    auth: PropTypes.Validator<object>;
  };
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  openModal() {
    this.setState({
      visible: true
    });
  }

  closeModal() {
    this.setState({
      visible: false
    });
  }

  render() {
    let name, value;

    return (
      <Grid item xs={12} container>
        <Query query={GET_USERS} variables={{ Id: this.props.auth.user.id }}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            return (
              <Mutation
                mutation={ADD_SKILL}
                key={data.User.id}
                onCompleted={() => this.props.history.push(`/skills`)}
              >
                {(addSkill, { loading, error }) => (
                  <>
                    <Button
                      color="primary"
                      round
                      onClick={() => this.openModal()}
                    >
                      Add Skill
                    </Button>
                    <Modal
                      visible={this.state.visible}
                      width="400"
                      height="87%"
                      effect="fadeInUp"
                      onClickAway={() => this.closeModal()}
                    >
                      <div className="container">
                        <div className="panel panel-default">
                          <div className="panel-body">
                            <form
                              onSubmit={e => {
                                e.preventDefault();
                                addSkill({
                                  variables: {
                                    id: data.User.id,
                                    skills: {
                                      name: name.value,
                                      value: value.value
                                    }
                                  }
                                });
                                name.value = '';
                                value.value = '';
                              }}
                            >
                              <br />
                              <div className="form-group">
                                <label htmlFor="name">name:</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="name"
                                  ref={node => {
                                    name = node;
                                  }}
                                  placeholder="name"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="Type">Value:</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="Value"
                                  ref={node => {
                                    value = node;
                                  }}
                                  placeholder="Value"
                                />
                              </div>

                              <Button
                                color="primary"
                                round
                                type="submit"
                                onClick={() => this.closeModal()}
                              >
                                Add Skill
                              </Button>
                              <Button
                                color="primary"
                                round
                                onClick={() => this.closeModal()}
                              >
                                Close{' '}
                              </Button>
                            </form>
                          </div>
                        </div>
                      </div>

                      {loading && <p>Loading...</p>}
                      {error && <p>Error :( Please try again</p>}
                    </Modal>
                  </>
                )}
              </Mutation>
            );
          }}
        </Query>
      </Grid>
    );
  }
}
addSkill.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(addSkill);
