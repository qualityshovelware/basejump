/*
  basejump v_nil
  broken code :)
  plz dont lek
*/

console.log("[*] init main.js");

console.log("[*] init vars");

var currStruct = 0;
var cache = new Array(0);
var tickCount = 0;
var phys = 1;
var removeClick = 0;
var matArr = ["stone", "wood"];
var objArr = ["cube", "sphere", "cone", "cylinder", "import"];
var objToSpwn = 0;
var txtInt = 0;
var snap = 0;
var dont = 0;
var tool = 0;

console.log("[*] init func");

function saveWorld() {
  /*
    saves world to localStorage
    janky af
  */

  var entScen = document.getElementById("ent-scen");
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
  setTimeout(distCheck, 50);
});

window.onkeypress = function (evt) {
  console.log(evt);
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
    /*
        z changes between removing and placing
    */
    if (removeClick) {
      removeClick = 0; // stop removing if removing
    }
    else {
      removeClick = 1; // start removing if not
    }
  }
  else if (evt.charCode === 59) {
    /*
      colon semi-colon goes back
    */
    txtInt--;
    if (txtInt < 0) {
      txtInt = 0;
    }
  }
  else if (evt.charCode === 39) {
    /*
      " and ' goes forward
    */
    txtInt++;
    if (txtInt > matArr.length) {
      txtInt = matArr.length;
    }
  }

  else if (evt.charCode == 116) {
    /*
      t enables and disabels snap
    */
    if (snap) {
      snap = 0;
    }
    else {
      snap = 1;
    }
  }
  else if (evt.charCode == 93) {
    toggleMenu();
  }

};

function toggleMenu() {
  if (menu.getAttribute("style") == "position: fixed; z-index: 999") {
    /*
      if on top, put on bottom
    */
    menu.setAttribute("style", "position: fixed; z-index: 0");
    return 0;
  }
  else {
    /*
      if on bottom, put on top
    */
    menu.setAttribute("style", "position: fixed; z-index: 999");
    return 1;
  }
}

function stc() {
  document.getElementById("sky").setAttribute("position", document.getElementById("cam").getAttribute("position"));
}


console.log("[*] more func setup")

var entscene = document.getElementById("ent-scen");
var cam = document.getElementById("cam");
var spwn = undefined;
var model = "";

setInterval(distCheck, 5000);
setInterval(stc, 100);

function spawn(id) {
  console.log(id.substr(0,3)); // for debug, just shows first 3 chars
  else if (id.substr(0,3) == "#I;") {
    /*
      #I; indicates importing a 3d model url
      todo: make a mixin with the model so each one isn't a request
    */
    spwn = "import";
    window.model = id.substr(3);
    console.log(dont);
    if (dont) {
      document.getElementById("menu").innerHTML += "<button class=\"menuObject\" onclick=\"window.dont = 0; spawn('#I; " + id.substr(3) + "');\">" + id.substr(3) + "</button><br>";
    };
  }
  else {
    /*
      if nothing else, just use the mixin specified
    */
    spwn = id;
  }
}

function onWheel(evt) {
  if (objArr[tool] == "import") {
    menu.setAttribute("style", "position: fixed; z-index: 0");
  }
  if (evt.deltaY < 0) {
    /*
      if moving down
      go back
    */
    tool--;
    if (tool < 0) {
      tool = objArr.length;
    };
  }
  else {
    tool++;
    tool %= objArr.length;
  }
  if (objArr[tool] == "import") {
    /*
      if moving up
      go forwards
    */
    if (menu.getAttribute("style") == "position: fixed; z-index: 999") {
      /*
        do nothing
      */
    }
    else {
      menu.setAttribute("style", "position: fixed; z-index: 999");
      document.exitPointerLock();
    }
  }
  spwn = objArr[tool % objArr.length];
  spwnIndicator.innerText = spwn;
  console.log(tool);
}

document.onwheel = onWheel;
