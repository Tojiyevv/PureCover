import React, { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Html,
  Lightformer,
} from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { PatchModel } from "./PatchModel";
import { PATCH_LAYERS } from "../../data/product";
import type { PatchEdition, PatchShape } from "../../data/product";

interface CameraRigProps {
  resetTrigger: number;
  explodeProgress: number;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}

const CameraRig: React.FC<CameraRigProps> = ({
  resetTrigger,
  explodeProgress,
  controlsRef,
}) => {
  const { camera, size } = useThree();
  const mobile = size.width < 640;
  const cameraDistance = mobile ? 5.5 : 4.4;
  useEffect(() => {
    if (!mobile) return;
    camera.position.set(0, 1.45, cameraDistance);
    camera.updateProjectionMatrix();
    controlsRef.current?.update();
  }, [camera, mobile, cameraDistance, controlsRef]);
  const isResetting = useRef(false);

  useEffect(() => {
    if (resetTrigger > 0) {
      isResetting.current = true;
    }
  }, [resetTrigger]);

  useEffect(() => {
    if (!isResetting.current) return;
    const targetPos = new THREE.Vector3(0, 1.45, cameraDistance);
    let animId: number;

    const animateReset = () => {
      camera.position.lerp(targetPos, 0.1);
      if (controlsRef.current) {
        controlsRef.current.target.lerp(new THREE.Vector3(0, 0, 0), 0.1);
        controlsRef.current.update();
      }
      if (camera.position.distanceTo(targetPos) > 0.02) {
        animId = requestAnimationFrame(animateReset);
      } else {
        isResetting.current = false;
      }
    };
    animId = requestAnimationFrame(animateReset);
    return () => cancelAnimationFrame(animId);
  }, [resetTrigger, camera, controlsRef, cameraDistance]);

  // Subtle camera elevation shift as layers separate vertically
  useEffect(() => {
    if (controlsRef.current && !isResetting.current) {
      controlsRef.current.target.set(0, explodeProgress * 0.05, 0);
      controlsRef.current.update();
    }
  }, [explodeProgress, controlsRef]);

  return null;
};

interface ProductSceneProps {
  explodeProgress: number;
  shape: PatchShape;
  shadeId: string;
  edition: PatchEdition;
  selectedLayerId: string | null;
  onSelectLayer: (layerId: string) => void;
  autoRotate: boolean;
  resetTrigger: number;
  showAnnotations?: boolean;
}

export const ProductScene: React.FC<ProductSceneProps> = ({
  explodeProgress,
  shape,
  shadeId,
  edition,
  selectedLayerId,
  onSelectLayer,
  autoRotate,
  resetTrigger,
  showAnnotations = true,
}) => {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  return (
    <div className="relative h-full w-full select-none">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 1.45, 4.4], fov: 36, near: 0.1, far: 50 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.08,
        }}
      >
        <Suspense fallback={null}>
          {/* Warm clinical studio lighting */}
          <ambientLight intensity={0.65} color="#FFF8F6" />
          <directionalLight
            position={[4.5, 6.5, 4]}
            intensity={1.55}
            color="#FFFDFB"
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-bias={-0.0004}
          />
          <directionalLight
            position={[-4, 2.5, -3.5]}
            intensity={0.7}
            color="#F5D5CE"
          />
          <pointLight
            position={[0, -2.5, 2.5]}
            intensity={0.45}
            color="#FFEAE3"
          />

          {/* Procedural Studio HDRI Lightformers */}
          <Environment resolution={256}>
            <Lightformer
              form="rect"
              intensity={2.2}
              color="#FFFDFB"
              scale={[8, 4, 1]}
              position={[0, 5, 2]}
              rotation={[Math.PI / 2.4, 0, 0]}
            />
            <Lightformer
              form="circle"
              intensity={1.4}
              color="#F9DDD6"
              scale={4}
              position={[-5, 2, 3]}
              rotation={[0, Math.PI / 3, 0]}
            />
            <Lightformer
              form="rect"
              intensity={1.1}
              color="#FFFFFF"
              scale={[6, 2, 1]}
              position={[5, 1, -2]}
              rotation={[0, -Math.PI / 2, 0]}
            />
          </Environment>

          <PatchModel
            explodeProgress={explodeProgress}
            shape={shape}
            shadeId={shadeId}
            edition={edition}
            selectedLayerId={selectedLayerId}
            onSelectLayer={onSelectLayer}
            autoRotate={autoRotate}
          />

          {/* Interactive 3D Pin Callouts when Exploded */}
          {showAnnotations && explodeProgress > 0.55 && (
            <group>
              {PATCH_LAYERS.map((layer) => {
                const isSelected = selectedLayerId === layer.id;
                const yPos = layer.explodeOffset[1] * explodeProgress;
                const sideX = layer.index % 2 === 1 ? 1.58 : -1.58;

                return (
                  <Html
                    key={layer.id}
                    position={[sideX, yPos, 0]}
                    center
                    distanceFactor={6.2}
                    zIndexRange={[20, 0]}
                  >
                    <button
                      type="button"
                      onClick={() => onSelectLayer(layer.id)}
                      className={`group flex items-center gap-2 whitespace-nowrap rounded-full border px-2 py-1 sm:px-3 text-left transition-all duration-200 shadow-sm backdrop-blur-md ${
                        isSelected
                          ? "border-[#7A0C18] bg-[#7A0C18] text-white scale-105 shadow-md"
                          : "border-[#7A0C18]/20 bg-white/90 text-[#1C1415] hover:border-[#7A0C18] hover:bg-white"
                      }`}
                    >
                      <span
                        className={`font-mono-tech text-[10px] font-medium ${
                          isSelected ? "text-white/80" : "text-[#7A0C18]"
                        }`}
                      >
                        0{layer.index}
                      </span>
                      <span className="hidden sm:inline text-[11px] font-medium tracking-tight">
                        {layer.name.split(" ")[0]} {layer.name.split(" ")[1]}
                      </span>
                    </button>
                  </Html>
                );
              })}
            </group>
          )}

          <ContactShadows
            position={[0, -1.78, 0]}
            opacity={0.28}
            scale={7.5}
            blur={2.6}
            far={4}
            color="#580710"
          />

          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            minDistance={2.4}
            maxDistance={6.8}
            minPolarAngle={0.25}
            maxPolarAngle={Math.PI - 0.35}
            enableDamping
            dampingFactor={0.06}
          />

          <CameraRig
            resetTrigger={resetTrigger}
            explodeProgress={explodeProgress}
            controlsRef={controlsRef}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
