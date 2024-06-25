const adminActions = ({ getStore, getActions, setStore }) => ({
  get_all_careers: async () => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.get("/careers", {
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

  create_career: async (data) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.post("/careers", data, {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error creando la carrera", error);
      throw error;
    }
  },

  setSelectedCareer: (career) => {
    setStore({ selectedCareer: career });
  },

  update_career: async (id, data) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.put(`/careers/${id}`, data, {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error actualizando la carrera", error);
      throw error;
    }
  },

  //----------------------------------------------------------------------------------------

  get_all_meshes: async () => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.get("/meshes", {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error obtenido las mallas", error);
      throw error;
    }
  },

  create_mesh: async (data) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.post("/meshes", data, {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error creando la malla", error);
      throw error;
    }
  },

  setSelectedMesh: (mesh) => {
    setStore({ selectedMesh: mesh });
  },

  update_mesh: async (id, data) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.put(`/meshes/${id}`, data, {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error actualizando la malla", error);
      throw error;
    }
  },

  //----------------------------------------------------------------------------------------

  get_all_subjects: async () => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.get("/subjects", {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error obtenido las asignaturas", error);
      throw error;
    }
  },

  create_subject: async (data) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.post("/subjects", data, {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error creando la asignatura", error);
      throw error;
    }
  },

  setSelectedSubject: (subject) => {
    setStore({ selectedSubject: subject });
  },

  update_subject: async (id, data) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.put(`/subjects/${id}`, data, {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error actualizando la asignatura", error);
      throw error;
    }
  },

  // --------------------------------------------------------------------------------------------
  // Grupos

  get_all_groups: async () => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.get("/groups", {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error obtenido los grupos", error);
      throw error;
    }
  },

  create_group: async (data) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.post("/groups", data, {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error creando el grupo", error);
      throw error;
    }
  },

  // setSelectedGroup: (group) => {
  //   setStore({ selectedGroup: group });
  // },

  // update_group: async (id, data) => {
  //   const { token } = getStore();
  //   const api = getStore().api;

  //   try {
  //     const response = await api.put(`/groups/${id}`, data, {
  //       headers: {
  //         //Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     return response.data;
  //   } catch (error) {
  //     console.error("Flux: Error actualizando el grupo", error);
  //     throw error;
  //   }
  // },

  // --------------------------------------------------------------------------------------------
  // Roles

  get_all_rols: async () => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.get("/roles", {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error obtenido los roles", error);
      throw error;
    }
  },

  create_rol: async (data) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.post("/roles", data, {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error creando el rol", error);
      throw error;
    }
  },

  setSelectedRol: (rol) => {
    setStore({ selectedRol: rol });
  },

  update_rol: async (id, data) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.put(`/roles/${id}`, data, {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error actualizando el rol", error);
      throw error;
    }
  },

  roles_by_user: async (id) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.get(`/users/${id}/roles`, {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error obtenido los roles del usuario", error);
      throw error;
    }
  },

  // --------------------------------------------------------------------------------------------
  // Permisos
  get_all_permissions: async () => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.get("/permisos", {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error obtenido los permisos", error);
      throw error;
    }
  },

  create_permission: async (data) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.post("/permisos", data, {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error creando el permiso", error);
      throw error;
    }
  },

  setSelectedPermission: (permission) => {
    setStore({ selectedPermission: permission });
  },

  update_permission: async (id, data) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.put(`/permisos/${id}`, data, {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error actualizando el permiso", error);
      throw error;
    }
  },

  permissions_by_rol: async (id) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.get(`/roles/${id}/permissions`, {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Flux: Error obtenido los permisos del rol", error);
      throw error;
    }
  },

  add_permission_to_rol: async (rol_id, permission_id) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.post(
        `/roles/${rol_id}/permissions`,
        { permission_id },
        {
          headers: {
            //Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Flux: Error agregando permiso al rol", error);
      throw error;
    }
  },

  remove_permission_from_rol: async (rol_id, permission_id) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.delete(
        `/roles/${rol_id}/permissions/${permission_id}`,
        {
          headers: {
            //Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Flux: Error eliminando permiso del rol", error);
      throw error;
    }
  },

  add_rol_to_persona: async (persona_id, rol_id) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.post(
        `/roles/${rol_id}/person`,
        { persona_id },
        {
          headers: {
            //Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Flux: Error asignando el rol a la persona", error);
      throw error;
    }
  },

  remove_rol_from_persona: async (persona_id, rol_id) => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.delete(
        `/roles/${rol_id}/person/${persona_id}`,
        {
          headers: {
            //Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Flux: Error eliminando el rol de la persona", error);
      throw error;
    }
  },
});

export default adminActions;
