
const TickTockLib = (() => {
  let memory = [];
  let triggers = [];
  let idx = 0;

  function spark(value) {
    const pos = idx;
    memory[pos] = memory[pos] ?? value;

    function ignite(newVal) {
      memory[pos] = newVal;
      rerun();
    }

    idx++;
    return [memory[pos], ignite];
  }

  function observe(effectFn, watchList) {
    const pos = idx;
    const oldDeps = triggers[pos];

    const needsUpdate = !oldDeps || watchList.some((val, i) => val !== oldDeps[i]);

    if (needsUpdate) {
      effectFn();
      triggers[pos] = watchList;
    }

    idx++;
  }

  let activeUnit = null;
  let renderArea = null;

  function boot(unit) {
    activeUnit = unit;
    return {
      into(place) {
        renderArea = place;
        rerun();
      }
    };
  }

  function rerun() {
    idx = 0;
    renderArea.innerHTML = activeUnit();
  }

  return {
    spark,     
    observe,   
    boot       
  };
})();
