<template>
  <div class="text-center container-inicio-sesion">
    <Mensaje :mensaje="mensaje" />
    <h1><span>Coti</span><span class="color-verde-principal">Express</span></h1>
    <p>Registro como Vendedor</p>
    <div class="d-flex justify-content-center align-items-center container">
      <div class="row">
        <form @submit.prevent="guardarUsuario()" class="formulario-registro">
        <div class="form-group row mb-3">
            <input
            type="text"
            placeholder="Usuario"
            class="form-control col-md-6"
            v-model="usuario.username"
            />
            <input
            type="password"
            placeholder="Contraseña"
            class="form-control col-md-6"
            v-model="usuario.password"
            />
          </div>
          <div class="row form-group mb-3">
            <input
              type="text"
              placeholder="Nombres"
              class="form-control col-md-6"
              v-model="vendedor.nombres"
              required
            />
            <input
              type="text"
              placeholder="Apellidos"
              class="form-control col-md-6"
              v-model="vendedor.apellidos"
              required
            />
          </div>
          <div class="row form-group mb-3">
            <input
              type="number"
              placeholder="Identificacion"
              class="form-control col-md-12"
              v-model="vendedor.identificacion"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="Email"
              class="form-control"
              v-model="vendedor.email"
            />
          </div>
          <div class="form-group row mb-3">
            <input
              type="text"
              placeholder="Nombre de la empresa"
              class="form-control col-md-6"
              v-model="empresa.nombre"
            />
            <input
              type="text"
              placeholder="Telefono"
              class="form-control col-md-6"
              v-model="empresa.telefono"
              required
            />
          </div>
          <div class="form-group">
            <textarea
              placeholder="Dirección"
              class="form-control"
              v-model="empresa.direccion"
            />
          </div>
          <div class="form-group">
            <button class="btn btn-success">Guardar</button>
          </div>
        </form>
      </div>
    </div>
    <div class="footer-formulario mt-3">
      <p>¿Ya tienes una cuenta?</p>
      <router-link
        data-toggle="collapse"
        data-target=".navbar-collapse.show"
        to="/"
        class="color-verde-principal link-crear-cuenta"
        >Iniciar sesión</router-link
      >
    </div>
  </div>
</template>
<script>
import Mensaje from "@/components/Mensaje";
export default {
  data() {
    return {
      mensaje: { ver: false },
      usuario: {},
      vendedor: {},
      empresa: {}
    };
  },
  methods: {
    crearMensaje(contenido, color) {
      this.mensaje.ver = true;
      this.mensaje.contenido = contenido;
      this.mensaje.color = color;
    },
    guardarVendedor(codigoUsuarioGuardado, codigoEmpresaGuardado) {
      this.vendedor.codigoUsuario = codigoUsuarioGuardado;
      this.vendedor.codigoEmpresa = codigoEmpresaGuardado;

      this.axios.post("vendedores", this.vendedor)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            this.$router.push({ name: "InicioSesion" });
          }
        })
        .catch((error) => {
          this.crearMensaje(error.response.data.mensaje, "danger");
        });
    },
    guardarUsuario() {
      this.usuario.tipo = '2';
      this.axios.post("usuarios", this.usuario)
        .then((respuesta) => {
          console.warn(respuesta, 'RES USUARIO')
          if (respuesta.status === 200) {
            this.guardarEmpresa(respuesta.data.codigo);
          }
        })
        .catch((error) => {
          this.crearMensaje(error.response.data.mensaje, "danger");
        });
    },
    guardarEmpresa(codigoUsuarioGuardado) {
        this.axios.post("empresas", this.empresa)
        .then((respuesta) => {
          console.warn(respuesta, 'RES EMPRESA')
          if (respuesta.status === 200) {
            this.guardarVendedor(codigoUsuarioGuardado, respuesta.data.codigo);
          }
        })
        .catch((error) => {
          this.crearMensaje(error.response.data.mensaje, "danger");
        });
    }
  },
  components: {
    Mensaje,
  },
};
</script>