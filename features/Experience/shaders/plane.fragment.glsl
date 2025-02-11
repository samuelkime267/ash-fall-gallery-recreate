uniform sampler2D uImgTexture;

varying vec2 vUv;


void main(){
  vec4 image = texture2D(uImgTexture, vUv);
  gl_FragColor = vec4(vUv, 0. , 1.);
  gl_FragColor = vec4(image.xyz, 0.5);
}