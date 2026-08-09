// ==========================================
// VARIABLES GLOBALES
// ==========================================
let estadoActual = 'menu';

// Variables de Memoria
const velocidadDesvanecimiento = 2; 
let trazosMemoria = []; 

// Variables de Herencia
let lineasIzq = 3; 
let lineasDer = 1; 
let faseDesvanecimiento = false;
let opacidadExtra = 255;

// Variables de Caducidad
let particulasCaducidad = [];
let saludTriangulo = 255;       
let estadoCaducidad = 'entero'; 
let tiempoRoto = 0;             

// Variables de Identidad
let crecimientoIdentidad = [0, 0, 0]; 
let particulasIdentidad = []; 

// Variables de Empatía
let empatiaProgreso = 0; 
let empatiaNodosOpacidad = [0, 0, 0, 0, 0, 0, 0, 0];
let tiempoConectado = 0; 

// Variables de Colaboración
let colaboracionProgreso = [0, 0, 0]; // Progreso individual para cada una de las 3 formas pequeñas
let particulasColaboracion = [];       // Cuadrados que emite el cuadrado central

// Estructura de la Galería
const conceptos = [
  { id: 'memoria', nombre: 'Memoria', figura: 'cuadrado' },
  { id: 'herencia', nombre: 'Herencia', figura: 'circulo' },
  { id: 'caducidad', nombre: 'Caducidad', figura: 'triangulo' },
  { id: 'identidad', nombre: 'Identidad', figura: 'cuadrado' },
  { id: 'empatia', nombre: 'Empatía', figura: 'circulo' },
  { id: 'colaboracion', nombre: 'Colaboración', figura: 'linea' },
  { id: 'incertidumbre', nombre: 'Incertidumbre', figura: 'triangulo' },
  { id: 'ansiedad', nombre: 'Ansiedad', figura: 'linea' },
  { id: 'expectativa', nombre: 'Expectativa', figura: 'cuadrado' }
];

// ==========================================
// CONFIGURACIÓN INICIAL
// ==========================================
function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont('monospace');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// ==========================================
// MOTOR PRINCIPAL
// ==========================================
function draw() {
  background(15); 

  if (estadoActual === 'menu') {
    dibujarMenuGaleria();
  } else {
    if (estadoActual === 'memoria') dibujarMemoria();
    else if (estadoActual === 'herencia') dibujarHerencia();
    else if (estadoActual === 'caducidad') dibujarCaducidad();
    else if (estadoActual === 'identidad') dibujarIdentidad();
    else if (estadoActual === 'empatia') dibujarEmpatia();
    else if (estadoActual === 'colaboracion') dibujarColaboracion();
    else {
      fill(255); noStroke(); textAlign(CENTER, CENTER); textSize(20);
      text("Interfaz en construcción", width / 2, height / 2);
    }
    
    dibujarBotonVolver();
  }
}

// ==========================================
// INTERFACES DE NAVEGACIÓN
// ==========================================
function dibujarMenuGaleria() {
  fill(255); noStroke(); textAlign(CENTER, CENTER); textSize(24);
  text("SISTEMA DE SIGNOS REACTIVOS", width / 2, 50);
  
  let margen = 100;
  let espaciadoX = (width - margen * 2) / 3;
  let espaciadoY = (height - margen * 2) / 3;

  for (let i = 0; i < conceptos.length; i++) {
    let col = i % 3; let fila = Math.floor(i / 3);
    let x = margen + col * espaciadoX + espaciadoX / 2;
    let y = margen + fila * espaciadoY + espaciadoY / 2 + 30;

    stroke(255); noFill(); strokeWeight(2);
    
    if (conceptos[i].figura === 'cuadrado') square(x - 20, y - 40, 40);
    if (conceptos[i].figura === 'circulo') circle(x, y - 20, 40);
    if (conceptos[i].figura === 'triangulo') triangle(x, y - 40, x - 20, y, x + 20, y);
    if (conceptos[i].figura === 'linea') line(x - 20, y - 20, x + 20, y - 20);

    noStroke(); fill(180); textSize(14);
    text(conceptos[i].nombre, x, y + 20);
  }
}

function dibujarBotonVolver() {
  stroke(255, 100); noFill(); strokeWeight(1); rect(20, 20, 100, 40);
  noStroke(); fill(255); textAlign(LEFT, CENTER); textSize(14);
  text("< VOLVER", 35, 40);
}

