"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export interface ThreeInteractiveCanvasProps {
  className?: string;
}

export function ThreeInteractiveCanvas({ className }: ThreeInteractiveCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 32;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Constellation Geometry
    const particleCount = 140;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      });
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Particle Material (#00FFD0 electric cyan)
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x00ffd0,
      size: 1.6,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // Rotating 3D Creative Wireframe Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(9, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x00ffd0,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(12, -2, -5);
    scene.add(icoMesh);

    // Secondary subtle geometric ring
    const torusGeo = new THREE.TorusGeometry(14, 0.08, 16, 100);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x00ffd0,
      transparent: true,
      opacity: 0.08,
    });
    const torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.position.set(12, -2, -5);
    torusMesh.rotation.x = Math.PI / 3;
    scene.add(torusMesh);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.0008;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.0008;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Scroll Interaction
    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY || document.documentElement.scrollTop;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Rotate Wireframe Objects
      icoMesh.rotation.x = elapsedTime * 0.12 + targetY * 2;
      icoMesh.rotation.y = elapsedTime * 0.16 + targetX * 2;
      torusMesh.rotation.z = elapsedTime * 0.08;

      // Scroll modulation
      icoMesh.position.y = -2 - scrollY * 0.006;
      torusMesh.position.y = -2 - scrollY * 0.006;

      // Move particles
      const posArray = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3] += velocities[i].x;
        posArray[i * 3 + 1] += velocities[i].y;
        posArray[i * 3 + 2] += velocities[i].z;

        // Boundaries wrap
        if (Math.abs(posArray[i * 3]) > 28) velocities[i].x *= -1;
        if (Math.abs(posArray[i * 3 + 1]) > 28) velocities[i].y *= -1;
        if (Math.abs(posArray[i * 3 + 2]) > 20) velocities[i].z *= -1;
      }
      geometry.attributes.position.needsUpdate = true;

      // Group rotation
      particles.rotation.y = elapsedTime * 0.03 + targetX;
      particles.rotation.x = elapsedTime * 0.02 + targetY;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      particleMaterial.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-[1] overflow-hidden ${className || ""}`}
    />
  );
}
