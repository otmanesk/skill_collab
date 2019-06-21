import { Grid, Paper } from '@material-ui/core';
import { Query } from 'react-apollo';
import Removeproject from './removeproject';
import Editproject from './editproject';
import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tableproject from './Tableproject';
const GET_USERS = gql`
  query User($Id: String!) {
    User(id: $Id) {
      id
      projects {
        id
        name
        description
        technology

        size
        Site
        startDate
        EndDate
        status
        Progress
      }
    }
  }
`;

class Listproject extends Component<any, any> {
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

            var fo = data.User.projects;

            var array = fo.map(item =>
              Object.keys(item).map(function(_) {
                return item[_];
              })
            );

            array.map(item => {
              const id = item[0];
              const nom = item[1];
              const descr = item[2];
              const techno = item[3];
              const siz = item[4];
              const site = item[5];
              const endDate = item[6];
              const startdate = item[7];
              const stat = item[8];
              const Prog = item[9];
              item.push(
                <Editproject
                  data={data}
                  id={id}
                  nom={nom}
                  descr={descr}
                  techno={techno}
                  siz={siz}
                  endDate={endDate}
                  startdate={startdate}
                  site={site}
                  stat={stat}
                  Prog={Prog}
                  history={this.props.history}
                />,
                <Removeproject
                  data={data}
                  item={item}
                  history={this.props.history}
                />
              );
            });
            array.map(i => {
              i.splice(0, 1);
            });

            array.map(i => {
              i.splice(6, 5);
            });

            return <Tableproject array={array} />;
          }}
        </Query>
      </Grid>
    );
  }
}

Listproject.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Listproject);
