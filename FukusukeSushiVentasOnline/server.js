require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const {ApolloServer, gql} = require('apollo-server-express');

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const Persona = require('./models/persona');
const Usuario = require('./models/usuario');
const Producto = require('./models/producto');
const Boleta = require('./models/boleta');
const DetalleCompra = require('./models/detalleCompra');
const Cliente = require('./models/cliente');
const Dueno = require('./models/dueno');
const Categoria = require('./models/categoria');
const PrecioHistorico = require('./models/precioHistorico');
const DisponibleHistorico = require('./models/disponibleHistorico');
const Caja = require('./models/caja');
const Despacho = require('./models/despacho');
const HorarioCaja = require('./models/horarioCaja');
const Perfil = require('./models/perfil');
const UsuarioPerfil = require('./models/usuarioPerfil');
const Carrito = require('./models/carrito');

const typeDefs = gql`
type Persona{
    id: ID!
    run: String!
    nombreCompleto: String!
    direccion: String!
    comuna: String!
    provincia: String!
    region: String!
    fechaNacimiento: String!
    sexo: String!
    telefono: String!
}
input PersonaInput{
    run: String!
    nombreCompleto: String!
    direccion: String!
    comuna: String!
    provincia: String!
    region: String!
    fechaNacimiento: String!
    sexo: String!
    telefono: String!
}
type Usuario{
    id: ID!
    email: String!
    pass: String!
    nombreUsuario: String!
}
input UsuarioInput{
    email: String!
    pass: String!
    nombreUsuario: String!
}
type Cliente{
    id: ID!
    persona: String!
    usuario: String!
}
input ClienteInput{
    persona: String!
    usuario: String!
}
type Dueno{
    id: ID!
    persona: String!
    usuario: String!
}
input DuenoInput{
    persona: String!
    usuario: String!
}
type Producto{
    id: ID!
    nombre: String!
    descripcion: String!
    categoria: String!
}
input ProductoInput{
    nombre: String!
    descripcion: String!
    categoria: String!
}
type Boleta{
    id: ID!
    cliente: String!
    cajeroVirtual: String!
    despacho: String!
}
input BoletaInput{
    cliente: String!
    cajeroVirtual: String!
    despacho: String!
}
type DetalleCompra{
    id: ID!
    boleta: String!
    producto: String!
    total: Float!
    cantidad: Float!
}
input DetalleCompraInput{
    boleta: String!
    producto: String!
    total: Float!
    cantidad: Float!
}
type Categoria{
    id: ID!
    nombre: String!
    descripcion: String!
}
input CategoriaInput{
    nombre: String!
    descripcion: String!
}
type PrecioHistorico{
    id: ID!
    fecha: String!
    producto: String!
    precio: Float!
}
input PrecioHistoricoInput{
    fecha: String!
    producto: String!
    precio: Float!
}
type DisponibleHistorico{
    id: ID!
    fecha: String!
    producto: String!
    disponibilidad: Boolean!
}
input DisponibleHistoricoInput{
    fecha: String!
    producto: String!
    disponibilidad: Boolean!
}
type Caja{
    id: ID!
    tipo: String!
}
input CajaInput{
    tipo: String!
}
type Despacho{
    id: ID!
    despachador: Usuario!
    fecha: String!
}
input DespachoInput{
    despachador: Usuario!
    fecha: String!
}
type HorarioCaja{
    id: ID!
    horario: String!
    encargado: Usuario!
    caja: Caja!
}
input HorarioCajaInput{
    horario: String!
    encargado: Usuario!
    caja: Caja!
}
type Perfil{
    id: ID!
    tipo: String!
}
input PerfilInput{
    tipo: String!
}
type UsuarioPerfil{
    id: ID!
    caducidad: String!
    usuario: Usuario!
    perfil: Perfil!
}
input UsuarioPerfilInput{
    caducidad: String!
    usuario: Usuario!
    perfil: Perfil!
}
type Carrito{
    id: ID!
    boleta: Boleta!
    producto: Producto!
    total: Float!
    cantidad: Float!
},
input CarritoInput{
    boleta: Boleta!
    producto: Producto!
    total: Float!
    cantidad: Float!
}
type Alert{
    message: String!
}
type Query{
    getPersonas: [Persona]
    getPersonaById(id: ID!): Persona
    getPersonaByRun(run: String!): Persona
    getUsuarios: [Usuario]
    getUsuarioById(id: ID!): Usuario
    getClientes: [Cliente]
    getClienteById(id: ID!): Cliente
    getClienteByIdUsuario(id: ID!): Cliente
    getDuenos: [Dueno]
    getDuenoById(id: ID!): Dueno
    getProductos: [Producto]
    getProductoById(id: ID!): Producto
    getProductosByIdCategoria(id: ID!): [Producto]
    getBoletas: [Boleta]
    getBoletaById(id: ID!): Boleta
    getBoletasByIdCliente(id: ID!): [Boleta]
    getDetalleCompras: [DetalleCompra]
    getDetalleCompraById(id: ID!): DetalleCompra
    getDetalleComprasByIdBoleta(id: ID!): [DetalleCompra]
    getDetalleComprasByIdProducto(id: ID!): [DetalleCompra]
    getCategorias: [Categoria]
    getCategoriaById(id: ID!): Categoria
    getPrecioHistoricos: [PrecioHistorico]
    getPrecioHistoricoById(id: ID!): PrecioHistorico
    getPrecioHistoricosByIdProducto(id: ID!): [PrecioHistorico]
    getDisponibleHistoricos: [DisponibleHistorico]
    getDisponibleHistoricoById(id: ID!): DisponibleHistorico
    getDisponibleHistoricosByIdProducto(id: ID!): [DisponibleHistorico]
    getCajas: [Cajas]
    getCajaById(id: ID!): Caja
    getDespachos: [Despacho]
    getDespachoById(id: ID!): Despacho
    getDespachosByIdDespachador(id: ID!): [Despacho]
    getHorarioCajas: [HorarioCaja]
    getHorarioCajaById(id: ID!): HorarioCaja
    getHorarioCajasByIdCaja(id: ID!): [HorarioCaja]
    getHorarioCajasByIdUsuario(id: ID!): [HorarioCaja]
    getPerfils: [Perfil]
    getPerfilById(id: ID!): Perfil
    getUsuarioPerfils: [UsuarioPerfil]
    getUsuarioPerfilById(id: ID!): UsuarioPerfil
    getUsuarioPerfilsByIdPerfil(id: ID!): [UsuarioPerfil]
    getUsuarioPerfilsByIdUsuario(id: ID!): [UsuarioPerfil]
    getCarritos: [Carrito]
    getCarritoById(id: ID!): Carrito
    getCarritosByIdBoleta(id: ID!): [Carrito]
    getrCarritosByIdProducto(id: ID!): [Carrito]
}
type Mutation{
    addPersona(input:PersonaInput): Persona
    updPersona(id: ID!, input:PersonaInput): Persona
    delPersona(id: ID!): Alert
    addUsuario(input:UsuarioInput): Usuario
    updUsuario(id: ID!, input:UsuarioInput): Usuario
    delUsuario(id: ID!): Alert
    addCliente(input:ClienteInput): Cliente
    updCliente(id: ID!, input:ClienteInput): Cliente
    delCliente(id: ID!): Alert
    addDueno(input:DuenoInput): Dueno
    updDueno(id: ID!, input:DuenoInput): Dueno
    delDueno(id: ID!): Alert
    addProducto(input:ProductoInput): Producto
    updProducto(id: ID!, input:ProductoInput): Producto
    delProducto(id: ID!): Alert
    addBoleta(input:BoletaInput): Boleta
    updBoleta(id: ID!, input:BoletaInput): Boleta
    delBoleta(id: ID!): Alert
    addDetalleCompra(input:DetalleCompraInput): DetalleCompra
    updDetalleCompra(id: ID!, input:DetalleCompraInput): DetalleCompra
    delDetalleCompra(id: ID!): Alert
    addCategoria(input:CategoriaInput): Categoria
    updCategoria(id: ID!, input:CategoriaInput): Categoria
    delCategoria(id: ID!): Alert
    addPrecioHistorico(input:PrecioHistoricoInput): PrecioHistorico
    updPrecioHistorico(id: ID!, input:PrecioHistoricoInput): PrecioHistorico
    delPrecioHistorico(id: ID!): Alert
    addDisponibleHistorico(input:DisponibleHistoricoInput): DisponibleHistorico
    updDisponibleHistorico(id: ID!, input:DisponibleHistoricoInput): DisponibleHistorico
    delDisponibleHistorico(id: ID!): Alert
    addCaja(input:CajaInput): Caja
    updCaja(id: ID!, input:CajaInput): Caja
    delCaja(id: ID!): Alert
    addDespacho(input:DespachoInput): Despacho
    updDespacho(id: ID!, input:DespachoInput): Despacho
    delDespacho(id: ID!): Alert
    addHorarioCaja(input:HorarioCajaInput): HorarioCaja
    updHorarioCaja(id: ID!, input:HorarioCajaInput): HorarioCaja
    delHorarioCaja(id: ID!): Alert
    addPerfil(input:PerfilInput): Perfil
    updPerfil(id: ID!, input:PerfilInput): Perfil
    delPerfil(id: ID!): Alert
    addUsuarioPerfil(input:UsuarioPerfilInput): UsuarioPerfil
    updUsuarioPerfil(id: ID!, input:UsuarioPerfilInput): UsuarioPerfil
    delUsuarioPerfil(id: ID!): Alert
    addCarrito(input:CarritoInput): Carrito
    updCarrito(id: ID!, input:CarritoInput): Carrito
    delCarrito(id: ID!): Alert
}
`;

