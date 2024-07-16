const proyeccionesActions = ({ getStore, getActions, setStore }) => ({
  proyeccion_estudiante_unidad_3: async (data) => {
    const api = getStore().api;

    try {
      const response = await api.post(`/proyeccion_estudiante_unidad_3`, data, {
        responseType: 'blob' // Asegura que la respuesta sea manejada como un blob
      });

      const imageUrl = URL.createObjectURL(response.data);
      return imageUrl;
    } catch (error) {
      console.error("Flux: Error al proyeccion_estudiante_unidad_3", error);
      throw error;
    }
  },
});

export default proyeccionesActions;
