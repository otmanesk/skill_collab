import { Grid, withStyles, Paper } from '@material-ui/core';
import {
  Accessibility,
  ContentCopy,
  DateRange,
  InfoOutline,
  LocalOffer,
  Store,
  Update,
  Warning
} from '@material-ui/icons';
import dashboardStyle from '../../assets/jss/material-dashboard-react/dashboardStyle';
import { ItemGrid, RegularCard, StatsCard } from '../../components';
import * as React from 'react';
// react plugin for creating charts
import { Query } from 'react-apollo';

import { gql } from 'apollo-boost';
import { Table } from '../../components';
const GET_USERS = gql`
  {
    allUsers {
      id
      name
      username
      email
    }
  }
`;
interface Props {
  classes: {
    successText: string;
    upArrowCardCategory: string;
  };
}

class Dashboard extends React.Component<Props, any> {
  render() {
    //  const { classes } = this.props;

    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={ContentCopy}
              iconColor="orange"
              title="Used Space"
              description="49/50"
              small="GB"
              statIcon={Warning}
              statIconColor="danger"
              statLink={{ text: 'Get More Space...', href: '#pablo' }}
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={Store}
              iconColor="green"
              title="Revenue"
              description="$34,245"
              statIcon={DateRange}
              statText="Last 24 Hours"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={InfoOutline}
              iconColor="red"
              title="Fixed Issues"
              description="75"
              statIcon={LocalOffer}
              statText="Tracked from Github"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={Accessibility}
              iconColor="blue"
              title="Followers"
              description="+245"
              statIcon={Update}
              statText="Just Updated"
            />
          </ItemGrid>
        </Grid>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={4} />
          <ItemGrid xs={12} sm={12} md={4} />
          <ItemGrid xs={12} sm={12} md={4} />
        </Grid>
        <Grid container>
          <ItemGrid>
            <RegularCard
              headerColor="orange"
              cardTitle="User List "
              cardSubtitle="New employees on 15th September, 2016"
              content={
                <Query query={GET_USERS}>
                  {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    console.log(data);
                    var fo = data.allUsers;

                    return (
                      <Paper>
                        <Table
                          tableHeaderColor="warning"
                          tableHead={['ID', 'Name', 'Username', 'Email']}
                          tableData={fo.map(item =>
                            Object.keys(item)
                              .map(function(_) {
                                return item[_];
                              })
                              .slice(0, 4)
                          )}
                        />
                      </Paper>
                    );
                  }}
                </Query>
              }
            />
          </ItemGrid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(dashboardStyle)(Dashboard);
