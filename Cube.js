class Cube {
  constructor() {
    this.type = "cube";
    this.color = [1.0, 1.0, 1.0, 1.0];
    this.matrix = new Matrix4();
    this.normalMatrix = new Matrix4();
    this.textureNum = -2;
  }

  render() {
    var rgba = this.color;

    gl.uniform1i(u_whichTexture, this.textureNum);
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    gl.uniformMatrix4fv(u_NormalMatrix, false, this.normalMatrix.elements);

    const uv00 = 0,
      uv01 = 0;
    const uv10 = 1,
      uv11 = 0;
    const uv02 = 0,
      uv03 = 1;
    const uv12 = 1,
      uv13 = 1;

    const frontNormal = [0.0, 0.0, 1.0];
    const backNormal = [0.0, 0.0, -1.0];
    const topNormal = [0.0, 1.0, 0.0];
    const bottomNormal = [0.0, -1.0, 0.0];
    const rightNormal = [1.0, 0.0, 0.0];
    const leftNormal = [-1.0, 0.0, 0.0];

    const createNormalArray = (normal) => [
      normal[0],
      normal[1],
      normal[2],
      normal[0],
      normal[1],
      normal[2],
      normal[0],
      normal[1],
      normal[2],
    ];

    let vertices = [0, 0, 0, 1, 0, 0, 1, 1, 0];
    let uvs = [uv00, uv01, uv10, uv11, uv12, uv13];
    let normals = createNormalArray(backNormal);
    drawTriangle3DUVNormal(vertices, uvs, normals);

    vertices = [0, 0, 0, 1, 1, 0, 0, 1, 0];
    uvs = [uv00, uv01, uv12, uv13, uv02, uv03];
    drawTriangle3DUVNormal(vertices, uvs, normals);

    vertices = [0, 0, 1, 1, 0, 1, 1, 1, 1];
    uvs = [uv00, uv01, uv10, uv11, uv12, uv13];
    normals = createNormalArray(frontNormal);
    drawTriangle3DUVNormal(vertices, uvs, normals);

    vertices = [0, 0, 1, 1, 1, 1, 0, 1, 1];
    uvs = [uv00, uv01, uv12, uv13, uv02, uv03];
    drawTriangle3DUVNormal(vertices, uvs, normals);

    vertices = [0, 1, 0, 0, 1, 1, 1, 1, 1];
    uvs = [uv00, uv01, uv02, uv03, uv12, uv13];
    normals = createNormalArray(topNormal);
    drawTriangle3DUVNormal(vertices, uvs, normals);

    vertices = [0, 1, 0, 1, 1, 1, 1, 1, 0];
    uvs = [uv00, uv01, uv12, uv13, uv10, uv11];
    drawTriangle3DUVNormal(vertices, uvs, normals);

    vertices = [0, 0, 0, 1, 0, 0, 1, 0, 1];
    uvs = [uv00, uv01, uv10, uv11, uv12, uv13];
    normals = createNormalArray(bottomNormal);
    drawTriangle3DUVNormal(vertices, uvs, normals);

    vertices = [0, 0, 0, 1, 0, 1, 0, 0, 1];
    uvs = [uv00, uv01, uv12, uv13, uv02, uv03];
    drawTriangle3DUVNormal(vertices, uvs, normals);

    vertices = [1, 0, 0, 1, 0, 1, 1, 1, 1];
    uvs = [uv00, uv01, uv10, uv11, uv12, uv13];
    normals = createNormalArray(rightNormal);
    drawTriangle3DUVNormal(vertices, uvs, normals);

    vertices = [1, 0, 0, 1, 1, 1, 1, 1, 0];
    uvs = [uv00, uv01, uv12, uv13, uv02, uv03];
    drawTriangle3DUVNormal(vertices, uvs, normals);

    vertices = [0, 0, 0, 0, 1, 0, 0, 1, 1];
    uvs = [uv00, uv01, uv02, uv03, uv12, uv13];
    normals = createNormalArray(leftNormal);
    drawTriangle3DUVNormal(vertices, uvs, normals);

    vertices = [0, 0, 0, 0, 1, 1, 0, 0, 1];
    uvs = [uv00, uv01, uv12, uv13, uv10, uv11];
    drawTriangle3DUVNormal(vertices, uvs, normals);
  }
}
