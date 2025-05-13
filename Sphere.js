class Sphere {
  constructor() {
    this.type = "sphere";
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.matrix = new Matrix4();
    this.normalMatrix = new Matrix4();
    this.textureNum = -2;
    this.segments = 12;
    this.bands = 8;
  }

  render() {
    var rgba = this.color;

    gl.uniform1i(u_whichTexture, this.textureNum);
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    gl.uniformMatrix4fv(u_NormalMatrix, false, this.normalMatrix.elements);

    let latAngleStep = 180 / this.bands;
    let lonAngleStep = 360 / this.segments;
    let radius = 0.5;

    for (let i = 0; i < this.bands; i++) {
      for (let j = 0; j < this.segments; j++) {
        let lat1 = 90 - i * latAngleStep;
        let lat2 = 90 - (i + 1) * latAngleStep;
        let lon1 = j * lonAngleStep;
        let lon2 = lon1 + lonAngleStep;

        let v1 = this.sphericalToCartesian(radius, lat1, lon1);
        let v2 = this.sphericalToCartesian(radius, lat2, lon1);
        let v3 = this.sphericalToCartesian(radius, lat2, lon2);
        let v4 = this.sphericalToCartesian(radius, lat1, lon2);

        let n1 = v1.map((coord) => coord / radius);
        let n2 = v2.map((coord) => coord / radius);
        let n3 = v3.map((coord) => coord / radius);
        let n4 = v4.map((coord) => coord / radius);

        let u1 = lon1 / 360;
        let u2 = lon2 / 360;
        let v_lat1 = (90 - lat1) / 180;
        let v_lat2 = (90 - lat2) / 180;

        let uv1 = [u1, v_lat1];
        let uv2 = [u1, v_lat2];
        let uv3 = [u2, v_lat2];
        let uv4 = [u2, v_lat1];

        let vertices1 = [
          v1[0],
          v1[1],
          v1[2],
          v2[0],
          v2[1],
          v2[2],
          v4[0],
          v4[1],
          v4[2],
        ];
        let uvs1 = [uv1[0], uv1[1], uv2[0], uv2[1], uv4[0], uv4[1]];
        let normals1 = [
          n1[0],
          n1[1],
          n1[2],
          n2[0],
          n2[1],
          n2[2],
          n4[0],
          n4[1],
          n4[2],
        ];
        drawTriangle3DUVNormal(vertices1, uvs1, normals1);

        let vertices2 = [
          v2[0],
          v2[1],
          v2[2],
          v3[0],
          v3[1],
          v3[2],
          v4[0],
          v4[1],
          v4[2],
        ];
        let uvs2 = [uv2[0], uv2[1], uv3[0], uv3[1], uv4[0], uv4[1]];
        let normals2 = [
          n2[0],
          n2[1],
          n2[2],
          n3[0],
          n3[1],
          n3[2],
          n4[0],
          n4[1],
          n4[2],
        ];
        drawTriangle3DUVNormal(vertices2, uvs2, normals2);
      }
    }
  }

  sphericalToCartesian(r, latitude, longitude) {
    let latRad = (latitude * Math.PI) / 180;
    let lonRad = (longitude * Math.PI) / 180;

    let y = r * Math.sin(latRad);
    let R = r * Math.cos(latRad);
    let x = R * Math.cos(lonRad);
    let z = R * Math.sin(lonRad);

    return [x, y, z];
  }
}
class Sphere2 {
  constructor() {
    this.type = "sphere2";
    this.position = [0.0, 0.0, 0.0];
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.matrix = new Matrix4();
    this.textureNum = -2;
    this.verts32 = new Float32Array([]);
  }

  render() {
    var rgba = this.color;

    gl.uniform1i(u_whichTexture, this.textureNum);
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    var d = Math.PI / 10;
    var dd = Math.PI / 10;

    for (var t = 0; t < Math.PI; t += d) {
      for (var r = 0; r < 2 * Math.PI; r += d) {
        var p1 = [
          Math.sin(t) * Math.cos(r),
          Math.sin(t) * Math.sin(r),
          Math.cos(t),
        ];
        var p2 = [
          Math.sin(t + dd) * Math.cos(r),
          Math.sin(t + dd) * Math.sin(r),
          Math.cos(t + dd),
        ];
        var p3 = [
          Math.sin(t) * Math.cos(r + dd),
          Math.sin(t) * Math.sin(r + dd),
          Math.cos(t),
        ];
        var p4 = [
          Math.sin(t + dd) * Math.cos(r + dd),
          Math.sin(t + dd) * Math.sin(r + dd),
          Math.cos(t + dd),
        ];

        var v = [];
        var uv = [];
        v = v.concat(p1);
        uv = uv.concat([0, 0]);
        v = v.concat(p2);
        uv = uv.concat([0, 0]);
        v = v.concat(p4);
        uv = uv.concat([0, 0]);
        gl.uniform4f(u_FragColor, 1, 1, 1, 1);
        drawTriangle3DUVNormal(v, uv, v);

        v = [];
        uv = [];
        v = v.concat(p1);
        uv = uv.concat([0, 0]);
        v = v.concat(p4);
        uv = uv.concat([0, 0]);
        v = v.concat(p3);
        uv = uv.concat([0, 0]);
        gl.uniform4f(u_FragColor, 1, 1, 1, 1);
        drawTriangle3DUVNormal(v, uv, v);
      }
    }
  }
}
