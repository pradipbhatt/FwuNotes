import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import 'tailwindcss/tailwind.css';
import { FaExpand, FaCompress } from 'react-icons/fa'; // Import icons

// Import images
import image1 from '../../public/fu1.jpg';
import image2 from '../../public/fu2.jpg';
import image3 from '../../public/fwu.jpeg';

const Gallery = () => {
  const containerRefs = useRef([]);
  const [fullScreenIndex, setFullScreenIndex] = useState(null); // Track full-screen mode

  // Array of imported images
  const images = [image1, image2, image3];

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

        // Apply a slow rotation to the panorama
        let rotationSpeed = 0.0005; // Adjusted slow rotation speed
        const animate = () => {
          requestAnimationFrame(animate);
          sphere.rotation.y += rotationSpeed;
          renderer.render(scene, camera);
        };
        animate();

        // Handle user interaction
        let isInteracting = false;

        const handleMouseDown = () => {
          isInteracting = true;
        };

        const handleMouseUp = () => {
          isInteracting = false;
        };

        const handleMouseMove = (event) => {
          if (isInteracting) {
            rotationSpeed = 0; // Pause rotation during interaction
          } else {
            rotationSpeed = 0.0005; // Resume rotation after interaction
          }
        };

        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
          window.removeEventListener('mousedown', handleMouseDown);
          window.removeEventListener('mouseup', handleMouseUp);
          window.removeEventListener('mousemove', handleMouseMove);
        };
      });

      // Add OrbitControls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = true;  // Enable zooming
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

  const closeFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen();
    }
    setFullScreenIndex(null);
  };

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-gray-100">Gallery</h2>
      <div className="grid gap-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {images.map((image, index) => (
          <div
            key={index}
            className={`relative bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 ${
              fullScreenIndex === index ? 'z-50' : ''
            }`}
          >
            <div
              className="panorama-viewer filter saturate-200" // Increased saturation
              ref={(el) => (containerRefs.current[index] = el)}
              style={{ width: '100%', height: '300px' }}
            >
              {/* Container for the 360 panorama */}
            </div>
            <p className="text-center mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">Image {index + 1}</p>
            <button
              onClick={() => openFullScreen(index)}
              className="absolute top-2 right-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300 ease-in-out focus:outline-none"
            >
              <FaExpand size={24} />
            </button>
            {fullScreenIndex === index && (
              <button
                onClick={closeFullScreen}
                className="absolute top-2 left-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300 ease-in-out focus:outline-none"
              >
                <FaCompress size={24} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
