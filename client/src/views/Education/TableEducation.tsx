import React from 'react';
import { Table } from '../../components';
import { Paper } from '@material-ui/core';

class TableEducation extends React.Component<any, any> {
  render() {
    return (
      <Paper>
        <Table
          tableHeaderColor="warning"
          tableData={this.props.array.map(item =>
            Object.keys(item).map(function(_) {
              return item[_];
            })
          )}
          headRows={[
            {
              id: '0',
              numeric: false,
              disablePadding: true,
              label: 'School'
            },
            {
              id: '1',
              numeric: false,
              disablePadding: true,
              label: 'Diploma'
            },
            {
              id: '2',
              numeric: false,
              disablePadding: true,
              label: 'University'
            },
            {
              id: '3',
              numeric: false,
              disablePadding: true,
              label: 'Certification'
            },
            {
              id: '4',
              numeric: false,
              disablePadding: true,
              label: 'trainings'
            }
          ]}
        />
      </Paper>
    );
  }
}
export default TableEducation;
