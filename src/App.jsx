import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import ProductCatalog from './components/ProductCatalog';
import ProductDetailModal from './components/ProductDetailModal';
import CartOffcanvas from './components/CartOffcanvas';
import CheckoutModal from './components/CheckoutModal';
import OrderTracking from './components/OrderTracking';
import AdminDashboard from './components/AdminDashboard';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';
import AuthModal from './components/AuthModal';
import JasmineRunnerModal from './components/JasmineRunnerModal';
import Footer from './components/Footer';

// Nuevos componentes según flujo de evaluación Duoc UC (Figuras 3, 4, 7, 8, 9, 10)
import CategoriesView from './components/CategoriesView';
import OffersView from './components/OffersView';
import BlogsView from './components/BlogsView';
import OrderSuccessView from './components/OrderSuccessView';
import OrderErrorView from './components/OrderErrorView';

import {
  getStoredProducts,
  getStoredCategories,
  filterProductsByCategory,
  searchProducts
} from './data/products';
import {
  calculateSubtotal,
  calculateTotal,
  applyCoupon,
  updateItemQuantity,
  removeItemFromCart,
  clearCart
} from './utils/cartLogic';
import { createOrder, ORDER_STATUSES } from './utils/orderWorkflow';

export default function App() {
  // 1. Estado de Navegación y Vistas según el Diagrama de Flujo de la Evaluación
  // 'catalogo' | 'categorias' | 'ofertas' | 'blogs' | 'servicios' | 'seguimiento' | 'admin' | 'nosotros' | 'contacto' | 'compra_exitosa' | 'compra_error'
  const [activeView, setActiveView] = useState('catalogo');

  // 2. Estado de Catálogo reactivo desde almacenamiento local (CRUD)
  const [allProducts, setAllProducts] = useState(() => getStoredProducts());
  const [allCategories, setAllCategories] = useState(() => getStoredCategories());
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null); // Para modal de detalle

  // Recargar productos cuando se vuelva de admin o cambie el storage
  const refreshProducts = () => {
    setAllProducts(getStoredProducts());
    setAllCategories(getStoredCategories());
  };

  // 3. Estado de Carrito de Compras (con persistencia en localStorage)
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('elvolcan_cart');
      return saved ? JSON.parse(saved) : [
        // Producto predeterminado para agilizar la revisión
        {
          id: 'cilindro-15kg',
          name: 'Cilindro Gas 15 Kg',
          price: 16000,
          quantity: 1,
          image: '/assets/images/15kg.png',
          category: 'Cilindros',
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('elvolcan_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Cupones y totales
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [couponFeedback, setCouponFeedback] = useState({ message: '', valid: false });

  // 4. Modales
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isJasmineModalOpen, setIsJasmineModalOpen] = useState(false);

  // 5. Usuario Actual y RBAC
  const [currentUser, setCurrentUser] = useState({
    name: 'Catalina Fuentes',
    email: 'catalina.fuentes@chillan.cl',
    role: 'Cliente', // 'Cliente' | 'Operadora' | 'Repartidor' | 'Administrador'
  });

  // 6. Pedido Activo para Seguimiento y Vistas de Compra Exitosa/Error (Figuras 7 y 8)
  const [activeOrder, setActiveOrder] = useState(null);

  // 7. Toast de Notificación
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Filtrado de productos reactivo
  let filteredProducts = filterProductsByCategory(allProducts, selectedCategory);
  if (searchQuery.trim()) {
    filteredProducts = searchProducts(filteredProducts, searchQuery);
  }

  // Cálculos de Totales
  const subtotal = calculateSubtotal(cartItems);
  const total = calculateTotal(subtotal, discountAmount, shippingCost);
  const cartCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  // Agregar al Carrito
  const handleAddToCart = (product, qty = 1) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((i) => i.id === product.id);
      if (existing) {
        return prevItems.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: qty,
          image: product.image,
          category: product.category,
        },
      ];
    });

    showToast(`✓ Agregado: ${product.name} (${qty} unid.) al carrito`);
  };

  // Acceso rápido a cilindros desde el Hero
  const handleQuickAddCylinder = (cylinderId) => {
    const prod = allProducts.find((p) => p.id === cylinderId);
    if (prod) {
      handleAddToCart(prod, 1);
      setIsCartOpen(true);
    }
  };

  // Actualizar cantidad en carrito
  const handleUpdateQty = (productId, delta) => {
    setCartItems((prev) => updateItemQuantity(prev, productId, delta));
  };

  // Eliminar producto
  const handleRemoveItem = (productId) => {
    setCartItems((prev) => removeItemFromCart(prev, productId));
  };

  // Vaciar carrito
  const handleClearCart = () => {
    setCartItems(clearCart());
    setDiscountAmount(0);
    setAppliedCoupon('');
    setCouponFeedback({ message: '', valid: false });
  };

  // Aplicar cupón de descuento
  const handleApplyCoupon = (code) => {
    const res = applyCoupon(code, subtotal);
    setAppliedCoupon(code);
    setDiscountAmount(res.discount);
    if (res.freeShipping) setShippingCost(0);
    setCouponFeedback({ message: res.message, valid: res.valid });
  };

  // Procesar pedido desde el Checkout (Flujo Figuras 6, 7 y 8)
  const handleOrderSuccess = (customerData) => {
    const newOrder = createOrder(
      customerData,
      cartItems,
      { subtotal, descuento: discountAmount, despacho: shippingCost, total }
    );

    setActiveOrder(newOrder);
    setIsCheckoutOpen(false);
    handleClearCart();

    // Navegar a la vista de Compra Exitosa (Figura 7)
    setActiveView('compra_exitosa');
    showToast(`🎉 ¡Compra exitosa! Boleta #${newOrder.id} generada.`);
  };

  // Simulación de error en pasarela de pago (Figura 8)
  const handleOrderError = (customerData) => {
    const errorOrder = {
      id: Math.floor(100000 + Math.random() * 900000).toString(),
      cliente: customerData,
      totales: { total },
      codigoError: 'TBK-REJ-992',
      motivo: 'Transacción rechazada por el banco emisor o fondos insuficientes',
    };
    setActiveOrder(errorOrder);
    setIsCheckoutOpen(false);
    setActiveView('compra_error');
    showToast('⚠️ La transacción fue rechazada por la pasarela de pago.');
  };

  // Solicitar servicio técnico
  const handleOrderService = (servicioTitulo) => {
    showToast(`Solicitud para "${servicioTitulo}" registrada. Nos contactaremos a la brevedad.`);
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-white">
      {/* 1. Navbar con soporte móvil, tablet y desktop */}
      <Navbar
        cartCount={cartCount}
        cartTotal={total}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeView={activeView}
        onNavigate={(view) => {
          refreshProducts();
          setActiveView(view);
        }}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenJasmineTests={() => setIsJasmineModalOpen(true)}
        onRoleChange={(role) => {
          setCurrentUser((prev) => ({ ...prev, role }));
          showToast(`Rol cambiado a: ${role}`);
        }}
      />

      {/* Toast Flotante */}
      {toastMessage && (
        <div
          className="position-fixed bottom-0 start-50 translate-middle-x mb-4 p-3 bg-dark text-white rounded-3 shadow-lg border border-primary d-flex align-items-center gap-2"
          style={{ zIndex: 1100 }}
        >
          <i className="bi bi-info-circle-fill text-info fs-5"></i>
          <span className="small fw-semibold">{toastMessage}</span>
          <button
            type="button"
            className="btn-close btn-close-white ms-2"
            onClick={() => setToastMessage(null)}
          ></button>
        </div>
      )}

      {/* 2. Contenido según la Vista Activa (Flujo de Navegación de Evaluación 2) */}
      <main className="flex-grow-1">
        {/* VISTA 1: Catálogo Principal / Home */}
        {activeView === 'catalogo' && (
          <>
            <HeroBanner
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setActiveView('categorias');
              }}
              onQuickAddCylinder={handleQuickAddCylinder}
            />
            <ProductCatalog
              products={filteredProducts}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              searchQuery={searchQuery}
              onResetSearch={() => setSearchQuery('')}
              onAddToCart={handleAddToCart}
              onQuickView={(p) => setSelectedProduct(p)}
            />
            <ServicesSection onOrderService={handleOrderService} />
            <AboutSection />
            <FaqSection />
            <ContactSection />
          </>
        )}

        {/* VISTA 2: Categorías (Figura 4: Diseño web propuesta vista categorías) */}
        {activeView === 'categorias' && (
          <CategoriesView
            categories={allCategories}
            products={allProducts}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onAddToCart={handleAddToCart}
            onViewProductDetail={(p) => setSelectedProduct(p)}
          />
        )}

        {/* VISTA 3: Ofertas (Figura 3 y 8: Vista que muestra todos los productos en ofertas) */}
        {activeView === 'ofertas' && (
          <OffersView
            products={allProducts}
            onAddToCart={handleAddToCart}
            onViewProductDetail={(p) => setSelectedProduct(p)}
            onGoToCatalog={() => setActiveView('catalogo')}
          />
        )}

        {/* VISTA 4: Blogs (Figura 3: Blogs -> Detalle Blog #1, Detalle Blog #2) */}
        {activeView === 'blogs' && (
          <BlogsView onGoToCatalog={() => setActiveView('catalogo')} />
        )}

        {/* VISTA 5: Servicios Técnicos */}
        {activeView === 'servicios' && (
          <ServicesSection onOrderService={handleOrderService} />
        )}

        {/* VISTA 6: Seguimiento GPS en Tiempo Real (OpenStreetMap) */}
        {activeView === 'seguimiento' && (
          <OrderTracking
            currentOrder={activeOrder}
            onUpdateOrder={(upd) => setActiveOrder(upd)}
          />
        )}

        {/* VISTA 7: Compra Exitosa (Figura 7: Diseño web propuesta vista compra exitosa) */}
        {activeView === 'compra_exitosa' && (
          <OrderSuccessView
            order={activeOrder}
            onTrackOrder={() => setActiveView('seguimiento')}
            onGoHome={() => setActiveView('catalogo')}
          />
        )}

        {/* VISTA 8: Pago con Error (Figura 8: Diseño web propuesta no se pudo realizar el pago) */}
        {activeView === 'compra_error' && (
          <OrderErrorView
            order={activeOrder}
            onRetryPayment={() => setIsCheckoutOpen(true)}
            onGoHome={() => setActiveView('catalogo')}
          />
        )}

        {/* VISTA 9: Panel de Administración (Figura 9 y 10: Propuesta final sistema administrativo) */}
        {activeView === 'admin' && (
          <AdminDashboard
            currentUser={currentUser}
            onGoToStore={() => {
              refreshProducts();
              setActiveView('catalogo');
            }}
          />
        )}

        {/* VISTAS INSTITUCIONALES */}
        {activeView === 'nosotros' && <AboutSection />}
        {activeView === 'contacto' && <ContactSection />}
      </main>

      {/* 3. Footer */}
      <Footer
        onNavigate={setActiveView}
        onOpenJasmineTests={() => setIsJasmineModalOpen(true)}
      />

      {/* 4. Modales y Drawers */}
      <CartOffcanvas
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        subtotal={subtotal}
        discount={discountAmount}
        shipping={shippingCost}
        total={total}
        couponCode={appliedCoupon}
        couponMessage={couponFeedback.message}
        couponValid={couponFeedback.valid}
        onApplyCoupon={handleApplyCoupon}
        onProceedCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={subtotal}
        discount={discountAmount}
        shipping={shippingCost}
        total={total}
        onOrderSuccess={handleOrderSuccess}
        onOrderError={handleOrderError}
      />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          showToast(`¡Bienvenido/a, ${user.name}! (Rol: ${user.role})`);
        }}
      />

      <JasmineRunnerModal
        isOpen={isJasmineModalOpen}
        onClose={() => setIsJasmineModalOpen(false)}
      />
    </div>
  );
}
