const genActionsFeedbackStyle = token => {
  const {
    componentCls
  } = token;
  const feedbackCls = `${componentCls}-feedback`;
  return {
    [componentCls]: {
      [`&${feedbackCls}-rtl`]: {
        direction: 'rtl'
      }
    }
  };
};
export default genActionsFeedbackStyle;