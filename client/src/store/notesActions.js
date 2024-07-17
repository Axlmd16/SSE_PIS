const notesActions = ({ getStore, getActions, setStore }) => ({
  //Cursa
  get_all_cursas: async () => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.get("/cursa", {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error ", error);
      throw error;
    }
  },

  create_cursa: async (data) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.post("/cursa", data, {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error ", error);
      throw error;
    }
  },

  setSelectedCursa: (cursa) => {
    setStore({ selectedCursa: cursa });
  },

  update_cursa: async (id, data) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.put(`/cursa/${id}`, data, {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error actualizando el Cursa", error);
      throw error;
    }
  },

  //ESTUDIANTES-CURSA

  get_all_estudiantes_cursas: async () => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.get("/estudiante_cursa", {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error ", error);
      throw error;
    }
  },

  create_estudiantes_cursa: async (data) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.post("/estudiante_cursa", data, {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error creando Estudiante Cursa", error);
      throw error;
    }
  },

  setSelectedEstudianteCursa: (estudiante_cursa) => {
    setStore({ selectedEstudianteCursa: estudiante_cursa });
  },

  update_estudiante_cursa: async (id, data) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.put(`/estudiante_cursa/${id}`, data, {
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

  //NOTAS
  update_notas_criterio: async (id, data) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.put(`/notas_criterio/${id}`, data, {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error actualizando las notas del criterio", error);
      throw error;
    }
  },
});

export default notesActions;
