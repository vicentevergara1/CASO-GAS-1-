/**
 * Datos simulados para el módulo de Blogs - Distribuidora Gas El Volcán (Chillán)
 * Requerimiento: Diagrama de navegación Figura 3 (Blogs -> Detalle Blog #1, Detalle Blog #2)
 */

export const BLOG_POSTS = [
  {
    id: 'blog-1',
    slug: 'seguridad-gas-cilindros-chillan',
    title: '5 Consejos Clave para el Uso Seguro de Cilindros de Gas en tu Hogar',
    subtitle: 'Aprende a identificar fugas, mantener tus sellos intactos y proteger a tu familia este invierno en Ñuble.',
    author: 'Equipo Técnico El Volcán',
    date: '14 de Junio, 2024',
    readTime: '4 min de lectura',
    category: 'Seguridad SEC',
    image: '/assets/images/volcan.avif',
    content: `
      <p class="lead">El gas licuado de petróleo (GLP) es la principal fuente de energía limpia y económica en los hogares de Chillán y Chillán Viejo. Sin embargo, su manipulación requiere seguir protocolos básicos dictados por la Superintendencia de Electricidad y Combustibles (SEC).</p>
      
      <h4>1. Ubicación siempre ventilada y vertical</h4>
      <p>Nunca coloques el cilindro de gas en sótanos, pozos o espacios cerrados sin ventilación inferior. Los gases propano y butano son más pesados que el aire, por lo que ante una eventual fuga se concentran en el suelo.</p>
      
      <h4>2. Verificación de sellos con agua jabonosa (¡Jamás con fuego!)</h4>
      <p>Para comprobar que la conexión entre el regulador y la válvula del cilindro no tiene filtraciones, aplica una mezcla de agua con detergente líquido con una esponja. Si se forman burbujas activas, cierra la válvula inmediatamente y reemplaza el sello o el vástago.</p>
      
      <h4>3. Revisa la fecha de vencimiento de la manguera amarilla</h4>
      <p>Las mangueras flexibles certificadas SEC tienen una vida útil máxima recomendada de 2 a 3 años. Si tu manguera presenta resequedad, grietas o fecha expirada, cámbiala de inmediato por un kit con abrazaderas de presión de acero inoxidable.</p>

      <h4>4. Qué hacer en caso de olor a gas</h4>
      <p>Si sientes el olor característico a gas (mercaptano): no enciendas luces ni fósforos, no acciones interruptores eléctricos, abre puertas y ventanas para ventilar el ambiente y llama de inmediato a nuestro servicio técnico o a Bomberos de Chillán (132).</p>
    `,
    tags: ['Seguridad', 'Cilindros', 'Norma SEC', 'Prevención'],
  },
  {
    id: 'blog-2',
    slug: 'como-ahorrar-gas-calefaccion-invierno',
    title: 'Guía Práctica: Cómo Optimizar el Rendimiento de tu Balón de Gas en Invierno',
    subtitle: 'Consejos de eficiencia energética para estufas rodantes y calefones en la zona centro-sur.',
    author: 'Dpto. de Eficiencia Energética',
    date: '28 de Julio, 2024',
    readTime: '5 min de lectura',
    category: 'Eficiencia y Ahorro',
    image: '/assets/images/chillan.jpg',
    content: `
      <p class="lead">Durante los meses fríos en la Región de Ñuble, la demanda de gas licuado para calefacción y agua caliente sanitaria se triplica. Con estos sencillos ajustes, puedes prolongar la duración de tu cilindro de 11 o 15 kg hasta en un 25%.</p>
      
      <h4>1. Mantención periódica de los inyectores y paneles cerámicos</h4>
      <p>El hollín y polvo acumulado en las pantallas cerámicas de las estufas disminuyen la radiación infrarroja y provocan una combustión incompleta con llama amarilla, la cual desperdicia combustible. Una llama eficiente debe ser siempre de color azul vivo.</p>

      <h4>2. Aislación térmica y control de corrientes</h4>
      <p>El mejor calor es el que no se escapa. Utiliza burletes en puertas y sella filtraciones en ventanas antes de encender la calefacción. Calienta solo las habitaciones en uso y mantén las puertas interiores cerradas.</p>

      <h4>3. Regulación inteligente del termostato del calefont</h4>
      <p>Uno de los errores más comunes es regular el calefont a temperatura máxima y luego enfriar el agua con la llave fría. Lo óptimo es ajustar el paso de gas del calefont para obtener la temperatura de ducha deseada sin necesidad de mezclar con agua fría.</p>
    `,
    tags: ['Ahorro', 'Calefacción', 'Chillán', 'Invierno Eficiente'],
  },
];
