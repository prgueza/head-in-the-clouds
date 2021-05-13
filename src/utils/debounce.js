/* 
  Debouncer:

  Debouncer closure for the debounce function. Stores a reference
  for the timeout in progress and uses it to control whether the 
  callback can be called again or not. This debouncer implementation
  doesn't delay the callback execution, it just disregards the subsequent
  callbacks. Returns the debounced callback.
*/
function debouncer(cb) {
  let flag = false;
  return () => {
    if (flag) return;
    cb();
    flag = setTimeout(() => (flag = false), 300);
  };
}

export default debouncer;
