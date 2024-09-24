import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import 'tailwindcss/tailwind.css';
import { FaExpand } from 'react-icons/fa';

// Import images
import image1 from '../../public/fu1.jpg';
import image2 from '../../public/fu2.jpg';
import image3 from '../../public/fwu.jpeg';

const Gallery = () => {
  const containerRefs = useRef([]);
  const [fullScreenIndex, setFullScreenIndex] = useState(null);

  // Array of imported images
  const images = [image1, image2, image3];
  const titles = ['Distance view', 'Top view', 'University Block']; // Titles for images

  useEffect(() => {
    containerRefs.current.forEach((containerRef, index) => {
      if (!containerRef || !images[index]) return;

      const width = containerRef.clientWidth;
      const height = containerRef.clientHeight;

      // Create a scene
      const scene = new THREE.Scene();

      // Create a camera
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.set(0, 0, 0.1);

      // Create a renderer
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);
      containerRef.appendChild(renderer.domElement);

      // Load the panorama texture
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(images[index], (texture) => {
        // Create a sphere geometry
        const geometry = new THREE.SphereGeometry(500, 60, 40);
        geometry.scale(-1, 1, 1); // Invert the sphere to make it a panorama

        // Create a material with the panorama texture
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
        });

        // Create a mesh with the geometry and material
        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        // Initial rotation state
        const originalRotation = 0;
        sphere.rotation.y = originalRotation;

        // Animation loop
        let rotationSpeed = 0.0005;
        const animate = () => {
          requestAnimationFrame(animate);
          sphere.rotation.y += rotationSpeed;
          renderer.render(scene, camera);
        };
        animate();

        // Handle user interaction
        let isInteracting = false;
        let lastInteractionTime = 0;
        let returnToOriginal = null;

        const handleMouseDown = () => {
          isInteracting = true;
          rotationSpeed = 0; // Pause rotation during interaction
          clearTimeout(returnToOriginal); // Clear any pending return-to-original timeout
        };

        const handleMouseUp = () => {
          isInteracting = false;
          lastInteractionTime = Date.now();

          // After 1 second of no interaction, return to the original perspective
          returnToOriginal = setTimeout(() => {
            sphere.rotation.y = originalRotation;
            rotationSpeed = 0.0005; // Resume rotation
          }, 1000);
        };

        const handleMouseMove = () => {
          if (isInteracting) {
            rotationSpeed = 0; // Pause rotation during interaction
          }
        };

        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
          window.removeEventListener('mousedown', handleMouseDown);
          window.removeEventListener('mouseup', handleMouseUp);
          window.removeEventListener('mousemove', handleMouseMove);
          clearTimeout(returnToOriginal); // Cleanup timeout on component unmount
        };
      });

      // Add OrbitControls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = true; // Enable zooming
      controls.enablePan = false;

      // Handle window resize
      const onResize = () => {
        const width = containerRef.clientWidth;
        const height = containerRef.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      window.addEventListener('resize', onResize);
      return () => {
        window.removeEventListener('resize', onResize);
      };
    });

    // Listen for full-screen changes to reset z-index
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        setFullScreenIndex(null);
      }
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, [images]);

  const openFullScreen = (index) => {
    setFullScreenIndex(index);
    const element = containerRefs.current[index];
    if (element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) { // IE/Edge
        element.msRequestFullscreen();
      }
    }
  };

  return (
    <div className="py-10 px-2 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-gray-100">Gallery</h2>
      <div className="flex justify-center">
        <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 ${
                fullScreenIndex === index ? 'z-50' : ''
              }`}
              style={{ width: '300px', height: '300px' }} // Square aspect ratio
            >
              {/* Title */}
              <div className="absolute top-2 left-2 bg-transparent text-gray-800 dark:text-gray-900 p-2 rounded-md z-10">
                {titles[index]}
              </div>

              {/* Panorama viewer */}
              <div
                className="panorama-viewer filter saturate-200 overflow-hidden"
                ref={(el) => (containerRefs.current[index] = el)}
                style={{ width: '100%', height: '100%' }}
              >
                {/* Container for the 360 panorama */}
              </div>
              {/* Full screen button */}
              <button
                onClick={() => openFullScreen(index)}
                className="absolute top-0 right-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300 ease-in-out focus:outline-none z-10"
              >
                <FaExpand size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
