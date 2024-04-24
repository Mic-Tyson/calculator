const add = function(arg, arg1) {
    return arg + arg1;
  };
  
  const subtract = function(arg, arg1) {
    return arg - arg1;
  };
  
  const sum = function(...args) {
      return args.flat().reduce((total, arg) => total + arg, 0);
  };
  
  const multiply = function(...args) {
    return args.flat().reduce((total,arg) => total * arg, 1);
  };
  
  const power = function(arg1, arg2) {
      return arg1**arg2;
  };
  
  const factorial = function(arg) {
    return arg === 0 ? 1 : arg*factorial(arg-1);
      
  };