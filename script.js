let color1, color2, t = 0;

function setup() {
    noCanvas(); // Не нужен canvas
    color1 = color(random(255), random(255), random(255));
    color2 = color(random(255), random(255), random(255));
    animateGradient();
}

function animateGradient() {
    t += 0.08; // Скорость анимации

    // Плавный переход между цветами
    let blendedColor1 = lerpColor(color1, color2, sin(t) * 0.5 + 0.5);
    let blendedColor2 = lerpColor(color2, color1, cos(t) * 0.5 + 0.5);

    // Применяем градиент ко всем элементам с классом .card
    document.querySelectorAll('.card').forEach((card) => {
        let gradientCSS = `linear-gradient(90deg, ${blendedColor1.toString('#rrggbb')}, ${blendedColor2.toString('#rrggbb')})`;
        card.style.backgroundImage = gradientCSS;
    });

    // Повторный вызов анимации
    requestAnimationFrame(animateGradient);
}

// Найдите контейнер для 3D
const container = document.getElementById('3d-container');

// Создайте сцену
const scene = new THREE.Scene();

// Настройте камеру
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.z = 5;

// Создайте рендерер и добавьте его к контейнеру
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Добавьте свет в сцену
const light = new THREE.AmbientLight(0x404040, 2); // мягкий свет
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 0).normalize();
scene.add(directionalLight);

// Загрузите модель
const loader = new THREE.GLTFLoader();
loader.load(
  'shoes.gltf',
  (gltf) => {
    // Добавьте модель в сцену
    scene.add(gltf.scene);
    render();
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  (error) => {
    console.error('An error happened', error);
  }
);

// Функция для рендеринга сцены
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

// Измените размер рендерера при изменении окна
window.addEventListener('resize', () => {
  renderer.setSize(container.clientWidth, container.clientHeight);
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
});



function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
render();

loader.load('shoes.gltf', (gltf) => {
  const model = gltf.scene;
  model.scale.set(100, 100, 100); // Измените масштаб, если нужно
  scene.add(model);
  render();
});
renderer.setClearColor(0x000000, 0); // 0 = полностью прозрачный фон
// Установите белый цвет фона
renderer.setClearColor(0xffffff, 1); // Первый параметр — цвет, второй — прозрачность (1 = непрозрачный)

