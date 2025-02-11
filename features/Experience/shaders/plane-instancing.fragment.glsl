varying vec2 vUv;
varying vec3 vColor;
uniform sampler2D texture1;
uniform sampler2D texture2;
uniform sampler2D texture3;
uniform sampler2D texture4;
uniform sampler2D texture5;
uniform sampler2D texture6;
uniform sampler2D texture7;
uniform sampler2D texture8;
uniform sampler2D texture9;
uniform sampler2D texture10;
uniform sampler2D texture11;

void main(){
  vec4 image1 = texture2D(texture4, vUv);
  gl_FragColor = vec4(vUv, 0. , 1.);
  gl_FragColor = vec4(vColor, 1.);
  gl_FragColor = image1;
}