function distCheck() {
  /*
    not stolen
    this code uses the distanceOf2Points lib function
    (c) Public Domain i guess?
  */
  var ent = document.getElementById("ent-scen").children; // children of entity scene
  for (i = 0; i < ent.length; i++) {
    /*
      go through each child
      if code fails, that's fine, just log.
    */
    console.log("a");
    try {
      /*
        if closer than 20
        deload
      */
      if (distanceOf2Points(ent[i].getAttribute("position"), document.getElementById("cam").getAttribute("position")) > 20) {
          /*
        var ent = document.getElementById("ent-scen").children; // reload, janky shit
        ent[i].flushToDOM(); // flush, cuz a-frame
        cache[cache.length] = ent[i]; // put at end of array cuz shit is broken
        document.getElementById("ent-scen").removeChild(ent[i]); // remove child, we done bruh
        */
        ent[i].setAttribute("static-body");
        ent[i].removeAttribute("dynamic-body");
      }
      if (distanceOf2Points(ent[i].getAttribute("position"), cam.getAttribute("position")) < 20) {
          /*
        entscene.appendChild(cache[i]); // put back in scene
        cache[i] = 0; // take out of cache
        */
        console.log(ent[i].getAttribute("setdyn"));
        if (ent[i].getAttribute("setdyn") == "false") {
            continue;
        }
        ent[i].removeAttribute("static-body");
        ent[i].setAttribute("dynamic-body", "true");
      }
    }
    catch (e) {
      /*
        code failed, just log.
      */
      console.log("error in cache.js distCheck p0: " + e);
    };
  }
  /*
  for (i = 0; i < c.length; i++) {
    try {
      if (cache[i] == 0 || cache[i] == undefined) {
        /*
          if undefined or set as taken care of by us,
          do nothing
        continue;
      }

    }
    catch (e) {
      console.log("null " + e); // old error from jank code that we're keeping
    };
  }
  */
};
