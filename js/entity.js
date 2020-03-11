function spawnEntityWithEVT(evt) {
  var sceneEl = document.getElementById("ent-scen"); // entity scene thing
  var entityEl = document.createElement('a-entity'); // create entity
  entityEl.className = "clickable"; // make able to spawn off of
  if (snap) {
    entityEl.setAttribute('position', {x: Math.round(evt.detail.intersection.point["x"]*2)/2, y: Math.round(evt.detail.intersection.point["y"]+0.51)-0.49, z: Math.round(evt.detail.intersection.point["z"]*1.01)/1.01}); // put it a little high, so as to not glitch the fuck out
  }
  else {
    entityEl.setAttribute('position', {x: evt.detail.intersection.point["x"], y: evt.detail.intersection.point["y"] + 0.51, z: evt.detail.intersection.point["z"]}); // put it a little high, so as to not glitch the fuck out
  }
  console.log(evt);
  console.log("fin");
  if (removeClick) {
    sceneEl.removeChild(evt.detail.intersectedEl); // remove styff
    return;
  }
  if (spwn == undefined) {
    entityEl.setAttribute('mixin', 'cube'); // make a cube
  }
  else if (spwn == "import") {
    entityEl.setAttribute('obj-model', "obj: " + model);
    entityEl.setAttribute('mixin', spwn);
  }
  else {
    entityEl.setAttribute('mixin', spwn);
  }
  /*
  else if (window.currStruct == 1) {
    entityEl.setAttribute('mixin', 'sphere'); // set to sphere
  }
  else if (window.currStruct == 2) {
    entityEl.setAttribute('mixin', 'cone'); // set to cone
    entityEl.setAttribute('position', {x: evt.detail.intersection.point["x"], y: evt.detail.intersection.point["y"]+0.6, z: evt.detail.intersection.point["z"]}); // put it a little high, so as to not glitch the fuck out
  }
  else if (window.currStruct == 3) {
    entityEl.setAttribute('mixin', 'cylinder'); // set to cylinder
    entityEl.setAttribute('position', {x: evt.detail.intersection.point["x"], y: evt.detail.intersection.point["y"]+0.2, z: evt.detail.intersection.point["z"]}); // put it a little high, so as to not glitch the fuck out
  }
  else {
    console.log("something fucking broke");
  };
  */
  console.log("fin");
  if (phys) {
    entityEl.setAttribute("dynamic-body");
    entityEl.setAttribute("setdyn", "true");
  }
  else {
    entityEl.setAttribute("static-body");
    entityEl.setAttribute("setdyn", "false");
  }
  console.log("fin");
  console.log(entityEl);
  entityEl.setAttribute("material", "src: img/" + matArr[txtInt] + ".jpg");
  sceneEl.appendChild(entityEl); // add to the scene
  console.log("fin");
}
