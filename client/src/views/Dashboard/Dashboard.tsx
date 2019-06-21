import { Grid, withStyles, Paper } from '@material-ui/core';

import dashboardStyle from '../../assets/jss/material-dashboard-react/dashboardStyle';
import { ItemGrid, RegularCard, Snackbar } from '../../components';
import * as React from 'react';
import { Query, Mutation } from 'react-apollo';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { gql } from 'apollo-boost';
import { Table, Button } from '../../components';
import Training from '../../components/stats/Trainings';
import Display from '../../components/react-images/Display';
import Activity from '../../components/Charts/Activity/Activity';
import RangeSliderBar from '../../components/rangeSliderBar/RangeSliderBar';
import Bar from '../../components/Charts/Bar/Bar';
import SpiderWeb from '../../components/Charts/Spiderweb/Spiderweb';
import Donut from '../../components/Charts/Donut/Donut';
import Facet from '../../components/Facet/Facet';
import FacetHeader from '../../components/Facet/FacetHeader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import Formation from '../Formation/Formation';
import Users from './Users';

const ADD_TRAINING = gql`
  mutation addTrainingFollowed(
    $id: String!
    $trainingsFollowed: [TrainingInput]
  ) {
    addTrainingFollowed(id: $id, trainingsFollowed: $trainingsFollowed) {
      trainingsFollowed {
        id
        name
        Type
        Site
        Rank
        former
        startDate
        EndDate
      }
    }
  }
`;
const GET_USERS = gql`
  {
    allUsers {
      id
      name
      username
      email
      trainings {
        id
        name
        Type
        Site
        former
      }
      trainingsFollowed {
        id
        name
        Type
        Site
        former
      }
    }
  }
`;

type Positions = 'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br';

interface Props {
  classes: {
    successText: string;
    upArrowCardCategory: string;
  };
}

class Dashboard extends React.Component<Props & any, any> {
  static propTypes: {
    auth: PropTypes.Validator<object>;
  };
  constructor(props: Props) {
    super(props);

    this.state = {
      tc: false
    };
    this.showNotification = this.showNotification.bind(this);
  }

  render() {
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <Display />
          </ItemGrid>
        </Grid>

        <Grid container>
          <ItemGrid xs={11} sm={11} md={4}>
            <Activity />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={4}>
            <SpiderWeb />
          </ItemGrid>
          <ItemGrid xs={12} sm={12} md={4}>
            <Bar />
          </ItemGrid>
          <Grid container>
            <Facet>
              <FacetHeader title="Ranking">
                <RangeSliderBar />
              </FacetHeader>
            </Facet>
          </Grid>
        </Grid>
        <Grid container>
          <Training />
        </Grid>

        <Grid container>
          <Formation />
          <Users />
        </Grid>
      </div>
    );
  }

  private showNotification(place: Positions) {
    // @ts-ignore
    this.setState({ [place]: true });

    // @ts-ignore
    setTimeout(() => this.setState({ [place]: false }), 6000);
  }
}
Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withStyles(dashboardStyle)(Dashboard));
