function log(...args: any[]) {
  console.log(...args);
}

function error(...args: any[]) {
  console.error(...args);
}

function debug(...args: any[]) {
  console.debug(...args);
}

export default { log, error, debug };

