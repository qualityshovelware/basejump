function distanceOf2Points(pos1, pos2) {
  /*
    plz dont stel meh stolen kod
    In all seriousness, just calculated the distance between 2 points.
  */
  x1 = pos1["x"];
  x2 = pos2["x"];
  z1 = pos1["z"];
  z2 = pos2["z"];

  h2 = Math.pow(
    Math.abs(x1 - x2),
    2
  ) + Math.pow(
    Math.abs(z1 - z2),
    2
  );
  return Math.sqrt(h2);
}
