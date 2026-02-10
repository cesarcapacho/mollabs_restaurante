import { useState, useEffect } from 'react';

function App() {
  const [menu, setMenu] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [cargando, setCargando] = useState(true);


  //Carga inicial de los datos
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/menu')
      .then(res => res.json())
      .then(data => {
        setMenu(data);
        setCargando(false);
      })
      .catch(error => {
        console.error("Error de conexión:", error);
        setCargando(false);
      });
  }, []);

  // Agregar ítem es el q Valida stock y suma cantidad si ya existe
  const agregarAlPedido = (plato) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.plato_id === plato.id);
      
      // Si ya existe, pues validamos que no supere el stock al sumar 1
      if (existe && existe.cantidad >= plato.stock) {
        alert("Stock insuficiente para agregar más unidades.");
        return prev;
      }

      if (existe) {
        return prev.map(item => 
          item.plato_id === plato.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      
      // Si es nuevo 
      return [...prev, { 
        plato_id: plato.id, 
        nombre: plato.nombre, 
        precio: parseFloat(plato.precio),
        cantidad: 1,
        stock_max: plato.stock 
      }];
    });
  };

  // Restar cantidad (mínimo minimo 1)
  const disminuirCantidad = (id) => {
    setCarrito(prev => prev.map(item => {
      if (item.plato_id === id) {
        return { ...item, cantidad: Math.max(1, item.cantidad - 1) };
      }
      return item;
    }));
  };

  // Eliminar plato del carrito 
  const eliminarDelCarrito = (id) => {
    if(window.confirm("¿Desea eliminar este producto del pedido?")) {
      setCarrito(prev => prev.filter(item => item.plato_id !== id));
    }
  };

  // Enviar orden al Back
  const procesarOrden = () => {
    if (carrito.length === 0) return;

    if(!window.confirm("¿Confirmar envío?")) return;

    const payload = {
      items: carrito.map(c => ({
        plato_id: c.plato_id,
        cantidad: c.cantidad
      }))
    };

    fetch('http://127.0.0.1:8000/api/ordenar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) {
        alert("Error: " + data.error);
      } else {
        alert("Orden registrada correctamente. Total: $" + data.total.toLocaleString());
        setCarrito([]); // Limpiar carrito
        window.location.reload(); // Recargar para actualizar inventario 
      }
    })
    .catch(() => alert("Error al conectar con el servidor."));
  };

  const totalPagar = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);


  // Use la <style> para asegurar que sea responsive y no dependa de un CSS externo, además de facilitar la lectura del código en un solo archivo.
  return (
    <>
      <style>{`
        /* Reset para quitar los márgenes x defecto */
        body, html, #root {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f4f4f9;
        }

        /* Contenedor Principal */
        .app-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        /* Cabecera */
        .header {
          background-color: darkblue;
          color: white;
          padding: 15px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        /* Layout Principal: Grid para separar Menú y Carrito */
        .main-content {
          display: flex;
          flex: 1;
          padding: 20px;
          gap: 20px;
        }

        /* Sección Izquierda: Menú */
        .menu-section {
          flex: 1; /* Toma todo el espacio disponible */
        }

        /* Categorías */
        .categoria-titulo {
          color: darkblue;
          border-bottom: 2px solid #ddd;
          padding-bottom: 5px;
          margin-top: 30px;
          margin-bottom: 15px;
          text-transform: uppercase;
          font-size: 1.2rem;
        }

        /* Grid de tarjetas de platos */
        .platos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); /* Responsivo automático */
          gap: 20px;
        }

        /* Tarjeta individual */
        .card {
          background: lightblue;
          border: 1px solid transparent;
          border-radius: 8px;
          padding: 15px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .card h3 { margin: 0 0 5px 0; color: darkblue; }
        .card .tipo { color: black; font-size: 0.9rem; margin-bottom: 10px; display: block; }
        .card .precio { font-size: 1.1rem; font-weight: bold; color: black; }
        .card .stock { font-size: 0.8rem; color: black; display: block; margin-bottom: 10px; }
        .card .stock.bajo { color: red; }

        .btn-agregar {
          background-color: darkblue;
          color: white;
          border: none;
          padding: 10px;
          width: 100%;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          transition: background 0.2s;
        }
        .btn-agregar:hover { background-color: blue; }
        .btn-agregar:disabled { background-color: #ccc; cursor: not-allowed; }

        /* Sección Derecha: El Carrito */
        .carrito-section {
          width: 350px; /* Ancho fijo en PC */
          background: lightblue;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          height: fit-content;
          position: sticky;
          top: 20px;
          border: 1px solid #ddd;
        }

        .carrito-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 0;
          border-bottom: 1px solid black;
        }

        .controles-cantidad {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .btn-mini {
          width: 25px;
          height: 25px;
          border: 1px solid darkblue;
          background: white;
          cursor: pointer;
        }

        .btn-eliminar {
          background: red;
          color: white;
          border: 1px solid red;
          padding: 5px 10px;
          border-radius: 3px;
          cursor: pointer;
          font-size: 0.8rem;
          margin-left: 10px;
        }

        .total-row {
          margin-top: 20px;
          text-align: right;
          font-size: 1.3rem;
          font-weight: bold;
          color: black;
        }

        .btn-pagar {
          background-color: darkgreen;
          color: white;
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 4px;
          margin-top: 15px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
        }

        /* RESPONSIVE: En celulares el carrito queda bien abajo */
        @media (max-width: 900px) {
          .main-content {
            flex-direction: column;
          }
          .carrito-section {
            width: 100%; /* Ocupa todo el ancho en celular */
            position: relative;
            top: 0;
            box-sizing: border-box;
          }
        }
      `}</style>

      <div className="app-container">
        {/* Header */}
        <header className="header">
          <div>
            <h2 style={{margin: 0}}>RESTAURANTE MOL LABS</h2>
            <span style={{fontSize: '0.9rem', opacity: 0.8}}>Sistema de Pedidos de Comida</span>
          </div>
          <div>
            <span>Usuario: Aprendiz Sena Cesar Capacho</span>
          </div>
        </header>

        <div className="main-content">
          
          {/* COLUMNA IZQUIERDA: MENÚ */}
          <div className="menu-section">
            {cargando ? <p>Cargando menú...</p> : 
              ['Italiana', 'Asiática', 'Bebidas'].map(categoria => {
                const platosFiltrados = menu.filter(p => p.categoria === categoria);
                if (platosFiltrados.length === 0) return null;

                return (
                  <div key={categoria}>
                    <h3 className="categoria-titulo">{categoria}</h3>
                    <div className="platos-grid">
                      {platosFiltrados.map(plato => (
                        <div key={plato.id} className="card">
                          <div>
                            <h3>{plato.nombre}</h3>
                            <span className="tipo">{plato.tipo}</span>
                            <div className="precio">${parseFloat(plato.precio).toLocaleString()}</div>
                            <span className={`stock ${plato.stock < 5 ? 'bajo' : ''}`}>
                              Disponibles: {plato.stock}
                            </span>
                          </div>
                          <button 
                            className="btn-agregar" 
                            onClick={() => agregarAlPedido(plato)}
                            disabled={plato.stock === 0}
                          >
                            {plato.stock === 0 ? 'AGOTADO' : 'AGREGAR AL PEDIDO'}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })
            }
          </div>

          {/* COLUMNA DERECHA: CARRITO */}
          <div className="carrito-section">
            <h3 style={{marginTop: 0, borderBottom:'1px solid #ddd', paddingBottom:'10px'}}>
              ORDEN ACTUAL
            </h3>
            
            {carrito.length === 0 ? (
              <p style={{color: '#999', textAlign: 'center', padding: '20px'}}>
                No hay productos seleccionados.
              </p>
            ) : (
              <div>
                {carrito.map((item, index) => (
                  <div key={index} className="carrito-item">
                    <div style={{flex: 1}}>
                      <strong>{item.nombre}</strong>
                      <br/>
                      <small>${(item.precio * item.cantidad).toLocaleString()}</small>
                    </div>
                    
                    <div className="controles-cantidad">
                      <button className="btn-mini" onClick={() => disminuirCantidad(item.plato_id)}>-</button>
                      <span style={{fontWeight: 'bold', margin: '0 5px'}}>{item.cantidad}</span>
                      <button className="btn-mini" onClick={() => agregarAlPedido({id: item.plato_id, stock: item.stock_max})}>+</button>
                    </div>

                    <button className="btn-eliminar" onClick={() => eliminarDelCarrito(item.plato_id)}>
                      X
                    </button>
                  </div>
                ))}

                <div className="total-row">
                  Total: ${totalPagar.toLocaleString()}
                </div>

                <button className="btn-pagar" onClick={procesarOrden}>
                  CONFIRMAR ORDEN
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default App;