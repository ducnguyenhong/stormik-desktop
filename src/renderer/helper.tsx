export const setMyTimeOut = (callback: () => void, timeOut: number) => {
  let timer: any = null;

  const currentTime = new Date().getTime();
  const blah = () => {
    if (new Date().getTime() >= currentTime + timeOut) {
      clearInterval(timer);
      callback();
    }
  };
  timer = setInterval(blah, 100);
};
