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
let colaboracionProgreso = [0, 0, 0]; 
let particulasColaboracion = [];       

// Variables de Incertidumbre
let incertidumbreProgreso = 0;
let offsetsIncertidumbre = [0, 1000, 2000, 3000];

// Variables de Ansiedad
let ansiedadProgreso = 0;

// Variables de Expectativa
let expectativaProgreso = 0;
let particulasExpectativa = [];

// Estructura de la Galería
const conceptos = [
  { id: 'memoria', nombre: 'Memoria', figura: 'cuadrado' },
  { id: 'herencia', nombre: 'Herencia', figura: 'circulo' },
  { id: 'caducidad', nombre: 'Caducidad', figura: 'triangulo' },
  { id: 'identidad', nombre: 'Identidad', figura: 'cuadrado' },
  { id: 'empatia', nombre: 'Empatía', figura: 'circulo' },
  { id: 'colaboracion', nombre: 'Colaboración', figura: 'linea' },
  { id: 'incertidumbre', nombre: 'Incertidumbre', figura: 'rectangulo' },
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
    else if (estadoActual === 'incertidumbre') dibujarIncertidumbre();
    else if (estadoActual === 'ansiedad') dibujarAnsiedad();
    else if (estadoActual === 'expectativa') dibujarExpectativa();
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
  fill(255); noStroke(); textAlign(CENTER, CENTER); 
  let tituloSize = min(width, height) * 0.05;
  textSize(tituloSize > 24 ? 24 : tituloSize);
  text("SISTEMA DE SIGNOS REACTIVOS", width / 2, height * 0.1);
  
  let margen = min(width, height) * 0.1;
  let espaciadoX = (width - margen * 2) / 3;
  let espaciadoY = (height - margen * 2 - (height * 0.15)) / 3;
  let iconSize = min(width, height) * 0.05;

  for (let i = 0; i < conceptos.length; i++) {
    let col = i % 3; let fila = Math.floor(i / 3);
    let x = margen + col * espaciadoX + espaciadoX / 2;
    let y = (height * 0.2) + fila * espaciadoY + espaciadoY / 2;

    stroke(255); noFill(); strokeWeight(2);
    
    let isz = iconSize;
    if (conceptos[i].figura === 'cuadrado') square(x - isz/2, y - isz, isz);
    if (conceptos[i].figura === 'circulo') circle(x, y - isz/2, isz);
    if (conceptos[i].figura === 'triangulo') triangle(x, y - isz, x - isz/2, y, x + isz/2, y);
    if (conceptos[i].figura === 'linea') line(x - isz/2, y - isz/2, x + isz/2, y - isz/2);
    if (conceptos[i].figura === 'rectangulo') rect(x - isz*0.8, y - isz*0.5, isz*1.6, isz);

    noStroke(); fill(180); 
    let txtSize = isz * 0.4;
    textSize(txtSize > 14 ? 14 : txtSize);
    text(conceptos[i].nombre, x, y + isz * 0.8);
  }
}

function dibujarBotonVolver() {
  stroke(255, 100); noFill(); strokeWeight(1); 
  rect(15, 15, 90, 35);
  noStroke(); fill(255); textAlign(LEFT, CENTER); textSize(12);
  text("< VOLVER", 28, 33);
}

