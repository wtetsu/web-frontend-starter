const wait = async (time: number) => {
  console.info("wait:start");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

export { wait };
