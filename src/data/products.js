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
