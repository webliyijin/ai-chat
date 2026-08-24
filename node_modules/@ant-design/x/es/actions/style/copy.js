const genActionsCopyStyle = token => {
  const {
    componentCls
  } = token;
  const copyCls = `${componentCls}-copy`;
  return {
    [componentCls]: {
      [`&${copyCls}-rtl`]: {
        direction: 'rtl'
      },
      [`${copyCls}-copy`]: {
        fontSize: 'inherit',
        [`&:not(${componentCls}-copy-success)`]: {
          color: 'inherit!important'
        }
      }
    }
  };
};
export default genActionsCopyStyle;