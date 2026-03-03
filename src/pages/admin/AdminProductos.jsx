import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './admin.css';

const AdminProductos = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion_corta: '',
        descripcion_larga: '',
        precio: '',
        stock: '',
        categoria: '',
        origen: '',
        tostado: '',
        imagen_portada: '',
        destacado: false,
        activo: true,
        presentaciones: [],
        imagenes_extra: []
    });

    const categorias = [
        'Café en Grano',
        'Café Molido',
        'Licor de Café',
        'Galletas',
        'Bombones',
        'Café Verde (Tonelada)',
        'Accesorios'
    ];

    const tostados = ['Medio', 'Oscuro', 'Claro', 'Natural'];

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {
            setLoading(true);
            const response = await api.get('/productos');
            setProductos(response.data);
        } catch (error) {
            console.error('Error cargando productos:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageSelect = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages(prev => [...prev, ...files]);
        
        // Crear previews
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(prev => [...prev, ...newPreviews]);
    };

    const removeImage = (index) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
        setPreviewImages(prev => {
            URL.revokeObjectURL(prev[index]);
            return prev.filter((_, i) => i !== index);
        });
    };

    const handlePresentacionChange = (index, field, value) => {
        setFormData(prev => {
            const nuevasPresentaciones = [...(prev.presentaciones || [])];
            if (!nuevasPresentaciones[index]) {
                nuevasPresentaciones[index] = { tipo: '', precio_extra: 0 };
            }
            nuevasPresentaciones[index][field] = value;
            return { ...prev, presentaciones: nuevasPresentaciones };
        });
    };

    const agregarPresentacion = () => {
        setFormData(prev => ({
            ...prev,
            presentaciones: [...(prev.presentaciones || []), { tipo: '', precio_extra: 0 }]
        }));
    };

    const quitarPresentacion = (index) => {
        setFormData(prev => ({
            ...prev,
            presentaciones: (prev.presentaciones || []).filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Subir imágenes primero si hay nuevas
            const imagenesUrls = [];
            
            if (selectedImages.length > 0) {
                const formDataImg = new FormData();
                selectedImages.forEach(img => {
                    formDataImg.append('imagenes', img);
                });
                
                const uploadResponse = await api.post('/upload/productos', formDataImg, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                
                imagenesUrls.push(...uploadResponse.data.urls);
            }

            const productoData = {
                ...formData,
                precio: parseFloat(formData.precio),
                stock: parseInt(formData.stock),
                imagenes_extra: imagenesUrls,
                presentaciones: formData.presentaciones || []
            };

            if (editingId) {
                await api.put(`/productos/${editingId}`, productoData);
                alert('Producto actualizado exitosamente');
            } else {
                await api.post('/productos', productoData);
                alert('Producto creado exitosamente');
            }

            // Limpiar formulario
            setShowForm(false);
            setEditingId(null);
            setFormData({
                nombre: '',
                descripcion_corta: '',
                descripcion_larga: '',
                precio: '',
                stock: '',
                categoria: '',
                origen: '',
                tostado: '',
                imagen_portada: '',
                destacado: false,
                activo: true,
                presentaciones: []
            });
            setSelectedImages([]);
            setPreviewImages([]);
            
            cargarProductos();
        } catch (error) {
            console.error('Error guardando producto:', error);
            alert('Error al guardar el producto');
        }
    };

    const handleEdit = (producto) => {
        setEditingId(producto.id);
        setFormData({
            nombre: producto.nombre || '',
            descripcion_corta: producto.descripcion_corta || '',
            descripcion_larga: producto.descripcion_larga || '',
            precio: producto.precio || '',
            stock: producto.stock || '',
            categoria: producto.categoria || '',
            origen: producto.origen || '',
            tostado: producto.tostado || '',
            imagen_portada: producto.imagen_portada || '',
            destacado: producto.destacado || false,
            activo: producto.activo !== false,
            presentaciones: producto.presentaciones || []
        });
        
        if (producto.imagenes_extra) {
            setPreviewImages(producto.imagenes_extra);
        }
        
        setShowForm(true);
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            try {
                await api.delete(`/productos/${id}`);
                cargarProductos();
                alert('Producto eliminado');
            } catch (error) {
                console.error('Error eliminando producto:', error);
                alert('Error al eliminar producto');
            }
        }
    };

    const handleToggleDestacado = async (id, destacado) => {
        try {
            await api.patch(`/productos/${id}/destacado`, { destacado: !destacado });
            cargarProductos();
        } catch (error) {
            console.error('Error actualizando destacado:', error);
        }
    };

    if (loading) return <div className="loading">Cargando productos...</div>;

    return (
        <div className="admin-productos">
            <div className="page-header">
                <h1>Gestión de Productos</h1>
                <button 
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditingId(null);
                        setFormData({
                            nombre: '',
                            descripcion_corta: '',
                            descripcion_larga: '',
                            precio: '',
                            stock: '',
                            categoria: '',
                            origen: '',
                            tostado: '',
                            imagen_portada: '',
                            destacado: false,
                            activo: true,
                            presentaciones: []
                        });
                        setSelectedImages([]);
                        setPreviewImages([]);
                    }} 
                    className="btn-primary"
                >
                    {showForm ? 'Cancelar' : '+ Nuevo Producto'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="producto-form">
                    <h2>{editingId ? 'Editar Producto' : 'Nuevo Producto'}</h2>
                    
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Nombre del producto *</label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                required
                                placeholder="Ej: Café Premium Altura"
                            />
                        </div>

                        <div className="form-group">
                            <label>Categoría *</label>
                            <select 
                                name="categoria" 
                                value={formData.categoria} 
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Seleccionar categoría</option>
                                {categorias.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Precio *</label>
                            <input
                                type="number"
                                name="precio"
                                value={formData.precio}
                                onChange={handleInputChange}
                                required
                                step="0.01"
                                min="0"
                            />
                        </div>

                        <div className="form-group">
                            <label>Stock *</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleInputChange}
                                required
                                min="0"
                            />
                        </div>

                        <div className="form-group">
                            <label>Origen</label>
                            <input
                                type="text"
                                name="origen"
                                value={formData.origen}
                                onChange={handleInputChange}
                                placeholder="Ej: Colombia, Antioquia"
                            />
                        </div>

                        <div className="form-group">
                            <label>Tostado</label>
                            <select 
                                name="tostado" 
                                value={formData.tostado} 
                                onChange={handleInputChange}
                            >
                                <option value="">Seleccionar</option>
                                {tostados.map(t => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group full-width">
                            <label>Descripción Corta</label>
                            <input
                                type="text"
                                name="descripcion_corta"
                                value={formData.descripcion_corta}
                                onChange={handleInputChange}
                                placeholder="Breve descripción para tarjetas"
                                maxLength="100"
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>Descripción Larga</label>
                            <textarea
                                name="descripcion_larga"
                                value={formData.descripcion_larga}
                                onChange={handleInputChange}
                                rows="4"
                                placeholder="Descripción detallada del producto"
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <input
                                    type="checkbox"
                                    name="destacado"
                                    checked={formData.destacado}
                                    onChange={handleInputChange}
                                />
                                Producto Destacado
                            </label>
                        </div>

                        <div className="form-group">
                            <label>
                                <input
                                    type="checkbox"
                                    name="activo"
                                    checked={formData.activo}
                                    onChange={handleInputChange}
                                />
                                Producto Activo
                            </label>
                        </div>

                        {/* Sección de Presentaciones */}
                        <div className="form-group full-width">
                            <label>Presentaciones disponibles</label>
                            <div className="presentaciones-list">
                                {formData.presentaciones?.map((pres, index) => (
                                    <div key={index} className="presentacion-item">
                                        <select
                                            value={pres.tipo}
                                            onChange={(e) => handlePresentacionChange(index, 'tipo', e.target.value)}
                                        >
                                            <option value="">Seleccionar</option>
                                            <option value="grano_medio">Grano - Medio Kg</option>
                                            <option value="grano_kilo">Grano - 1 Kg</option>
                                            <option value="molido_medio">Molido - Medio Kg</option>
                                            <option value="molido_kilo">Molido - 1 Kg</option>
                                            <option value="caja_6">Caja de 6</option>
                                            <option value="caja_12">Caja de 12</option>
                                        </select>
                                        <input
                                            type="number"
                                            placeholder="Precio extra"
                                            value={pres.precio_extra}
                                            onChange={(e) => handlePresentacionChange(index, 'precio_extra', e.target.value)}
                                            min="0"
                                            step="0.01"
                                        />
                                        <button 
                                            type="button" 
                                            onClick={() => quitarPresentacion(index)}
                                            className="btn-remove"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                                <button 
                                    type="button" 
                                    onClick={agregarPresentacion}
                                    className="btn-add"
                                >
                                    + Agregar presentación
                                </button>
                            </div>
                        </div>

                        {/* Subida de imágenes */}
                        <div className="form-group full-width">
                            <label>Imágenes del producto</label>
                            <div className="image-upload-area">
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageSelect}
                                    className="file-input"
                                />
                                
                                <div className="preview-grid">
                                    {previewImages.map((img, index) => (
                                        <div key={index} className="preview-item">
                                            <img src={img} alt={`Preview ${index}`} />
                                            <button 
                                                type="button" 
                                                onClick={() => removeImage(index)}
                                                className="remove-image"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="form-group full-width">
                            <label>URL Imagen de portada (opcional)</label>
                            <input
                                type="url"
                                name="imagen_portada"
                                value={formData.imagen_portada}
                                onChange={handleInputChange}
                                placeholder="https://ejemplo.com/imagen.jpg"
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn-primary btn-large">
                            {editingId ? 'Actualizar Producto' : 'Guardar Producto'}
                        </button>
                    </div>
                </form>
            )}

            <div className="productos-grid">
                {productos.map(producto => (
                    <div key={producto.id} className="producto-card">
                        <div className="producto-imagen">
                            <img 
                                src={producto.imagen_portada || '/images/default-product.jpg'} 
                                alt={producto.nombre}
                            />
                            {producto.destacado && (
                                <span className="badge-destacado">⭐ Destacado</span>
                            )}
                        </div>
                        
                        <div className="producto-info">
                            <h3>{producto.nombre}</h3>
                            <p className="producto-categoria">{producto.categoria}</p>
                            <p className="producto-descripcion">{producto.descripcion_corta}</p>
                            
                            <div className="producto-detalles">
                                <span className="producto-precio">${producto.precio}</span>
                                <span className={`producto-stock ${producto.stock < 5 ? 'bajo' : ''}`}>
                                    Stock: {producto.stock}
                                </span>
                            </div>

                            <div className="producto-origen">
                                {producto.origen && <span>📍 {producto.origen}</span>}
                                {producto.tostado && <span>🔥 {producto.tostado}</span>}
                            </div>

                            <div className="producto-acciones">
                                <button 
                                    onClick={() => handleToggleDestacado(producto.id, producto.destacado)}
                                    className="btn-icon" 
                                    title={producto.destacado ? 'Quitar destacado' : 'Marcar destacado'}
                                >
                                    {producto.destacado ? '⭐' : '☆'}
                                </button>
                                <button 
                                    onClick={() => handleEdit(producto)}
                                    className="btn-icon" 
                                    title="Editar"
                                >
                                    ✏️
                                </button>
                                <button 
                                    onClick={() => handleDelete(producto.id)}
                                    className="btn-icon" 
                                    title="Eliminar"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminProductos;