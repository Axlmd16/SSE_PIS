const catalogoActions = ({ getStore, getActions, setStore }) => ({

  //* ------------------Generos-----------------

  get_all_generos: async () => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.get("/generos", {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error obtenido los generos", error);
      throw error;
    }
  },

  create_genero: async (data) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.post("/generos", data, {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error creando el Genero", error);
      throw error;
    }
  },

  setSelectedGenero: (genero) => {
    setStore({ selectedGenero: genero });
  },

  update_genero: async (id, data) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.put(`/generos/${id}`, data, {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error actualizando el Genero", error);
      throw error;
    }
  },

  //* ------------------Ciclos-----------------

  get_all_ciclos: async () => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.get("/ciclos", {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error obtenido los ciclos", error);
      throw error;
    }
  },

  create_ciclo: async (data) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.post("/ciclos", data, {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error creando el Ciclo", error);
      throw error;
    }
  },

  setSelectedCiclos: (ciclo) => {
    setStore({ selectCiclos: ciclo });
  },

  update_ciclo: async (id, data) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.put(`/ciclos/${id}`, data, {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error actualizando el Ciclo", error);
      throw error;
    }
  },

  //* ------------------Criterios de evaluacion-----------------

  get_all_criterios_evaluacion: async () => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.get("/criterioAsignaicon", {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error obtenido los criterioAsignaicon", error);
      throw error;
    }
  },

  create_criterio_evaluacion: async (data) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.post("/criterioAsignaicon", data, {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error creando el criterioAsignaicon", error);
      throw error;
    }
  },

  setSelectedCriterioEvaluacion: (criterioEvaluacion) => {
    setStore({ selectCriterioEvaluacion: criterioEvaluacion });
  },

  update_criterio_evaluacion: async (id, data) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.put(`/criterioAsignaicon/${id}`, data, {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error actualizando el criterioAsignaicon", error);
      throw error;
    }
  },


});



export default catalogoActions;
