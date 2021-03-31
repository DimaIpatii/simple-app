import React, { useState } from 'react';
import { Stack, Checkbox, TextField, IconButton } from '@fluentui/react';

/* Styles */
import {
  taskItemWrapperStyle,
  taskCheckmarkStyle,
  taskFieldStyle,
  taskFieldCompletedStyle,
  btnTaskRemove,
} from '../../styles/components';

const ListItem: React.FunctionComponent<any> = ({
  id,
  task,
  completed,
  toggleTask,
  upadateTask,
  deleteTask,
}) => {
  const [modify, setModify] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>(task);

  /* ***************************************** */
  const updateText = (e: any): void => {
    setInputVal(e.target.value);
  };
  const getKey = (key: string): void => {
    if (key === 'Enter') {
      upadateTask(id, inputVal);
      setModify(false);
    }
  };

  /* ***************************************** */
  return (
    <Stack
      id={id}
      horizontal
      verticalAlign="center"
      tokens={{ padding: 10, childrenGap: 5 }}
      styles={taskItemWrapperStyle}
    >
      <Checkbox
        checked={completed}
        onChange={() => toggleTask(id)}
        styles={taskCheckmarkStyle}
      />

      <TextField
        value={inputVal}
        onChange={updateText}
        readOnly={modify ? false : true}
        onDoubleClick={() => setModify(!modify)}
        onKeyPress={(e: any) => getKey(e.key)}
        borderless
        disabled={completed}
        styles={completed ? taskFieldCompletedStyle : taskFieldStyle}
      />

      <IconButton
        className="button"
        iconProps={{ iconName: 'Cancel' }}
        styles={btnTaskRemove()}
        onClick={() => deleteTask(id)}
      />
    </Stack>
  );
};

export default ListItem;
