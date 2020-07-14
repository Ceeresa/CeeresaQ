import React from 'react';
import MaterialTable from 'material-table';

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
            lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
          },
          { title: 'SQL', field: 'query', type: 'string' },
        ]}
        data={[
          {
            id: 'Mehmet',
            title: 'Baran',
            description: 'Description 1',
            tags: 1987,
            query: 'SELECT * FROM test',
          },
          {
            id: 'Gigi',
            title: 'Valli',
            description: 'Description 2',
            tags: 1999,
            query: 'SELECT * FROM just_another_test',
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
