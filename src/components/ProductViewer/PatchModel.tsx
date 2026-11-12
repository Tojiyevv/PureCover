import React, { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import type { PatchEdition, PatchShape } from "../../data/product";
import { PATCH_LAYERS, SHADE_OPTIONS } from "../../data/product";

import { createPatchTextures } from "./patchTextures";

interface PatchModelProps {
  explodeProgress: number; // 0 = assembled, 1 = fully exploded
  shape: PatchShape;
  shadeId: string;
  edition: PatchEdition;
  selectedLayerId: string | null;
  onSelectLayer: (layerId: string) => void;
  autoRotate: boolean;
}

function createRoundedRectShape(
  width: number,
  height: number,
  radius: number,
): THREE.Shape {
  const s = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  const r = Math.min(radius, width / 2, height / 2);

  s.moveTo(x + r, y);
  s.lineTo(x + width - r, y);
  s.quadraticCurveTo(x + width, y, x + width, y + r);
  s.lineTo(x + width, y + height - r);
  s.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  s.lineTo(x + r, y + height);
  s.quadraticCurveTo(x, y + height, x, y + height - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

function createPerimeterRingShape(
  width: number,
  height: number,
  radius: number,
  borderWidth: number,
): THREE.Shape {
  const outer = createRoundedRectShape(width, height, radius);
  const innerW = Math.max(0.2, width - borderWidth * 2);
  const innerH = Math.max(0.2, height - borderWidth * 2);
  const innerR = Math.max(0.05, radius - borderWidth);

  const hole = new THREE.Path();
  const x = -innerW / 2;
  const y = -innerH / 2;

  hole.moveTo(x + innerR, y);
  hole.lineTo(x + innerW - innerR, y);
  hole.quadraticCurveTo(x + innerW, y, x + innerW, y + innerR);
  hole.lineTo(x + innerW, y + innerH - innerR);
  hole.quadraticCurveTo(
    x + innerW,
    y + innerH,
    x + innerW - innerR,
    y + innerH,
  );
  hole.lineTo(x + innerR, y + innerH);
  hole.quadraticCurveTo(x, y + innerH, x, y + innerH - innerR);
  hole.lineTo(x, y + innerR);
  hole.quadraticCurveTo(x, y, x + innerR, y);

  outer.holes.push(hole);
  return outer;
}

export const PatchModel: React.FC<PatchModelProps> = ({
  explodeProgress,
  shape,
  shadeId,
  edition,
  selectedLayerId,
  onSelectLayer,
  autoRotate,
}) => {
  const rootGroupRef = useRef<THREE.Group>(null);
  const layerRefs = useRef<(THREE.Group | null)[]>([]);
  const smoothedExplode = useRef(explodeProgress);

  const textures = useMemo(() => createPatchTextures(), []);

  useEffect(() => {
    return () => {
      textures.matteNormalMap.dispose();
      textures.matteRoughnessMap.dispose();
      textures.linerRoughnessMap.dispose();
    };
  }, [textures]);

  // Dimensions driven by chosen patch format
  const dims = useMemo(() => {
    if (shape === "round") {
      return { width: 2.55, height: 2.55, radius: 1.275 };
    }
    if (shape === "strip") {
      return { width: 3.6, height: 1.25, radius: 0.28 };
    }
    // Default rounded square pad matching the reference visual
    return { width: 2.65, height: 2.65, radius: 0.48 };
  }, [shape]);

  // Geometries for each distinct structural layer
  const geometries = useMemo(() => {
    const { width, height, radius } = dims;

    // 1. Top Matte Silica + UV Layer (ultra-thin)
    const topMatteGeo = new THREE.ExtrudeGeometry(
      createRoundedRectShape(width * 0.985, height * 0.985, radius * 0.98),
      {
        depth: 0.014,
        bevelEnabled: true,
        bevelThickness: 0.004,
        bevelSize: 0.004,
        bevelSegments: 3,
        curveSegments: 32,
      },
    );
    topMatteGeo.rotateX(-Math.PI / 2);
    topMatteGeo.center();

    // 2. Breathable PU Carrier Membrane (10-25 microns)
    const puFilmGeo = new THREE.ExtrudeGeometry(
      createRoundedRectShape(width, height, radius),
      {
        depth: 0.022,
        bevelEnabled: true,
        bevelThickness: 0.006,
        bevelSize: 0.006,
        bevelSegments: 4,
        curveSegments: 32,
      },
    );
    puFilmGeo.rotateX(-Math.PI / 2);
    puFilmGeo.center();

    // 4. Medical-Grade Silicone Gel Core
    const siliconeCoreGeo = new THREE.ExtrudeGeometry(
      createRoundedRectShape(width * 0.94, height * 0.94, radius * 0.92),
      {
        depth: 0.036,
        bevelEnabled: true,
        bevelThickness: 0.008,
        bevelSize: 0.008,
        bevelSegments: 4,
        curveSegments: 32,
      },
    );
    siliconeCoreGeo.rotateX(-Math.PI / 2);
    siliconeCoreGeo.center();

    // 5. Soft Silicone Elastomer Perimeter Seal Ring
    const borderRingGeo = new THREE.ExtrudeGeometry(
      createPerimeterRingShape(
        width * 1.005,
        height * 1.005,
        radius * 1.005,
        0.14,
      ),
      {
        depth: 0.038,
        bevelEnabled: true,
        bevelThickness: 0.007,
        bevelSize: 0.007,
        bevelSegments: 3,
        curveSegments: 32,
      },
    );
    borderRingGeo.rotateX(-Math.PI / 2);
    borderRingGeo.center();

    // 6. Fluoropolymer-Coated PET Release Liner with subtle curled peel corner (matching reference)
    const linerShape = createRoundedRectShape(
      width * 1.12,
      height * 1.12,
      radius * 1.08,
    );
    const linerGeo = new THREE.ExtrudeGeometry(linerShape, {
      depth: 0.016,
      bevelEnabled: true,
      bevelThickness: 0.003,
      bevelSize: 0.003,
      bevelSegments: 2,
      curveSegments: 32,
    });
    linerGeo.rotateX(-Math.PI / 2);
    linerGeo.center();

    // Gently curl the top-right corner upward like the reference illustration
    const posAttr = linerGeo.attributes.position;
    const halfW = (width * 1.12) / 2;
    const halfH = (height * 1.12) / 2;
    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vy = posAttr.getY(i);
      const vz = posAttr.getZ(i);
      // Top-right corner in XZ plane (positive X, negative Z)
      const cornerFactor = Math.max(
        0,
        (vx / halfW + -vz / halfH - 0.85) / 1.15,
      );
      if (cornerFactor > 0) {
        const curl = Math.pow(cornerFactor, 2.2) * 0.34;
        posAttr.setY(i, vy + curl);
        posAttr.setX(i, vx - curl * 0.35);
        posAttr.setZ(i, vz + curl * 0.35);
      }
    }
    linerGeo.computeVertexNormals();

    return {
      topMatteGeo,
      puFilmGeo,
      siliconeCoreGeo,
      borderRingGeo,
      linerGeo,
    };
  }, [dims]);

  useEffect(() => {
    return () => {
      Object.values(geometries).forEach((g) => g.dispose());
    };
  }, [geometries]);

  // Procedural micro-capsules for Layer 3 (Niacinamide B3, Madecassoside powder, THD Vit C, Bisabolol, Vit E)
  const microCapsules = useMemo(() => {
    const items: {
      pos: [number, number, number];
      scale: number;
      type: "niacinamide" | "madecassoside" | "vitamin";
    }[] = [];

    const maxX = dims.width * 0.38;
    const maxZ = dims.height * 0.38;

    for (let i = 0; i < 42; i++) {
      // Deterministic golden-angle spiral distribution for clean clinical visualization
      const angle = i * 2.3999632;
      const rNorm = Math.sqrt((i + 0.5) / 42);
      const px = Math.cos(angle) * rNorm * maxX;
      const pz = Math.sin(angle) * rNorm * maxZ;
      const py = ((i % 3) - 1) * 0.012;

      const type =
        i % 3 === 0 ? "niacinamide" : i % 3 === 1 ? "madecassoside" : "vitamin";
      const scale =
        type === "niacinamide"
          ? 0.044
          : type === "madecassoside"
            ? 0.032
            : 0.038;
      items.push({ pos: [px, py, pz], scale, type });
    }
    return items;
  }, [dims]);

  const activeShade = useMemo(
    () => SHADE_OPTIONS.find((s) => s.id === shadeId) ?? SHADE_OPTIONS[1],
    [shadeId],
  );

  // Derived material parameters based on Edition (Standard vs Nighttime vs Clear)
  const materialConfig = useMemo(() => {
    const isClear = edition === "clear";
    const isNighttime = edition === "nighttime";

    return {
      puColor: isClear ? "#F7EFEA" : activeShade.hex,
      puOpacity: isClear ? 0.42 : 0.94,
      uvVisible: !isNighttime,
      uvOpacity: isNighttime ? 0 : isClear ? 0.32 : 0.58,
      matteRoughness: isNighttime ? 0.72 : 0.9,
    };
  }, [activeShade, edition]);

  useFrame((state, delta) => {
    // Smooth interpolation toward target explode state
    smoothedExplode.current = THREE.MathUtils.lerp(
      smoothedExplode.current,
      explodeProgress,
      Math.min(1, delta * 6.5),
    );

    const t = smoothedExplode.current;
    const elapsed = state.clock.getElapsedTime();

    if (rootGroupRef.current) {
      // Gentle levitation
      rootGroupRef.current.position.y = Math.sin(elapsed * 1.3) * 0.045;
      if (autoRotate && t < 0.85) {
        rootGroupRef.current.rotation.y += delta * (0.28 * (1 - t * 0.65));
      }
    }

    // Update each independent component's position along its separation vector
    PATCH_LAYERS.forEach((layer, idx) => {
      const grp = layerRefs.current[idx];
      if (!grp) return;

      // Stacked baseline offsets when assembled (t = 0)
      const baseStackY = (2.5 - idx) * 0.018;
      const [ox, oy, oz] = layer.explodeOffset;

      grp.position.set(ox * t, baseStackY + oy * t, oz * t);

      // Subtle tilt on the release liner when peeled away
      if (layer.id === "pet-release-liner") {
        grp.rotation.z = -0.06 * t;
        grp.rotation.x = 0.05 * t;
      }
    });
  });

  const handlePointerDown = (e: any, layerId: string) => {
    e.stopPropagation();
    onSelectLayer(layerId);
  };

  const isHighlighted = (layerId: string) => selectedLayerId === layerId;

  return (
    <group ref={rootGroupRef} rotation={[0.48, -0.45, 0.08]}>
      {/* LAYER 1: Top Matte Silica Micro-Sphere & Mineral UV Shield */}
      <group
        ref={(el) => {
          layerRefs.current[0] = el;
        }}
        onClick={(e) => handlePointerDown(e, PATCH_LAYERS[0].id)}
      >
        <mesh geometry={geometries.topMatteGeo} castShadow receiveShadow>
          <meshPhysicalMaterial
            color={edition === "nighttime" ? "#F5EAE4" : "#FFFDFB"}
            transparent
            opacity={edition === "nighttime" ? 0.35 : 0.64}
            roughness={materialConfig.matteRoughness}
            roughnessMap={textures.matteRoughnessMap}
            bumpMap={textures.matteNormalMap}
            bumpScale={0.012}
            metalness={0.02}
            ior={1.46}
            emissive={isHighlighted(PATCH_LAYERS[0].id) ? "#7A0C18" : "#000000"}
            emissiveIntensity={isHighlighted(PATCH_LAYERS[0].id) ? 0.25 : 0}
          />
        </mesh>
      </group>

      {/* LAYER 2: Shade-Matched Breathable PU Carrier Membrane (10-25 microns) */}
      <group
        ref={(el) => {
          layerRefs.current[1] = el;
        }}
        onClick={(e) => handlePointerDown(e, PATCH_LAYERS[1].id)}
      >
        <mesh geometry={geometries.puFilmGeo} castShadow receiveShadow>
          <meshPhysicalMaterial
            color={materialConfig.puColor}
            transparent
            opacity={materialConfig.puOpacity}
            roughness={0.84}
            roughnessMap={textures.matteRoughnessMap}
            bumpMap={textures.matteNormalMap}
            bumpScale={0.018}
            sheen={0.45}
            sheenRoughness={0.75}
            sheenColor="#FFE8DC"
            transmission={edition === "clear" ? 0.55 : 0.08}
            thickness={0.12}
            emissive={isHighlighted(PATCH_LAYERS[1].id) ? "#7A0C18" : "#000000"}
            emissiveIntensity={isHighlighted(PATCH_LAYERS[1].id) ? 0.25 : 0}
          />
        </mesh>
      </group>

      {/* LAYER 3: Bio-Active Encapsulated Infusion Layer */}
      <group
        ref={(el) => {
          layerRefs.current[2] = el;
        }}
        onClick={(e) => handlePointerDown(e, PATCH_LAYERS[2].id)}
      >
        {/* Invisible hit plane so clicking anywhere in the active matrix selects Layer 3 */}
        <mesh visible={false}>
          <boxGeometry args={[dims.width * 0.85, 0.08, dims.height * 0.85]} />
        </mesh>
        {microCapsules.map((cap, idx) => {
          const color =
            cap.type === "niacinamide"
              ? "#F4D58D"
              : cap.type === "madecassoside"
                ? "#A8D5BA"
                : "#F29E8E";
          return (
            <mesh key={idx} position={cap.pos} scale={cap.scale}>
              <sphereGeometry args={[1, 16, 16]} />
              <meshPhysicalMaterial
                color={color}
                roughness={0.22}
                metalness={0.05}
                transmission={0.35}
                emissive={isHighlighted(PATCH_LAYERS[2].id) ? color : "#3a1a10"}
                emissiveIntensity={
                  isHighlighted(PATCH_LAYERS[2].id) ? 0.65 : 0.14
                }
              />
            </mesh>
          );
        })}
      </group>

      {/* LAYER 4: Medical-Grade Silicone Gel Core */}
      <group
        ref={(el) => {
          layerRefs.current[3] = el;
        }}
        onClick={(e) => handlePointerDown(e, PATCH_LAYERS[3].id)}
      >
        <mesh geometry={geometries.siliconeCoreGeo} castShadow receiveShadow>
          <meshPhysicalMaterial
            color="#FFF6F2"
            transparent
            opacity={0.74}
            roughness={0.18}
            metalness={0}
            transmission={0.78}
            thickness={0.35}
            ior={1.41}
            attenuationColor="#F5C6B8"
            attenuationDistance={1.4}
            emissive={isHighlighted(PATCH_LAYERS[3].id) ? "#7A0C18" : "#000000"}
            emissiveIntensity={isHighlighted(PATCH_LAYERS[3].id) ? 0.25 : 0}
          />
        </mesh>
      </group>

      {/* LAYER 5: Soft Silicone Elastomer Perimeter Edge Seal */}
      <group
        ref={(el) => {
          layerRefs.current[4] = el;
        }}
        onClick={(e) => handlePointerDown(e, PATCH_LAYERS[4].id)}
      >
        <mesh geometry={geometries.borderRingGeo} castShadow receiveShadow>
          <meshPhysicalMaterial
            color={edition === "clear" ? "#F4EAE6" : activeShade.hex}
            transparent
            opacity={0.82}
            roughness={0.38}
            transmission={0.35}
            thickness={0.2}
            ior={1.43}
            emissive={isHighlighted(PATCH_LAYERS[4].id) ? "#7A0C18" : "#000000"}
            emissiveIntensity={isHighlighted(PATCH_LAYERS[4].id) ? 0.3 : 0}
          />
        </mesh>
      </group>

      {/* LAYER 6: Fluoropolymer-Coated PET Release Liner */}
      <group
        ref={(el) => {
          layerRefs.current[5] = el;
        }}
        onClick={(e) => handlePointerDown(e, PATCH_LAYERS[5].id)}
      >
        <mesh geometry={geometries.linerGeo} receiveShadow>
          <meshPhysicalMaterial
            color="#FFFFFF"
            transparent
            opacity={0.48}
            roughness={0.24}
            roughnessMap={textures.linerRoughnessMap}
            metalness={0.05}
            transmission={0.72}
            thickness={0.15}
            ior={1.57}
            clearcoat={0.85}
            clearcoatRoughness={0.15}
            emissive={isHighlighted(PATCH_LAYERS[5].id) ? "#7A0C18" : "#000000"}
            emissiveIntensity={isHighlighted(PATCH_LAYERS[5].id) ? 0.22 : 0}
          />
        </mesh>
      </group>
    </group>
  );
};
