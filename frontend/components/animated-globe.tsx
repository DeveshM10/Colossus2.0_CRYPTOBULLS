"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export default function AnimatedGlobe() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 200

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)

    // Earth geometry
    const earthGeometry = new THREE.SphereGeometry(80, 64, 64)

    // Earth material with texture
    const textureLoader = new THREE.TextureLoader()
    const earthTexture = textureLoader.load("/earth-texture.jpg")
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      shininess: 5,
    })

    // Earth mesh
    const earth = new THREE.Mesh(earthGeometry, earthMaterial)
    scene.add(earth)

    // Create atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(82, 64, 64)
    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    })

    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
    scene.add(atmosphere)

    // Add connection points and lines
    const connectionPoints = []
    const connectionLines = new THREE.Group()
    scene.add(connectionLines)

    // Create 20 random points on the globe
    for (let i = 0; i < 20; i++) {
      const lat = Math.random() * Math.PI - Math.PI / 2
      const lon = Math.random() * Math.PI * 2

      const x = 80 * Math.cos(lat) * Math.cos(lon)
      const y = 80 * Math.sin(lat)
      const z = 80 * Math.cos(lat) * Math.sin(lon)

      const pointGeometry = new THREE.SphereGeometry(0.8, 16, 16)
      const pointMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0x3b82f6),
        transparent: true,
        opacity: 0.8,
      })

      const point = new THREE.Mesh(pointGeometry, pointMaterial)
      point.position.set(x, y, z)
      earth.add(point)

      connectionPoints.push({ x, y, z, point })
    }

    // Create connections between random points
    for (let i = 0; i < 15; i++) {
      const startPoint = connectionPoints[Math.floor(Math.random() * connectionPoints.length)]
      const endPoint = connectionPoints[Math.floor(Math.random() * connectionPoints.length)]

      if (startPoint === endPoint) continue

      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(startPoint.x, startPoint.y, startPoint.z),
        new THREE.Vector3(endPoint.x, endPoint.y, endPoint.z),
      ])

      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.5,
      })

      const line = new THREE.Line(lineGeometry, lineMaterial)
      connectionLines.add(line)
    }

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
    scene.add(ambientLight)

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    // Add point lights for dramatic effect
    const pointLight1 = new THREE.PointLight(0x3b82f6, 1, 300)
    pointLight1.position.set(200, 100, 100)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x3b82f6, 1, 300)
    pointLight2.position.set(-200, -100, 100)
    scene.add(pointLight2)

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false
    controls.enablePan = false
    controls.rotateSpeed = 0.3
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate the earth
      earth.rotation.y += 0.001

      // Pulse the connection points
      connectionPoints.forEach((point, index) => {
        const scale = 0.8 + 0.2 * Math.sin(Date.now() * 0.001 + index)
        point.point.scale.set(scale, scale, scale)
      })

      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }

      // Dispose of geometries and materials
      earthGeometry.dispose()
      earthMaterial.dispose()
      atmosphereGeometry.dispose()
      atmosphereMaterial.dispose()

      connectionPoints.forEach(({ point }) => {
        point.geometry.dispose()
        point.material.dispose()
      })

      connectionLines.children.forEach((line) => {
        line.geometry.dispose()
        line.material.dispose()
      })
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden" style={{ pointerEvents: "none" }} />
}
