import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/blogs';

/**
 * Vista de Blogs y Artículos de Seguridad - Distribuidora El Volcán Chillán
 */
export default function BlogsView({ onGoToCatalog }) {
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  const selectedPost = BLOG_POSTS.find((p) => p.id === selectedBlogId);

  return (
    <div className="container py-4">
      {/* Navegación Breadcrumb si hay un post abierto */}
      {selectedPost ? (
        <div className="mb-4">
          <button
            className="btn btn-sm btn-outline-secondary mb-3"
            onClick={() => setSelectedBlogId(null)}
          >
            <i className="bi bi-arrow-left me-1"></i> Volver a todos los artículos
          </button>

          <article className="bg-white border rounded-3 p-4 p-md-5 shadow-sm">
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
                {selectedPost.category}
              </span>
              <span className="text-muted small">
                <i className="bi bi-calendar3 me-1"></i> {selectedPost.date}
              </span>
              <span className="text-muted small">
                <i className="bi bi-clock me-1"></i> {selectedPost.readTime}
              </span>
            </div>

            <h1 className="h2 fw-bold text-dark mb-3">{selectedPost.title}</h1>
            <p className="lead text-secondary mb-4">{selectedPost.subtitle}</p>

            <div className="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
              <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                <i className="bi bi-person-fill fs-5"></i>
              </div>
              <div>
                <strong className="d-block text-dark small">{selectedPost.author}</strong>
                <small className="text-muted">Distribuidora El Volcán Chillán</small>
              </div>
            </div>

            <div
              className="blog-body mb-5"
              dangerouslySetContent={{ __html: selectedPost.content }}
              style={{ lineHeight: '1.8', fontSize: '1.05rem', color: '#334155' }}
            />

            <div className="d-flex flex-wrap gap-2 pt-3 border-top mb-4">
              {selectedPost.tags.map((tag) => (
                <span key={tag} className="badge bg-light text-secondary border">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="bg-light p-4 rounded-3 d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3">
              <div>
                <h5 className="fw-bold text-dark mb-1">¿Necesitas recargar tu cilindro de gas?</h5>
                <p className="text-secondary small mb-0">
                  Despachamos en menos de 30 minutos a todo Chillán y Chillán Viejo.
                </p>
              </div>
              <button className="btn btn-primary text-nowrap" onClick={onGoToCatalog}>
                <i className="bi bi-fire me-1"></i> Pedir Gas Ahora
              </button>
            </div>
          </article>
        </div>
      ) : (
        <div>
          {/* Encabezado Lista de Blogs */}
          <div className="mb-4">
            <span className="badge bg-info-subtle text-info border border-info-subtle mb-2">
              <i className="bi bi-newspaper me-1"></i> Blog & Consejos de Seguridad
            </span>
            <h1 className="h3 fw-bold text-dark mb-1">Guías, Ahorro y Seguridad en Gas Licuado</h1>
            <p className="text-secondary small mb-0">
              Artículos preparados por nuestros técnicos certificados SEC para el cuidado del hogar en Chillán.
            </p>
          </div>

          <div className="row g-4">
            {BLOG_POSTS.map((post, index) => (
              <div key={post.id} className="col-12 col-md-6">
                <div className="card h-100 border shadow-sm hover-shadow transition-all">
                  <div className="card-body p-4 d-flex flex-column">
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
                        {post.category}
                      </span>
                      <span className="text-muted small">
                        <i className="bi bi-clock me-1"></i> {post.readTime}
                      </span>
                    </div>

                    <h2 className="h5 fw-bold text-dark mb-2">{post.title}</h2>
                    <p className="card-text text-secondary small flex-grow-1 mb-4">
                      {post.subtitle}
                    </p>

                    <div className="d-flex align-items-center justify-content-between pt-3 border-top mt-auto">
                      <div className="small text-muted">
                        <i className="bi bi-calendar3 me-1"></i> {post.date}
                      </div>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => setSelectedBlogId(post.id)}
                      >
                        Leer artículo <i className="bi bi-chevron-right ms-1"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
