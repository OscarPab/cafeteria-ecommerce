const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generate360Images() {
  try {
    console.log('🔄 Generando imágenes 360° desde tu panorámica...');
    
    // Rutas
    const inputImage = path.join(__dirname, '../src/assets/huerta.webp');
    const outputDir = path.join(__dirname, '../public/images/360');
    
    // Crear directorio de salida si no existe
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      console.log('📁 Directorio creado:', outputDir);
    }

    // Cargar la imagen
    const image = sharp(inputImage);
    const metadata = await image.metadata();
    
    console.log('📸 Imagen cargada:', {
      ancho: metadata.width,
      alto: metadata.height,
      formato: metadata.format
    });

    // Número de imágenes a generar (36 para una rotación suave)
    const numFrames = 36;
    
    // Calcular el ancho de cada frame
    const frameWidth = Math.floor(metadata.width / numFrames);
    
    console.log(`📐 Generando ${numFrames} imágenes de ${frameWidth}x${metadata.height}...`);

    // Generar cada frame
    for (let i = 0; i < numFrames; i++) {
      const left = i * frameWidth;
      
      await image
        .clone()
        .extract({ 
          left: Math.round(left), 
          top: 0, 
          width: Math.round(frameWidth), 
          height: metadata.height 
        })
        .resize(800, 600, { fit: 'contain', background: { r: 0, g: 0, b: 0 } })
        .toFile(path.join(outputDir, `img${i + 1}.webp`));
      
      // Mostrar progreso
      const progress = Math.round(((i + 1) / numFrames) * 100);
      process.stdout.write(`\r📊 Progreso: ${progress}% [${'█'.repeat(progress/2)}${'░'.repeat(50-progress/2)}]`);
    }
    
    console.log('\n✅ ¡Imágenes 360° generadas exitosamente!');
    console.log(`📁 Ubicación: ${outputDir}`);
    console.log(`🖼️  Total: ${numFrames} imágenes`);
    
    // Crear archivo de configuración
    const config = {
      totalImages: numFrames,
      path: '/images/360/',
      prefix: 'img',
      format: 'webp',
      width: 800,
      height: 600,
      createdAt: new Date().toISOString()
    };
    
    fs.writeFileSync(
      path.join(outputDir, 'config.json'), 
      JSON.stringify(config, null, 2)
    );
    
    console.log('⚙️  Archivo de configuración creado');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Ejecutar
generate360Images();