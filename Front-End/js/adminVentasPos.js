GetBoletas();
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
document.getElementById('cmbFecha').addEventListener('change', async function() {
    let mes = document.getElementById('cmbFecha').value;
    if (mes == "DefaultFecha") {
        await GetBoletas();
    } else if (mes) {
        await GetBoletasByMes(mes);
    }
});

document.getElementById('FechaBusqueda').addEventListener('change', async function() {
    let fecha = document.getElementById('FechaBusqueda').value;
    if (fecha) {
        boleta = await GetBoletasByFecha(fecha);
    }
    else{
        await GetBoletas();
    }
});

async function BuscarBoletaPorId(){
    let id = document.getElementById('IdBusqueda').value;
    if (id) {
        AbrirModalBoleta(id);
    }
    else{
        await GetBoletas();
    }
}

async function AnularCompra(){
    idBoleta = document.getElementById('IdBoleta').textContent.split(' ')[1];
    detalleCompras = await GetDetalleComprasByIdBoleta(idBoleta);
    for (const item of detalleCompras) {
        await DelDetalleCompra(item.id);
    }
    await DelBoleta(idBoleta);
}

async function ContarBoletasMes(mes){
    let boletas = await GetBoletasByMes2(mes);
    return boletas.length;
}
async function GananciasPorMes(mes){
    let boletas = await GetBoletasByMes2(mes);
    let total = 0;
    for (const item of boletas) {
        let detalleCompras = await GetDetalleComprasByIdBoleta(item.id);
        for (const item2 of detalleCompras) {
            let precio = await GetUltimoPrecioHistoricoByIdProductoByFecha(item2.producto, item.fecha);
            total += precio.precio * item2.cantidad;
        }
    }
    return total;
}
async function obtenerDatosLineChart() {
    const dataPorMes = await Promise.all([
        GananciasPorMes("0"), GananciasPorMes("1"), GananciasPorMes("2"),
        GananciasPorMes("3"), GananciasPorMes("4"), GananciasPorMes("5"),
        GananciasPorMes("6"), GananciasPorMes("7"), GananciasPorMes("8"),
        GananciasPorMes("9"), GananciasPorMes("10"), GananciasPorMes("11")
    ]);

    return {
        type: 'line',
        data: {
            labels: [
                'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ],
            datasets: [{
                label: 'Ganancias por mes',
                data: dataPorMes,
                backgroundColor: 'rgba(99, 99, 255, 0.2)',
                borderColor: 'rgba(99, 99, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    ticks: {
                        beginAtZero: true
                    }
                }
            }
        }
    };
}
async function obtenerDatosBarChart() {
    const dataPorMes = await Promise.all([
        ContarBoletasMes("0"), ContarBoletasMes("1"), ContarBoletasMes("2"),
        ContarBoletasMes("3"), ContarBoletasMes("4"), ContarBoletasMes("5"),
        ContarBoletasMes("6"), ContarBoletasMes("7"), ContarBoletasMes("8"),
        ContarBoletasMes("9"), ContarBoletasMes("10"), ContarBoletasMes("11")
    ]);

    return {
        type: 'bar',
        data: {
            labels: [
                'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ],
            datasets: [{
                label: 'Boletas Vendidas por mes',
                data: dataPorMes, // Aquí están los valores resueltos
                backgroundColor: 'rgba(99, 99, 255, 0.2)',
                borderColor: 'rgba(99, 99, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    ticks: {
                        beginAtZero: true
                    }
                }
            }
        }
    };
}
contentTableReclamos = [];
async function offCanvasReclamos(){
    let reclamos = await GetReclamos();
    if (reclamos.length == 0) {
        alert("No hay reclamos pendientes");
        return;
    }
    contentTableReclamos = [];
    for (const item of reclamos) {
        let cliente = await GetUsuarioById(item.cliente);
        contentTableReclamos.push(`
            <tr>
                <td>${cliente.nombreUsuario}</td>
                <td style="padding-left: 30px"><button class="btn btn-warning" onclick="Revisar( '${item.id}' )">Revisar</button></td>
            </tr>
        `);
    }
    document.getElementById('tblReclamos').innerHTML = contentTableReclamos.join('');
    var offcanvas = new bootstrap.Offcanvas(document.getElementById('reclamoOffCanvas'));
    offcanvas.show();
}
async function Revisar(idReclamo){
    const reclamo = await GetReclamoById(idReclamo);
    const cliente = await GetUsuarioById(reclamo.cliente);
    document.getElementById('IdReclamo').textContent = `ID: ${reclamo.id}`;
    document.getElementById('ClienteReclamo').textContent = `Cliente: ${cliente.nombreUsuario}`;
    document.getElementById('TituloReclamo').textContent = `Titulo: ${reclamo.titulo}`;
    document.getElementById('DescripcionReclamo').textContent = `Descripcion: ${reclamo.descripcion}`;
    var ReclamoModal = new bootstrap.Modal(document.getElementById('ReclamoModal'));
    ReclamoModal.show();
}
function EliminarReclamo(){
    idReclamo = document.getElementById('IdReclamo').textContent.split(' ')[1];
    DelReclamo(idReclamo);
    var ReclamoModal = bootstrap.Modal.getInstance(document.getElementById('ReclamoModal'));
    ReclamoModal.hide();
}
async function GraficoGanancias() {
    const ctx = document.getElementById('GananciasPorMes').getContext('2d');
    const chartConfig = await obtenerDatosLineChart();
    new Chart(ctx, chartConfig);

}
async function inicializarGrafico() {
    const ctx = document.getElementById('BoletasPorMes').getContext('2d');
    const chartConfig = await obtenerDatosBarChart();
    new Chart(ctx, chartConfig);
}
window.onload = inicializarGrafico();