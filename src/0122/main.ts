import * as p5 from 'p5';

export const sketch = (p: p5) => {
  

let vs = `
attribute vec3 aPosition; // 頂点の位置ベクトル
attribute vec3 aNormal; // 頂点の法線ベクトル
attribute vec2 aTexCoord; // 頂点のUV座標（テクスチャーを貼る座標）

uniform mat4 uModelViewMatrix; // 位置ベクトルを座標変換する行列その1
uniform mat4 uProjectionMatrix; // 位置ベクトルを座標変換する行列その2
uniform mat3 uNormalMatrix; // 法線ベクトルを座標変換する行列

uniform vec3 uLightingDirection[5]; // ☆平行光源の方向ベクトル

varying vec3 vVertexNormal; // 座標変換後の法線ベクトル
varying highp vec2 vVertTexCoord; // UV座標（テクスチャーを貼る座標）
varying vec3 vLightDirection; // ☆平行光源の方向ベクトルの逆

void main(void) {
  vec4 positionVec4 = vec4(aPosition, 1.0);
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
  vVertexNormal = normalize(vec3( uNormalMatrix * aNormal ));
  vVertTexCoord = aTexCoord;
  vLightDirection = -uLightingDirection[0]; // ☆平行光源の方向ベクトルをフラグメントシェーダーに渡す
}
`;

let fs = `

`;
// precision highp float;

// uniform vec4 uMaterialColor; // fill()で指定された色（RGBA）
// uniform sampler2D uSampler; // texture()で指定された画像
// uniform bool isTexture; // textureを使うか否か

// varying vec3 vVertexNormal; // 座標変換後の法線ベクトル
// varying highp vec2 vVertTexCoord; // UV座標（テクスチャーを貼る座標）
// varying vec3 vLightDirection; // ☆平行光源の方向ベクトルの逆

// void main(void) {
//   vec3 direction = normalize(vLightDirection);
//   vec3 normal = normalize(vVertexNormal);
//   float intensity = max(0.0, dot(direction, normal)); // 平行光源と法線が成す角をθとしたときのcosθ

//   vec4 tintColor; // 影の色
//   if (intensity > 0.95) {
//       tintColor = vec4(1.0, 1.0, 1.0, 1.0);
//   } else if (intensity > 0.5) {
//       tintColor = vec4(0.9, 0.8, 0.8, 1.0);
//   } else if (intensity > 0.25) {
//       tintColor = vec4(0.7, 0.5, 0.5, 1.0);
//   } else {
//       tintColor = vec4(0.5, 0.2, 0.2, 1.0);
//   }

//   if(!isTexture) { // テクスチャーを使わないとき
//     gl_FragColor = uMaterialColor * tintColor;
//   }
//   else { // テクスチャーを使うとき
//     gl_FragColor = texture2D(uSampler, vVertTexCoord) * tintColor;
//   }
// }


let theShader;

p.setup=()=> {
 p.createCanvas(500, 500, p.WEBGL);

   theShader = p.createShader(vs, fs);

   p.rectMode(p.CENTER);
   p.noStroke();

   const wh = 50 ;
   const N = 16 ;

   p.background("#B0D0B0");

      p.shader(theShader);

}

p.draw=()=>{
  // 背景・光の設定
  p.background(250, 200, 200);
  p.directionalLight(255, 255, 255, 0.5, 0.5, -1);

  // 回転するトーラスの描画
  p.rotateX(p.millis() / 1000);
  p.rotateY(p.millis() / 3000);  
  p.noStroke();
  p.fill(240, 220, 120);
  p.torus(120, 60, 40, 40);
}

}
