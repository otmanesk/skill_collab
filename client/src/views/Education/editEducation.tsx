import { Button } from '../../components';
import React from 'react';
import { connect } from 'react-redux';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import Icon from '@material-ui/core/Icon';
import { IconButton } from '@material-ui/core';
import DivInput from '../../components/divinput';
import moment from 'moment';
const Update_EDUCATION = gql`
  mutation updateEducation($id: String!, $education: [EducationInput]) {
    updateEducation(id: $id, education: $education) {
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
class editEducation extends React.Component<any, any> {
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
    var datefin = new Date(
      moment.unix(this.props.endDate / 1000).format('YYYY-MM-DD')
    ).toLocaleDateString('en-GB', {
      // you can skip the first argument
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    var datedebut = new Date(
      moment.unix(this.props.startdate / 1000).format('YYYY-MM-DD')
    ).toLocaleDateString('en-GB', {
      // you can skip the first argument
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    console.log(datefin);
    var convertDate = function(usDate) {
      var dateParts = usDate.split(/(\d{1,2})[\/ -](\d{1,2})[\/ -](\d{4})/);
      return dateParts[3] + '-' + dateParts[1] + '-' + dateParts[2];
    };

    var resultfin = convertDate(datefin);
    var resultdebut = convertDate(datedebut);
    console.log(resultdebut);
    return (
      <Mutation
        mutation={Update_EDUCATION}
        key={this.props.data.User.id}
        onCompleted={() => this.props.history.push('/education')}
      >
        {(updateEducation, { loading, error }) => (
          <>
            <Popup
              open={false}
              trigger={
                <IconButton color="secondary" aria-label="Delete">
                  <Icon>edit_icon</Icon>
                </IconButton>
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
                            updateEducation({
                              variables: {
                                id: this.props.data.User.id,
                                education: {
                                  id: this.props.id,
                                  school: school.value,
                                  diploma: diploma.value,
                                  university: university.value,
                                  trainings: trainings.value,
                                  certification: certification.value
                                }
                              }
                            }).then(close());
                            school.value = '';
                            diploma.value = '';
                            university.value = '';
                            trainings.value = '';
                            certification.value = '';
                          }}
                        >
                          <br />
                          <DivInput
                            name="name"
                            defaultvalue={this.props.school}
                            node={node => {
                              school = node;
                            }}
                          />
                          <DivInput
                            name="description"
                            defaultvalue={this.props.diploma}
                            node={node => {
                              diploma = node;
                            }}
                          />
                          <DivInput
                            name="Site"
                            defaultvalue={this.props.university}
                            node={node => {
                              university = node;
                            }}
                          />
                          <DivInput
                            name="technology"
                            defaultvalue={this.props.trainings}
                            node={node => {
                              trainings = node;
                            }}
                          />
                          <DivInput
                            name="certification"
                            defaultvalue={this.props.certification}
                            node={node => {
                              certification = node;
                            }}
                          />

                          <Button color="primary" round type="submit">
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
      </Mutation>
    );
  }
}
editEducation.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(editEducation);
