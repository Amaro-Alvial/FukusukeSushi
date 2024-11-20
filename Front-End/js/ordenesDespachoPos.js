GetDespachos();
async function AbrirModalDespacho(idDespacho){
    $('#DespachoModal').modal('show');
    let despacho = await GetDespachoById(idDespacho);
    let boletas = await GetBoletasByIdDespacho(idDespacho);
    document.getElementById('tblBoleta').innerHTML = '';
    for (const item of boletas) {
        trtdBoleta(item);
    }
    let fechaDespacho = new Date(despacho.fecha).toISOString().split('T')[0];
    let despachador = await GetUsuarioById(despacho.despachador);
    let estado = despacho.estado ? '1' : '0';
    document.getElementById('FechaDespacho').textContent = `Fecha de Despacho: ${fechaDespacho}`;
    document.getElementById('Despachador').textContent = `Despachador: ${despachador.nombreUsuario}`;
    document.getElementById('cmbEstadoDespacho').value = estado;
}
async function AbrirModalBoleta(idBoleta){
    const boleta = await GetBoletaById(idBoleta);
    const [detalleCompras, cliente, horarioCaja] = await Promise.all([
        GetDetalleComprasByIdBoleta(boleta.id),
        GetUsuarioById(boleta.cliente),
        GetHorarioCajaById(boleta.horarioCaja),
    ]);
    let total = 0;
    let productos = [];
    let cantidades = [];
    let precios = [];
    let totales = [];
    let trProductos = [];
    const cajeroVirtual = await GetUsuarioById(horarioCaja.encargado);
    const caja = await GetCajaById(horarioCaja.caja);
    for (const item of detalleCompras) {
        let producto = await GetProductoById(item.producto);
        let precio = await GetUltimoPrecioHistoricoByIdProductoByFecha(item.producto, boleta.fecha);
        productos.push(producto.nombre);
        cantidades.push(item.cantidad);
        precios.push(precio.precio);
        totales.push(precio.precio * item.cantidad);
        total += precio.precio * item.cantidad;
    }
    let tipo = "";
    if(caja.tipo == "V"){
        tipo = "Virtual";
    }
    else{
        tipo = "Presencial";
    }
    let fecha = new Date(boleta.fecha).toISOString().split('T')[0];
    let hora = new Date(boleta.fecha).toISOString().split('T')[1].split('.')[0];
    document.getElementById('IdBoleta').textContent = `ID: ${boleta.id}`;
    document.getElementById('FechaBoleta').textContent = `Fecha: ${fecha}`;
    document.getElementById('HoraBoleta').textContent = `Hora: ${hora}`;
    document.getElementById('Cliente').textContent = `Cliente: ${cliente.nombreUsuario}`;
    document.getElementById('Cajero').textContent = `Cajero: ${cajeroVirtual.nombreUsuario}`;
    document.getElementById('Caja').textContent = `Tipo de caja: ${tipo}`;
    for (let i = 0; i < productos.length; i++) {
        trProductos.push(`
            <tr class="table table-striped table-bordered w-100">
                <td style="width: 50%;">${productos[i]}</td>
                <td style="width: 10%;"> $${precios[i]}</td>
                <td style="width: 20%;"> x ${cantidades[i]} uds.</td>
                <td style="width: 20%;"> = $${totales[i]}</td>
            </tr>
            <br>
        `);
    }
    document.getElementById('tblProductos').innerHTML = trProductos.join('');
    document.getElementById('Total').textContent = `Total: $${total.toFixed(2)}`;
    var DetalleModal = new bootstrap.Modal(document.getElementById('DetalleModal'));
    DetalleModal.show();
}
async function BuscarBoletaPorId(){
    let id = document.getElementById('IdBusqueda').value;
    if (id) {
        AbrirModalBoleta(id);
    }
    else{
        alert('Ingrese un ID de boleta');
    }
}
async function DescargarBoletaPDF(idBoleta) {
    const boleta = await GetBoletaById(idBoleta);
    const [detalleCompras, cliente, horarioCaja] = await Promise.all([
        GetDetalleComprasByIdBoleta(boleta.id),
        GetUsuarioById(boleta.cliente),
        GetHorarioCajaById(boleta.horarioCaja),
    ]);
    const cajeroVirtual = await GetUsuarioById(horarioCaja.encargado);
    const caja = await GetCajaById(horarioCaja.caja);
    const persona = await GetPersonaById(cliente.persona);
    const comuna = await GetComunaById(persona.comuna);
    const provincia = await GetProvinciaById(comuna.provincia);
    const region = await GetRegionById(provincia.region);

    let total = 0;
    const productos = [];
    const cantidades = [];
    const precios = [];
    const totales = [];

    for (const item of detalleCompras) {
        const producto = await GetProductoById(item.producto);
        const precio = await GetUltimoPrecioHistoricoByIdProductoByFecha(item.producto, boleta.fecha);

        productos.push(producto.nombre);
        cantidades.push(item.cantidad);
        precios.push(precio.precio);
        totales.push(precio.precio * item.cantidad);
        total += precio.precio * item.cantidad;
    }

    const tipo = caja.tipo === "V" ? "Virtual" : "Presencial";
    const fecha = new Date(boleta.fecha).toISOString().split('T')[0];
    const hora = new Date(boleta.fecha).toISOString().split('T')[1].split('.')[0];

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let y = 10;

    // Header
    doc.setFontSize(16);
    doc.text("Detalle de Boleta", 105, y, { align: "center" });
    y += 10;

    // Body - Información general
    doc.setFontSize(12);
    doc.text(`ID: ${boleta.id}`, 10, y);
    y += 10;
    doc.text(`Fecha: ${fecha}`, 10, y);
    y += 10;
    doc.text(`Hora: ${hora}`, 10, y);
    y += 10;
    doc.text(`Cliente: ${cliente.nombreUsuario}`, 10, y);
    y += 10;
    doc.text(`Cajero: ${cajeroVirtual.nombreUsuario}`, 10, y);
    y += 10;
    doc.text(`Tipo de caja: ${tipo}`, 10, y);
    y += 10;
    doc.text(`Región: ${region.nombre}`, 10, y);
    y += 10;
    doc.text(`Provincia: ${provincia.nombre}`, 10, y);
    y += 10;
    doc.text(`Comuna: ${comuna.nombre}`, 10, y);
    y += 10;
    doc.text(`Dirección: ${persona.direccion}`, 10, y);
    y += 10;

    // Tabla de productos
    const headers = ["Producto", "Precio Unitario", "Cantidad", "Total"];
    const data = productos.map((producto, index) => [
        producto,
        `$${precios[index].toFixed(2)}`,
        `${cantidades[index]} uds.`,
        `$${totales[index].toFixed(2)}`,
    ]);

    doc.autoTable({
        startY: y, // Posición de la tabla después del contenido del cuerpo
        head: [headers],
        body: data,
        theme: "striped",
        headStyles: { fillColor: [22, 160, 133] },
        bodyStyles: { textColor: [0, 0, 0] },
    });

    // Total - Debajo de la tabla
    doc.setFontSize(14);
    doc.text(`Total: $${total.toFixed(2)}`, 163, doc.lastAutoTable.finalY + 10);

    doc.save(`Boleta_${boleta.id}.pdf`);
}

document.getElementById('cmbEstado').addEventListener('change', async function() {
    let estado = document.getElementById('cmbEstado').value;
    if (estado == "DefaultEstado") {
        await GetDespachos();
    } else {
        estado = estado == '1' ? true : false;
        await GetDespachosByEstado(estado);
    }
});