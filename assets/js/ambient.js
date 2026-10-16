/**
 * LUM Ambient Light Field
 * Three.js WebGL 环境光场 - 苹果工业风格
 * 粒子系统 + 滚动联动 + 鼠标视差 + 呼吸律动
 */

(function() {
  'use strict';

  // 环境检测
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var compact = window.matchMedia('(max-width: 767px)');
  
  if (reduced.matches || !window.THREE) {
    console.log('[Ambient] 环境光场已禁用（可访问性或 Three.js 未加载）');
    return;
  }

  var canvas, renderer, scene, camera, particles, lightField;
  var mouseX = 0, mouseY = 0, scrollProgress = 0;
  var targetMouseX = 0, targetMouseY = 0;
  var breathPhase = 0, driftPhase = 0;
  var animationId;

  // 配置参数（苹果工业风格：克制、精密、氛围感）
  var config = {
    particleCount: compact.matches ? 120 : 250,
    baseSize: compact.matches ? 1.8 : 2.4,
    baseOpacity: 0.18,
    breathSpeed: 0.0008,
    driftSpeed: 0.0004,
    mouseInfluence: 0.00015,
    scrollInfluence: compact.matches ? 15 : 35,
    colorTemperature: 0xE8E8F0, // 冷白色调
    ambientColor: 0x0A0A0D,
    glowColor: 0xFFFFFF
  };

  /**
   * 初始化 WebGL 场景
   */
  function init() {
    try {
      // 创建固定背景 canvas
      canvas = document.createElement('canvas');
      canvas.id = 'ambient-canvas';
      canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:-1;opacity:0;transition:opacity 1.2s ease-out;';
      document.body.insertBefore(canvas, document.body.firstChild);

      // Three.js 渲染器配置
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: !compact.matches,
        powerPreference: 'low-power'
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // 场景和相机
      scene = new THREE.Scene();
      scene.fog = new THREE.Fog(config.ambientColor, 80, 300);

      camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        1,
        500
      );
      camera.position.z = 100;

      // 环境光和聚光灯
      var ambient = new THREE.AmbientLight(config.ambientColor, 0.6);
      scene.add(ambient);

      var spotLight = new THREE.SpotLight(config.glowColor, 0.4);
      spotLight.position.set(0, 50, 80);
      spotLight.angle = Math.PI / 6;
      spotLight.penumbra = 0.7;
      scene.add(spotLight);

      // 创建粒子光场
      createParticleField();

      // 事件监听
      window.addEventListener('mousemove', onMouseMove, { passive: true });
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize, { passive: true });

      // 启动渲染循环
      canvas.style.opacity = '1';
      animate();

      console.log('[Ambient] 环境光场已激活 (' + config.particleCount + ' 粒子)');
    } catch (error) {
      console.error('[Ambient] 初始化失败:', error);
      cleanup();
    }
  }

  /**
   * 创建粒子光场系统
   */
  function createParticleField() {
    var geometry = new THREE.BufferGeometry();
    var positions = [];
    var scales = [];
    var opacities = [];

    // 生成粒子分布（空间扩散 + 前景/背景层次）
    for (var i = 0; i < config.particleCount; i++) {
      var x = (Math.random() - 0.5) * 280;
      var y = (Math.random() - 0.5) * 200;
      var z = Math.random() * 180 - 90;
      
      positions.push(x, y, z);
      scales.push(Math.random() * 0.6 + 0.4);
      opacities.push(Math.random() * 0.5 + 0.5);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.Float32BufferAttribute(scales, 1));
    geometry.setAttribute('opacity', new THREE.Float32BufferAttribute(opacities, 1));

    // 自定义着色器材质（工业级精密渲染）
    var material = new THREE.ShaderMaterial({
      uniforms: {
        color: { value: new THREE.Color(config.colorTemperature) },
        breath: { value: 1.0 },
        baseOpacity: { value: config.baseOpacity }
      },
      vertexShader: `
        attribute float scale;
        attribute float opacity;
        varying float vOpacity;
        uniform float breath;
        
        void main() {
          vOpacity = opacity;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = scale * breath * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float baseOpacity;
        varying float vOpacity;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          float alpha = (1.0 - smoothstep(0.0, 0.5, dist)) * baseOpacity * vOpacity;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    lightField = {
      geometry: geometry,
      material: material,
      positions: positions
    };
  }

  /**
   * 鼠标视差响应
   */
  function onMouseMove(event) {
    targetMouseX = (event.clientX / window.innerWidth - 0.5) * 2;
    targetMouseY = (event.clientY / window.innerHeight - 0.5) * 2;
  }

  /**
   * 滚动进度同步
   */
  function onScroll() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress = Math.min(scrollTop / Math.max(scrollHeight, 1), 1);
  }

  /**
   * 响应式调整
   */
  function onResize() {
    if (!renderer || !camera) return;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  /**
   * 渲染循环（60fps 流畅驱动）
   */
  function animate() {
    animationId = requestAnimationFrame(animate);

    // 呼吸律动（周期约 4 秒）
    breathPhase += config.breathSpeed;
    var breathScale = 1 + Math.sin(breathPhase) * 0.12;
    lightField.material.uniforms.breath.value = breathScale;

    // 色温微调（冷暖交替，周期约 8 秒）
    var tempShift = Math.sin(breathPhase * 0.5) * 0.03;
    var r = Math.min(1, 0.91 + tempShift);
    var g = Math.min(1, 0.91 + tempShift * 0.5);
    var b = Math.min(1, 0.94 - tempShift * 0.3);
    lightField.material.uniforms.color.value.setRGB(r, g, b);

    // 鼠标视差平滑追踪
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    // 整体场景漂移（随滚动和鼠标联动）
    driftPhase += config.driftSpeed;
    var driftX = Math.sin(driftPhase) * 8 + mouseX * 25;
    var driftY = Math.cos(driftPhase * 1.3) * 6 + mouseY * 18 + scrollProgress * config.scrollInfluence;
    
    particles.rotation.x = mouseY * config.mouseInfluence + scrollProgress * 0.15;
    particles.rotation.y = mouseX * config.mouseInfluence + driftPhase * 0.1;
    particles.position.x = driftX;
    particles.position.y = driftY;

    // 粒子位置微扰动（增强有机感）
    var positions = lightField.geometry.attributes.position.array;
    for (var i = 0; i < config.particleCount; i++) {
      var i3 = i * 3;
      var baseX = lightField.positions[i3];
      var baseY = lightField.positions[i3 + 1];
      
      positions[i3] = baseX + Math.sin(breathPhase + i * 0.1) * 2;
      positions[i3 + 1] = baseY + Math.cos(breathPhase * 1.2 + i * 0.08) * 2;
    }
    lightField.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  /**
   * 清理资源
   */
  function cleanup() {
    if (animationId) cancelAnimationFrame(animationId);
    if (renderer) {
      renderer.dispose();
      renderer.forceContextLoss();
    }
    if (canvas && canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
  }

  // 页面关闭时清理
  window.addEventListener('beforeunload', cleanup);

  // 等待 DOM 和 Three.js 加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(init, 100);
    });
  } else {
    setTimeout(init, 100);
  }

})();
