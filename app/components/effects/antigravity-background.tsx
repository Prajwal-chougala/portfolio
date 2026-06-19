'use client';

import React, { useEffect, useRef } from 'react';

// Simple 2D Noise algorithm in GLSL
const NOISE_GLSL = `
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
`;

const VERTEX_SHADER = `#version 300 es
  in vec2 aQuadPos;
  in vec3 aOffset;
  in float aRandom;

  out vec2 vUv;
  out float vSize;
  out vec2 vPos;

  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uGridSize;
  
  // Halo parameters matching medusae defaults
  uniform float uOuterOscFrequency;
  uniform float uOuterOscAmplitude;
  uniform float uHaloRadiusBase;
  uniform float uHaloRadiusAmplitude;
  uniform float uHaloShapeAmplitude;
  uniform float uHaloRimWidth;
  uniform float uHaloOuterStartOffset;
  uniform float uHaloOuterEndOffset;
  uniform float uHaloScaleX;
  uniform float uHaloScaleY;
  uniform float uParticleBaseSize;
  uniform float uParticleActiveSize;
  uniform float uBlobScaleX;
  uniform float uBlobScaleY;
  uniform float uParticleRotationSpeed;
  uniform float uParticleRotationJitter;
  uniform float uParticleOscillationFactor;

  ${NOISE_GLSL}

  void main() {
    vUv = aQuadPos + vec2(0.5);
    vec3 pos = aOffset;

    // Fluid background drift
    float driftSpeed = uTime * 0.15;
    float dx = sin(driftSpeed + pos.y * 0.5) + sin(driftSpeed * 0.5 + pos.y * 2.0);
    float dy = cos(driftSpeed + pos.x * 0.5) + cos(driftSpeed * 0.5 + pos.x * 2.0);
    pos.x += dx * 0.25;
    pos.y += dy * 0.25;

    // Calculate relative mouse position and distance
    vec2 relToMouse = pos.xy - uMouse;
    vec2 haloScale = max(vec2(uHaloScaleX, uHaloScaleY), vec2(0.0001));
    float distFromMouse = length(relToMouse / haloScale);
    vec2 dirToMouse = normalize(relToMouse + vec2(0.0001, 0.0));
    
    // Halo shape deformation using noise
    float shapeFactor = noise(dirToMouse * 2.0 + vec2(0.0, uTime * 0.1));
    float breathCycle = sin(uTime * 0.8);
    float baseRadius = uHaloRadiusBase + breathCycle * uHaloRadiusAmplitude;
    float currentRadius = baseRadius + (shapeFactor * uHaloShapeAmplitude);
    
    // Rim attraction/repulsion field
    float rimInfluence = smoothstep(uHaloRimWidth, 0.0, abs(distFromMouse - currentRadius));
    vec2 pushDir = normalize(relToMouse + vec2(0.0001, 0.0));
    float pushAmt = (breathCycle * 0.5 + 0.5) * 0.5;
    pos.xy += pushDir * pushAmt * rimInfluence;
    pos.z += rimInfluence * 0.3 * sin(uTime);

    // Outer vortex oscillation
    float outerInfluence = smoothstep(baseRadius + uHaloOuterStartOffset, baseRadius + uHaloOuterEndOffset, distFromMouse);
    float outerOsc = sin(uTime * uOuterOscFrequency + pos.x * 0.6 + pos.y * 0.6);
    pos.xy += normalize(relToMouse + vec2(0.0001, 0.0)) * outerOsc * uOuterOscAmplitude * outerInfluence;

    // Size calculation
    float baseSize = uParticleBaseSize + (sin(uTime + pos.x) * 0.003);
    float currentScale = baseSize + (rimInfluence * uParticleActiveSize);
    float stretch = rimInfluence * 0.02;

    // Align quad orientation to mouse
    vec3 transformed = vec3(aQuadPos, 0.0);
    transformed.x *= (currentScale + stretch) * uBlobScaleX;
    transformed.y *= currentScale * uBlobScaleY;
    vSize = rimInfluence;
    vPos = pos.xy;

    float dirLen = max(length(relToMouse), 0.0001);
    vec2 dir = relToMouse / dirLen;
    float oscPhase = aRandom * 6.2831853;
    float osc = 0.5 + 0.5 * sin(uTime * (0.25 + uParticleOscillationFactor * 0.35) + oscPhase);
    float speedScale = mix(0.55, 1.35, osc) * (0.8 + uParticleOscillationFactor * 0.2);
    float jitterScale = mix(0.7, 1.45, osc) * (0.85 + uParticleOscillationFactor * 0.15);
    float jitter = sin(uTime * uParticleRotationSpeed * speedScale + pos.x * 0.35 + pos.y * 0.35) * (uParticleRotationJitter * jitterScale);

    vec2 perp = vec2(-dir.y, dir.x);
    vec2 jitteredDir = normalize(dir + perp * jitter);
    mat2 rot = mat2(jitteredDir.x, jitteredDir.y, -jitteredDir.y, jitteredDir.x);
    transformed.xy = rot * transformed.xy;

    // Project to clip space (normalizing grid coordinates to [-1, 1])
    vec3 finalPos = pos + transformed;
    gl_Position = vec4(finalPos.x / (uGridSize.x * 0.5), finalPos.y / (uGridSize.y * 0.5), 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = `#version 300 es
  precision highp float;

  in vec2 vUv;
  in float vSize;
  in vec2 vPos;

  out vec4 fragColor;

  uniform float uTime;
  uniform vec3 uColorBase;
  uniform vec3 uColorOne;
  uniform vec3 uColorTwo;
  uniform vec3 uColorThree;

  void main() {
    vec2 center = vec2(0.5);
    vec2 pos = abs(vUv - center) * 2.0;
    
    // Rounded/oblong squircle distance
    float d = pow(pow(pos.x, 2.6) + pow(pos.y, 2.6), 1.0 / 2.6);
    float alpha = 1.0 - smoothstep(0.8, 1.0, d);
    if (alpha < 0.01) discard;

    float t = uTime * 1.2;
    float p1 = sin(vPos.x * 0.8 + t);
    float p2 = sin(vPos.y * 0.8 + t * 0.8 + p1);
    
    vec3 activeColor = mix(uColorOne, uColorTwo, p1 * 0.5 + 0.5);
    activeColor = mix(activeColor, uColorThree, p2 * 0.5 + 0.5);
    
    vec3 finalColor = mix(uColorBase, activeColor, smoothstep(0.1, 0.8, vSize));
    // Soft opacity to ensure it is not too bright on mobile/dark mode
    float finalAlpha = alpha * mix(0.18, 0.75, vSize);

    // Apply color
    fragColor = vec4(finalColor, finalAlpha);
  }
