import React, { Component } from 'react';
import AppGridHeader from './AppGridHeader';
import AppGridRows from './AppGridRows';
import { Table } from 'patternfly-react';

class AppGrid extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="appGrid">
        <div>
          <Table.PfProvider
            striped
            bordered
            hover
            columns={[
              {
                header: { label: 'First Name', formatters: [  ] },
                cell: { formatters: [  ] },
                property: 'first_name'
              },
              {
                header: { label: 'Last Name', formatters: [  ] },
                cell: { formatters: [  ] },
                property: 'last_name'
              },
              {
                header: { label: 'Username', formatters: [  ] },
                cell: { formatters: [  ] },
                property: 'username'
              }
            ]}
          >
            <Table.Header />
            <Table.Body
              rows={[
                {
                  id: 0,
                  first_name: 'Dan',
                  last_name: 'Abramov'
                },
                {
                  id: 1,
                  first_name: 'Sebastian',
                  last_name: 'Markbåge'
                },
                {
                  id: 2,
                  first_name: 'Sophie',
                  last_name: 'Alpert'
                }
              ]}
              rowKey="id"
            />
          </Table.PfProvider>
        </div>
      </div>
    );
  }
}

export default AppGrid;
