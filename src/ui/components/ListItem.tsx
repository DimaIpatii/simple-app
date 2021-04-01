import React, { useState, useRef, useEffect } from 'react';
import { Stack, Checkbox, TextField, IconButton } from '@fluentui/react';

/* Styles */
import {
  taskItemWrapperStyle,
  taskCheckmarkStyle,
  taskFieldStyle,
  taskFieldCompletedStyle,
  btnTaskRemove,
} from '../../styles/fulid_ui/components';

/* Types */
import { IlistProps } from '../../types';

const ListItem: React.FunctionComponent<IlistProps> = ({
  id,
  task,
  completed,
  toggleTask,
  upadateTask,
  deleteTask,
}) => {
  const [modify, setModify] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>(task);

  const timesTouched = useRef<number>(0);
  const timer = useRef<any>(null);

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

  const useDoubleTouch = () => {
    const isDoubleClicked = timesTouched.current + 1 === 2;
    const timerIsPresent = timer.current;

    if (timerIsPresent && isDoubleClicked) {
      clearTimeout(timer.current);
      timer.current = null;
      timesTouched.current = 0;
      setModify(!modify);
    }

    if (!timerIsPresent) {
      timesTouched.current = +1;
      const currentTimer = setTimeout(() => {
        clearTimeout(timer.current);
        timer.current = null;
        timesTouched.current = 0;
      }, 200);

      timer.current = currentTimer;
    }
  };

  /* ***************************************** */
  return (
    <div className="taskItem">
      <Stack
        id={String(id)}
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
          onTouchEnd={useDoubleTouch}
          onKeyPress={(e: any) => getKey(e.key)}
          borderless
          autoComplete="off"
          disabled={completed}
          styles={completed ? taskFieldCompletedStyle : taskFieldStyle}
        />

        <IconButton
          className="taskItemRemoveButton"
          iconProps={{ iconName: 'Cancel' }}
          styles={btnTaskRemove()}
          onClick={() => deleteTask(id)}
        />
      </Stack>
    </div>
  );
};

export default ListItem;
