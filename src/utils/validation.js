/**
 * Validaciones oficiales para formularios en Chile (RUT, teléfono, email, checkout)
 */

/**
 * Valida un RUT chileno usando el algoritmo de Módulo 11 oficial
 * @param {string} rut - Formato con o sin puntos/guion (ej: "19.876.543-K", "12345678-5")
 * @returns {boolean} true si el dígito verificador es correcto
 */
export function validarRut(rut) {
  if (!rut || typeof rut !== 'string') return false;

  // Limpiar caracteres
  const cleanRut = rut.replace(/[^0-9kK]/g, '').toUpperCase();
  if (cleanRut.length < 8 || cleanRut.length > 9) return false;

  const cuerpo = cleanRut.slice(0, -1);
  const dvIngresado = cleanRut.slice(-1);

  // Calcular dígito verificador según Módulo 11
  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i), 10) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }

  const resto = suma % 11;
  const dvEsperadoCalculado = 11 - resto;

  let dvEsperado;
  if (dvEsperadoCalculado === 11) {
    dvEsperado = '0';
  } else if (dvEsperadoCalculado === 10) {
    dvEsperado = 'K';
  } else {
    dvEsperado = dvEsperadoCalculado.toString();
  }

  return dvIngresado === dvEsperado;
}

/**
 * Formatea un RUT a formato estándar XX.XXX.XXX-X
 */
export function formatearRut(rut) {
  if (!rut) return '';
  const clean = rut.replace(/[^0-9kK]/g, '').toUpperCase();
  if (clean.length <= 1) return clean;

  const dv = clean.slice(-1);
  let cuerpo = clean.slice(0, -1);

  // Formatear cuerpo con puntos
  cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${cuerpo}-${dv}`;
}

/**
 * Valida formato de correo electrónico
 */
export function validarEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}

/**
 * Valida número de teléfono chileno (mínimo 9 dígitos)
 */
export function validarTelefono(telefono) {
  if (!telefono || typeof telefono !== 'string') return false;
  const clean = telefono.replace(/\D/g, '');
  return clean.length >= 9 && clean.length <= 12;
}

/**
 * Valida todos los campos del checkout
 * @param {object} formData
 * @returns {object} { isValid: boolean, errors: object }
 */
export function validarCheckout(formData) {
  const errors = {};

  if (!formData.nombre || formData.nombre.trim().length < 3) {
    errors.nombre = 'El nombre completo es requerido (mínimo 3 caracteres)';
  }

  if (!formData.rut || !validarRut(formData.rut)) {
    errors.rut = 'El RUT ingresado no es válido (use formato 12.345.678-K)';
  }

  if (!formData.telefono || !validarTelefono(formData.telefono)) {
    errors.telefono = 'Teléfono inválido. Debe tener al menos 9 dígitos';
  }

  if (!formData.direccion || formData.direccion.trim().length < 5) {
    errors.direccion = 'La dirección de entrega es obligatoria (calle y número)';
  }

  if (!formData.comuna) {
    errors.comuna = 'Debe seleccionar una comuna de entrega en Ñuble';
  }

  if (!formData.metodoPago) {
    errors.metodoPago = 'Debe seleccionar un método de pago';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
