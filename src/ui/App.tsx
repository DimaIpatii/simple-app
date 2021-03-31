import React, { useState, useRef, useEffect } from 'react';
import { Stack, Text, TextField } from '@fluentui/react';
import { initializeIcons } from '@uifabric/icons';
import { IconButton, DefaultButton } from '@fluentui/react/lib/Button';
/* Styles */
import './App.css';
import { mainCaptionStyle } from '../styles/typography';
import {
  toDoWrapperStyle,
  addTaskWrapperStyle,
  btnSelectAllStyle,
  btnFilterActiveStyle,
  btnFilterDefaultStyle,
  textFieldAddStyle,
  filterWrapperStyle,
  taskMessageWrapperStyle,
} from '../styles/components';

/* Components */
import ListItem from './components/ListItem';
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
    <Stack styles={toDoWrapperStyle()} tokens={{ childrenGap: 10 }}>
      <Text variant="mega" styles={mainCaptionStyle()}>
        todos
      </Text>
      <div className="wrapper">
        {/* Header */}
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
            styles={btnSelectAllStyle()}
            onClick={toggleAll}
            disabled={buffer.length > 0 ? false : true}
          />

          {/* Input textfiled*/}
          <TextField
            placeholder="What needs to be done?"
            value={taskInput}
            onChange={(e: any) => setTaskInput(e.target.value)}
            onKeyPress={(e: any) => addTask(e.key)}
            borderless
            styles={textFieldAddStyle}
          />
        </Stack>

        {/* To-do items wrapper*/}

        <div
          className={`tasksContainer ${
            buffer.length > 0 ? 'tasksContainerShow' : ''
          }`}
        >
          {/* Content */}
          <div className="tasksWrapper">
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
          <Stack
            horizontal
            verticalAlign="center"
            tokens={{ childrenGap: 5, padding: 10 }}
            horizontalAlign="space-between"
            styles={filterWrapperStyle}
          >
            <Text>{howMuchLeft} items left</Text>
            {/* Filter */}
            <Stack horizontal>
              <DefaultButton
                text="All"
                styles={
                  filterState === 'All'
                    ? btnFilterActiveStyle()
                    : btnFilterDefaultStyle()
                }
                onClick={() => filterTasks('All')}
              />

              <DefaultButton
                text="Active"
                styles={
                  filterState === 'Active'
                    ? btnFilterActiveStyle()
                    : btnFilterDefaultStyle()
                }
                onClick={() => filterTasks('Active')}
              />

              <DefaultButton
                text="Completed"
                styles={
                  filterState === 'Completed'
                    ? btnFilterActiveStyle()
                    : btnFilterDefaultStyle()
                }
                onClick={() => filterTasks('Completed')}
              />

              <DefaultButton
                text="Clear completed"
                onClick={clearCompletedTasks}
                styles={btnFilterDefaultStyle()}
              />
            </Stack>
          </Stack>
          <span className="stackedPaperEffect-1"></span>
          <span className="stackedPaperEffect-2"></span>
        </div>
      </div>
    </Stack>
  );
};
