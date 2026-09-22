import Jasmine from 'jasmine';

const jasmine = new Jasmine();

jasmine.loadConfig({
  spec_dir: 'tests/specs',
  spec_files: [
    '**/*.spec.js'
  ],
  helpers: [],
  random: false,
  stopSpecOnExpectationFailure: false
});

console.log('\n======================================================');
console.log('🧪 DISTRIBUIDORA GAS EL VOLCÁN - SUITE DE PRUEBAS JASMINE');
console.log('Evaluación Parcial N° 2 - DSY1104 Desarrollo FullStack II');
console.log('======================================================\n');

jasmine.execute();
