/**
 * Catálogo centralizado de productos y servicios - Distribuidora Gas El Volcán (Chillán)
 */

export const CATEGORIES = [
  { id: 'todos', label: 'Todos los productos', icon: 'bi-grid-fill' },
  { id: 'Cilindros', label: 'Cilindros de Gas', icon: 'bi-fire' },
  { id: 'Reguladores', label: 'Reguladores', icon: 'bi-speedometer2' },
  { id: 'Mangueras', label: 'Mangueras y Kits', icon: 'bi-bezier2' },
  { id: 'Accesorios', label: 'Accesorios y Seguridad', icon: 'bi-shield-check' },
  { id: 'Servicios', label: 'Servicios Técnicos', icon: 'bi-tools' },
];

export const PRODUCTS = [
  // Cilindros de Gas Licuado
  {
    id: 'cilindro-5kg',
    name: 'Cilindro Gas Licuado 5 Kg',
    category: 'Cilindros',
    categoryAnchor: 'cilindros',
    price: 6500,
    image: '/assets/images/5kg.png',
    description: 'Compacto y liviano, ideal para estufas pequeñas, quinchos, camping o parrillas a gas.',
    specs: {
      capacidad: '5 kg de gas licuado (propano / butano)',
      valvula: 'Válvula de acople rápido estándar SEC',
      altura: '38 cm',
      pesoTotal: 'Aprox. 11 kg (tara + gas)',
      usoRecomendado: 'Estufas de 1 quemador, parrillas portátiles, camping',
    },
    stock: 45,
    featured: false,
    badge: 'Camping y Estufas',
  },
  {
    id: 'cilindro-11kg',
    name: 'Cilindro Gas Licuado 11 Kg',
    category: 'Cilindros',
    categoryAnchor: 'cilindros',
    price: 12000,
    image: '/assets/images/11kg.png',
    description: 'El formato estándar más popular en los hogares de Chillán para estufas y cocinas convencionales.',
    specs: {
      capacidad: '11 kg de gas licuado de alta eficiencia',
      valvula: 'Acople rápido doméstico chileno',
      altura: '54 cm',
      pesoTotal: 'Aprox. 23 kg',
      usoRecomendado: 'Cocina doméstica, estufas rodantes medianas',
    },
    stock: 80,
    featured: false,
    badge: 'Uso Familiar',
  },
  {
    id: 'cilindro-15kg',
    name: 'Cilindro Gas Licuado 15 Kg',
    category: 'Cilindros',
    categoryAnchor: 'cilindros',
    price: 16000,
    image: '/assets/images/15kg.png',
    description: 'Máximo rendimiento y autonomía para agua caliente continua en calefonts y calefacción central.',
    specs: {
      capacidad: '15 kg de gas licuado purificado',
      valvula: 'Válvula estándar doméstica SEC',
      altura: '65 cm',
      pesoTotal: 'Aprox. 31 kg',
      usoRecomendado: 'Calefonts de 10 a 16 Lts, familias de 3 a 6 personas',
    },
    stock: 120,
    featured: true,
    badge: 'Más Vendido',
  },
  {
    id: 'cilindro-45kg',
    name: 'Cilindro Gas Industrial 45 Kg',
    category: 'Cilindros',
    categoryAnchor: 'cilindros',
    price: 45000,
    image: '/assets/images/45kg.png',
    description: 'Capacidad comercial e industrial para panaderías, restaurantes, pymes y calefacción continua.',
    specs: {
      capacidad: '45 kg para batería de cilindros',
      valvula: 'Conexión roscada para pigtail / manifold',
      altura: '135 cm',
      pesoTotal: 'Aprox. 88 kg',
      usoRecomendado: 'Casas grandes, hornos industriales, calderas',
    },
    stock: 25,
    featured: false,
    badge: 'Industrial',
  },

  // Mangueras y Conexiones
  {
    id: 'manguera-1-5m',
    name: 'Manguera Gas Certificada 1.5 m',
    category: 'Mangueras',
    categoryAnchor: 'mangueras',
    price: 3990,
    image: '/assets/images/1.5m.webp',
    description: 'Manguera de tres capas con refuerzo textil certificada por la SEC para conexión directa a artefactos.',
    specs: {
      largo: '1.5 metros',
      norma: 'Certificación SEC vigente NCh 1079',
      material: 'Caucho sintético reforzado anti-grietas',
      presionMax: '20 bar',
    },
    stock: 60,
    featured: true,
    badge: 'Certificado SEC',
  },
  {
    id: 'manguera-3m',
    name: 'Manguera Gas Reforzada 3 m',
    category: 'Mangueras',
    categoryAnchor: 'mangueras',
    price: 6990,
    image: '/assets/images/3m.webp',
    description: 'Largo extendido ideal para instalaciones exteriores o que requieren mayor separación del cilindro.',
    specs: {
      largo: '3.0 metros continuos',
      norma: 'Certificación SEC NCh 1079',
      material: 'Goma de alta densidad con protección UV',
      presionMax: '20 bar',
    },
    stock: 40,
    featured: false,
    badge: 'Mayor Alcance',
  },
  {
    id: 'abrazadera',
    name: 'Abrazadera Metálica Inoxidable',
    category: 'Mangueras',
    categoryAnchor: 'mangueras',
    price: 990,
    image: '/assets/images/abrazadera.webp',
    description: 'Ajuste milimétrico de acero inoxidable para fijación hermética sin fugas en extremos de mangueras.',
    specs: {
      diametro: '1/2 pulgada a 3/4 pulgada',
      material: 'Acero inoxidable AISI 304',
      mecanismo: 'Tornillo sin fin de apriete preciso',
    },
    stock: 150,
    featured: false,
    badge: 'Acero Inox',
  },
  {
    id: 'kit-conexion',
    name: 'Kit de Conexión Completo Certificado',
    category: 'Mangueras',
    categoryAnchor: 'mangueras',
    price: 12990,
    image: '/assets/images/kit.jpeg',
    description: 'Pack integral que incluye regulador doméstico SEC, manguera flexible de 1.5m y 2 abrazaderas inoxidables.',
    specs: {
      contenido: '1 Regulador estándar + 1 Manguera 1.5m + 2 Abrazaderas',
      certificacion: 'Sello SEC impreso en cada componente',
      garantia: '12 meses por Distribuidora El Volcán',
    },
    stock: 35,
    featured: false,
    badge: 'Pack Ahorro',
  },

  // Reguladores
  {
    id: 'regulador-estandar',
    name: 'Regulador Doméstico Estándar 28 mbar',
    category: 'Reguladores',
    categoryAnchor: 'reguladores',
    price: 8990,
    image: '/assets/images/regulador-estandar.png',
    description: 'Mantiene una presión constante para el uso seguro de cocinas, estufas y calefonts domiciliarios.',
    specs: {
      presionSalida: '28 mbar nominal',
      flujoMaximo: '1.5 kg/h de gas licuado',
      seguridad: 'Corte automático por exceso de flujo',
      homologacion: 'Certificación SEC Chile',
    },
    stock: 50,
    featured: true,
    badge: 'Seguridad SEC',
  },
  {
    id: 'regulador-alta-presion',
    name: 'Regulador de Alta Presión Regulable',
    category: 'Reguladores',
    categoryAnchor: 'reguladores',
    price: 18990,
    image: '/assets/images/regulador-alta-presion.png',
    description: 'Diseñado para cocinillas industriales, hornos cerveceros, quemadores de paila y sopletes.',
    specs: {
      presionSalida: 'Ajustable de 0 a 2 bar',
      flujoMaximo: 'Hasta 6.0 kg/h',
      material: 'Cuerpo reforzado en bronce y aluminio presofundido',
    },
    stock: 20,
    featured: false,
    badge: 'Alta Presión',
  },
  {
    id: 'regulador-dual',
    name: 'Regulador Dual de 2 Vías',
    category: 'Reguladores',
    categoryAnchor: 'reguladores',
    price: 14990,
    image: '/assets/images/regulador-dual.png',
    description: 'Permite conectar simultáneamente cocina y calefont a un mismo cilindro con llaves independientes.',
    specs: {
      salidas: '2 salidas con corte manual individual',
      presionSalida: '28 mbar estabilizada',
      acople: 'Rápido con visor de sellado hermético',
    },
    stock: 18,
    featured: false,
    badge: 'Doble Salida',
  },

  // Accesorios y Seguridad
  {
    id: 'porta-cilindro',
    name: 'Carro Porta Cilindro con Ruedas',
    category: 'Accesorios',
    categoryAnchor: 'accesorios',
    price: 12990,
    image: '/assets/images/porta-cilindro.jpg',
    description: 'Base metálica con ruedas giratorias de alta resistencia para mover cilindros de 11 y 15 kg sin esfuerzo.',
    specs: {
      cargaMax: '50 kg garantizados',
      material: 'Estructura electroestática anticorrosiva',
      ruedas: '4 ruedas giratorias en 360 grados',
    },
    stock: 30,
    featured: false,
    badge: 'Ergonómico',
  },
  {
    id: 'tapa-protectora',
    name: 'Tapa Protectora para Válvula',
    category: 'Accesorios',
    categoryAnchor: 'accesorios',
    price: 1490,
    image: '/assets/images/tapa-protectora.webp',
    description: 'Protege la válvula del cilindro del polvo, barro, lluvia y golpes durante almacenaje exterior.',
    specs: {
      compatibilidad: 'Cilindros de 5, 11 y 15 kg',
      material: 'Polímero de alta resistencia UV',
    },
    stock: 90,
    featured: false,
    badge: 'Protección',
  },
  {
    id: 'detector-fugas',
    name: 'Detector Digital Inteligente de Fugas',
    category: 'Accesorios',
    categoryAnchor: 'accesorios',
    price: 19990,
    image: '/assets/images/detector.jpg',
    description: 'Sensor digital enchufable con alarma sonora de 85 dB ante trazas mínimas de gas licuado en el ambiente.',
    specs: {
      tipoGas: 'Gas licuado GLP (propano/butano) y gas natural',
      alarma: 'Bocina 85 dB + indicador LED estroboscópico',
      alimentacion: '220V CA con batería interna de respaldo',
    },
    stock: 22,
    featured: true,
    badge: 'Alerta Temprana',
  },

  // Servicios Técnicos
  {
    id: 'servicio-instalacion',
    name: 'Instalación Certificada SEC con Prueba de Espuma',
    category: 'Servicios',
    categoryAnchor: 'servicios',
    price: 9990,
    image: '/assets/images/chillan.jpg',
    description: 'Visita de técnico certificado SEC para conexión segura de regulador, cambio de golilla y detección de fugas.',
    specs: {
      tiempoEstimado: '30 a 45 minutos',
      cobertura: 'Chillán, Chillán Viejo y alrededores',
      incluye: 'Prueba de estanqueidad + sello de inspección',
    },
    stock: 99,
    featured: false,
    badge: 'Técnico SEC',
  },
  {
    id: 'servicio-mantencion',
    name: 'Mantención Preventiva Estufa / Calefont',
    category: 'Servicios',
    categoryAnchor: 'servicios',
    price: 15990,
    image: '/assets/images/volcan.png',
    description: 'Limpieza de inyectores, regulación de llama azul, revisión de termocupla y ajuste de ventilación.',
    specs: {
      tiempoEstimado: '60 minutos',
      garantiaServicio: '90 días garantizados',
      recomendado: 'Al inicio de cada temporada de invierno',
    },
    stock: 99,
    featured: false,
    badge: 'Prevención',
  },
];

