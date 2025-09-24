const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'dist', 'index.html');

console.log('🔍 Verificando que index.html no tenga referencias a archivos fuente...\n');

if (!fs.existsSync(indexPath)) {
  console.error('❌ Error: dist/index.html no existe.');
  process.exit(1);
}

const indexContent = fs.readFileSync(indexPath, 'utf8');

// Verificar que no haya referencias a archivos fuente
const sourceReferences = [
  '/src/main.tsx',
  'src/main.tsx',
  '/src/',
  'gptengineer.js'
];

let hasSourceReferences = false;

sourceReferences.forEach(ref => {
  if (indexContent.includes(ref)) {
    console.log(`❌ Encontrada referencia problemática: ${ref}`);
    hasSourceReferences = true;
  }
});

// Verificar que tenga referencias a archivos compilados
const compiledReferences = [
  '/assets/',
  '.js',
  '.css'
];

let hasCompiledReferences = true;

compiledReferences.forEach(ref => {
  if (!indexContent.includes(ref)) {
    console.log(`⚠️  No se encontró referencia esperada: ${ref}`);
    hasCompiledReferences = false;
  }
});

if (!hasSourceReferences && hasCompiledReferences) {
  console.log('✅ index.html está correctamente configurado para producción');
  console.log('✅ No hay referencias a archivos fuente');
  console.log('✅ Tiene referencias a archivos compilados');
  
  // Mostrar las referencias encontradas
  const jsMatches = indexContent.match(/src="[^"]*\.js"/g);
  const cssMatches = indexContent.match(/href="[^"]*\.css"/g);
  
  if (jsMatches) {
    console.log('\n📦 Referencias JS encontradas:');
    jsMatches.forEach(match => console.log(`   ${match}`));
  }
  
  if (cssMatches) {
    console.log('\n🎨 Referencias CSS encontradas:');
    cssMatches.forEach(match => console.log(`   ${match}`));
  }
  
} else {
  console.log('\n❌ Problemas encontrados en index.html');
  if (hasSourceReferences) {
    console.log('   - Contiene referencias a archivos fuente');
  }
  if (!hasCompiledReferences) {
    console.log('   - Faltan referencias a archivos compilados');
  }
  process.exit(1);
}

console.log('\n🚀 Listo para desplegar!');