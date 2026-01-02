
// Three.js Network Wave Animation
let sceneRef = null;

const initThreeJS = () => {
    const canvasContainer = document.getElementById('canvas-container');
    if (!canvasContainer) return;

    const scene = new THREE.Scene();
    sceneRef = scene; // Store reference for theme toggling
    
    // Initial Fog (Dark Mode)
    scene.fog = new THREE.FogExp2(0x030304, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasContainer.appendChild(renderer.domElement);

    // Group to hold the terrain
    const terrainGroup = new THREE.Group();
    scene.add(terrainGroup);

    // Create a wireframe terrain
    const geometry = new THREE.PlaneGeometry(60, 60, 40, 40);
    
    const count = geometry.attributes.position.count;
    
    // We don't need to manually init positions as plane is already flat

    const material = new THREE.PointsMaterial({
        color: 0x22D3EE,
        size: 0.05,
        transparent: true,
        opacity: 0.6
    });

    const linesMaterial = new THREE.LineBasicMaterial({
        color: 0x22D3EE,
        transparent: true,
        opacity: 0.15
    });

    const points = new THREE.Points(geometry, material);
    
    // Also add lines for the grid effect
    const lines = new THREE.LineSegments(new THREE.WireframeGeometry(geometry), linesMaterial);
    
    terrainGroup.add(points);
    terrainGroup.add(lines);

    // Position the plane
    terrainGroup.rotation.x = -Math.PI / 2; // Lie flat
    terrainGroup.position.y = -2;
    terrainGroup.position.z = -5;

    // Floating Particles (Stars/Data)
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 1000;
    const starsPos = new Float32Array(starsCount * 3);
    
    for(let i = 0; i < starsCount * 3; i++) {
        starsPos[i] = (Math.random() - 0.5) * 50;
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPos, 3));
    const starsMaterial = new THREE.PointsMaterial({
        size: 0.03,
        color: 0xffffff,
        transparent: true,
        opacity: 0.4
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);


    camera.position.z = 5;
    camera.position.y = 1;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
        const elapsedTime = clock.getElapsedTime();

        // Wave effect on the terrain
        const positions = geometry.attributes.position;
        for (let i = 0; i < count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i); // This is actually Z in world space because we rotated X
            
            // Calculate wave height
            const z = Math.sin(x * 0.5 + elapsedTime * 0.5) * 1 + Math.cos(y * 0.3 + elapsedTime * 0.3) * 1;
            positions.setZ(i, z * 0.5); // Modifying Z of the plane geometry (which is Y in world space)
        }
        positions.needsUpdate = true;
        
        // Rotate terrain group slowly
        terrainGroup.rotation.z = elapsedTime * 0.05;

        // Mouse parallax
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 0.5 + 1 - camera.position.y) * 0.05;
        camera.lookAt(0, -1, -5);

        // Move stars
        stars.rotation.y = elapsedTime * 0.02;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    animate();
};

// Glitch Text Effect
const initGlitch = () => {
    const glitchTexts = document.querySelectorAll('.glitch-text');
    
    glitchTexts.forEach(text => {
        const originalText = text.getAttribute('data-text');
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        
        text.onmouseover = event => {
            let iteration = 0;
            
            clearInterval(event.target.interval);
            
            event.target.interval = setInterval(() => {
                event.target.innerText = event.target.innerText
                    .split("")
                    .map((letter, index) => {
                        if(index < iteration) {
                            return originalText[index];
                        }
                        return chars[Math.floor(Math.random() * 26)];
                    })
                    .join("");
                
                if(iteration >= originalText.length){ 
                    clearInterval(event.target.interval);
                }
                
                iteration += 1 / 3;
            }, 30);
        };
    });
};

// Theme Toggle Logic
const initThemeToggle = () => {
    const toggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    if (!toggleBtn) return;

    const toggleTheme = () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        
        // Toggle Icons
        if (isLight) {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
            
            // Update Three.js Fog for Light Mode
            if (sceneRef) {
                sceneRef.fog.color.setHex(0xF3F4F6); // Light gray
                sceneRef.fog.density = 0.002;
            }
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
            
            // Update Three.js Fog for Dark Mode
            if (sceneRef) {
                sceneRef.fog.color.setHex(0x030304); // Dark almost black
                sceneRef.fog.density = 0.002;
            }
        }
    };

    toggleBtn.addEventListener('click', toggleTheme);
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    initGlitch();
    initThemeToggle();
    
    // Initial glitch trigger
    setTimeout(() => {
        const title = document.querySelector('.glitch-text');
        if(title) title.onmouseover({ target: title });
    }, 1000);
});
