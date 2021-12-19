import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: () => import('@/views/LandingPage/LandingPageInicio.vue')
  },
  {
    path: '/nosotros',
    name: 'Nosotros',
    component: () => import('@/views/LandingPage/LandingPageNosotros.vue')
  },
  {
    path: '/inicio-sesion',
    name: 'InicioSesion',
    component: () => import('@/views/Usuario/UsuarioInicioSesion.vue')
  },
  {
    path: '/pre-registro',
    name: 'PreRegistro',
    component: () => import('@/views/Usuario/UsuarioPreRegistro.vue')
  },
  {
    path: '/cliente-registro',
    name: 'ClienteRegistro',
    component: () => import('@/views/Cliente/ClienteRegistro.vue'),
    props:true
  },
  {
    path: '/cliente-perfil',
    name: 'ClientePerfil',
    component: () => import('@/views/Cliente/ClientePerfil.vue'),
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/vendedor-registro',
    name: 'VendedorRegistro',
    component: () => import('@/views/Vendedor/VendedorRegistro.vue'),
    props:true
  },
  {
    path: '/vendedor-perfil',
    name: 'VendedorPerfil',
    component: () => import('@/views/Vendedor/VendedorPerfil.vue'),
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/categorias',
    name: 'Categorias',
    component: () => import('@/views/Categoria/Categoria.vue'),
    props:true,
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/categorias-eliminar',
    name: 'CategoriasEliminar',
    component: () => import('@/views/Categoria/CategoriaEliminar.vue'),
    props:true,
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/categorias-editar',
    name: 'CategoriasEditar',
    component: () => import('@/views/Categoria/CategoriaEditar.vue'),
    props:true,
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/productos',
    name: 'Productos',
    component: () => import('@/views/Producto/Producto.vue'),
    props:true,
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/productos-editar',
    name: 'ProductosEditar',
    component: () => import('@/views/Producto/ProductoEditar.vue'),
    props:true,
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/vendedor-empresa',
    name: 'VendedorEmpresa',
    component: () => import('@/views/Vendedor/VendedorEmpresa.vue'),
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin/AdminRegistro.vue')
  },
  {
    path: '/vendedores',
    name: 'Vendedores',
    component: () => import('@/views/Admin/Vendedores.vue'),
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/clientes',
    name: 'Clientes',
    component: () => import('@/views/Admin/Clientes.vue'),
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/catalogo',
    name: 'Catalogo',
    component: () => import('@/views/Cliente/ClienteCatalogo.vue'),
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/pedidos-cliente',
    name: 'PedidoCliente',
    component: () => import('@/views/Pedidos/PedidosCliente.vue'),
    props:true,
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/productos-por-vendedor',
    name: 'ProductosPorVendedor',
    component: () => import('@/views/Vendedor/VendedorProducto.vue'),
    props:true,
    meta:{requiereAutorizacion:true}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=>{
  const rutaProtegida = to.matched.some(record=> record.meta.requiereAutorizacion);

  if(rutaProtegida && store.state.usuario === null){
    next({name:'InicioSesion'})
  }else{
    next();
  }
})

export default router
