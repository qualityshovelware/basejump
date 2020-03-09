/*
  QualityShovelWare v_nil
  broken code :)
  plz dont lek
*/

console.log("[*] init main.js");

console.log("[*] init vars");

var currStruct = 0;
var cache = new Array(0);
var tickCount = 0;
var phys = 0;
var removeClick = 0;
var matArr = ["stone", "wood"];
var txtInt = 0;

console.log("[*] init func");

function saveWorld() {
  /*
    saves world to localStorage
    janky af
  */

  var entScen = document.getElementById("ent-scen");
  for (i = 0; i < cache.length; i++) {
    try {
      if (cache[i] == 0 || cache[i] == undefined) {
        /*
          if undefined or set as taken care of by us,
          do nothing
        */
        continue;
      }
      entscene.appendChild(cache[i]); // put back in scene
      cache[i] = 0; // take out of cache
    }
    catch (e) {
      console.log("null " + e); // old error from jank code that we're keeping
    };
  }
  for (i = 0; i < entScen.children.length; i++) {
    /*
      because a-frame doesn't update shit
      gotta flush the DOM
    */
    entScen.children[i].flushToDOM();
  }

  localStorage.setItem("save", document.getElementById("ent-scen").innerHTML);
  return 0;
}

function loadWorld() {
  /*
    loads world from localStorage
    janky but dank af
  */

  var entScen = document.querySelector("#ent-scen");
  entScen.innerHTML = localStorage.getItem("save");
  return 0;
}

function togglePhysics() {
  if (phys) {
    phys = 0;
  }
  else {
    phys = 1;
  }
}

console.log("[*] init event handler");

document.querySelector("#blockHand").addEventListener('xbuttondown', function () {
  /*
    increment and keep within 4
  */

  window.currStruct += 1;
  window.currStruct %= 4;
});

document.querySelector("#blockHand").addEventListener('ybuttondown', function () {
  /*
    decrement and keep within 4
  */

  window.currStruct -= 1;
  window.currStruct %= 4;
  if (window.currStruct < 0) {
    window.currStruct = 0;
  }
});
document.querySelector("#rhand").addEventListener('abuttondown', function () {
  /*
    save
  */
  saveWorld();
});

document.querySelector("#rhand").addEventListener('bbuttondown', function () {
  /*
    load save
  */
  loadWorld();
});

console.log("[*] init cam settings")

document.querySelector('#cam').setAttribute("far", 50);

console.log("[*] more event handlers")

document.querySelector('#blockHand').addEventListener("click", spawnEntityWithEVT);
document.querySelector('#cam').addEventListener("click", function (evt) {
  var lastEvt = evt;
  spawnEntityWithEVT(evt);
  distCheck();
});

window.onkeypress = function (evt) {
  console.log(evt, evt.charCode);
  if (evt.charCode === 99) {
    /*
      toggles physics if c is pressed
    */
    togglePhysics();
  }
  else if (evt.charCode === 111) {
    /*
      o saves.
    */
    console.log("save");
    saveWorld();
  }
  else if (evt.charCode === 112) {
    /*
      p loads.
    */
    console.log("load");
    loadWorld();
  }
  else if (evt.charCode === 122) {
    if (removeClick) {
      removeClick = 0;
    }
    else {
      removeClick = 1;
    }
  }
  else if (evt.charCode === 59) {
    txtInt--;
  }
  else if (evt.charCode === 39) {
    txtInt++;
  }

};


console.log("[*] more func setup")

var entscene = document.getElementById("ent-scen");
var cam = document.getElementById("cam");

setInterval(distCheck, 5000);
