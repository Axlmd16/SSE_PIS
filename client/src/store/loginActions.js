const loginActions = ({ getStore, getActions, setStore }) => ({
  // Funcion para obtener todas las cuentas de usuario
  get_all_users: async () => {
    const { token } = getStore();
    const api = getStore().api;

    try {
      const response = await api.get("/accounts", {
        headers: {
          //Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },
});

export default loginActions;
