import React, { useState, useRef, useEffect } from 'react';
import { Stack, Text, TextField } from '@fluentui/react';
import { initializeIcons } from '@uifabric/icons';
import { IconButton, DefaultButton } from '@fluentui/react/lib/Button';
/* Styles */
import './App.css';

/* Components */
import ListItem from './components/ListItem';
import { stat } from 'node:fs';
initializeIcons();
interface IListItem {
  id: number;
  task: string;
  state: boolean;
}

class Task {
  state: boolean;
  constructor(public id: number, public task: string) {
    this.id = id;
    this.task = task;
    this.state = false;
  }
}

export const App: React.FunctionComponent = () => {
  const [buffer, setBuffer] = useState<IListItem[]>([]);
  const [tasks, setTasks] = useState<IListItem[]>([]);
  const [task, setTask] = useState<string>('');
  const [howMuchLeft, setHowMuchLeft] = useState(0);
  const [filterState, setFilterState] = useState<string>('All');

  const toggleAllStatus = useRef(true);

  /* List Item Events: */
  const addTask = (buttonPressed: string): void => {
    if (buttonPressed === 'Enter') {
      let newId = 1;
      if (tasks.length > 0) {
        newId = tasks[tasks.length - 1].id + 1;
      }
      const newTask = new Task(newId, task);
      //setTasks([...tasks, { ...newTask }]);
      setBuffer([...buffer, { ...newTask }]);
      setTask('');
    }
  };

  const toggleTask = (id: number): void => {
    /* const selectedTask = tasks.map((el) => {
      if (el.id === id) el.state = !el.state;
      return el;
    }); */
    filterTasks(filterState, id);
    toggleAllStatus.current = true;
    //setTasks(selectedTask);
  };
  const toggleAll = () => {
    const allTasks = buffer.map((task) => {
      task.state = toggleAllStatus.current;
      return task;
    });

    toggleAllStatus.current = !toggleAllStatus.current;
    setBuffer(allTasks);
  };

  const deleteTask = (id: number): void => {
    const remainedTasks = buffer.filter((task) => task.id !== id);
    setBuffer(remainedTasks);
  };

  const upadateTask = (id: number, text: string) => {
    const index = tasks.findIndex((el) => el.id === id);

    tasks[index].task = text;
    setTasks([...tasks]);
  };

  /* Bottom Filter Events: */
  const filterTasks = (state: string, id?: number): void => {
    setFilterState(state);
    let filteredTasks: IListItem[];

    switch (state) {
      case 'Active':
        /* filteredTasks = buffer.filter((el) => {
          if (el.state === false && !id) {
            return el;
          } else {
            el.state = true;
          }
        }); */
        filteredTasks = buffer
          .map((task) => {
            if (task.id === id) task.state = true;
            return task;
          })
          .filter((task) => task.state === false);

        break;
      case 'Completed':
        /* filteredTasks = buffer.filter((el) => {
          if (el.state === true && !id) {
            return el;
          } else {
            el.state = false;
          }
        }); */
        filteredTasks = buffer
          .map((task) => {
            if (task.id === id) task.state = false;
            return task;
          })
          .filter((task) => task.state === true);
        break;
      default:
        filteredTasks = buffer.map((el) => {
          if (el.id === id) el.state = !el.state;
          return el;
        });
        break;
    }

    setTasks(filteredTasks);
  };

  const clearCompletedTasks = (): void => {
    const resetCompletedTasks = buffer.filter((task) => task.state !== true);

    setBuffer(resetCompletedTasks);
    setFilterState('All');
  };

  /* *********************** */

  useEffect(() => {
    setTasks(buffer);
  }, [buffer]);

  useEffect(() => {
    const toComplete = tasks.filter((task) => task.state === false);
    setHowMuchLeft(toComplete.length);
  }, [tasks]);

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
          value={task}
          onChange={(e: any) => setTask(e.target.value)}
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
                  state={task.state}
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
