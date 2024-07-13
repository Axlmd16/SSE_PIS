const reportActions = ({ getStore, getActions, setStore }) => ({
  // Reportes
  get_asignaturas_por_curso: async (id) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.get(`/asig_by_curso/${id}`, {
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

  get_unidades_por_asignatura: async (id) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.get(`/units_by_asig/${id}`, {
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

  get_estudiantes_por_curso: async (curso_id) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.get(`/students_by_course/${curso_id}`, {
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

  get_notas_criterio: async (unidad_id, cursa_id) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.get(
        `/notes_by_criterio/${unidad_id}/${cursa_id}`,
        {
          headers: {
            //Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Flux: Error ", error);
      throw error;
    }
  },

  get_cursos_info: async () => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.get(`/cursos_detalle`, {
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
});

export default reportActions;
