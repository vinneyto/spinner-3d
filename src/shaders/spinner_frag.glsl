const float PI = 3.141592653589793;

uniform vec4 color;
uniform float fromAngle;
uniform float toAngle;

varying vec2 v_uv;

float circle(float radius) {
    vec2 coord = v_uv - vec2(0.5);
    float diff = radius - length(coord);

    return smoothstep(0.0, 0.005, diff);
}

bool isAngleBetween(float target, float angle1, float angle2) {
  float startAngle = min(angle1, angle2);
  float endAngle = max(angle1, angle2);

  if (endAngle - startAngle < 0.001) {
    return false;
  }

  float PI2 = PI * 2.;

  target = mod(target, PI2);
  startAngle = mod(startAngle, PI2);
  endAngle = mod(endAngle, PI2);

  if (startAngle < endAngle) return startAngle <= target && target <= endAngle;
  return startAngle <= target || target <= endAngle;
}

float sector(float startAngle, float endAngle) {
  vec2 uvToCenter = v_uv - vec2(0.5);
  float angle = atan(uvToCenter.y, uvToCenter.x);
  if (isAngleBetween(angle, startAngle, endAngle)) {
    return 1.0;
  } else {
    return 0.;
  }
}

void main() {
    float c = circle(0.5) * (1.0 - circle(0.4)) * sector(fromAngle, toAngle);

    gl_FragColor = color * c;
}