const resolvers = {
    Query:{
        async getPersonas(obj){
            let personas = await Persona.find();
            return personas;
        },
        async getPersonaById(obj, {id}){
            let persona = await Persona.findById(id);
            return persona;
        },
        async getPersonaByRun(obj, {run}){
            let persona = await Persona.findOne({run: run});
            return persona;
        },
        async getUsuarios(obj){
            let usuarios = await Usuario.find();
            return usuarios;
        },
        async getUsuarioById(obj, {id}){
            let usuario = await Usuario.findById(id);
            return usuario;
        },
        async getClientes(obj){
            let clientes = await Cliente.find();
            return clientes;
        },
        async getClienteById(obj, {id}){
            let cliente = await Cliente.findById(id);
            return cliente;
        },
        async getClienteByIdUsuario(obj, {id}){
            let cliente = await Cliente.find({usuario: id});
            return cliente;
        },
        async getDuenos(obj){
            let duenos = await Dueno.find();
            return duenos;
        },
        async getDuenoById(obj, {id}){
            let dueno = await Dueno.findById(id);
            return dueno;
        },
        async getProductos(obj){
            let productos = await Producto.find();
            return productos;
        },
        async getProductoById(obj, {id}){
            let producto = await Producto.findById(id);
            return producto;
        },
        async getProductosByIdCategoria(obj, {id}){
            let productos = await Producto.find({categoria: id});
            return productos;
        },
        async getBoletas(obj){
            let boletas = await Boleta.find();
            return boletas;
        },
        async getBoletaById(obj, {id}){
            let boleta = await Boleta.findById(id);
            return boleta;
        },
        async getBoletasByIdCliente(obj, {id}){
            let boletas = await Boleta.find({cliente: id});
            return boletas;
        },
        async getDetalleCompras(obj){
            let detalleCompras = await DetalleCompra.find();
            return detalleCompras;
        },
        async getDetalleCompraById(obj, {id}){
            let detalleCompra = await DetalleCompra.findById(id);
            return detalleCompra;
        },
        async getDetalleComprasByIdBoleta(obj, {id}){
            let detalleCompras = await DetalleCompra.find({boleta: id});
            return detalleCompras;
        },
        async getDetalleComprasByIdProducto(obj, {id}){
            let detalleCompras = await DetalleCompra.find({producto: id});
            return detalleCompras;
        },
        async getCategorias(obj){
            let categorias = await Categoria.find();
            return categorias;
        },
        async getCategoriaById(obj, {id}){
            let categoria = await Categoria.findById(id);
            return categoria;
        },
        async getPrecioHistoricos(obj){
            let precioHistoricos = await PrecioHistorico.find();
            return precioHistoricos;
        },
        async getPrecioHistoricoById(obj, {id}){
            let precioHistorico = await PrecioHistorico.findById(id);
            return precioHistorico;
        },
        async getPrecioHistoricosByIdProducto(obj, {id}){
            let precioHistoricos = await PrecioHistorico.find({producto: id});
            return precioHistoricos;
        },
        async getDisponibleHistoricos(obj){
            let disponibleHistoricos = await DisponibleHistorico.find();
            return disponibleHistoricos;
        },
        async getDisponibleHistoricoById(obj, {id}){
            let disponibleHistorico = await DisponibleHistorico.findById(id);
            return disponibleHistorico
        },
        async getDisponibleHistoricosByIdProducto(obj, {id}){
            let disponibleHistoricos = await DisponibleHistorico.find({producto: id});
            return disponibleHistoricos;
        },
        async getCajas(obj){
            let cajas = await Caja.find();
            return cajas;
        },
        async getCajaById(obj, {id}){
            let caja = await Caja.findById(id);
            return caja;
        },
        async getDespachos(obj){
            let despachos = await Despacho.find();
            return despachos;
        },
        async getDespachoById(obj, {id}){
            let despacho = await Despacho.findById(id);
            return despacho;
        },
        async getDespachosByIdDespachador(obj, {id}){
            let despachos = await Despacho.find({despachador: id});
            return despachos;
        }
    },
    Mutation:{
        async addPersona(obj, {input}){
            let persona = new Persona(input);
            await persona.save();
            return persona;
        },
        async updPersona(obj, {id, input}){
            let persona = await Persona.findByIdAndUpdate(id, input, { new: true });
            return persona;
        },
        async delPersona(obj, {id}){
            await Persona.deleteOne({_id: id});
            return {
                message: "Persona eliminada"
            };
        },
        async addUsuario(obj, {input}){
            let usuario = new Usuario(input);
            await usuario.save();
            return usuario;
        },
        async updUsuario(obj, {id, input}){
            let usuario = await Usuario.findByIdAndUpdate(id, input, { new: true });
            return usuario;
        },
        async delUsuario(obj, {id}){
            await Usuario.deleteOne({_id: id});
            return {
                message: "Usuario eliminado"
            };
        },
        async addCliente(obj, {input}){
            let usuarioBus = await Usuario.findById(input.usuario);
            let personaBus = await Persona.findById(input.persona);
            let cliente = new Cliente({usuario: usuarioBus._id, persona: personaBus._id});
            await cliente.save();
            return cliente;
        },
        async updCliente(obj, {id, input}){
            let usuarioBus = await Usuario.findById(input.usuario);
            let personaBus = await Persona.findById(input.persona);
            let cliente = await Cliente.findByIdAndUpdate(id, {usuario: usuarioBus._id, persona: personaBus._id}, { new: true });
            return cliente;
        },
        async delCliente(obj, {id}){
            await Cliente.deleteOne({_id: id});
            return {
                message: "Cliente eliminado"
            };
        },
        async addDueno(obj, {input}){
            let usuarioBus = await Usuario.findById(input.usuario);
            let personaBus = await Persona.findById(input.persona);
            let dueno = await Dueno.findByIdAndUpdate(id, {usuario: usuarioBus._id, persona: personaBus._id});
            await dueno.save();
            return dueno;
        },
        async updDueno(obj, {id, input}){
            let usuarioBus = await Usuario.findById(input.usuario);
            let personaBus = await Persona.findById(input.persona);
            let dueno = await Dueno.findByIdAndUpdate(id, {usuario: usuarioBus._id, persona: personaBus._id}, { new: true });
            return dueno;
        },
        async delDueno(obj, {id}){
            await Dueno.deleteOne({_id: id});
            return {
                message: "Dueño eliminado"
            };
        },
        async addProducto(obj, {input}){
            let categoriaBus = await Categoria.findById(input.categoria);
            let producto = new Producto({nombre: input.nombre, descripcion: input.descripcion, categoria: categoriaBus._id});
            await producto.save();
            return producto;
        },
        async updProducto(obj, {id, input}){
            let categoriaBus = await Categoria.findById(input.categoria);
            let producto = await Producto.findByIdAndUpdate(id, {nombre: input.nombre, descripcion: input.descripcion, categoria: categoriaBus._id}, { new: true });
            return producto;
        },
        async delProducto(obj, {id}){
            await Producto.deleteOne({_id: id});
            return {
                message: "Producto eliminado"
            };
        },
        async addBoleta(obj, {input}){
            let clienteBus = await Cliente.findById(input.cliente);
            let boleta = new Boleta({cliente: clienteBus._id, cajeroVirtual: input.cajeroVirtual, despacho: input.despacho});
            await boleta.save();
            return boleta;
        },
        async updBoleta(obj, {id, input}){
            let clienteBus = await Cliente.findById(input.cliente);
            let boleta = await Boleta.findByIdAndUpdate(id, {cliente: clienteBus._id, cajeroVirtual: input.cajeroVirtual, despacho: input.despacho}, { new: true });
            return boleta;
        },
        async delBoleta(obj, {id}){
            await Boleta.deleteOne({_id: id});
            return {
                message: "Boleta eliminada"
            };
        },
        async addDetalleCompra(obj, {input}){
            let productoBus = await Producto.findById(input.producto);
            let boletaBus = await Boleta.findById(input.boleta);
            let detalleCompra = new DetalleCompra({producto: productoBus._id, boleta: boletaBus._id, cantidad: input.cantidad, total: input.total});
            await detalleCompra.save();
            return detalleCompra;
        },
        async updDetalleCompra(obj, {id, input}){
            let productoBus = await Producto.findById(input.producto);
            let boletaBus = await Boleta.findById(input.boleta);
            let detalleCompra = await DetalleCompra.findByIdAndUpdate(id, {producto: productoBus._id, boleta: boletaBus._id, cantidad: input.cantidad, total: input.total}, { new: true });
            return detalleCompra;
        },
        async delDetalleCompra(obj, {id}){
            await DetalleCompra.deleteOne({_id: id});
            return {
                message: "Detalle de compra eliminado"
            };
        },
        async addCategoria(obj, {input}){
            let categoria = new Categoria(input);
            await categoria.save();
            return categoria;
        },
        async updCategoria(obj, {id, input}){
            let categoria = await Categoria.findByIdAndUpdate(id, input, { new: true });
            return categoria;
        },
        async delCategoria(obj, {id}){
            await Categoria.deleteOne({_id: id});
            return {
                message: "Categoria eliminada"
            };
        },
        async addPrecioHistorico(obj, {input}){
            let productobus = await Producto.findById(input.producto);
            let precioHistorico = new PrecioHistorico({fecha: input.fecha, producto: productobus._id, precio: input.precio});
            await precioHistorico.save();
            return precioHistorico;
        },
        async updPrecioHistorico(obj, {id, input}){
            let productobus = await Producto.findById(input.producto);
            let precioHistorico = await PrecioHistorico.findByIdAndUpdate(id, {fecha: input.fecha, producto: productobus._id, precio: input.precio}, { new: true });
            return precioHistorico;
        },
        async delPrecioHistorico(obj, {id}){
            await PrecioHistorico.deleteOne({_id: id});
            return {
                message: "Precio Historico eliminado"
            };
        },
        async addDisponibleHistorico(obj, {input}){
            let productobus = await Producto.findById(input.producto);
            let disponibleHistorico = new DisponibleHistorico({fecha: input.fecha, producto: productobus._id, disponibilidad: input.disponibilidad});
            await disponibleHistorico.save();
            return disponibleHistorico;
        },
        async updDisponibleHistorico(obj, {id, input}){
            let productobus = await Producto.findById(input.producto);
            let disponibleHistorico = await DisponibleHistorico.findByIdAndUpdate(id, {fecha: input.fecha, producto: productobus._id, disponibilidad: input.disponibilidad}, { new: true });
            return disponibleHistorico;
        },
        async delDisponibleHistorico(obj, {id}){
            await DisponibleHistorico.deleteOne({_id: id});
            return {
                message: "Disponible Historico eliminado"
            };
        },
        async addCaja(obj, {input}){
            let caja = new Caja(input);
            await caja.save();
            return caja;
        },
        async updCaja(obj, {id, input}){
            let caja = await Caja.findByIdAndUpdate(id, input, { new: true });
            return caja;
        },
        async delCaja(obj, {id}){
            await Caja.deleteOne({_id: id});
            return {
                message: "Caja eliminada"
            };
        },
        async addDespacho(obj, {input}){
            let despacho = new Despacho(input);
            await despacho.save();
            return despacho;
        },
        async updDespacho(obj, {id, input}){
            let despacho = await Despacho.findByIdAndUpdate(id, input, { new: true });
            return despacho;
        },
        async delDespacho(obj, {id}){
            await Despacho.deleteOne({_id: id});
            return {
                message: "Despacho eliminado"
            };
        },
        async addHorarioCaja(obj, {input}){
            let cajaBus = await Caja.findById(input.caja);
            let encargadoBus = await Usuario.findById(input.encargado);
            let horarioCaja = new HorarioCaja({horario: input.horario, encargado: encargadoBus._id, caja: cajaBus._id});
            await horarioCaja.save();
            return horarioCaja;
        },
        async updHorarioCaja(obj, {id, input}){
            let cajaBus = await Caja.findById(input.caja);
            let encargadoBus = await Usuario.findById(input.encargado);
            let horarioCaja = await HorarioCaja.findByIdAndUpdate(id, {horario: input.horario, encargado: encargadoBus._id, caja: cajaBus._id}, { new: true });
            return horarioCaja;
        },
        async delHorarioCaja(obj, {id}){
            await HorarioCaja.deleteOne({_id: id});
            return {
                message: "Horario de caja eliminado"
            };
        },
        async addPerfil(obj, {input}){
            let perfil = new Perfil(input);
            await perfil.save();
            return perfil;
        },
        async updPerfil(obj, {id, input}){
            let perfil = await Perfil.findByIdAndUpdate(id, input, { new: true });
            return perfil;
        },
        async delPerfil(obj, {id}){
            await Perfil.deleteOne({_id: id});
            return {
                message: "Perfil eliminado"
            };
        },
        async addUsuarioPerfil(obj, {input}){
            let usuarioBus = await Usuario.findById(input.usuario);
            let perfilBus = await Perfil.findById(input.perfil);
            let usuarioPerfil = new UsuarioPerfil({caducidad: input.caducidad, usuario: usuarioBus._id, perfil: perfilBus._id});
            await usuarioPerfil.save();
            return usuarioPerfil;
        },
        async updUsuarioPerfil(obj, {id, input}){
            let usuarioBus = await Usuario.findById(input.usuario);
            let perfilBus = await Perfil.findById(input.perfil);
            let usuarioPerfil = await UsuarioPerfil.findByIdAndUpdate(id, {caducidad: input.caducidad, usuario: usuarioBus._id, perfil: perfilBus._id}, { new: true });
            return usuarioPerfil;
        },
        async delUsuarioPerfil(obj, {id}){
            await UsuarioPerfil.deleteOne({_id: id});
            return {
                message: "UsuarioPerfil eliminado"
            };
        },
        async addCarrito(obj, {input}){
            let boletaBus = await Boleta.findById(input.boleta);
            let productoBus = await Producto.findById(input.producto);
            let carrito = new Carrito({boleta: boletaBus._id, producto: productoBus._id, total: input.total, cantidad: input.cantidad});
            await carrito.save();
            return carrito;
        },
        async updCarrito(obj, {id, input}){
            let boletaBus = await Boleta.findById(input.boleta);
            let productoBus = await Producto.findById(input.producto);
            let carrito = await Carrito.findByIdAndUpdate(id, {boleta: boletaBus._id, producto: productoBus._id, total: input.total, cantidad: input.cantidad}, { new: true });
            return carrito;
        },
        async delCarrito(obj, {id}){
            await Carrito.deleteOne({_id: id});
            return {
                message: "Carrito eliminado"
            };
        }
    }
}

let apolloServer = null;
const app = express();

const corsOptions = {
    origin: 'http://localhost:8091',
    credentials: false
}

async function startServer(){
    apolloServer = new ApolloServer({typeDefs, resolvers, corsOptions});
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });
}

startServer();
app.use(cors());
app.listen(8091, function(){
    console.log("Servidor iniciado");
});