// ==========================================
// LÓGICA DE INTERACCIÓN (CLICS/TOUCH)
// ==========================================
function mousePressed() {
  if (estadoActual === 'menu') {
    let margen = 100; let espaciadoX = (width - margen * 2) / 3; let espaciadoY = (height - margen * 2) / 3;
    for (let i = 0; i < conceptos.length; i++) {
      let col = i % 3; let fila = Math.floor(i / 3);
      let x = margen + col * espaciadoX + espaciadoX / 2;
      let y = margen + fila * espaciadoY + espaciadoY / 2 + 30;
      if (dist(mouseX, mouseY, x, y) < 60) estadoActual = conceptos[i].id;
    }
  } else {
    if (mouseX > 20 && mouseX < 120 && mouseY > 20 && mouseY < 60) {
      estadoActual = 'menu';
      
      // Reseteos generales
      lineasIzq = 3; lineasDer = 1; faseDesvanecimiento = false; opacidadExtra = 255;
      trazosMemoria = []; particulasCaducidad = []; saludTriangulo = 255; estadoCaducidad = 'entero';
      crecimientoIdentidad = [0, 0, 0]; particulasIdentidad = []; 
      empatiaProgreso = 0; empatiaNodosOpacidad = [0, 0, 0, 0, 0, 0, 0, 0]; tiempoConectado = 0;
      
      // Reseteo de Colaboración
      colaboracionProgreso = [0, 0, 0];
      particulasColaboracion = [];
    }
    
    if (estadoActual === 'herencia' && !faseDesvanecimiento) {
      let centroIzqX = width / 4; let centroY = height / 2;
      if (dist(mouseX, mouseY, centroIzqX, centroY) < 70) {
        if (lineasIzq > 1) { lineasIzq--; lineasDer++; }
        if (lineasDer === 3) faseDesvanecimiento = true;
      }
    }
  }
}

// ==========================================
// SUBSISTEMAS 1 Y 2 (ANTERIORES)
// ==========================================
function dibujarMemoria() {
  for (let i = trazosMemoria.length - 1; i >= 0; i--) {
    let trazo = trazosMemoria[i];
    trazo.opacidad -= velocidadDesvanecimiento;
    if (trazo.opacidad <= 0) { trazosMemoria.splice(i, 1); continue; }
    push(); translate(trazo.x, trazo.y); rotate(trazo.angulo);
    stroke(180, trazo.opacidad); noFill(); strokeWeight(1.5);
    if (trazo.tipo === 0) line(-trazo.tam, 0, trazo.tam, 0); 
    else if (trazo.tipo === 1) { rectMode(CENTER); square(0, 0, trazo.tam); }
    else if (trazo.tipo === 2) triangle(0, -trazo.tam, -trazo.tam, trazo.tam, trazo.tam, trazo.tam); 
    pop(); 
  }
  let interactuando = mouseIsPressed || touches.length > 0;
  if (interactuando) {
    let interX = touches.length > 0 ? touches[0].x : mouseX; let interY = touches.length > 0 ? touches[0].y : mouseY;
    for (let j = 0; j < 3; j++) {
      trazosMemoria.push({ x: interX + random(-35, 35), y: interY + random(-35, 35), tipo: floor(random(3)), tam: random(4, 12), angulo: random(TWO_PI), opacidad: 255 });
    }
    stroke(255); fill(15); strokeWeight(2); circle(interX, interY, 50);
  }
}

function dibujarHerencia() {
  let centroIzqX = width / 4; let centroDerX = (width / 4) * 3; let centroY = height / 2;
  stroke(50); strokeWeight(2); line(centroIzqX - 50, centroY + 45, centroIzqX + 50, centroY + 45); line(centroDerX - 50, centroY + 45, centroDerX + 50, centroY + 45);
  strokeWeight(3); strokeCap(ROUND); noFill();
  let p1x = 0, p1y = -40; let p2x = 35, p2y = 25; let p3x = -35, p3y = 25; 
  if (faseDesvanecimiento) {
    opacidadExtra -= 2.5; 
    if (opacidadExtra <= 0) { faseDesvanecimiento = false; opacidadExtra = 255; lineasIzq = 3; lineasDer = 1; }
  }
  push(); translate(centroIzqX, centroY); stroke(0, 255, 150); 
  if (lineasIzq >= 1) line(p1x, p1y, p3x, p3y); if (lineasIzq >= 2) line(p3x, p3y, p2x, p2y); if (lineasIzq === 3) line(p2x, p2y, p1x, p1y); pop();
  push(); translate(centroDerX, centroY); stroke(0, 255, 150);
  if (lineasDer >= 1) line(p1x, p1y, p3x, p3y);
  let colorHeredado = color(0, 255, 150, faseDesvanecimiento ? opacidadExtra : 255); stroke(colorHeredado);
  if (lineasDer >= 2) line(p3x, p3y, p2x, p2y); if (lineasDer === 3) line(p2x, p2y, p1x, p1y); pop();
  if (mouseIsPressed && !faseDesvanecimiento) { noStroke(); fill(0, 255, 150, 20); circle(mouseX, mouseY, 40); }
}