const STORAGE_KEY_PRODUCTS = 'caso_gas_products_v1';
const STORAGE_KEY_CATEGORIES = 'caso_gas_categories_v1';

/**
 * Carga productos desde LocalStorage o retorna el catálogo inicial.
 */
export function getStoredProducts() {
  if (typeof window === 'undefined') return [...PRODUCTS];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error al leer productos de localStorage', e);
  }
  // Si no existe, inicializar con PRODUCTS
  try {
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(PRODUCTS));
  } catch (e) {
    // ignore
  }
  return [...PRODUCTS];
}

/**
 * Guarda los productos en LocalStorage
 */
export function saveStoredProducts(products) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
  } catch (e) {
    console.error('Error al guardar productos en localStorage', e);
  }
}

/**
 * Operación CRUD - CREATE: Crea un nuevo producto
 */
export function createProduct(productData) {
  const products = getStoredProducts();
  const newProduct = {
    id: productData.id || `prod-${Date.now()}`,
    name: productData.name || 'Nuevo Producto',
    category: productData.category || 'Accesorios',
    price: Number(productData.price) || 0,
    originalPrice: productData.originalPrice ? Number(productData.originalPrice) : null,
    isOffer: Boolean(productData.isOffer),
    image: productData.image || '/assets/images/cilindro.png',
    description: productData.description || 'Descripción del producto.',
    specs: productData.specs || { material: 'Certificado SEC', uso: 'Doméstico' },
    stock: Number(productData.stock) || 0,
    featured: Boolean(productData.featured),
    badge: productData.badge || '',
  };
  const updated = [newProduct, ...products];
  saveStoredProducts(updated);
  return newProduct;
}

