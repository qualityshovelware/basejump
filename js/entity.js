function spawnEntityWithEVT(evt) {
  var sceneEl = document.getElementById("ent-scen"); // entity scene thing
  var entityEl = document.createElement('a-entity'); // create entity
  entityEl.className = "clickable"; // make able to spawn off of
  entityEl.setAttribute('position', {x: Math.round(evt.detail.intersection.point["x"]), y: Math.round(evt.detail.intersection.point["y"]+0.51)-0.50, z: Math.round(evt.detail.intersection.point["z"])}); // put it a little high, so as to not glitch the fuck out
  if (window.currStruct == 0) {
    entityEl.setAttribute('mixin', 'cube'); // make a cube
  }
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
  if (phys) {
    entityEl.setAttribute("dynamic-body", "");
  }
  else {
    entityEl.setAttribute("static-body", "")
  }
  sceneEl.appendChild(entityEl); // add to the scene
}
