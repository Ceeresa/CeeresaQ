import React, { useState } from 'react';
import MaterialTable, { EditComponentProps } from 'material-table';
import Highlight from 'react-highlight.js';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';

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
      title: 'Query',
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

  const [formData, changeFormData] = useState({
    id: '',
    title: '',
    description: '',
    tags: '',
    query: '',
  });

  const { id, title, description, tags, query } = formData;

  let operation = 'add';
  let editId = '-1';

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveAndClose = () => {
    // Save the content of the form
    console.log('So the data is the following:', formData, editId);
    // changeFormData(rowData);

    setData(
      data.map((item) => {
        if (item.id === editId) {
          return {
            id: item.id,
            title: item.title,
            description: item.description,
            tags: item.tags,
            query: item.query,
          };
        }
        return item;
      })
    );

    handleClose();
  };

  return (
    <div style={{ maxWidth: '100%' }}>
      <MaterialTable
        columns={columns}
        data={data}
        options={{
          filtering: true,
          showTitle: false,
        }}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit',
            onClick: (_event, rowData) => {
              operation = 'edit';
              editId = rowData.id;
              changeFormData(rowData);
              handleClickOpen();
            },
          },
        ]}
        /*
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
        */
        title="Ceeresa"
      />

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xl"
        fullWidth
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" style={{ color: 'red !important' }}>
          Edit
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={3}>
              <TextField
                autoFocus
                margin="dense"
                id="id"
                label="Id"
                type="text"
                value={id}
                fullWidth
              />

              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="text"
                value={title}
                fullWidth
              />

              <TextField
                autoFocus
                margin="dense"
                id="description"
                label="Description"
                type="text"
                value={description}
                multiline
                rows={4}
                fullWidth
              />

              <TextField
                autoFocus
                margin="dense"
                id="tags"
                label="Tags"
                type="text"
                value={tags}
                fullWidth
              />
            </Grid>
            <Grid item xs={9}>
              <FormControl style={{ width: '100%' }}>
                <InputLabel htmlFor="component-helper">Query</InputLabel>
                <CodeMirror
                  value={query}
                  autoCursor={false}
                  options={{
                    mode: 'sql',
                    theme: 'material',
                    // lineNumbers: true,
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={saveAndClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