/**
 * Operación CRUD - READ: Obtiene un producto por su ID
 */
export function getProductById(id) {
  const products = getStoredProducts();
  return products.find((p) => p.id === id) || null;
}

/**
 * Operación CRUD - UPDATE: Actualiza un producto existente
 */
export function updateProduct(id, updatedFields) {
  const products = getStoredProducts();
  let updatedProduct = null;
  const updatedList = products.map((p) => {
    if (p.id === id) {
      updatedProduct = { ...p, ...updatedFields };
      return updatedProduct;
    }
    return p;
  });
  if (updatedProduct) {
    saveStoredProducts(updatedList);
  }
  return updatedProduct;
}

/**
 * Operación CRUD - DELETE: Elimina un producto por su ID
 */
export function deleteProduct(id) {
  const products = getStoredProducts();
  const exists = products.some((p) => p.id === id);
  if (!exists) return false;
  const filtered = products.filter((p) => p.id !== id);
  saveStoredProducts(filtered);
  return true;
}

/**
 * Listado de productos con stock crítico (Requerimiento Figura 10 del flujo Admin)
 */
export function getCriticalStockProducts(productsList = null, threshold = 20) {
  const products = productsList || getStoredProducts();
  return products.filter((p) => typeof p.stock === 'number' && p.stock <= threshold);
}

