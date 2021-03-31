import React, { useState } from 'react';
import { Stack, Checkbox, TextField, IconButton } from '@fluentui/react';

const ListItem: React.FunctionComponent<any> = ({
  id,
  task,
  state,
  toggleTask,
  upadateTask,
  deleteTask,
}) => {
  const [modify, setModify] = useState(false);
  const [inputVal, setInputVal] = useState(task);

  /* ***************************************** */
  const updateText = (e: any) => {
    setInputVal(e.target.value);
  };
  const getKey = (key: string) => {
    console.log(key);
    if (key === 'Enter') {
      upadateTask(id, inputVal);
      setModify(false);
    }
  };

  /* const toggleCheckbox = (e: any) => {
    setIsSelected(!isSelected);
  }; */
  /* ***************************************** */
  return (
    <Stack
      id={id}
      horizontal
      verticalAlign="center"
      styles={{
        root: {
          position: 'relative',
          height: 80,
          borderBottom: '1px solid grey',
          ':hover .button': {
            opacity: 1,
            zIndex: 1,
          },
        },
      }}
    >
      <Checkbox checked={state} onChange={() => toggleTask(id)} />

      <TextField
        value={inputVal}
        onChange={updateText}
        readOnly={modify ? false : true}
        onDoubleClick={() => setModify(!modify)}
        onKeyPress={(e: any) => getKey(e.key)}
        borderless
        disabled={state}
        styles={
          state
            ? {
                field: {
                  textDecoration: 'line-through',
                  backgroundColor: 'transparent',
                },
              }
            : {}
        }
      />

      <IconButton
        className="button"
        iconProps={{ iconName: 'Cancel' }}
        styles={{
          root: {
            color: 'red',
            position: 'absolute',
            top: '50%',
            right: '5%',
            transform: 'translate(0%, -50%)',
            opacity: 0,
            zIndex: -10,
            transition: 'all .5s',
          },
        }}
        onClick={() => deleteTask(id)}
      />
    </Stack>
  );
};

export default ListItem;
