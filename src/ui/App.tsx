import React, { useState, useRef, useEffect } from 'react';
import { Stack, Text, TextField } from '@fluentui/react';
import { initializeIcons } from '@uifabric/icons';
import { IconButton } from '@fluentui/react/lib/Button';

/* Styles */
import {
  mainCaptionStyle,
  addTaskWrapperStyle,
  btnSelectAllStyle,
  textFieldAddStyle,
  taskMessageWrapperStyle,
} from '../styles/fulid_ui/components';

/* Components */
import ListItem from './components/ListItem';
import BottomFilter from './components/BottomFilter';
/* Types */
import { ITaskItem } from '../types';

/* Helpers */
import { checkState } from '../helpers/checkState';

initializeIcons();

export const App: React.FunctionComponent<any> = () => {
  const [buffer, setBuffer] = useState<ITaskItem[]>([]);
  const [tasks, setTasks] = useState<ITaskItem[]>([]);
  const [taskInput, setTaskInput] = useState<string>('');
  const [howMuchLeft, setHowMuchLeft] = useState<number>(0);
  const [filterState, setFilterState] = useState<string>('All');

  const toggleAllStatus = useRef(true);

  /* List Item Events: */
  const addTask = (buttonPressed: string): void => {
    if (buttonPressed === 'Enter') {
      let newId = 1;
      if (buffer.length > 0) {
        newId = buffer[buffer.length - 1].id + 1;
      }
      const newTask: ITaskItem = {
        id: newId,
        task: taskInput,
        completed: false,
      };
      setBuffer([...buffer, newTask]);
      setTaskInput('');
    }
  };

  const toggleTask = (id: number): void => {
    filterTasks(filterState, id);
    toggleAllStatus.current = true;
  };

  const toggleAll = () => {
    const allTasks = buffer.map((task) => {
      task.completed = toggleAllStatus.current;
      return task;
    });

    toggleAllStatus.current = !toggleAllStatus.current;
    setBuffer(allTasks);
  };

  const deleteTask = (id: number): void => {
    const remainedTasks = buffer.filter((task) => task.id !== id);
    setBuffer(remainedTasks);
  };

  const upadateTask = (id: number, text: string): void => {
    const index = tasks.findIndex((el) => el.id === id);

    tasks[index].task = text;
    setTasks([...tasks]);
  };
  /* *********************** */

  /* Bottom Filter Events: */
  const filterTasks = (state: string, id?: number): void => {
    setFilterState(state);

    const filteredTasks = checkState(state, buffer, id);
    setTasks(filteredTasks);
    itemsLeftCounter();
  };

  const clearCompletedTasks = (): void => {
    const resetCompletedTasks = buffer.filter(
      (task) => task.completed !== true
    );

    setBuffer(resetCompletedTasks);
    setFilterState('All');
  };

  /* *********************** */

  /* Items Left Counter */
  const itemsLeftCounter = () => {
    const toComplete = buffer.filter((task) => task.completed === false);
    setHowMuchLeft(toComplete.length);
  };
  /* *********************** */

  useEffect(() => {
    filterTasks(filterState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buffer]);

  /* ************************************* */
  return (
    /* Wrapper */
    <div className="appWrapper">
      <Stack>
        <Text variant="mega" styles={mainCaptionStyle()}>
          todos
        </Text>
      </Stack>
      {/* Header */}
      <div className="appWrapperAddTask">
        <Stack
          horizontal
          verticalAlign="center"
          tokens={{ childrenGap: 5, padding: 5 }}
          styles={addTaskWrapperStyle()}
        >
          {/* Button Check All */}

          <IconButton
            iconProps={{ iconName: 'ChevronDownSmall' }}
            title="ChevronDownSmall"
            ariaLabel="ChevronDownSmall"
            styles={
              buffer.length > 0 ? btnSelectAllStyle() : { root: { opacity: 0 } }
            }
            onClick={toggleAll}
          />

          {/* Input textfiled*/}
          <Stack.Item align="center" styles={{ root: { width: '100%' } }}>
            <TextField
              placeholder="What needs to be done?"
              value={taskInput}
              onChange={(e: any) => setTaskInput(e.target.value)}
              onKeyPress={(e: any) => addTask(e.key)}
              borderless
              autoComplete="off"
              styles={textFieldAddStyle}
            />
          </Stack.Item>
        </Stack>
      </div>

      {/* To-do items wrapper*/}
      <div
        className={`appWrapperTasksContainer ${
          buffer.length > 0 ? 'appWrapperTasksContainerShow' : ''
        }`}
      >
        {/* Content */}
        <div className="appWrapperTasksWrapper">
          {tasks &&
            tasks.map((task) => {
              return (
                <ListItem
                  key={task.id}
                  id={task.id}
                  task={task.task}
                  completed={task.completed}
                  upadateTask={upadateTask}
                  toggleTask={toggleTask}
                  deleteTask={deleteTask}
                />
              );
            })}

          {tasks.length === 0 && filterState === 'Active' && (
            <Stack
              horizontal
              horizontalAlign="center"
              verticalAlign="center"
              styles={taskMessageWrapperStyle}
            >
              <Text variant="large">Here is no active tasks to do.</Text>
            </Stack>
          )}
          {tasks.length === 0 && filterState === 'Completed' && (
            <Stack
              horizontal
              horizontalAlign="center"
              verticalAlign="center"
              styles={taskMessageWrapperStyle}
            >
              <Text variant="large">Here is no completed tasks yet.</Text>
            </Stack>
          )}
        </div>

        {/* Footer Bar */}

        <BottomFilter
          howMuchLeft={howMuchLeft}
          filterState={filterState}
          filterTasks={filterTasks}
          clearCompletedTasks={clearCompletedTasks}
        />
      </div>
    </div>
  );
};
