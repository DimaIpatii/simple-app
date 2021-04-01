import {
  ITextFieldStyleProps,
  ITextFieldStyles,
  IButtonStyles,
  ICheckboxStyleProps,
  ICheckboxStyles,
  IStackProps,
  IStackStyles,
} from '@fluentui/react';

/* Wrappers */
export const addTaskWrapperStyle = () => {
  return {
    root: { borderBottom: '1px solid #e4e4e4', width: '100%', height: '100%' },
  };
};

export const taskItemWrapperStyle = (
  props: IStackProps
): Partial<IStackStyles> => {
  return {
    root: {
      position: 'relative',
      height: '100%',
      backgroundColor: 'white',
      borderBottom: '1px solid grey',
    },
  };
};

export const filterWrapperStyle = () => {
  return {
    root: {
      backgroundColor: 'white',
      boxShadow: '0px 2px 2px -2px grey',
      color: 'grey',
    },
  };
};

export const taskMessageWrapperStyle = () => {
  return {
    root: {
      height: '100px',
      color: '#ee5e5e',
    },
  };
};

/* Buttons */
export const btnSelectAllStyle = () => {
  return {
    root: { color: 'grey', backgroundColor: 'transparent', opacity: 1 },
    rootHovered: {
      color: '#444444',
      backgroundColor: 'transparent',
    },
    rootDisabled: { backgroundColor: 'transparent' },
  };
};

export const btnFilterDefaultStyle = () => {
  return {
    root: {
      color: 'grey',
      fontWeight: '100',
      border: '1px solid transparent',
    },
    rootHovered: { backgroundColor: 'trasparent' },
  };
};
export const btnFilterActiveStyle = () => {
  return {
    root: {
      color: 'grey',
      border: '1px solid #ec9595',
      fontWeight: '100',
      backgroundColor: 'white',
      padding: '0px 10px',
    },
    rootHovered: {
      backgroundColor: 'trasparent',
    },
  };
};

export const btnTaskRemove = (): IButtonStyles => {
  return {
    root: {
      color: '#fd5f5f',
      position: 'absolute',
      top: '50%',
      right: '5%',
      transform: 'translate(0%, -50%)',
    },
    rootHovered: {
      backgroundColor: 'transparent',
      color: 'red',
    },
  };
};

/* Text */
export const mainCaptionStyle = () => {
  return { root: { color: 'red', textAlign: 'center' } };
};

/* Text Fields */
export const textFieldAddStyle = (
  props: ITextFieldStyleProps
): Partial<ITextFieldStyles> => {
  return {
    root: {
      width: '100%',
    },
    fieldGroup: [
      {
        height: '100%',
        padding: '10px',
      },
    ],
    field: {
      lineHeight: 1,
      color: 'grey',
      '::placeholder': {
        color: 'grey',
      },
    },
  };
};

export const taskFieldStyle = (
  props: ITextFieldStyleProps
): Partial<ITextFieldStyles> => {
  return {
    root: { width: '100%' },
    fieldGroup: [{ height: 'max-content' }],
    /* field: { fontSize: '20px' }, */
  };
};

export const taskFieldCompletedStyle = () => {
  return {
    field: {
      /* fontSize: '16px', */
      textDecoration: 'line-through',
      backgroundColor: 'transparent',
    },
  };
};

/* Checkmark */
export const taskCheckmarkStyle = (
  props: ICheckboxStyleProps
): Partial<ICheckboxStyles> => {
  const { checked } = props;
  return {
    checkbox: {
      width: '30px',
      height: '30px',
      borderRadius: '100px',
      backgroundColor: 'transparent',
    },
    ...(checked && {
      checkbox: {
        border: '1px solid #09a50966!important',
        width: '30px',
        height: '30px',
        borderRadius: '100px',
        backgroundColor: 'transparent!important',
      },
    }),
    checkmark: {
      color: 'green',
      fontSize: '20px',
    },
  };
};