/**
 * Listado de productos en oferta (Requerimiento Figura 3 y 8: Vista Ofertas)
 */
export function getOfferProducts(productsList = null) {
  const products = productsList || getStoredProducts();
  return products.filter((p) => p.isOffer || (p.originalPrice && p.originalPrice > p.price));
}

/**
 * Restablece los productos al catálogo de fábrica inicial
 */
export function resetProductsToDefault() {
  saveStoredProducts(PRODUCTS);
  return [...PRODUCTS];
}

/**
 * CRUD Categorías con LocalStorage
 */
export function getStoredCategories() {
  if (typeof window === 'undefined') return [...CATEGORIES];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CATEGORIES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    // ignore
  }
  try {
    localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(CATEGORIES));
  } catch (e) {
    // ignore
  }
  return [...CATEGORIES];
}

export function createCategory(catData) {
  const cats = getStoredCategories();
  const newCat = {
    id: catData.id || catData.label.toLowerCase().replace(/\s+/g, '-'),
    label: catData.label,
    icon: catData.icon || 'bi-tag',
  };
  const updated = [...cats, newCat];
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(updated));
  }
  return newCat;
}

/**
 * Filtra productos por categoría
 */
export function filterProductsByCategory(products = [], category = 'todos') {
  if (!category || category === 'todos') {
    return products;
  }
  return products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

/**
 * Filtra productos por término de búsqueda (insensible a mayúsculas)
 */
export function searchProducts(products = [], query = '') {
  if (!query || typeof query !== 'string' || !query.trim()) {
    return products;
  }
  const cleanQuery = query.toLowerCase().trim();
  return products.filter((p) => {
    const inName = p.name.toLowerCase().includes(cleanQuery);
    const inDesc = p.description.toLowerCase().includes(cleanQuery);
    const inCategory = p.category.toLowerCase().includes(cleanQuery);
    return inName || inDesc || inCategory;
  });
}

