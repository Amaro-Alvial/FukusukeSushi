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
const Categoria = require('./models/categoria');
const PrecioHistorico = require('./models/precioHistorico');
const DisponibleHistorico = require('./models/disponibleHistorico');
const Caja = require('./models/caja');
const Despacho = require('./models/despacho');
const HorarioCaja = require('./models/horarioCaja');
const Perfil = require('./models/perfil');
const UsuarioPerfil = require('./models/usuarioPerfil');
const Carrito = require('./models/carrito');
const Region = require('./models/region');
const Provincia = require('./models/provincia');
const Comuna = require('./models/comuna');

const typeDefs = gql`
type Persona{
    id: ID!
    run: String!
    nombreCompleto: String!
    direccion: String!
    comuna: String!
    fechaNacimiento: String!
    sexo: String!
    telefono: String!
}
input PersonaInput{
    run: String!
    nombreCompleto: String!
    direccion: String!
    comuna: String!
    fechaNacimiento: String!
    sexo: String!
    telefono: String!
}
type Usuario{
    id: ID!
    email: String!
    pass: String!
    nombreUsuario: String!
    persona: String!
}
input UsuarioInput{
    email: String!
    pass: String!
    nombreUsuario: String!
    persona: String!
}
type Producto{
    id: ID!
    nombre: String!
    descripcion: String!
    foto: String!
    categoria: String!
}
input ProductoInput{
    nombre: String!
    descripcion: String!
    foto: String!
    categoria: String!
}
type Boleta{
    id: ID!
    fecha: String!
    cliente: String!
    horarioCaja: String!
    despacho: String!
}
input BoletaInput{
    fecha: String!
    cliente: String!
    horarioCaja: String!
    despacho: String!
}
type DetalleCompra{
    id: ID!
    boleta: String!
    producto: String!
    cantidad: Float!
}
input DetalleCompraInput{
    boleta: String!
    producto: String!
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
    despachador: String!
    fecha: String!
}
input DespachoInput{
    despachador: String!
    fecha: String!
}
type HorarioCaja{
    id: ID!
    horario: String!
    encargado: String!
    caja: String!
}
input HorarioCajaInput{
    horario: String!
    encargado: String!
    caja: String!
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
    caducidad: String
    usuario: String!
    perfil: String!
}
input UsuarioPerfilInput{
    caducidad: String
    usuario: String!
    perfil: String!
}
type Carrito{
    id: ID!
    fecha: String!
    cliente: String!
}
input CarritoInput{
    fecha: String!
    cliente: String!
}
type DetalleCarrito{
    id: ID!
    boleta: String!
    producto: String!
    cantidad: Float!
}
input DetalleCarritoInput{
    boleta: String!
    producto: String!
    cantidad: Float!
}
type Region{
    id: ID!
    nombre: String!
}
input RegionInput{
    nombre: String!
}
type Provincia{
    id: ID!
    nombre: String!
    region: String!
}
input ProvinciaInput{
    nombre: String!
    region: String!
}
type Comuna{
    id: ID!
    nombre: String!
    provincia: String!
}
input ComunaInput{
    nombre: String!
    provincia: String!
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
    getUsuariosByIdPersona(id: String): [Usuario]
    getProductos: [Producto]
    getProductoById(id: ID!): Producto
    getProductosByIdCategoria(id: String): [Producto]
    getBoletas: [Boleta]
    getBoletaById(id: ID!): Boleta
    getBoletasByIdCliente(id: String): [Boleta]
    getBoletasByIdHorarioCaja(id: String): [Boleta]
    getBoletasByIdDespacho(id: String): [Boleta]
    getDetalleCompras: [DetalleCompra]
    getDetalleCompraById(id: ID!): DetalleCompra
    getDetalleComprasByIdBoleta(id: String): [DetalleCompra]
    getDetalleComprasByIdProducto(id: String): [DetalleCompra]
    getCategorias: [Categoria]
    getCategoriaById(id: ID!): Categoria
    getPrecioHistoricos: [PrecioHistorico]
    getPrecioHistoricoById(id: ID!): PrecioHistorico
    getPrecioHistoricosByIdProducto(id: String): [PrecioHistorico]
    getUltimoPrecioHistoricoByIdProducto(id: String): PrecioHistorico
    getDisponibleHistoricos: [DisponibleHistorico]
    getDisponibleHistoricoById(id: ID!): DisponibleHistorico
    getDisponibleHistoricosByIdProducto(id: String): [DisponibleHistorico]
    getCajas: [Caja]
    getCajaById(id: ID!): Caja
    getDespachos: [Despacho]
    getDespachoById(id: ID!): Despacho
    getDespachosByIdDespachador(id: String): [Despacho]
    getHorarioCajas: [HorarioCaja]
    getHorarioCajaById(id: ID!): HorarioCaja
    getHorarioCajasByIdCaja(id: String): [HorarioCaja]
    getHorarioCajasByIdUsuario(id: String): [HorarioCaja]
    getPerfils: [Perfil]
    getPerfilById(id: ID!): Perfil
    getUsuarioPerfils: [UsuarioPerfil]
    getUsuarioPerfilById(id: ID!): UsuarioPerfil
    getUsuarioPerfilsByIdPerfil(id: String): [UsuarioPerfil]
    getUsuarioPerfilsByIdUsuario(id: String): [UsuarioPerfil]
    getCarritos: [Carrito]
    getCarritoById(id: ID!): Carrito
    getCarritosByIdCliente(id: String): [Carrito]
    getCarritosByIdHorarioCaja(id: String): [Carrito]
    getCarritosByIdDespacho(id: String): [Carrito]
    getRegions: [Region]
    getRegionById(id: ID!): Region
    getProvincias: [Provincia]
    getProvinciaById(id: ID!): Provincia
    getProvinciasByIdRegion(id: String): [Provincia]
    getComunas: [Comuna]
    getComunaById(id: ID!): Comuna
    getComunasByIdProvincia(id: String): [Comuna]
}
type Mutation{
    addPersona(input:PersonaInput): Persona
    updPersona(id: ID!, input:PersonaInput): Persona
    delPersona(id: ID!): Alert
    addUsuario(input:UsuarioInput): Usuario
    updUsuario(id: ID!, input:UsuarioInput): Usuario
    delUsuario(id: ID!): Alert
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
    addRegion(input:RegionInput): Region
    updRegion(id: ID!, input:RegionInput): Region
    delRegion(id: ID!): Alert
    addProvincia(input:ProvinciaInput): Provincia
    updProvincia(id: ID!, input:ProvinciaInput): Provincia
    delProvincia(id: ID!): Alert
    addComuna(input:ComunaInput): Comuna
    updComuna(id: ID!, input:ComunaInput): Comuna
    delComuna(id: ID!): Alert
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
        async getUsuariosByIdPersona(obj, {id}){
            let usuarios = await Usuario.find({persona: id})
            return usuarios;
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
        async getBoletasByIdHorarioCaja(obj, {id}){
            let boletas = await Boleta.find({horarioCaja: id});
            return boletas;
        },
        async getBoletasByIdDespacho(obj, {id}){
            let boletas = await Boleta.find({despacho: id});
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
        async getUltimoPrecioHistoricoByIdProducto(obj, {id}){
            let precioHistoricos = await PrecioHistorico.find({producto: id}).sort({fecha})
            return precioHistoricos[0];
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
        },
        async getHorarioCajas(obj){
            let horarioCajas = await HorarioCaja.find();
            return horarioCajas;
        },
        async getHorarioCajaById(obj, {id}){
            let horarioCaja = await HorarioCaja.findById(id);
            return horarioCaja;
        },
        async getHorarioCajasByIdCaja(obj, {id}){
            let horarioCajas = await HorarioCaja.find({caja: id});
            return horarioCajas;
        },
        async getHorarioCajasByIdUsuario(obj, {id}){
            let horarioCajas = await HorarioCaja.find({usuario: id});
            return horarioCajas;
        },
        async getPerfils(obj){
            let perfiles = await Perfil.find();
            return perfiles;
        },
        async getPerfilById(obj, {id}){
            let perfil = await Perfil.findById(id);
            return perfil;
        },
        async getUsuarioPerfils(obj){
            let usuarioPerfils = await UsuarioPerfil.find();
            return usuarioPerfils;
        },
        async getUsuarioPerfilById(obj, {id}){
            let usuarioPerfil = await UsuarioPerfil.findById(id);
            return usuarioPerfil;
        },
        async getUsuarioPerfilsByIdUsuario(obj, {id}){
            let usuarioPerfil = await UsuarioPerfil.find({usuario: id});
            return usuarioPerfil;
        },
        async getUsuarioPerfilsByIdPerfil(obj, {id}){
            let usuarioPerfil = await UsuarioPerfil.find({perfil: id});
            return usuarioPerfil;
        },
        async getCarritos(obj){
            let carritos = await Carrito.find();
            return carritos;
        },
        async getCarritoById(obj, {id}){
            let carrito = await Carrito.findById(id);
            return carrito;
        },
        async getCarritosByIdCliente(obj, {id}){
            let carritos = await Carrito.find({cliente: id});
            return carritos;
        },
        async getCarritosByIdHorarioCaja(obj, {id}){
            let carritos = await Carrito.find({horarioCaja: id});
            return carritos;
        },
        async getCarritosByIdDespacho(obj, {id}){
            let carritos = await Carrito.find({despacho: id});
            return carritos;
        },
        async getRegions(obj){
            let regiones = await Region.find();
            return regiones;
        },
        async getRegionById(obj, {id}){
            let region = await Region.findById(id);
            return region;
        },
        async getProvincias(obj){
            let provincias = await Provincia.find();
            return provincias;
        },
        async getProvinciaById(obj, {id}){
            let provincia = await Provincia.findById(id);
            return provincia;
        },
        async getProvinciasByIdRegion(obj, {id}){
            let provincia = await Provincia.find({region: id});
            return provincia;
        },
        async getComunas(obj){
            let comunas = await Comuna.find();
            return comunas;
        },
        async getComunaById(obj, {id}){
            let comuna = await Comuna.findById(id);
            return comuna;
        },
        async getComunasByIdProvincia(obj, {id}){
            let comuna = await Comuna.find({provincia: id});
            return comuna;
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
            let personaBus = await Persona.findById(input.persona);
            let usuario = new Usuario({email: input.email, pass: input.pass, nombreUsuario: input.nombreUsuario, persona: personaBus._id});
            await usuario.save();
            return usuario;
        },
        async updUsuario(obj, {id, input}){
            let personaBus = await Persona.findById(input.persona);
            let usuario = await Usuario.findByIdAndUpdate(id, {email: input.email, pass: input.pass, nombreUsuario: input.nombreUsuario, persona: personaBus._id}, { new: true });
            return usuario;
        },
        async delUsuario(obj, {id}){
            await Usuario.deleteOne({_id: id});
            return {
                message: "Usuario eliminado"
            };
        },
        async addProducto(obj, {input}){
            let categoriaBus = await Categoria.findById(input.categoria);
            let producto = new Producto({nombre: input.nombre, descripcion: input.descripcion, foto: input.foto, categoria: categoriaBus._id});
            await producto.save();
            return producto;
        },
        async updProducto(obj, {id, input}){
            let categoriaBus = await Categoria.findById(input.categoria);
            let producto = await Producto.findByIdAndUpdate(id, {nombre: input.nombre, descripcion: input.descripcion, foto: input.foto, categoria: categoriaBus._id}, { new: true });
            return producto;
        },
        async delProducto(obj, {id}){
            await Producto.deleteOne({_id: id});
            return {
                message: "Producto eliminado"
            };
        },
        async addBoleta(obj, {input}){
            let clienteBus = await Usuario.findById(input.cliente);
            let horarioCajaBus = await HorarioCaja.findById(input.horarioCaja);
            let despachoBus = await Despacho.findById(input.despacho);
            let boleta = new Boleta({fecha: input.fecha, cliente: clienteBus._id, horarioCaja: horarioCajaBus._id, despacho: despachoBus._id});
            await boleta.save();
            return boleta;
        },
        async updBoleta(obj, {id, input}){
            let clienteBus = await Usuario.findById(input.cliente);
            let horarioCajaBus = await HorarioCaja.findById(input.horarioCaja);
            let despachoBus = await Despacho.findById(input.despacho);
            let boleta = await Boleta.findByIdAndUpdate(id, {fecha: input.fecha, cliente: clienteBus._id, horarioCaja: horarioCajaBus._id, despacho: despachoBus._id}, { new: true });
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
            let despachadorBus = await Usuario.findById(input.despachador);
            let despacho = new Despacho({despachador: despachadorBus._id, fecha: input.fecha});
            await despacho.save();
            return despacho;
        },
        async updDespacho(obj, {id, input}){
            let despachadorBus = await Usuario.findById(input.despachador);
            let despacho = await Despacho.findByIdAndUpdate(id, {despachador: despachadorBus._id, fecha: input.fecha}, { new: true });
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
            let clienteBus = await Usuario.findById(input.cliente);
            let horarioCajaBus = await HorarioCaja.findById(input.horarioCaja);
            let despachoBus = await Despacho.findById(input.despacho);
            let carrito = new Carrito({fecha: input.fecha, cliente: clienteBus._id, horarioCaja: horarioCajaBus._id, despacho: despachoBus._id});
            await carrito.save();
            return carrito;
        },
        async updCarrito(obj, {id, input}){
            let boletaBus = await Boleta.findById(input.boleta);
            let productoBus = await Producto.findById(input.producto);
            let carrito = await Carrito.findByIdAndUpdate(id, {fecha: input.fecha, cliente: clienteBus._id, horarioCaja: horarioCajaBus._id, despacho: despachoBus._id}, { new: true });
            return carrito;
        },
        async delCarrito(obj, {id}){
            await Carrito.deleteOne({_id: id});
            return {
                message: "Carrito eliminado"
            };
        },
        async addRegion(obj, {input}){
            let region = new Region(input);
            await region.save();
            return region;
        },
        async updRegion(obj, {id, input}){
            let region = await Region.findByIdAndUpdate(id, input, { new: true });
            return region;
        },
        async delRegion(obj, {id}){
            await Region.deleteOne({_id: id});
            return {
                message: "Region eliminada"
            };
        },
        async addProvincia(obj, {input}){
            let regionBus = await Region.findById(input.region);
            let provincia = new Provincia({nombre: input.nombre, region: regionBus._id});
            await provincia.save();
            return provincia;
        },
        async updProvincia(obj, {id, input}){
            let regionBus = await Region.findById(input.region);
            let provincia = await Provincia.findByIdAndUpdate(id, {nombre: input.nombre, region: regionBus._id}, { new: true });
            return provincia;
        },
        async delProvincia(obj, {id}){
            await Provincia.deleteOne({_id: id});
            return {
                message: "Provincia eliminada"
            };
        },
        async addComuna(obj, {input}){
            let provinciaBus = await Provincia.findById(input.provincia);
            let comuna = new Comuna({nombre: input.nombre, provincia: provinciaBus._id});
            await comuna.save();
            return comuna;
        },
        async updComuna(obj, {id, input}){
            let provinciaBus = await Provincia.findById(input.provincia);
            let comuna = await Comuna.findByIdAndUpdate(id, {nombre: input.nombre, provincia: provinciaBus._id}, { new: true });
            return comuna;
        },
        async delComuna(obj, {id}){
            await Comuna.deleteOne({_id: id});
            return {
                message: "Comuna eliminada"
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