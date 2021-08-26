/* eslint-disable @typescript-eslint/no-explicit-any */

export const customStyle = {
  multiValue: (base: any) => ({
    ...base,
    backgroundColor: '#7b6d81',
    color: 'white',
    i: {
      display: 'none',
    },
    span: {
      color: '#ffff',
    },
  }),
  option: (base: any) => ({
    ...base,
    borderTop: `1px solid #707070`,
    height: '100%',
    fontSize: '14px',
    backgroundColor: '#fffff',
    ':hover': {
      backgroundColor: '#f4f4f7',
    },
    ':focus': {
      backgroundColor: '#f4f4f7',
    },
  }),
  control: (base: any) => ({
    ...base,
    boxShadow: 'none',
    border: '1px solid gray',
    ':hover': {
      border: '1px solid #B60081',
    },
    ':focus-within': {
      border: '1px solid #B60081',
    },
  }),
  menu: (base: any) => ({
    ...base,
    borderRadius: '8px',
    marginTop: '-0.5px',
  }),
  menuList: (base: any) => ({
    ...base,
    display: 'flex',
    '@media only screen and (max-width: 610px)': {
      flexDirection: 'column',
    },
  }),
  group: (base: any) => ({
    ...base,
    width: '100%',
    padding: '0 20px 0 20px',
  }),
  groupHeading: (base: any) => ({
    ...base,
    fontWeight: 'bold',
    fontSize: '12px',
  }),
};

export const optionStyle = {
  margin: {
    marginLeft: '10px',
  },
  color: {
    marginLeft: '10px',
    color: '#ccc',
  },
  option: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};
