import { ITaskItem } from '../types';
export const checkState = (
  state: string,
  listToCheck: ITaskItem[],
  id?: number
): ITaskItem[] => {
  let filteredTasks;
  switch (state) {
    case 'Active':
      filteredTasks = listToCheck
        .map((task) => {
          if (task.id === id) task.completed = true;
          return task;
        })
        .filter((task) => task.completed === false);

      break;
    case 'Completed':
      filteredTasks = listToCheck
        .map((task) => {
          if (task.id === id) task.completed = false;
          return task;
        })
        .filter((task) => task.completed === true);
      break;
    default:
      filteredTasks = listToCheck.map((el) => {
        if (el.id === id) el.completed = !el.completed;
        return el;
      });
      break;
  }
  return filteredTasks;
};