// ==========================================
// LÓGICA DE INTERACCIÓN RESPONSIVA
// ==========================================
function mousePressed() {
  let minDim = min(width, height);
  
  if (estadoActual === 'menu') {
    let margen = minDim * 0.1; 
    let espaciadoX = (width - margen * 2) / 3; 
    let espaciadoY = (height - margen * 2 - (height * 0.15)) / 3;
    
    for (let i = 0; i < conceptos.length; i++) {
      let col = i % 3; let fila = Math.floor(i / 3);
      let x = margen + col * espaciadoX + espaciadoX / 2;
      let y = (height * 0.2) + fila * espaciadoY + espaciadoY / 2;
      
      if (dist(mouseX, mouseY, x, y) < minDim * 0.1) estadoActual = conceptos[i].id;
    }
  } else {
    // Botón Volver (Reseteo global de todos los sistemas)
    if (mouseX > 15 && mouseX < 105 && mouseY > 15 && mouseY < 50) {
      estadoActual = 'menu';
      lineasIzq = 3; lineasDer = 1; faseDesvanecimiento = false; opacidadExtra = 255;
      trazosMemoria = []; particulasCaducidad = []; saludTriangulo = 255; estadoCaducidad = 'entero';
      crecimientoIdentidad = [0, 0, 0]; particulasIdentidad = []; 
      empatiaProgreso = 0; empatiaNodosOpacidad = [0, 0, 0, 0, 0, 0, 0, 0]; tiempoConectado = 0;
      colaboracionProgreso = [0, 0, 0]; particulasColaboracion = [];
      incertidumbreProgreso = 0;
      ansiedadProgreso = 0;
      expectativaProgreso = 0; particulasExpectativa = []; // Reset expectativa
    }
    
    if (estadoActual === 'herencia' && !faseDesvanecimiento) {
      let centroIzqX = width / 4; let centroY = height / 2;
      if (dist(mouseX, mouseY, centroIzqX, centroY) < minDim * 0.15) {
        if (lineasIzq > 1) { lineasIzq--; lineasDer++; }
        if (lineasDer === 3) faseDesvanecimiento = true;
      }
    }
  }
}

// ==========================================
// SUBSISTEMAS 1 AL 8
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
    let baseTam = min(width, height) * 0.015;
    for (let j = 0; j < 3; j++) {
      trazosMemoria.push({ x: interX + random(-35, 35), y: interY + random(-35, 35), tipo: floor(random(3)), tam: random(baseTam*0.5, baseTam*1.5), angulo: random(TWO_PI), opacidad: 255 });
    }
    stroke(255); fill(15); strokeWeight(2); circle(interX, interY, min(width, height) * 0.06);
  }
}

function dibujarHerencia() {
  let centroIzqX = width / 4; let centroDerX = (width / 4) * 3; let centroY = height / 2;
  let baseLinea = min(width, height) * 0.15; let triSize = min(width, height) * 0.05;

  stroke(50); strokeWeight(2); 
  line(centroIzqX - baseLinea/2, centroY + triSize*1.5, centroIzqX + baseLinea/2, centroY + triSize*1.5); 
  line(centroDerX - baseLinea/2, centroY + triSize*1.5, centroDerX + baseLinea/2, centroY + triSize*1.5);
  
  strokeWeight(3); strokeCap(ROUND); noFill();
  let p1x = 0, p1y = -triSize; let p2x = triSize*0.9, p2y = triSize*0.7; let p3x = -triSize*0.9, p3y = triSize*0.7; 
  
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
  
  if (mouseIsPressed && !faseDesvanecimiento) { noStroke(); fill(0, 255, 150, 20); circle(mouseX, mouseY, min(width,height)*0.1); }
}

