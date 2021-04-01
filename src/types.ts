export interface ITaskItem {
  id: number;
  task: string;
  completed: boolean;
}

export interface IlistProps extends ITaskItem {
  toggleTask: (id: number) => void;
  upadateTask: (id: number, text: string) => void;
  deleteTask: (id: number) => void;
}

export interface IBottomFilterProps {
  howMuchLeft: number;
  filterState: string;
  filterTasks: (state: string, id?: number) => void;
  clearCompletedTasks: () => void;
}
