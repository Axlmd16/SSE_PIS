const passwordActions = ({ getStore, getActions, setStore }) => ({
  
    verificate_user: async (username, password) => {
      const { token } = getStore();
      const api = getStore().api;
      
      try {
        const response = await api.post("/verificar_usuario", {
          usuario: username,
          clave: password,
        });
        if (response.status !== 200) {
          console.log("Usuario o contraseña incorrectos");
          return false;
        }
        const data = response.data;
        // console.log({data});
        // return true;
        return data
      } catch (error) {
        console.error("Error al verificar el usuario:", error);
        console.log("Error al verificar el usuario");
        return false;
      }
    },

    verificate_password: async (id_cuenta, current_password) => {
      const { token } = getStore();
      const api = getStore().api;
  
      try {
        const response = await api.post(`/verificar_password/${id_cuenta}/${current_password}`, {
          headers: {
            //Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error("Flux: Error actualizando el Docente", error);
        throw error;
      }
    },

    update_password: async (id_cuenta, data) => {
      const { token } = getStore();
      const api = getStore().api;
  
      try {
        const response = await api.put(`/cambiar_password/${id_cuenta}`, data, {
          headers: {
            //Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error("Flux: Error actualizando el EstudianteCursa", error);
        throw error;
      }
    },

    validar_usuario_cambio_password: async (data) => {
      const { token } = getStore();
      const api = getStore().api;
  
      try {
        const response = await api.post(`/validar_usuario_cambio_password`, data, {
          headers: {
            //Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error("Flux: Error actualizando el EstudianteCursa", error);
        throw error;
      }
    },

    recuperar_password: async (data) => {
      const { token } = getStore();
      const api = getStore().api;
  
      try {
        const response = await api.post(`/send-recovery-email`, data, {
          headers: {
            //Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error("Flux: Error actualizando el EstudianteCursa", error);
        throw error;
      }
    },
  
    reset_password: async (data) => {
      const { token } = getStore();
      const api = getStore().api;
  
      try {
        const response = await api.put(`/reset_password`, data, {
          headers: {
            //Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error("Flux: Error actualizando el EstudianteCursa", error);
        throw error;
      }
    },
  
  });
  
  export default passwordActions;
  