<template>
  <div class="text-center container-inicio-sesion">
    <Mensaje :mensaje="mensaje" />
    <h1><span>Coti</span><span class="color-verde-principal">Express</span></h1>
    <p>Registro como Cliente</p>
    <div class="d-flex justify-content-center align-items-center container">
      <div class="row">
        <form @submit.prevent="guardarUsuario()" class="">
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
              v-model="cliente.nombres"
              required
            />
            <input
              type="text"
              placeholder="Apellidos"
              class="form-control col-md-6"
              v-model="cliente.apellidos"
              required
            />
          </div>
          <div class="row form-group mb-3">
            <input
              type="number"
              placeholder="Identificacion"
              class="form-control col-md-6"
              v-model="cliente.identificacion"
              required
            />
            <input
              type="text"
              placeholder="Telefono"
              class="form-control col-md-6"
              v-model="cliente.telefono"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              placeholder="Dirección"
              class="form-control"
              v-model="cliente.direccion"
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
      cliente: {},
      mensaje: { ver: false },
      usuario: {}
    };
  },
  methods: {
    crearMensaje(contenido, color) {
      this.mensaje.ver = true;
      this.mensaje.contenido = contenido;
      this.mensaje.color = color;
    },
    guardarCliente(codigoUsuarioGuardar) {
      this.cliente.codigoUsuario = codigoUsuarioGuardar
      this.axios.post("clientes", this.cliente)
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
      this.usuario.tipo = '1';
      this.axios.post("usuarios", this.usuario)
        .then((respuesta) => {
          if (respuesta.status === 200) {
              this.guardarCliente(respuesta.data.codigo)
          }
        })
        .catch((error) => {
          this.crearMensaje(error.response.data.mensaje, "danger");
        });
    },
  },
  components: {
    Mensaje,
  },
};
</script>