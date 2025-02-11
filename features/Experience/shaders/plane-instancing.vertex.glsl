attribute vec3 aPos;
attribute float aRotation;
attribute float aFlipRotation;
attribute vec3 aColor;


varying vec2 vUv;
varying vec3 vColor;


mat2 Rot2(float a ) {
  float c = cos( a );
  float s = sin( a );
  return mat2( c, -s, s, c );
}

vec3 rotate3D(vec3 v, vec3 axis, float angle) {
    axis = normalize(axis);
    float cosA = cos(angle);
    float sinA = sin(angle);
    return v * cosA + cross(axis, v) * sinA + axis * dot(axis, v) * (1.0 - cosA);
}


void main(){
  vUv = uv;
  vColor = aColor;

  float radius = 3.;
  mat2 rotation = Rot2(aRotation);

  vec3 rotated = rotate3D(position, vec3(0.0, 1.0, 0.0), radians(aRotation));
  vec3 newPosition = rotated + aPos;
  newPosition.z += ((position.x * position.x) / (2.0 * radius)) * aFlipRotation;
  // newPosition.xz = rotation * newPosition.xz;
  // newPosition = rotated;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.);
}