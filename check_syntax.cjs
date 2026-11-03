const fs = require('fs');
const code = fs.readFileSync('C:\\Users\\tsicr\\OneDrive\\Área de Trabalho\\radio-assets\\src\\temperatura.jsx', 'utf8');
try {
  new Function(code);
  console.log('VALID');
} catch(e) {
  console.log('ERROR:', e.message.substring(0, 100));
}