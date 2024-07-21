const academicActions = ({ getStore, getActions, setStore }) => ({
  //* ------------------Generos-----------------

  // get_all_generos: async () => {
  //   const { token } = getStore();
  //   const api = getStore().api;

  //   try {
  //     const response = await api.get("/generos", {
  //       headers: {
  //         //Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error("Flux: Error obtenido los generos", error);
  //     throw error;
  //   }
  // },

  //* ----------TIPO_IDENTIFICACION--------------

  get_all_tipo_identificacion: async () => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.get("/tipo_identificacion", {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error obtenido los tipos de identificaion", error);
      throw error;
    }
  },

  //* --------------ASIGNATURAS----------------

  get_all_asignaturas: async () => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.get("/asignaturas", {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error al obtener las asignaturas", error);
      throw error;
    }
  },

  //* -------------PERIODOS ACADEMICOS----------------

  // get_all_periodos_academicos: async () => {
  //   const { token } = getStore();
  //   const api = getStore().api;

  //   try {
  //     const response = await api.get("/periodos_academicos", {
  //       headers: {
  //         //Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error("Flux: Error al obtener los periodos academicos", error);
  //     throw error;
  //   }
  // },

  //* ----------------ESTUDIANTES----------------

  get_all_estudiantes: async () => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.get("/estudiantes", {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error obtenido las carreras", error);
      throw error;
    }
  },

  create_estudiante: async (data) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.post("/estudiantes", data, {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error creando al Estudiante", error);
      throw error;
    }
  },

  setSelectedEstudiante: (career) => {
    setStore({ selectedEstudiante: career });
  },

  update_estudiante: async (id, data) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.put(`/estudiantes/${id}`, data, {
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

  //* ------------------ASIGNACION_DOCENTE_MATERIA-----------------

  get_all_docentes_asignaturas: async () => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.get("/asignacion_docente_asignatura", {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error obtenido los Docentes Asignaturas", error);
      throw error;
    }
  },

  create_docente_asignatura: async (data) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.post("/asignacion_docente_asignatura", data, {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error creando la Docente Asingatura", error);
      throw error;
    }
  },

  setSelectedDocenteAsignatura: (docente_asignatura) => {
    setStore({ selectedDocenteAsignatura: docente_asignatura });
  },

  update_docente_asignatura: async (id, data) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.put(
        `/asignacion_docente_asignatura/${id}`,
        data,
        {
          headers: {
            //Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Flux: Error actualizando el Docente", error);
      throw error;
    }
  },

  //* ------------------DOCENTES-----------------

  get_docente: async (data) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.post("/obtener_docente", data, {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error obtenido el docente", error);
      throw error;
    }
  },

  get_email_docente: async (data) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.post("/obtener_correo_docente", data, {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error obtenido el correo del docente", error);
      throw error;
    }
  },

  get_all_docentes: async () => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.get("/docentes", {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error obtenido los Docentes", error);
      throw error;
    }
  },

  create_docente: async (data) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.post("/docentes", data, {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error creando la Docente", error);
      throw error;
    }
  },

  setSelectedDocente: (docente) => {
    setStore({ selectedDocente: docente });
  },

  update_docente: async (id, data) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.put(`/docentes/${id}`, data, {
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

  get_all_cursos_docente: async (docente_id) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.get(`/cursos_docente/${docente_id}`, {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error obtenido los cursos del docente", error);
      throw error;
    }
  },
});

export default academicActions;
