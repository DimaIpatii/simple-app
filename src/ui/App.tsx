import React, { useState, useRef, useEffect } from 'react';
import { Stack, Text, TextField } from '@fluentui/react';
import { initializeIcons } from '@uifabric/icons';
import { IconButton, DefaultButton } from '@fluentui/react/lib/Button';
/* Styles */
import './App.css';

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

  console.log(tasks);
  return (
    /* Wrapper */
    <Stack
      styles={{
        root: {
          maxWidth: 720,
          margin: 'auto',
        },
      }}
    >
      <Text
        variant="mega"
        styles={{ root: { color: 'red', textAlign: 'center' } }}
      >
        todos
      </Text>
      {/* Header */}
      <Stack
        horizontal
        verticalAlign="center"
        styles={{ root: { borderBottom: '1px solid grey', width: '100%' } }}
      >
        {/* Button Check All */}
        <IconButton
          iconProps={{ iconName: 'ChevronDownSmall' }}
          title="ChevronDownSmall"
          ariaLabel="ChevronDownSmall"
          styles={{ root: { color: 'grey' } }}
          onClick={toggleAll}
        />

        {/* Input textfiled*/}
        <TextField
          placeholder="What needs to be done?"
          value={taskInput}
          onChange={(e: any) => setTaskInput(e.target.value)}
          onKeyPress={(e: any) => addTask(e.key)}
        />
      </Stack>
      {/* To-do items wrapper*/}
      {buffer.length > 0 ? (
        <div>
          {/* Content */}
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
            <h1>Here is no active tasks to do.</h1>
          )}
          {tasks.length === 0 && filterState === 'Completed' && (
            <h1>Here is no completed tasks yet.</h1>
          )}

          {/* Footer Bar */}
          <Stack horizontal horizontalAlign="space-between">
            <Text>{howMuchLeft} items left</Text>
            {/* Filter */}
            <Stack horizontal>
              <DefaultButton
                text="All"
                styles={
                  filterState === 'All'
                    ? { root: { border: '1px solid red' } }
                    : {}
                }
                onClick={() => filterTasks('All')}
              />

              <DefaultButton
                text="Active"
                styles={
                  filterState === 'Active'
                    ? { root: { border: '1px solid red' } }
                    : {}
                }
                onClick={() => filterTasks('Active')}
              />

              <DefaultButton
                text="Completed"
                styles={
                  filterState === 'Completed'
                    ? { root: { border: '1px solid red' } }
                    : {}
                }
                onClick={() => filterTasks('Completed')}
              />

              <DefaultButton
                text="Clear completed"
                onClick={clearCompletedTasks}
              />
            </Stack>
          </Stack>
        </div>
      ) : (
        ''
      )}
    </Stack>
  );
};
