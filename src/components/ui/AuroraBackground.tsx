import { useEffect, useRef } from 'react';

// Aurora background using WebGL shaders inspired by React Bits Aurora component
// Implements simplex noise in GLSL for organic flowing color waves

const VERT = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;

// Simplex noise helpers
vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  float t = uTime * 0.25;

  // Layer multiple noise octaves for rich organic motion
  float n1 = snoise(uv * 1.8 + vec2(t * 0.4, t * 0.2));
  float n2 = snoise(uv * 3.0 + vec2(-t * 0.3, t * 0.5));
  float n3 = snoise(uv * 5.0 + vec2(t * 0.15, -t * 0.3));

  float noise = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;

  // Color palette: dark navy -> electric blue -> cyan accent
  vec3 color1 = vec3(0.0, 0.0, 0.04);         // near black
  vec3 color2 = vec3(0.0, 0.27, 0.60);        // electric blue #0045CC
  vec3 color3 = vec3(0.0, 0.44, 0.95);        // #0070F3
  vec3 color4 = vec3(0.0, 0.70, 0.90);        // cyan

  float blend = noise * 0.5 + 0.5;

  vec3 col;
  if (blend < 0.33) {
    col = mix(color1, color2, blend / 0.33);
  } else if (blend < 0.66) {
    col = mix(color2, color3, (blend - 0.33) / 0.33);
  } else {
    col = mix(color3, color4, (blend - 0.66) / 0.34);
  }

  // Vignette — keep edges very dark
  vec2 center = uv - 0.5;
  float vignette = 1.0 - dot(center, center) * 2.5;
  vignette = clamp(vignette, 0.0, 1.0);

  // Very subtle — we want it dark with just a hint of aurora
  col *= vignette * 0.35;

  gl_FragColor = vec4(col, 1.0);
}
`;

export function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    // Compile shader
    const compileShader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, compileShader(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    gl.useProgram(program);

    // Full-screen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'uTime');
    const uRes = gl.getUniformLocation(program, 'uResolution');

    let rafId: number;
    let startTime = performance.now();

    const render = () => {
      const t = (performance.now() - startTime) / 1000;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      rafId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* WebGL Aurora */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Subtle dot grid overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Bottom fade to solid bg */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0A0A0A] to-transparent" />
    </div>
  );
}
