import React from 'react';
import { Stack, Text } from '@fluentui/react';

import { DefaultButton } from '@fluentui/react/lib/Button';
import {
  btnFilterActiveStyle,
  btnFilterDefaultStyle,
  filterWrapperStyle,
} from '../../styles/fulid_ui/components';

/* Types */
import { IBottomFilterProps } from '../../types';

const BottomFilter: React.FunctionComponent<IBottomFilterProps> = ({
  howMuchLeft,
  filterState,
  filterTasks,
  clearCompletedTasks,
}) => {
  return (
    <Stack
      wrap
      horizontal
      verticalAlign="center"
      tokens={{ childrenGap: 5, padding: 10 }}
      horizontalAlign="space-between"
      styles={filterWrapperStyle}
    >
      <Text>{howMuchLeft} items left</Text>
      {/* Filter */}
      <Stack horizontal wrap>
        <div className="appWrapperButtonsWrapper">
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
            className="buttonsWrapperButton"
            text="Clear completed"
            onClick={clearCompletedTasks}
            styles={btnFilterDefaultStyle()}
          />
        </div>
      </Stack>
    </Stack>
  );
};

export default BottomFilter;
