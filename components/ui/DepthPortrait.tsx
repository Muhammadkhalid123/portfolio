"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";

export interface DepthPortraitProps {
  imageSrc?: string;
  depthSrc?: string;
  className?: string;
}

export function DepthPortrait({
  imageSrc = "/images/khalid_portrait.jpg",
  depthSrc = "/images/khalid_depth.jpg",
  className = "",
}: DepthPortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const setSize = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
    };
    setSize();

    const targetMouse = { x: 0, y: 0 };
    const currentMouse = { x: 0, y: 0 };

    const textureLoader = new THREE.TextureLoader();
    let isDisposed = false;

    Promise.all([
      new Promise<THREE.Texture>((resolve) => textureLoader.load(imageSrc, resolve)),
      new Promise<THREE.Texture>((resolve) => textureLoader.load(depthSrc, resolve)),
    ]).then(([colorTex, depthTex]) => {
      if (isDisposed) return;

      colorTex.minFilter = THREE.LinearFilter;
      colorTex.generateMipmaps = false;
      depthTex.minFilter = THREE.LinearFilter;
      depthTex.generateMipmaps = false;

      // Custom Depth Parallax Shader with HAOQI tone integration
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: colorTex },
          uDepthMap: { value: depthTex },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uTime: { value: 0 },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D uTexture;
          uniform sampler2D uDepthMap;
          uniform vec2 uMouse;
          uniform float uTime;
          varying vec2 vUv;

          void main() {
            vec2 uv = vUv;
            // Subtle 4.5s natural breathing drift (1.5px)
            uv.y += sin(uTime * 1.3) * 0.002;

            // Sample depth map
            float depth = texture2D(uDepthMap, uv).r;

            // Perspective parallax offset
            vec2 offset = uMouse * (depth - 0.5) * 0.035;
            vec2 displacedUv = clamp(uv + offset, 0.001, 0.999);

            vec4 color = texture2D(uTexture, displacedUv);
            gl_FragColor = color;
          }
        `,
      });

      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      setIsReady(true);

      let isVisible = true;
      const observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
        },
        { threshold: 0.1 }
      );
      observer.observe(container);

      let animationFrameId: number;
      const clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        if (!isVisible) return;

        const elapsedTime = clock.getElapsedTime();
        material.uniforms.uTime.value = elapsedTime;

        // Damped lerp follow (0.08)
        currentMouse.x += (targetMouse.x - currentMouse.x) * 0.08;
        currentMouse.y += (targetMouse.y - currentMouse.y) * 0.08;

        material.uniforms.uMouse.value.set(currentMouse.x, currentMouse.y);
        renderer.render(scene, camera);
      };

      animate();

      const handlePointerMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2);
        const y = -((e.clientY - (rect.top + rect.height / 2)) / (window.innerHeight / 2));

        targetMouse.x = THREE.MathUtils.clamp(x * 0.65, -0.6, 0.6);
        targetMouse.y = THREE.MathUtils.clamp(y * 0.45, -0.4, 0.4);
      };

      const handlePointerLeave = () => {
        targetMouse.x = 0;
        targetMouse.y = 0;
      };

      const handleResize = () => {
        setSize();
      };

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("resize", handleResize);
      container.addEventListener("pointerleave", handlePointerLeave);

      return () => {
        isDisposed = true;
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("resize", handleResize);
        container.removeEventListener("pointerleave", handlePointerLeave);
        observer.disconnect();
        geometry.dispose();
        material.dispose();
        colorTex.dispose();
        depthTex.dispose();
        renderer.dispose();
      };
    });

    return () => {
      isDisposed = true;
    };
  }, [imageSrc, depthSrc, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden ${className}`}
      aria-label="Editorial portrait of Muhammad Khalid"
    >
      {/* Static Poster Fallback */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          isReady && !prefersReducedMotion ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Image
          src={imageSrc}
          alt="Muhammad Khalid — Portrait"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center grayscale contrast-105"
        />
      </div>

      {/* 3D WebGL Canvas for Depth Parallax */}
      {!prefersReducedMotion && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