function dibujarCaducidad() {
  let centroX = width / 2; let centroY = height / 2 - 50; let tam = 80;
  stroke(50); strokeWeight(2); line(centroX - 100, centroY + 150, centroX + 100, centroY + 150);
  let interactuando = mouseIsPressed || touches.length > 0; let deslizandoAbajo = mouseY > pmouseY;
  let vibracionX = 0; let vibracionY = 0;
  if (estadoCaducidad === 'entero') {
    if (interactuando && deslizandoAbajo && dist(mouseX, mouseY, centroX, centroY) < tam * 1.5) {
      vibracionX = random(-3, 3); vibracionY = random(-3, 3); saludTriangulo -= 4;
      for (let i = 0; i < 2; i++) particulasCaducidad.push({ x: centroX + random(-tam/2, tam/2), y: centroY + random(-tam/2, tam/2), vx: random(-2, 2), vy: random(2, 6), tam: random(4, 10), angulo: random(TWO_PI), velAngulo: random(-0.1, 0.1), opacidad: 255 });
      if (saludTriangulo <= 0) { saludTriangulo = 0; estadoCaducidad = 'roto'; tiempoRoto = frameCount; }
    }
  } else if (estadoCaducidad === 'roto') {
    if (frameCount - tiempoRoto > 120) estadoCaducidad = 'regenerando';
  } else if (estadoCaducidad === 'regenerando') {
    saludTriangulo += 2; if (saludTriangulo >= 255) { saludTriangulo = 255; estadoCaducidad = 'entero'; }
  }
  if (saludTriangulo > 0) { push(); translate(centroX + vibracionX, centroY + vibracionY); stroke(255, 100, 50, saludTriangulo); noFill(); strokeWeight(3); triangle(0, -tam, -tam, tam, tam, tam); pop(); }
  for (let i = particulasCaducidad.length - 1; i >= 0; i--) {
    let p = particulasCaducidad[i]; p.x += p.vx; p.y += p.vy; p.angulo += p.velAngulo; p.opacidad -= 4; 
    if (p.opacidad <= 0 || p.y > centroY + 150) { particulasCaducidad.splice(i, 1); continue; }
    push(); translate(p.x, p.y); rotate(p.angulo); stroke(255, 100, 50, p.opacidad); noFill(); strokeWeight(1.5); triangle(0, -p.tam, -p.tam, p.tam, p.tam, p.tam); pop();
  }
}

function dibujarIdentidad() {
  let centrosX = [width / 4, width / 2, (width / 4) * 3]; let centroY = height / 2 - 20; let tam = 70;
  stroke(50); strokeWeight(2); for (let i = 0; i < 3; i++) line(centrosX[i] - 50, centroY + 80, centrosX[i] + 50, centroY + 80);
  let interactuando = mouseIsPressed || touches.length > 0;
  for (let i = 0; i < 3; i++) {
    let distancia = dist(mouseX, mouseY, centrosX[i], centroY); let sobreFigura = interactuando && distancia < tam;
    if (sobreFigura) {
      crecimientoIdentidad[i] += 4; if (crecimientoIdentidad[i] > 155) crecimientoIdentidad[i] = 155; 
      if (frameCount % 4 === 0) particulasIdentidad.push({ x: centrosX[i] + random(-30, 30), y: centroY + random(-30, 30), vx: random(-3, 3), vy: random(-3, 3), tipo: i, tam: random(5, 15), angulo: random(TWO_PI), velAngulo: random(-0.05, 0.05), opacidad: 255, tonoVerde: random(100, 255), tonoAzul: random(50, 150) });
    } else {
      crecimientoIdentidad[i] -= 2; if (crecimientoIdentidad[i] < 0) crecimientoIdentidad[i] = 0;
    }
    push(); translate(centrosX[i], centroY); let opacidadActual = 100 + crecimientoIdentidad[i]; let grosorExtra = (crecimientoIdentidad[i] / 20); 
    stroke(0, 255, 150, opacidadActual); strokeWeight(2 + grosorExtra); noFill();
    if (i === 0) circle(0, 0, tam); else if (i === 1) { rectMode(CENTER); square(0, 0, tam); } else if (i === 2) triangle(0, -tam/2 - 5, -tam/2, tam/2 + 5, tam/2, tam/2 + 5);
    pop();
  }
  for (let j = particulasIdentidad.length - 1; j >= 0; j--) {
    let p = particulasIdentidad[j]; p.x += p.vx; p.y += p.vy; p.angulo += p.velAngulo; p.opacidad -= 6; 
    if (p.opacidad <= 0) { particulasIdentidad.splice(j, 1); continue; }
    push(); translate(p.x, p.y); rotate(p.angulo); stroke(0, p.tonoVerde, p.tonoAzul, p.opacidad); strokeWeight(1.5); noFill();
    if (p.tipo === 0) circle(0, 0, p.tam); else if (p.tipo === 1) { rectMode(CENTER); square(0, 0, p.tam); } else if (p.tipo === 2) triangle(0, -p.tam/2, -p.tam/2, p.tam/2, p.tam/2, p.tam/2);
    pop();
  }
}

