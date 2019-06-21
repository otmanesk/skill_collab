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
      education {
        id
        school
        diploma
        university
        trainings
        certification
      }
    }
  }
`;
const ADD_EDUCATION = gql`
  mutation addEducation($id: String!, $education: [EducationInput]) {
    addEducation(id: $id, education: $education) {
      education {
        id
        school
        diploma
        university
        trainings
        certification
      }
    }
  }
`;

class addEducation extends React.Component<any, any> {
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
    let school, diploma, university, trainings, certification;

    return (
      <Grid item xs={12} container>
        <Query query={GET_USERS} variables={{ Id: this.props.auth.user.id }}>
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;
            return (
              <Mutation
                mutation={ADD_EDUCATION}
                key={data.User.id}
                onCompleted={() => this.props.history.push(`/education`)}
              >
                {(addEducation, { loading, error }) => (
                  <>
                    <Button
                      color="primary"
                      round
                      onClick={() => this.openModal()}
                    >
                      Add Education
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
                                addEducation({
                                  variables: {
                                    id: data.User.id,
                                    education: {
                                      school: school.value,
                                      diploma: diploma.value,
                                      university: university.value,
                                      trainings: trainings.value,
                                      certification: certification.value
                                    }
                                  }
                                });
                                school.value = '';
                                diploma.value = '';
                                university.value = '';
                                trainings.value = '';
                                certification.value = '';
                              }}
                            >
                              <br />
                              <div className="form-group">
                                <label htmlFor="school">school name:</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="school"
                                  ref={node => {
                                    school = node;
                                  }}
                                  placeholder="school"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="diploma">diploma :</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="diploma"
                                  ref={node => {
                                    diploma = node;
                                  }}
                                  placeholder="Diploma"
                                />
                              </div>

                              <div className="form-group">
                                <label htmlFor="university">university :</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="university"
                                  ref={node => {
                                    university = node;
                                  }}
                                  placeholder="university"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="trainings">Trainings :</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="trainings"
                                  ref={node => {
                                    trainings = node;
                                  }}
                                  placeholder="trainings"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="certification">
                                  certification:
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="certification"
                                  ref={node => {
                                    certification = node;
                                  }}
                                  placeholder="certification"
                                />
                              </div>

                              <Button
                                color="primary"
                                round
                                type="submit"
                                onClick={() => this.closeModal()}
                              >
                                Add Education
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
addEducation.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(addEducation);
