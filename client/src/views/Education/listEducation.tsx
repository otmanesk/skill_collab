import { Grid, Paper } from '@material-ui/core';
import { Query } from 'react-apollo';
import RemoveEducation from './removeEducation';
import EditEducation from './editEducation';
import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TableEducation from './TableEducation';
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

class ListEducation extends Component<any, any> {
  static propTypes: { auth: PropTypes.Validator<object> };
  render() {
    return (
      <Grid>
        <Query
          query={GET_USERS}
          variables={{ Id: this.props.auth.user.id }}
          pollInterval={300}
        >
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;

            var fo = data.User.education;

            var array = fo.map(item =>
              Object.keys(item).map(function(_) {
                return item[_];
              })
            );
            console.log('test');
            array.map(item => {
              let id = item[0];
              let school = item[1];
              let university = item[2];
              let trainings = item[3];
              let certification = item[4];
              let diploma = item[5];
              item.push(
                <EditEducation
                  data={data}
                  id={id}
                  school={school}
                  diploma={diploma}
                  certification={certification}
                  university={university}
                  trainings={trainings}
                  history={this.props.history}
                />,

                <RemoveEducation
                  data={data}
                  item={item}
                  history={this.props.history}
                />
              );
            });

            return <TableEducation array={array} />;
          }}
        </Query>
      </Grid>
    );
  }
}

ListEducation.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ListEducation);
