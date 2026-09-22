import { validarRut, validarCheckout } from '../../src/utils/validation.js';

describe('Módulo de Validaciones de Negocio (Validation)', () => {
  // Test 8: Algoritmo oficial Módulo 11 para RUT chileno
  it('Prueba 8: Debe validar correctamente el dígito verificador del RUT chileno mediante algoritmo Módulo 11', () => {
    // Casos válidos conocidos (con y sin formato, incluyendo K y 0)
    expect(validarRut('10.000.013-K')).toBe(true);
    expect(validarRut('10000013K')).toBe(true);
    expect(validarRut('19.876.543-0')).toBe(true);
    expect(validarRut('12.345.678-5')).toBe(true);
    expect(validarRut('11.111.111-1')).toBe(true);

    // Casos inválidos (dígito verificador incorrecto o longitud errónea)
    expect(validarRut('19.876.543-9')).toBe(false); // DV incorrecto
    expect(validarRut('12.345.678-0')).toBe(false); // DV incorrecto
    expect(validarRut('1234')).toBe(false);          // Longitud insuficiente
    expect(validarRut('')).toBe(false);              // Cadena vacía
  });

  // Test 9: Validación completa de formulario de checkout
  it('Prueba 9: Debe validar exhaustivamente todos los campos del checkout mediante un mock de datos de cliente', () => {
    // Mock válido de cliente en Chillán
    const mockClienteValido = {
      nombre: 'Rodrigo González Soto',
      rut: '12.345.678-5',
      telefono: '+56987654321',
      direccion: 'Av. O’Higgins 1234, Dpto 402',
      comuna: 'Chillán',
      metodoPago: 'efectivo',
    };

    const resValido = validarCheckout(mockClienteValido);
    expect(resValido.isValid).toBe(true);
    expect(Object.keys(resValido.errors).length).toBe(0);

    // Mock con datos corruptos o faltantes
    const mockClienteInvalido = {
      nombre: '',
      rut: '11.111.111-9', // RUT falso
      telefono: '123',     // Teléfono muy corto
      direccion: '',
      comuna: '',
      metodoPago: '',
    };

    const resInvalido = validarCheckout(mockClienteInvalido);
    expect(resInvalido.isValid).toBe(false);
    expect(resInvalido.errors.nombre).toBeDefined();
    expect(resInvalido.errors.rut).toBeDefined();
    expect(resInvalido.errors.telefono).toBeDefined();
    expect(resInvalido.errors.direccion).toBeDefined();
    expect(resInvalido.errors.comuna).toBeDefined();
    expect(resInvalido.errors.metodoPago).toBeDefined();
  });
});
