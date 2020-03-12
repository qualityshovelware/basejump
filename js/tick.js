var tickCount = 0;

function tick() {
  /*
    tick code
    basejump v_nil
  */
  tickCount++;
  if (tickCount % 5 == 0) {
    distCheck();
  }
}
