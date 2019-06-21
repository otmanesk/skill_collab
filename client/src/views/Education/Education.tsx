import { Grid } from '@material-ui/core';
import { ItemGrid, RegularCard } from '../../components';
import React, { Component } from 'react';
import AddEducation from './addEducation';
import ListEducation from './listEducation';
class Education extends Component<any, any> {
  render() {
    return (
      <div>
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
              cardTitle="Edit Education"
              content={
                <div>
                  <AddEducation history={this.props.history} />
                  <ListEducation history={this.props.history} />
                </div>
              }
            />
          </ItemGrid>
        </Grid>
      </div>
    );
  }
}

export default Education;