function dibujarEmpatia() {
  let centroX = width / 2; let centroY = height / 2; let radioPrincipal = 120; let radioNodos = 280; let cantidadNodos = 8;
  let interactuando = mouseIsPressed || touches.length > 0;
  let sobreCentro = interactuando && dist(mouseX, mouseY, centroX, centroY) < radioPrincipal / 2;
  if (sobreCentro) { empatiaProgreso += 0.015; if (empatiaProgreso > 1) empatiaProgreso = 1; }
  else { empatiaProgreso -= 0.02; if (empatiaProgreso < 0) empatiaProgreso = 0; }
  if (empatiaProgreso >= 1) tiempoConectado++; else tiempoConectado = 0;

  for (let i = 0; i < cantidadNodos; i++) {
    let angulo = (TWO_PI / cantidadNodos) * i;
    let nodoX = centroX + cos(angulo) * radioNodos; let nodoY = centroY + sin(angulo) * radioNodos;
    let lineaFinX = lerp(centroX, nodoX, empatiaProgreso); let lineaFinY = lerp(centroY, nodoY, empatiaProgreso);
    stroke(0, 255, 150, 150); strokeWeight(1.5); line(centroX, centroY, lineaFinX, lineaFinY);
    if (empatiaProgreso >= 1) { empatiaNodosOpacidad[i] += 4; if (empatiaNodosOpacidad[i] > 255) empatiaNodosOpacidad[i] = 255; }
    else { empatiaNodosOpacidad[i] -= 4; if (empatiaNodosOpacidad[i] < 0) empatiaNodosOpacidad[i] = 0; }
    stroke(0, 255, 150, empatiaNodosOpacidad[i]); strokeWeight(2); noFill(); circle(nodoX, nodoY, 25);
    if (tiempoConectado > 45) {
      noStroke(); let pulsoNodos = sin(frameCount * 0.1 + i) * 10; 
      fill(0, 255, 150, 20 + pulsoNodos); circle(nodoX, nodoY, 35 + pulsoNodos); 
    }
  }
  if (empatiaProgreso >= 1) {
    noStroke(); let pulso = sin(frameCount * 0.05) * 15; 
    fill(0, 255, 150, 30 + pulso); circle(centroX, centroY, radioPrincipal + 20);
    fill(0, 255, 150, 10 + pulso / 2); circle(centroX, centroY, radioPrincipal + 60);
  }
  stroke(0, 255, 150); strokeWeight(sobreCentro ? 6 : 3); noFill(); circle(centroX, centroY, radioPrincipal);
}

