GetBoletas();
async function AbrirModalBoleta(boleta, detalleCompras, cliente, horarioCaja, cajeroVirtual){
    let total = 0;
    let productos = [];
    let cantidades = [];
    let precios = [];
    let totales = [];
    let trProductos = [];
    let caja = await GetCajaById(horarioCaja.caja);
    for (const item of detalleCompras) {
        let producto = await GetProductoById(item.producto);
        let precio = await GetUltimoPrecioHistoricoByIdProductoByFecha(item.producto, boleta.fecha);
        productos.push(producto.nombre);
        cantidades.push(item.cantidad);
        precios.push(precio.precio);
        totales.push(precio.precio * item.cantidad);
        total += precio.precio * item.cantidad;
    }
    document.getElementById('IdBoleta').textContent = boleta.id;
    document.getElementById('FechaBoleta').textContent = boleta.fecha;
    document.getElementById('Cliente').textContent = cliente.nombreUsuario;
    document.getElementById('Cajero').textContent = cajeroVirtual.nombreUsuario;
    document.getElementById('Caja').textContent = caja.tipo;
    for (let i = 0; i < productos.length; i++) {
        trProductos.push(`
            <tr>
                <td>${productos[i]}</td>
                <td>${cantidades[i]}</td>
                <td>${precios[i]}</td>
                <td>${totales[i]}</td>
            </tr>
        `);
    }
    document.getElementById('tblProductos').innerHTML = trProductos.join('');
    document.getElementById('Total').textContent = total;

}