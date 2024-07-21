const proyeccionesActions = ({ getStore, getActions, setStore }) => ({
  
  proyeccion_final_supletorio: async (data) => {
    const api = getStore().api;

    try {
      const response = await api.post(`/proyeccion_final_supletorio`, data, {
        responseType: 'blob' 
      });

      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl;
    } catch (error) {
      console.error("Flux: Error al proyeccion_final_supletorio", error);
      throw error;
    }
  },

  proyecciones_estudiantes_supletorio: async (data) => {
    const api = getStore().api;

    try {
      const response = await api.post(`/proyeccion_estudiantes_supletorio`, data, {
        responseType: 'blob' 
      });

      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl;
    } catch (error) {
      console.error("Flux: Error al proyeccion_estudiantes_supletorio", error);
      throw error;
    }
  },

  proyeccion_all_estudiantes_final_supletorio: async (data) => {
    const api = getStore().api;

    try {
      const response = await api.post(`/proyeccion_all_estudiantes_final_supletorio`, data, {
        responseType: 'blob' 
      });

      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl;
    } catch (error) {
      console.error("Flux: Error al proyeccion_all_estudiantes_final_supletorio", error);
      throw error;
    }
  },

  proyeccion_estudiante_unidad_3: async (data) => {
    const api = getStore().api;

    try {
      const response = await api.post(`/proyeccion_estudiante_unidad_3`, data, {
        responseType: 'blob' 
      });

      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl;
    } catch (error) {
      console.error("Flux: Error al proyeccion_estudiante_unidad_3", error);
      throw error;
    }
  },

  proyeccion_estudiante_unidad_3: async (data) => {
    const api = getStore().api;

    try {
      const response = await api.post(`/proyeccion_estudiante_unidad_3`, data, {
        responseType: 'blob' 
      });

      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl;
    } catch (error) {
      console.error("Flux: Error al proyeccion_estudiante_unidad_3", error);
      throw error;
    }
  },

  proyeccion_estudiante_parametros_evaluacion: async (data) => {
    const api = getStore().api;

    try {
      const response = await api.post(`/proyeccion_estudiante_parametros_evaluacion`, data, {
        responseType: 'blob' 
      });

      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl;
    } catch (error) {
      console.error("Flux: Error al proyeccion_estudiante_unidad_3", error);
      throw error;
    }
  },

  estudiantes_proyecciones_unidad_3: async (data) => {
    const api = getStore().api;

    try {
      const response = await api.post(`/estudiantes_proyecciones_unidad_3`, data, {
        responseType: 'blob' 
      });

      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl;
    } catch (error) {
      console.error("Flux: Error al estudiantes_proyecciones_unidad_3", error);
      throw error;
    }
  },

  estudiantes_proyecciones_parametros: async (data) => {
    const api = getStore().api;

    try {
      const response = await api.post(`/estudiantes_proyecciones_parametros`, data, {
        responseType: 'blob' 
      });

      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl;
    } catch (error) {
      console.error("Flux: Error al estudiantes_proyecciones_unidad_3", error);
      throw error;
    }
  },

});

export default proyeccionesActions;