function dibujarCaducidad() {
  let centroX = width / 2; let centroY = height / 2 - (height * 0.05); 
  let tam = min(width, height) * 0.12;
  stroke(50); strokeWeight(2); line(centroX - tam*1.5, centroY + tam*1.8, centroX + tam*1.5, centroY + tam*1.8);
  
  let interactuando = mouseIsPressed || touches.length > 0; let deslizandoAbajo = mouseY > pmouseY;
  let vibracionX = 0; let vibracionY = 0;
  
  if (estadoCaducidad === 'entero') {
    if (interactuando && deslizandoAbajo && dist(mouseX, mouseY, centroX, centroY) < tam * 1.5) {
      vibracionX = random(-3, 3); vibracionY = random(-3, 3); saludTriangulo -= 4;
      for (let i = 0; i < 2; i++) particulasCaducidad.push({ x: centroX + random(-tam/2, tam/2), y: centroY + random(-tam/2, tam/2), vx: random(-2, 2), vy: random(2, 6), tam: random(tam*0.05, tam*0.15), angulo: random(TWO_PI), velAngulo: random(-0.1, 0.1), opacidad: 255 });
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
    if (p.opacidad <= 0 || p.y > centroY + tam*1.8) { particulasCaducidad.splice(i, 1); continue; }
    push(); translate(p.x, p.y); rotate(p.angulo); stroke(255, 100, 50, p.opacidad); noFill(); strokeWeight(1.5); triangle(0, -p.tam, -p.tam, p.tam, p.tam, p.tam); pop();
  }
}

function dibujarIdentidad() {
  let centrosX = [width / 4, width / 2, (width / 4) * 3]; let centroY = height / 2 - 20; 
  let tam = min(width, height) * 0.1;
  stroke(50); strokeWeight(2); for (let i = 0; i < 3; i++) line(centrosX[i] - tam, centroY + tam*1.2, centrosX[i] + tam, centroY + tam*1.2);
  let interactuando = mouseIsPressed || touches.length > 0;
  for (let i = 0; i < 3; i++) {
    let distancia = dist(mouseX, mouseY, centrosX[i], centroY); let sobreFigura = interactuando && distancia < tam * 1.2;
    if (sobreFigura) {
      crecimientoIdentidad[i] += 4; if (crecimientoIdentidad[i] > 155) crecimientoIdentidad[i] = 155; 
      if (frameCount % 4 === 0) particulasIdentidad.push({ x: centrosX[i] + random(-tam/2, tam/2), y: centroY + random(-tam/2, tam/2), vx: random(-3, 3), vy: random(-3, 3), tipo: i, tam: random(tam*0.1, tam*0.25), angulo: random(TWO_PI), velAngulo: random(-0.05, 0.05), opacidad: 255, tonoVerde: random(100, 255), tonoAzul: random(50, 150) });
    } else { crecimientoIdentidad[i] -= 2; if (crecimientoIdentidad[i] < 0) crecimientoIdentidad[i] = 0; }
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
  let minDim = min(width, height); let centroX = width / 2; let centroY = height / 2; 
  let radioPrincipal = minDim * 0.15; let radioNodos = minDim * 0.38; let cantidadNodos = 8;
  let interactuando = mouseIsPressed || touches.length > 0; let sobreCentro = interactuando && dist(mouseX, mouseY, centroX, centroY) < radioPrincipal / 2;
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
    let tamNodo = minDim * 0.035;
    stroke(0, 255, 150, empatiaNodosOpacidad[i]); strokeWeight(2); noFill(); circle(nodoX, nodoY, tamNodo);
    if (tiempoConectado > 45) { noStroke(); let pulsoNodos = sin(frameCount * 0.1 + i) * (minDim * 0.01); fill(0, 255, 150, 20 + pulsoNodos); circle(nodoX, nodoY, tamNodo * 1.4 + pulsoNodos); }
  }
  if (empatiaProgreso >= 1) {
    noStroke(); let pulso = sin(frameCount * 0.05) * (minDim * 0.02); 
    fill(0, 255, 150, 30 + pulso); circle(centroX, centroY, radioPrincipal + (minDim * 0.03));
    fill(0, 255, 150, 10 + pulso / 2); circle(centroX, centroY, radioPrincipal + (minDim * 0.08));
  }
  stroke(0, 255, 150); strokeWeight(sobreCentro ? 6 : 3); noFill(); circle(centroX, centroY, radioPrincipal);
}

function dibujarColaboracion() {
  let centroX = width / 2; let centroY = height / 2 - (height * 0.1); let anchoCuadrado = min(width, height) * 0.25;
  let offsetX = width * 0.35; let offsetY = height * 0.35; 
  let formasPequenas = [{ x: centroX - offsetX, y: centroY + offsetY, tipo: 'circulo' }, { x: centroX, y: centroY + offsetY, tipo: 'triangulo' }, { x: centroX + offsetX, y: centroY + offsetY, tipo: 'cuadrado' }];
  let interactuando = mouseIsPressed || touches.length > 0; let algunaPresionada = false; let hitBox = min(width, height) * 0.08;
  
  for (let i = 0; i < 3; i++) { if (interactuando && dist(mouseX, mouseY, formasPequenas[i].x, formasPequenas[i].y) < hitBox) algunaPresionada = true; }
  
  for (let i = 0; i < 3; i++) {
    if (algunaPresionada) { colaboracionProgreso[i] += 0.025; if (colaboracionProgreso[i] > 1) colaboracionProgreso[i] = 1; }
    else { colaboracionProgreso[i] -= 0.035; if (colaboracionProgreso[i] < 0) colaboracionProgreso[i] = 0; }
  }
  
  let vibX = 0; let vibY = 0; let brilloExtra = 0;
  if (colaboracionProgreso[0] >= 1) { 
    vibX = random(-2, 2); vibY = random(-2, 2); brilloExtra = 40;
    if (frameCount % 5 === 0) particulasColaboracion.push({ x: centroX + random(-anchoCuadrado/3, anchoCuadrado/3), y: centroY + random(-anchoCuadrado/3, anchoCuadrado/3), vx: random(-2.5, 2.5), vy: random(-3, -1), tam: random(min(width,height)*0.01, min(width,height)*0.03), angulo: random(TWO_PI), velAngulo: random(-0.08, 0.08), opacidad: 255, tonoVerde: random(120, 255) });
  }
  
  let tamPequeno = min(width, height) * 0.06;
  
  for (let i = 0; i < 3; i++) {
    let f = formasPequenas[i]; let anclajeX = centroX - (anchoCuadrado * 0.3) + (i * (anchoCuadrado * 0.3)); let anclajeY = centroY + anchoCuadrado / 2;
    let finLineaX = lerp(f.x, anclajeX, colaboracionProgreso[i]); let finLineaY = lerp(f.y, anclajeY, colaboracionProgreso[i]);
    let tonosVerdesLineas = [color(0, 255, 120), color(50, 220, 200), color(0, 180, 255)];
    
    stroke(tonosVerdesLineas[i]); strokeWeight(2); line(f.x, f.y, finLineaX, finLineaY);
    stroke(tonosVerdesLineas[i]); strokeWeight(2.5); noFill();
    
    if (f.tipo === 'circulo') circle(f.x, f.y, tamPequeno);
    else if (f.tipo === 'triangulo') triangle(f.x, f.y - tamPequeno/2, f.x - tamPequeno/2, f.y + tamPequeno/2, f.x + tamPequeno/2, f.y + tamPequeno/2);
    else if (f.tipo === 'cuadrado') { rectMode(CENTER); square(f.x, f.y, tamPequeno*0.9); }
  }
  
  push(); translate(centroX + vibX, centroY + vibY);
  if (colaboracionProgreso[0] >= 1) { noStroke(); fill(0, 255, 150, 25 + sin(frameCount * 0.1) * 15); rectMode(CENTER); square(0, 0, anchoCuadrado * 1.2); }
  stroke(0, 255, 150, 90 + brilloExtra); strokeWeight(5); noFill(); rectMode(CENTER); square(0, 0, anchoCuadrado); pop();
  
  for (let j = particulasColaboracion.length - 1; j >= 0; j--) {
    let p = particulasColaboracion[j]; p.x += p.vx; p.y += p.vy; p.angulo += p.velAngulo; p.opacidad -= 5;
    if (p.opacidad <= 0) { particulasColaboracion.splice(j, 1); continue; }
    push(); translate(p.x, p.y); rotate(p.angulo); stroke(0, p.tonoVerde, 150, p.opacidad); strokeWeight(1.5); noFill(); rectMode(CENTER); square(0, 0, p.tam); pop();
  }
}

function dibujarIncertidumbre() {
  let centroX = width / 2; let centroY = height / 2;
  let anchoBase = min(width, height) * 0.25; let altoBase = min(width, height) * 0.15;
  let interactuando = mouseIsPressed || touches.length > 0;
  let sobreFigura = interactuando && dist(mouseX, mouseY, centroX, centroY) < anchoBase;

  if (sobreFigura) { incertidumbreProgreso += 0.02; if (incertidumbreProgreso > 1) incertidumbreProgreso = 1; }
  else { incertidumbreProgreso -= 0.05; if (incertidumbreProgreso < 0) incertidumbreProgreso = 0; }

  let vBase = [ { x: centroX - anchoBase/2, y: centroY - altoBase/2 }, { x: centroX + anchoBase/2, y: centroY - altoBase/2 }, { x: centroX + anchoBase/2, y: centroY + altoBase/2 }, { x: centroX - anchoBase/2, y: centroY + altoBase/2 } ];
  let vActuales = [];

  for (let i = 0; i < 4; i++) {
    let ruidoX = map(noise(offsetsIncertidumbre[i] + frameCount * 0.015), 0, 1, -width * 0.4, width * 0.4);
    let ruidoY = map(noise(offsetsIncertidumbre[i] + 500 + frameCount * 0.015), 0, 1, -height * 0.4, height * 0.4);
    vActuales.push({ x: lerp(vBase[i].x, vBase[i].x + (ruidoX * incertidumbreProgreso), incertidumbreProgreso), y: lerp(vBase[i].y, vBase[i].y + (ruidoY * incertidumbreProgreso), incertidumbreProgreso) });
  }

  if (incertidumbreProgreso > 0.1) {
    strokeWeight(1); stroke(0, 255, 150, 150 * incertidumbreProgreso); 
    line(vActuales[0].x, vActuales[0].y, vActuales[2].x, vActuales[2].y);
    line(vActuales[1].x, vActuales[1].y, vActuales[3].x, vActuales[3].y);
    fill(15); stroke(0, 255, 150, 200); strokeWeight(2);
    for(let v of vActuales) { circle(v.x, v.y, min(width, height) * 0.02); }
  }

  noFill(); stroke(0, 255, 150, 255 - (155 * incertidumbreProgreso)); strokeWeight(2 + (incertidumbreProgreso * 2)); 
  beginShape(); for (let v of vActuales) { vertex(v.x, v.y); } endShape(CLOSE);
  
  if (incertidumbreProgreso > 0.4) {
    for(let i = 0; i < 4; i++) {
      stroke(0, 255, 150, random(50, 200)); strokeWeight(random(1, 3));
      let p1 = random(vActuales); let p2 = random(vActuales);
      line(p1.x + random(-30, 30), p1.y + random(-30, 30), p2.x + random(-30, 30), p2.y + random(-30, 30));
    }
  }
}

function dibujarAnsiedad() {
  let centroY = height / 2;
  let interactuando = mouseIsPressed || touches.length > 0;
  
  if (interactuando) { ansiedadProgreso += 0.025; if (ansiedadProgreso > 1) ansiedadProgreso = 1; }
  else { ansiedadProgreso -= 0.003; if (ansiedadProgreso < 0) ansiedadProgreso = 0; }

  if (ansiedadProgreso > 0.8) { noStroke(); fill(0, 255, 150, 10 + random(0, 15)); rect(0, 0, width, height); }

  let numLineas = 5; let minDim = min(width, height);
  let amplitudBase = minDim * 0.005; let amplitudMaxima = minDim * 0.35;
  let amplitudActual = lerp(amplitudBase, amplitudMaxima, ansiedadProgreso);

  for (let i = 0; i < numLineas; i++) {
    let opacidad = map(i, 0, numLineas, 100, 255); stroke(0, 255, 150, opacidad);
    strokeWeight(ansiedadProgreso > 0.5 ? random(1, 3) : 1.5); noFill();
    
    beginShape();
    for (let x = 0; x <= width; x += width / 50) {
      let velocidadOnda = frameCount * (0.02 + ansiedadProgreso * 0.5);
      let ruido = noise(x * 0.02, velocidadOnda, i * 10);
      let desplazamientoY = map(ruido, 0, 1, -amplitudActual, amplitudActual);
      let picos = 0;
      if (ansiedadProgreso > 0.1) { picos = random(-amplitudActual, amplitudActual) * ansiedadProgreso; }
      vertex(x, centroY + desplazamientoY + picos);
    }
    endShape();
  }
  
  if (ansiedadProgreso > 0.7 && frameCount % 4 === 0) {
    stroke(0, 255, 150, random(100, 255)); strokeWeight(random(1, 4));
    let randomX = random(width); let randomY = centroY + random(-amplitudMaxima * 1.5, amplitudMaxima * 1.5);
    line(randomX, randomY - random(10, 50), randomX, randomY + random(10, 50));
  }
}

// ==========================================
// SUBSISTEMA 5: EXPECTATIVA (Rediseño: Calibración)
// ==========================================
function dibujarExpectativa() {
  let centroX = width / 2;
  let centroY = height / 2;
  
  // Tamaño final del cuadrado perfecto
  let tamObjetivo = min(width, height) * 0.2;
  
  let interactuando = mouseIsPressed || touches.length > 0;
  
  // La expectativa crece lento (requiere paciencia para alinear todo)
  if (interactuando) {
    expectativaProgreso += 0.006; 
    if (expectativaProgreso > 1) expectativaProgreso = 1;
  } else {
    // Si se suelta, se pierde el enfoque y los marcos vuelven a desarmarse
    expectativaProgreso -= 0.02;
    if (expectativaProgreso < 0) expectativaProgreso = 0;
  }

  let numMarcos = 6;
  
  // Dibuja los marcos desfasados que intentan converger
  for (let i = 0; i < numMarcos; i++) {
    // Alternamos la dirección de rotación para cada marco
    let direccion = (i % 2 === 0) ? 1 : -1;
    
    // Desfase inicial máximo que se va reduciendo a 0
    let rotacionActual = direccion * (PI / 2) * (1 - expectativaProgreso) * (i * 0.5);
    
    // Tamaño inicial (más grande y disperso) que se reduce al tamaño objetivo
    let tamActual = tamObjetivo + (i * (min(width, height) * 0.05)) * (1 - expectativaProgreso);
    
    // La opacidad sube a medida que se enfocan
    let opacidadActual = lerp(40 + (i * 20), 255, expectativaProgreso);
    
    // A medida que se acerca al 100%, las líneas se vuelven más gruesas y nítidas
    let grosorActual = lerp(1, 3, expectativaProgreso);

    push();
    translate(centroX, centroY);
    rotate(rotacionActual);
    stroke(0, 255, 150, opacidadActual);
    strokeWeight(grosorActual);
    noFill();
    rectMode(CENTER);
    square(0, 0, tamActual);
    pop();
  }

  // La Recompensa (Resolución de la expectativa)
  // Cuando se logra alinear perfectamente (100%), el centro se vuelve sólido y estable
  if (expectativaProgreso >= 1) {
    push();
    translate(centroX, centroY);
    
    // CORRECCIÓN CLAVE: Centrar también las formas de la resolución
    rectMode(CENTER); 
    
    // Aura brillante estable
    noStroke();
    fill(0, 255, 150, 40 + sin(frameCount * 0.08) * 20);
    square(0, 0, tamObjetivo * 1.2);
    
    // Cuadrado central sólido
    fill(15);
    stroke(0, 255, 150);
    strokeWeight(5);
    square(0, 0, tamObjetivo);
    
    // Un núcleo brillante que demuestra que el sistema está "calibrado"
    fill(0, 255, 150, 200);
    noStroke();
    square(0, 0, tamObjetivo * 0.2);
    pop();
  }
}