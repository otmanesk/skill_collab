import { Grid, Paper } from '@material-ui/core';
import { Button, ItemGrid, RegularCard } from '../../components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import Modal from 'react-awesome-modal';
import { Table } from '../../components';
import Popup from 'reactjs-popup';

const DELETE_FORMATION = gql`
  mutation deleteFormation($id: String!, $formations: [FormationInput]) {
    deleteFormation(id: $id, formations: $formations) {
      id
      name
    }
  }
`;
const Update_FORMATION = gql`
  mutation updateFormation($id: String!, $formations: [FormationInput]) {
    updateFormation(id: $id, formations: $formations) {
      formations {
        id
        name
        Type
        Site
        Rank
        Formateur
        startDate
        EndDate
      }
    }
  }
`;
const GET_USERS = gql`
  query User($Id: String) {
    User(id: $Id) {
      id
      formations {
        id
        name
        Type
        Site
        Rank
        Formateur
        startDate
        EndDate
      }
    }
  }
`;

const ADD_FORMATION = gql`
  mutation addFormation($id: String!, $formations: [FormationInput]) {
    addFormation(id: $id, formations: $formations) {
      formations {
        id
        name
        Type
        Site
        Rank
        Formateur
        startDate
        EndDate
      }
    }
  }
`;

class Formation extends Component<any, any> {
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
    let name, Type, Site, Rank, startDate, Formateur, EndDate;

    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle="Edit Formation"
              content={
                <div>
                  <Grid item xs={12} container>
                    <Query
                      query={GET_USERS}
                      variables={{ Id: this.props.auth.user.id }}
                    >
                      {({ loading, error, data }) => {
                        if (loading) return 'Loading...';
                        if (error) return `Error! ${error.message}`;
                        return (
                          <Mutation
                            mutation={ADD_FORMATION}
                            key={data.User.id}
                            onCompleted={() =>
                              this.props.history.push(`/Formation`)
                            }
                          >
                            {(addFormation, { loading, error }) => (
                              <>
                                <Button
                                  color="primary"
                                  round
                                  onClick={() => this.openModal()}
                                >
                                  Add Formation
                                </Button>
                                <Modal
                                  visible={this.state.visible}
                                  width="400"
                                  height="620"
                                  effect="fadeInUp"
                                  onClickAway={() => this.closeModal()}
                                >
                                  <div className="container">
                                    <div className="panel panel-default">
                                      <div className="panel-body">
                                        <form
                                          onSubmit={e => {
                                            e.preventDefault();
                                            addFormation({
                                              variables: {
                                                id: data.User.id,
                                                formations: {
                                                  name: name.value,
                                                  Type: Type.value,
                                                  Site: Site.value,
                                                  Rank: Rank.value,
                                                  startDate: startDate.value,
                                                  Formateur: Formateur.value,
                                                  EndDate: EndDate.value
                                                }
                                              },
                                              refetchQueries: [
                                                { query: GET_USERS }
                                              ]
                                            });
                                            name.value = '';
                                            Type.value = '';
                                            Site.value = '';
                                            Rank.value = '';
                                            startDate.value = '';
                                            Formateur.value = '';
                                            EndDate.value = '';
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
                                            <label htmlFor="Type">Type:</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="Type"
                                              ref={node => {
                                                Type = node;
                                              }}
                                              placeholder="Type"
                                            />
                                          </div>

                                          <div className="form-group">
                                            <label htmlFor="Site">Site:</label>
                                            <input
                                              className="form-control"
                                              name="Site"
                                              ref={node => {
                                                Site = node;
                                              }}
                                              placeholder="Site"
                                            />
                                          </div>
                                          <div className="form-group">
                                            <label htmlFor="Rank">Rank:</label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="Rank"
                                              ref={node => {
                                                Rank = node;
                                              }}
                                              placeholder="Rank"
                                            />
                                          </div>
                                          <div className="form-group">
                                            <label htmlFor="startDate">
                                              startDate:
                                            </label>
                                            <input
                                              type="date"
                                              className="form-control"
                                              name="startDate"
                                              ref={node => {
                                                startDate = node;
                                              }}
                                              placeholder="startDate"
                                            />
                                          </div>
                                          <div className="form-group">
                                            <label htmlFor="Formateur">
                                              Formateur:
                                            </label>
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="Formateur"
                                              ref={node => {
                                                Formateur = node;
                                              }}
                                              placeholder="Formateur"
                                            />
                                          </div>
                                          <div className="form-group">
                                            <label htmlFor="EndDate">
                                              EndDate:
                                            </label>
                                            <input
                                              type="date"
                                              className="form-control"
                                              name="EndDate"
                                              ref={node => {
                                                EndDate = node;
                                              }}
                                              placeholder="EndDate"
                                            />
                                          </div>
                                          <Button
                                            color="primary"
                                            round
                                            type="submit"
                                            onClick={() => this.closeModal()}
                                          >
                                            Add Formation
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
                  <Grid>
                    <Query
                      query={GET_USERS}
                      variables={{ Id: this.props.auth.user.id }}
                      pollInterval={300}
                    >
                      {({ loading, error, data }) => {
                        if (loading) return 'Loading...';
                        if (error) return `Error! ${error.message}`;
                        var fo = data.User.formations;

                        var array = fo.map(item =>
                          Object.keys(item).map(function(_) {
                            return item[_];
                          })
                        );
                        array.map(item => {
                          const id = item[0];
                          const nom = item[1];
                          const rank = item[2];
                          const type = item[3];
                          const site = item[4];
                          const formateur = item[5];
                          item.push(
                            <Mutation
                              mutation={Update_FORMATION}
                              key={data.User.id}
                              onCompleted={() =>
                                this.props.history.push('/Formation')
                              }
                            >
                              {(updateFormation, { loading, error }) => (
                                <>
                                  <Popup
                                    open={false}
                                    trigger={
                                      <Button color="primary" round>
                                        Edit{' '}
                                      </Button>
                                    }
                                    position="top left"
                                    modal
                                    closeOnDocumentClick
                                  >
                                    {close => (
                                      <div>
                                        <div className="container">
                                          <div className="panel panel-default">
                                            <div className="panel-body">
                                              <form
                                                onSubmit={e => {
                                                  e.preventDefault();
                                                  updateFormation({
                                                    variables: {
                                                      id: data.User.id,
                                                      formations: {
                                                        id: id,
                                                        name: name.value,
                                                        Type: Type.value,
                                                        Site: Site.value,
                                                        Rank: Rank.value,
                                                        startDate:
                                                          startDate.value,
                                                        Formateur:
                                                          Formateur.value,
                                                        EndDate: EndDate.value
                                                      }
                                                    }
                                                  }).then(() => {
                                                    close();
                                                  });
                                                  name.value = '';
                                                  Type.value = '';
                                                  Site.value = '';
                                                  Rank.value = '';
                                                  startDate.value = '';
                                                  Formateur.value = '';
                                                  EndDate.value = '';
                                                  close();
                                                }}
                                              >
                                                <br />
                                                <div className="form-group">
                                                  <label htmlFor="name">
                                                    name:
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    name="name"
                                                    ref={node => {
                                                      name = node;
                                                    }}
                                                    placeholder="name"
                                                    defaultValue={nom.toString()}
                                                  />
                                                </div>
                                                <div className="form-group">
                                                  <label htmlFor="Type">
                                                    Type:
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    name="Type"
                                                    ref={node => {
                                                      Type = node;
                                                    }}
                                                    placeholder="Type"
                                                    defaultValue={type.toString()}
                                                  />
                                                </div>
                                                <div className="form-group">
                                                  <label htmlFor="Site">
                                                    Site:
                                                  </label>
                                                  <input
                                                    className="form-control"
                                                    name="Site"
                                                    ref={node => {
                                                      Site = node;
                                                    }}
                                                    placeholder="Site"
                                                    defaultValue={site.toString()}
                                                  />
                                                </div>
                                                <div className="form-group">
                                                  <label htmlFor="Rank">
                                                    Rank:
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    name="Rank"
                                                    ref={node => {
                                                      Rank = node;
                                                    }}
                                                    placeholder="Rank"
                                                    defaultValue={rank.toString()}
                                                  />
                                                </div>
                                                <div className="form-group">
                                                  <label htmlFor="Formateur">
                                                    Formateur:
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    name="Formateur"
                                                    ref={node => {
                                                      Formateur = node;
                                                    }}
                                                    placeholder="Formateur"
                                                    defaultValue={formateur.toString()}
                                                  />
                                                </div>
                                                <div className="form-group">
                                                  <label htmlFor="startDate">
                                                    startDate:
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    name="startDate"
                                                    ref={node => {
                                                      startDate = node;
                                                    }}
                                                    placeholder="startDate"
                                                  />
                                                </div>
                                                <div className="form-group">
                                                  <label htmlFor="EndDate">
                                                    EndDate:
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    name="EndDate"
                                                    ref={node => {
                                                      EndDate = node;
                                                    }}
                                                    placeholder="EndDate"
                                                  />
                                                </div>
                                                <Button
                                                  color="primary"
                                                  round
                                                  type="submit"
                                                >
                                                  Edit{' '}
                                                </Button>
                                                <Button
                                                  color="primary"
                                                  round
                                                  onClick={() => {
                                                    close();
                                                  }}
                                                >
                                                  Close{' '}
                                                </Button>
                                              </form>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </Popup>
                                </>
                              )}
                            </Mutation>,
                            <Mutation
                              mutation={DELETE_FORMATION}
                              key={data.User.id}
                              onCompleted={() =>
                                this.props.history.push('/Formation')
                              }
                            >
                              {(deleteFormation, { loading, error }) => (
                                <div>
                                  <form
                                    onSubmit={e => {
                                      e.preventDefault();
                                      deleteFormation({
                                        variables: {
                                          id: data.User.id,
                                          formations: {
                                            id: id.toString()
                                          }
                                        }
                                      });
                                    }}
                                  >
                                    &nbsp;
                                    <button
                                      type="submit"
                                      className="btn btn-danger"
                                    >
                                      Delete
                                    </button>
                                  </form>
                                  {loading && <p>Loading...</p>}
                                  {error && <p>Error :( Please try again</p>}
                                </div>
                              )}
                            </Mutation>
                          );
                        });

                        array.map(i => {
                          i.splice(0, 1);
                        });
                        array.map(i => {
                          i.splice(5, 3);
                        });
                        return (
                          <Paper>
                            <Table
                              tableHeaderColor="warning"
                              tableData={array}
                            />
                          </Paper>
                        );
                      }}
                    </Query>
                  </Grid>
                </div>
              }
            />
          </ItemGrid>
        </Grid>
      </div>
    );
  }
}

Formation.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Formation);
