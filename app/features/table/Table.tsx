import React from 'react';
import MaterialTable from 'material-table';
import Highlight from 'react-highlight.js';

export default function Table() {
  return (
    <div style={{ maxWidth: '100%' }}>
      <MaterialTable
        columns={[
          { title: 'Id', field: 'id', type: 'string' },
          { title: 'Title', field: 'title', type: 'string' },
          { title: 'Description', field: 'description', type: 'string' },
          {
            title: 'Tags',
            field: 'tags',
            type: 'string',
            lookup: { MySQL: 'MySQL', BigQuery: 'BigQuery' },
          },
          {
            title: 'SQL',
            field: 'query',
            type: 'string',
            // eslint-disable-next-line react/display-name
            render: (rowData) => (
              <div>
                <Highlight language="SQL">{rowData.query}</Highlight>
              </div>
            ),
          },
        ]}
        data={[
          {
            id: '1',
            title: 'Just a test',
            description: 'Description 1',
            tags: 'MySQL',
            query: 'SELECT * FROM test',
          },
          {
            id: '2',
            title: 'Retrieve 1970 people from New York',
            description:
              'You have to find all the people to target for a particular campaign',
            tags: 'BigQuery',
            query:
              "SELECT *\nFROM just_another_test\nWHERE age >= 50 AND city = 'New York'",
          },
        ]}
        options={{
          filtering: true,
        }}
        title="Demo Title"
      />
    </div>
  );
}
