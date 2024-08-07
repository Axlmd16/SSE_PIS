const reportActions = ({ getStore, getActions, setStore }) => ({
  // Reportes
  get_asignaturas_por_curso: async (ciclo_id, paralelo) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.get(`/asig_by_curso/${ciclo_id}/${paralelo}`, {
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

  get_notas_por_curso_estudiantes: async (
    paralelo,
    asignatura_id,
    ciclo_id
  ) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.get(
        `/notes_by_course_students/${paralelo}/${asignatura_id}/${ciclo_id}`,
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

  get_cursa_id: async (paralelo, asignatura_id, ciclo_id) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.get(
        `/cursa_id/${paralelo}/${asignatura_id}/${ciclo_id}`,
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

  // ------------------------------------------------------------
  // Emails
  sendPdfToBackend: async (formData) => {
    const token = getStore().token;
    const api = getStore().api;

    try {
      const response = await api.post("/send_email", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error sending PDF to backend:", error);
    }
  },
});

export default reportActions;
