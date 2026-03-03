import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { useLocation } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Categorías disponibles
  const categories = [
    'Todos',
    'Café en Grano',
    'Café Molido',
    'Licor de Café',
    'Galletas',
    'Bombones',
    'Café Verde'
  ];

  useEffect(() => {
    // Obtener categoría de la URL
    const params = new URLSearchParams(location.search);
    const categoria = params.get('categoria');
    if (categoria) {
      const categoriaMap = {
        'grano': 'Café en Grano',
        'molido': 'Café Molido',
        'licor': 'Licor de Café',
        'galletas': 'Galletas',
        'bombones': 'Bombones',
        'verde': 'Café Verde'
      };
      setSelectedCategory(categoriaMap[categoria] || 'Todos');
    }
  }, [location]);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, products]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      // Simulación de datos - en producción usar API
      const mockProducts = [
        {
          id: 1,
          nombre: 'Café Premium Altura',
          descripcion_corta: 'Grano seleccionado de nuestras mejores cosechas',
          descripcion_larga: 'Café arábica cultivado a más de 1,500 msnm en las montañas de Veracruz. Notas a chocolate, nuez y caramelo. Tueste medio.',
          precio: 250,
          stock: 50,
          categoria: 'Café en Grano',
          origen: 'Veracruz, México',
          tostado: 'Medio',
          imagen_portada: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31',
          destacado: true,
          presentaciones: ['Medio kg', '1 kg']
        },
        {
          id: 2,
          nombre: 'Café Molido Fino',
          descripcion_corta: 'Perfecto para preparaciones en casa',
          descripcion_larga: 'Café molido de granos seleccionados, ideal para cafeteras de filtro y prensa francesa. Sabor equilibrado y aroma intenso.',
          precio: 230,
          stock: 35,
          categoria: 'Café Molido',
          origen: 'Chiapas, México',
          tostado: 'Medio-Oscuro',
          imagen_portada: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735',
          destacado: false,
          presentaciones: ['250g', '500g', '1 kg']
        },
        {
          id: 3,
          nombre: 'Licor de Café Artesanal',
          descripcion_corta: 'Elaborado con nuestra receta familiar',
          descripcion_larga: 'Licor de café elaborado artesanalmente con granos de nuestra finca. Proceso de maceración de 6 meses. Ideal para postres o solo.',
          precio: 350,
          stock: 20,
          categoria: 'Licor de Café',
          origen: 'Veracruz, México',
          imagen_portada: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd',
          destacado: true,
          presentaciones: ['750 ml']
        },
        {
          id: 4,
          nombre: 'Bombones de Café',
          descripcion_corta: 'Chocolate relleno con crema de café',
          descripcion_larga: 'Bombones de chocolate belga rellenos con crema de nuestro café especial. Cada bocado es una experiencia única.',
          precio: 180,
          stock: 45,
          categoria: 'Bombones',
          origen: 'México',
          imagen_portada: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735',
          destacado: true,
          presentaciones: ['Caja de 12', 'Caja de 24']
        },
        {
          id: 5,
          nombre: 'Galletas de Café',
          descripcion_corta: 'Horneradas con granos de café molidos',
          descripcion_larga: 'Galletas artesanales horneadas con granos de café molidos. Crujientes y con el sabor inconfundible de nuestro café.',
          precio: 120,
          stock: 60,
          categoria: 'Galletas',
          origen: 'Veracruz, México',
          imagen_portada: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
          destacado: false,
          presentaciones: ['Bolsa 250g', 'Bolsa 500g']
        },
        {
          id: 6,
          nombre: 'Café Oro Natural Superior',
          descripcion_corta: 'Café verde de la más alta calidad',
          descripcion_larga: 'Café verde Oro Natural Superior de nuestras mejores cosechas. Ideal para tostadores y exportación. Puntaje en taza: 85+.',
          precio: 85000,
          stock: 5000,
          categoria: 'Café Verde',
          origen: 'Veracruz, México',
          imagen_portada: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31',
          destacado: false,
          presentaciones: ['Tonelada']
        },
        {
          id: 7,
          nombre: 'Café Oro PL-10',
          descripcion_corta: 'Perfil cítrico y floral',
          descripcion_larga: 'Café verde Oro PL-10 con notas a cítricos y flores. Altitud: 1,500-1,800 msnm. Ideal para blends de especialidad.',
          precio: 82000,
          stock: 3000,
          categoria: 'Café Verde',
          origen: 'Chiapas, México',
          imagen_portada: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735',
          destacado: false,
          presentaciones: ['Tonelada']
        },
        {
          id: 8,
          nombre: 'Café Oro PL-20',
          descripcion_corta: 'Notas a frutos rojos y vino tinto',
          descripcion_larga: 'Café verde Oro PL-20 con perfil complejo a frutos rojos y vino tinto. Altitud: 1,600-2,000 msnm. Puntaje en taza: 88+.',
          precio: 89000,
          stock: 2500,
          categoria: 'Café Verde',
          origen: 'Oaxaca, México',
          imagen_portada: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31',
          destacado: false,
          presentaciones: ['Tonelada']
        }
      ];
      
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
    } catch (error) {
      console.error('Error cargando productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Filtrar por categoría
    if (selectedCategory !== 'Todos') {
      filtered = filtered.filter(p => p.categoria === selectedCategory);
    }

    setFilteredProducts(filtered);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Nuestros Productos</h1>
        <p>Selección de los mejores cafés y productos artesanales</p>
      </div>

      <div className="category-filter-container">
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="products-count">
        Mostrando {filteredProducts.length} de {products.length} productos
      </div>

      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <span className="no-products-icon">😕</span>
          <h3>No se encontraron productos</h3>
          <p>Intenta con otra categoría</p>
          <button 
            className="btn-primary"
            onClick={() => setSelectedCategory('Todos')}
          >
            Ver todos los productos
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;