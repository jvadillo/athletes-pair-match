const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '..', 'dist');

console.log('🔍 Verificando build para Netlify...\n');

// Verificar que el directorio dist existe
if (!fs.existsSync(distPath)) {
  console.error('❌ Error: El directorio dist no existe. Ejecuta "npm run build" primero.');
  process.exit(1);
}

// Verificar archivos críticos
const requiredFiles = [
  'index.html',
  '_headers',
  '_redirects',
  'assets'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  const filePath = path.join(distPath, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} - Encontrado`);
  } else {
    console.log(`❌ ${file} - NO encontrado`);
    allFilesExist = false;
  }
});

// Verificar contenido de _headers
const headersPath = path.join(distPath, '_headers');
if (fs.existsSync(headersPath)) {
  const headersContent = fs.readFileSync(headersPath, 'utf8');
  if (headersContent.includes('application/javascript')) {
    console.log('✅ _headers contiene configuración de JavaScript');
  } else {
    console.log('⚠️  _headers podría no tener la configuración correcta de JavaScript');
  }
}

// Verificar contenido de _redirects
const redirectsPath = path.join(distPath, '_redirects');
if (fs.existsSync(redirectsPath)) {
  const redirectsContent = fs.readFileSync(redirectsPath, 'utf8');
  if (redirectsContent.includes('/index.html   200')) {
    console.log('✅ _redirects contiene configuración SPA');
  } else {
    console.log('⚠️  _redirects podría no tener la configuración SPA correcta');
  }
}

// Listar archivos JS en assets
const assetsPath = path.join(distPath, 'assets');
if (fs.existsSync(assetsPath)) {
  const jsFiles = fs.readdirSync(assetsPath).filter(file => file.endsWith('.js'));
  console.log(`\n📦 Archivos JavaScript encontrados: ${jsFiles.length}`);
  jsFiles.forEach(file => {
    console.log(`   - ${file}`);
  });
}

if (allFilesExist) {
  console.log('\n🎉 Build verificado exitosamente! Listo para desplegar en Netlify.');
} else {
  console.log('\n❌ Faltan archivos críticos. Revisa la configuración de build.');
  process.exit(1);
}

console.log('\n📋 Próximos pasos:');
console.log('1. git add .');
console.log('2. git commit -m "Fix Netlify MIME type configuration"');
console.log('3. git push');
console.log('4. Netlify desplegará automáticamente');
console.log('\n💡 Si el problema persiste, verifica los headers en Developer Tools.');