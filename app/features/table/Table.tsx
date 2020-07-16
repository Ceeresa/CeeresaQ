import React, { useState } from 'react';
import MaterialTable, { EditComponentProps } from 'material-table';
import Highlight from 'react-highlight.js';
import { UnControlled as CodeMirror } from 'react-codemirror2';

require('codemirror/mode/sql/sql');

type RowData = {
  id: string;
  title: string;
  description: string;
  tags: string;
  query: string;
};

export default function Table() {
  const [columns] = useState([
    { title: 'Id', field: 'id', type: 'string', editable: 'never' },
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
      render: (rowData: RowData) => (
        <div>
          <Highlight language="SQL">{rowData.query}</Highlight>
        </div>
      ),
      // eslint-disable-next-line react/display-name
      editComponent: (props: EditComponentProps<RowData>) => {
        const { value } = props;
        return (
          <div>
            <CodeMirror
              value={value}
              autoCursor={false}
              onChange={(_editor, _data, internalValue) => {
                props.onChange(internalValue);
              }}
            />
          </div>
        );
      },
    },
  ]);

  const [data, setData] = useState([
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
  ]);
  return (
    <div style={{ maxWidth: '100%' }}>
      <MaterialTable
        columns={columns}
        data={data}
        options={{
          filtering: true,
          showTitle: false,
        }}
        editable={{
          onRowAddCancelled: (rowData) =>
            // eslint-disable-next-line no-console
            console.log('Row adding cancelled', rowData),
          onRowUpdateCancelled: (rowData) =>
            // eslint-disable-next-line no-console
            console.log('Row editing cancelled', rowData),
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                setData([...data, newData]);

                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);

                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);

                resolve();
              }, 1000);
            }),
        }}
        title="Ceeresa"
      />
    </div>
  );
}