// ==========================================
// SUBSISTEMA 2: COLABORACIÓN
// ==========================================
function dibujarColaboracion() {
  let centroX = width / 2;
  let centroY = height / 2 - 40;
  let anchoCuadrado = 140;
  let altoCuadrado = 100;

  // CORRECCIÓN 1: Formas pequeñas mucho más alejadas hacia los extremos y abajo
  let formasPequenas = [
    { x: centroX - 320, y: centroY + 220, tipo: 'circulo' },
    { x: centroX,       y: centroY + 220, tipo: 'triangulo' },
    { x: centroX + 320, y: centroY + 220, tipo: 'cuadrado' }
  ];

  let interactuando = mouseIsPressed || touches.length > 0;
  let algunaPresionada = false;

  // 1. EVALUAR SI SE PRESIONA CUALQUIER FORMA PEQUEÑA
  for (let i = 0; i < 3; i++) {
    let f = formasPequenas[i];
    let sobreForma = interactuando && dist(mouseX, mouseY, f.x, f.y) < 50;

    if (sobreForma) {
      algunaPresionada = true;
    }
  }

  // CORRECCIÓN 2: Si presionas UNA, todo el grupo avanza y hace la animación al unísono
  for (let i = 0; i < 3; i++) {
    if (algunaPresionada) {
      colaboracionProgreso[i] += 0.025; // Todo el grupo se conecta simultáneamente
      if (colaboracionProgreso[i] > 1) colaboracionProgreso[i] = 1;
    } else {
      colaboracionProgreso[i] -= 0.035; // Todo el grupo se desconecta al soltar
      if (colaboracionProgreso[i] < 0) colaboracionProgreso[i] = 0;
    }
  }

  // Efecto de vibración y brillo en el cuadrado central si el grupo colabora
  let vibX = 0;
  let vibY = 0;
  let brilloExtra = 0;

  if (colaboracionProgreso[0] > 0.5) { // Se activa cuando el grupo empieza a unirse
    vibX = random(-2, 2);
    vibY = random(-2, 2);
    brilloExtra = 40;

    // Emisión de pequeños cuadrados desde el centro
    if (frameCount % 5 === 0) {
      particulasColaboracion.push({
        x: centroX + random(-anchoCuadrado/3, anchoCuadrado/3),
        y: centroY + random(-altoCuadrado/3, altoCuadrado/3),
        vx: random(-2.5, 2.5),
        vy: random(-3, -1),
        tam: random(6, 16),
        angulo: random(TWO_PI),
        velAngulo: random(-0.08, 0.08),
        opacidad: 255,
        tonoVerde: random(120, 255)
      });
    }
  }

  // 2. DIBUJAR LÍNEAS DE CONEXIÓN HASTA EL CUADRADO CENTRAL
  for (let i = 0; i < 3; i++) {
    let f = formasPequenas[i];
    let anclajeX = centroX - 40 + (i * 40);
    let anclajeY = centroY + altoCuadrado / 2;

    let finLineaX = lerp(f.x, anclajeX, colaboracionProgreso[i]);
    let finLineaY = lerp(f.y, anclajeY, colaboracionProgreso[i]);

    let tonosVerdesLineas = [
      color(0, 255, 120),
      color(50, 220, 200),
      color(0, 180, 255)
    ];

    stroke(tonosVerdesLineas[i]);
    strokeWeight(2);
    line(f.x, f.y, finLineaX, finLineaY);

    // Dibujar las formas pequeñas abajo
    stroke(tonosVerdesLineas[i]);
    strokeWeight(2.5);
    noFill();
    if (f.tipo === 'circulo') circle(f.x, f.y, 40);
    else if (f.tipo === 'triangulo') triangle(f.x, f.y - 20, f.x - 20, f.y + 20, f.x + 20, f.y + 20);
    else if (f.tipo === 'cuadrado') { rectMode(CENTER); square(f.x, f.y, 35); }
  }

  // 3. DIBUJAR EL CUADRADO GRANDE CENTRAL
  push();
  translate(centroX + vibX, centroY + vibY);
  
  if (colaboracionProgreso[0] > 0.5) {
    noStroke();
    fill(0, 255, 150, 25 + sin(frameCount * 0.1) * 15);
    rectMode(CENTER);
    square(0, 0, anchoCuadrado + 30);
  }

  stroke(0, 255, 150, 90 + brilloExtra); 
  strokeWeight(5);                        
  noFill();
  rectMode(CENTER);
  square(0, 0, anchoCuadrado);
  pop();

  // 4. ACTUALIZAR Y DIBUJAR LAS PARTÍCULAS
  for (let j = particulasColaboracion.length - 1; j >= 0; j--) {
    let p = particulasColaboracion[j];
    p.x += p.vx;
    p.y += p.vy;
    p.angulo += p.velAngulo;
    p.opacidad -= 5;

    if (p.opacidad <= 0) {
      particulasColaboracion.splice(j, 1);
      continue;
    }

    push();
    translate(p.x, p.y);
    rotate(p.angulo);
    stroke(0, p.tonoVerde, 150, p.opacidad);
    strokeWeight(1.5);
    noFill();
    rectMode(CENTER);
    square(0, 0, p.tam);
    pop();
  }
}