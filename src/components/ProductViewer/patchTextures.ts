import * as THREE from 'three';

export interface ProceduralPatchTextures {
  matteNormalMap: THREE.CanvasTexture;
  matteRoughnessMap: THREE.CanvasTexture;
  linerRoughnessMap: THREE.CanvasTexture;
}

export function createPatchTextures(): ProceduralPatchTextures {
  // 1. Matte Silica Micro-Sphere Normal / Bump Map (512x512)
  const size = 512;
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = size;
  bumpCanvas.height = size;
  const bCtx = bumpCanvas.getContext('2d')!;

  bCtx.fillStyle = '#808080';
  bCtx.fillRect(0, 0, size, size);

  // Subtle breathable PU micro-grid + silica micro-spheres
  for (let y = 0; y < size; y += 4) {
    for (let x = 0; x < size; x += 4) {
      const jitterX = x + (Math.random() - 0.5) * 2.2;
      const jitterY = y + (Math.random() - 0.5) * 2.2;
      const radius = 0.8 + Math.random() * 1.1;
      const lum = Math.floor(118 + Math.random() * 34);
      bCtx.fillStyle = `rgb(${lum},${lum},${lum})`;
      bCtx.beginPath();
      bCtx.arc(jitterX, jitterY, radius, 0, Math.PI * 2);
      bCtx.fill();
    }
  }

  const matteNormalMap = new THREE.CanvasTexture(bumpCanvas);
  matteNormalMap.wrapS = THREE.RepeatWrapping;
  matteNormalMap.wrapT = THREE.RepeatWrapping;
  matteNormalMap.repeat.set(6, 6);
  matteNormalMap.needsUpdate = true;

  // 2. Matte Roughness Variation Map
  const roughCanvas = document.createElement('canvas');
  roughCanvas.width = size;
  roughCanvas.height = size;
  const rCtx = roughCanvas.getContext('2d')!;
  rCtx.fillStyle = '#dcdcdc'; // high roughness ~0.86 for matte silica finish
  rCtx.fillRect(0, 0, size, size);

  for (let i = 0; i < 6500; i++) {
    const rx = Math.random() * size;
    const ry = Math.random() * size;
    const val = Math.floor(205 + Math.random() * 45);
    rCtx.fillStyle = `rgb(${val},${val},${val})`;
    rCtx.fillRect(rx, ry, 2, 2);
  }

  const matteRoughnessMap = new THREE.CanvasTexture(roughCanvas);
  matteRoughnessMap.wrapS = THREE.RepeatWrapping;
  matteRoughnessMap.wrapT = THREE.RepeatWrapping;
  matteRoughnessMap.repeat.set(5, 5);
  matteRoughnessMap.needsUpdate = true;

  // 3. Fluoropolymer PET Liner Brushed/Frosted Texture
  const linerCanvas = document.createElement('canvas');
  linerCanvas.width = 256;
  linerCanvas.height = 256;
  const lCtx = linerCanvas.getContext('2d')!;
  lCtx.fillStyle = '#707070';
  lCtx.fillRect(0, 0, 256, 256);

  lCtx.strokeStyle = 'rgba(255,255,255,0.08)';
  lCtx.lineWidth = 1;
  for (let i = -256; i < 512; i += 6) {
    lCtx.beginPath();
    lCtx.moveTo(i, 0);
    lCtx.lineTo(i + 256, 256);
    lCtx.stroke();
  }

  const linerRoughnessMap = new THREE.CanvasTexture(linerCanvas);
  linerRoughnessMap.wrapS = THREE.RepeatWrapping;
  linerRoughnessMap.wrapT = THREE.RepeatWrapping;
  linerRoughnessMap.repeat.set(3, 3);
  linerRoughnessMap.needsUpdate = true;

  return {
    matteNormalMap,
    matteRoughnessMap,
    linerRoughnessMap,
  };
}