`;

export default function AntigravityBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHovering: true });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2', { alpha: true, antialias: true, desynchronized: true });
    if (!gl) {
      console.warn('WebGL2 is not supported in this browser.');
      return;
    }

    // Compile & Link shaders
    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Grid details - dynamically scaled down on mobile/tablet to prevent lag
    const isMobileDevice = window.innerWidth < 768;
    const countX = isMobileDevice ? 40 : 100;
    const countY = isMobileDevice ? 25 : 55;
    const count = countX * countY;

    // Local coordinates of each particle quad
    const quadVertices = new Float32Array([
      -0.5, -0.5,
       0.5, -0.5,
      -0.5,  0.5,
       0.5,  0.5,
    ]);

    // Grid coordinates
    const offsets = new Float32Array(count * 3);
    const randoms = new Float32Array(count);
    const baseGridWidth = 40;
    const baseGridHeight = 22;
    const jitter = 0.25;

    let idx = 0;
    for (let y = 0; y < countY; y++) {
      for (let x = 0; x < countX; x++) {
        const u = x / (countX - 1);
        const v = y / (countY - 1);
        let px = (u - 0.5) * baseGridWidth;
        let py = (v - 0.5) * baseGridHeight;
        px += (Math.random() - 0.5) * jitter;
        py += (Math.random() - 0.5) * jitter;
        offsets[idx * 3] = px;
        offsets[idx * 3 + 1] = py;
        offsets[idx * 3 + 2] = 0;
        randoms[idx] = Math.random();
        idx++;
      }
    }

    // VAO setup
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    // Quad position buffer
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, quadVertices, gl.STATIC_DRAW);
    const aQuadPosLoc = gl.getAttribLocation(program, 'aQuadPos');
    gl.enableVertexAttribArray(aQuadPosLoc);
    gl.vertexAttribPointer(aQuadPosLoc, 2, gl.FLOAT, false, 0, 0);

    // Instanced offset buffer
    const offsetBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, offsetBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, offsets, gl.STATIC_DRAW);
    const aOffsetLoc = gl.getAttribLocation(program, 'aOffset');
    gl.enableVertexAttribArray(aOffsetLoc);
    gl.vertexAttribPointer(aOffsetLoc, 3, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(aOffsetLoc, 1);

    // Instanced random phase buffer
    const randomBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, randomBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, randoms, gl.STATIC_DRAW);
    const aRandomLoc = gl.getAttribLocation(program, 'aRandom');
    gl.enableVertexAttribArray(aRandomLoc);
    gl.vertexAttribPointer(aRandomLoc, 1, gl.FLOAT, false, 0, 0);
    gl.vertexAttribDivisor(aRandomLoc, 1);

    // Retrieve uniform locations
    const uTimeLoc = gl.getUniformLocation(program, 'uTime');
    const uMouseLoc = gl.getUniformLocation(program, 'uMouse');
    const uGridSizeLoc = gl.getUniformLocation(program, 'uGridSize');
    const uColorBaseLoc = gl.getUniformLocation(program, 'uColorBase');
    const uColorOneLoc = gl.getUniformLocation(program, 'uColorOne');
    const uColorTwoLoc = gl.getUniformLocation(program, 'uColorTwo');
    const uColorThreeLoc = gl.getUniformLocation(program, 'uColorThree');

    const uOuterOscFrequencyLoc = gl.getUniformLocation(program, 'uOuterOscFrequency');
    const uOuterOscAmplitudeLoc = gl.getUniformLocation(program, 'uOuterOscAmplitude');
    const uHaloRadiusBaseLoc = gl.getUniformLocation(program, 'uHaloRadiusBase');
    const uHaloRadiusAmplitudeLoc = gl.getUniformLocation(program, 'uHaloRadiusAmplitude');
    const uHaloShapeAmplitudeLoc = gl.getUniformLocation(program, 'uHaloShapeAmplitude');
    const uHaloRimWidthLoc = gl.getUniformLocation(program, 'uHaloRimWidth');
    const uHaloOuterStartOffsetLoc = gl.getUniformLocation(program, 'uHaloOuterStartOffset');
    const uHaloOuterEndOffsetLoc = gl.getUniformLocation(program, 'uHaloOuterEndOffset');
    const uHaloScaleXLoc = gl.getUniformLocation(program, 'uHaloScaleX');
    const uHaloScaleYLoc = gl.getUniformLocation(program, 'uHaloScaleY');
    const uParticleBaseSizeLoc = gl.getUniformLocation(program, 'uParticleBaseSize');
    const uParticleActiveSizeLoc = gl.getUniformLocation(program, 'uParticleActiveSize');
    const uBlobScaleXLoc = gl.getUniformLocation(program, 'uBlobScaleX');
    const uBlobScaleYLoc = gl.getUniformLocation(program, 'uBlobScaleY');
    const uParticleRotationSpeedLoc = gl.getUniformLocation(program, 'uParticleRotationSpeed');
    const uParticleRotationJitterLoc = gl.getUniformLocation(program, 'uParticleRotationJitter');
    const uParticleOscillationFactorLoc = gl.getUniformLocation(program, 'uParticleOscillationFactor');

    // Upload static constants to shaders
    gl.uniform1f(uOuterOscFrequencyLoc, 2.6);
    gl.uniform1f(uOuterOscAmplitudeLoc, 0.9);
    gl.uniform1f(uHaloRadiusBaseLoc, 3.2);
    gl.uniform1f(uHaloRadiusAmplitudeLoc, 0.5);
    gl.uniform1f(uHaloShapeAmplitudeLoc, 0.75);
    gl.uniform1f(uHaloRimWidthLoc, 2.2);
    gl.uniform1f(uHaloOuterStartOffsetLoc, 0.4);
    gl.uniform1f(uHaloOuterEndOffsetLoc, 2.2);
    gl.uniform1f(uHaloScaleXLoc, 1.3);
    gl.uniform1f(uHaloScaleYLoc, 1.0);
    gl.uniform1f(uParticleBaseSizeLoc, 0.024);
    gl.uniform1f(uParticleActiveSizeLoc, 0.065);
    gl.uniform1f(uBlobScaleXLoc, 1.0);
    gl.uniform1f(uBlobScaleYLoc, 0.6);
    gl.uniform1f(uParticleRotationSpeedLoc, 0.1);
    gl.uniform1f(uParticleRotationJitterLoc, 0.2);
    gl.uniform1f(uParticleOscillationFactorLoc, 1.0);

    // Google color palette: Blue, Red, Yellow
    gl.uniform3f(uColorOneLoc, 0.258, 0.521, 0.956);   // #4285f5
    gl.uniform3f(uColorTwoLoc, 0.921, 0.258, 0.211);   // #eb4236
    gl.uniform3f(uColorThreeLoc, 0.98, 0.729, 0.011);  // #faba03

    // Blend configurations
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.depthMask(false);

    let animationFrameId: number;
    const startTime = performance.now();

    // Mouse events
    const handlePointerMove = (e: PointerEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handlePointerLeave = () => {
      mouseRef.current.isHovering = false;
    };

    const handlePointerEnter = () => {
      mouseRef.current.isHovering = true;
    };

    window.addEventListener('pointermove', handlePointerMove);
    document.body.addEventListener('mouseleave', handlePointerLeave);
    document.body.addEventListener('mouseenter', handlePointerEnter);

    // Resize handling
    const resize = () => {
      // Reduce DPR resolution on mobile to save fill rate & GPU rendering time
      const isMobile = window.innerWidth < 768;
      const dpr = isMobile ? Math.min(window.devicePixelRatio || 1, 1.2) : (window.devicePixelRatio || 1);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resize);
    resize();

    // Animation Loop
    const render = () => {
      const time = (performance.now() - startTime) * 0.001;

      // Clear with transparent background
      gl.clearColor(0.0, 0.0, 0.0, 0.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Determine viewport aspect ratio
      const aspect = window.innerWidth / window.innerHeight;
      const gridHeight = 22;
      const gridWidth = 22 * aspect;

      // Update grid size uniform
      gl.uniform2f(uGridSizeLoc, gridWidth, gridHeight);

      // Mouse drag physics and organic hover jitter
      let targetX = mouseRef.current.x;
      let targetY = mouseRef.current.y;

      if (mouseRef.current.isHovering) {
        const jitterRadius = Math.min(gridWidth, gridHeight) * 0.065;
        const jitterX = (Math.sin(time * 0.35) + Math.sin(time * 0.77 + 1.2)) * 0.5;
        const jitterY = (Math.cos(time * 0.31) + Math.sin(time * 0.63 + 2.4)) * 0.5;
        targetX = mouseRef.current.targetX * (gridWidth / 2) + jitterX * jitterRadius * 3.0;
        targetY = mouseRef.current.targetY * (gridHeight / 2) + jitterY * jitterRadius * 3.0;
      }

      mouseRef.current.x += (targetX - mouseRef.current.x) * 0.015;
      mouseRef.current.y += (targetY - mouseRef.current.y) * 0.015;

      gl.uniform2f(uMouseLoc, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(uTimeLoc, time);

      // Color base changes dynamically depending on Theme (light/dark mode)
      const isDark = document.documentElement.classList.contains('dark');
      // Light Mode: Faint slate-300 particles | Dark Mode: Faint slate-800 particles
      if (isDark) {
        gl.uniform3f(uColorBaseLoc, 0.15, 0.17, 0.22); // slate-800 tint
      } else {
        gl.uniform3f(uColorBaseLoc, 0.76, 0.8, 0.85); // slate-300/400 tint
      }

      // Render instances
      gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, count);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', resize);
      document.body.removeEventListener('mouseleave', handlePointerLeave);
      document.body.removeEventListener('mouseenter', handlePointerEnter);
      gl.deleteBuffer(quadBuffer);
      gl.deleteBuffer(offsetBuffer);
      gl.deleteBuffer(randomBuffer);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none block"
      style={{
        width: '100vw',
        height: '100vh',
      }}
    />
  );
}
