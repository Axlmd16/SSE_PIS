import axios from "axios";
import { jwtDecode } from "jwt-decode";
import adminActions from "./adminActions";
import academicActions from "./academicActions";
import notesActions from "./notesActions";
import loginActions from "./loginActions";
import reportActions from "./reportsActions";
import passwordActions from "./passwordActions";
import catalogoActions from "./catalogoActionx";
import proyeccionesActions from "./proyeccionesActions";

const getState = ({ getStore, getActions, setStore }) => {
  const API_BASE_URL = "http://127.0.0.1:3000";

  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return {
    store: {
      token: null,
      api,
      modal: false,
      persona_auth: null,
      selectedCareer: null,
      selectedMesh: null,
      selectedSubject: null,
      permissions: [],
      roles: [],
      selectedRol: null,
      selectedPermission: null,
      selectedEstudiante: null,
      selectedDocente: null,
      selectedDocenteAsignatura: null,
      selectedCursa: null,
      selectedEstudianteCursa: null,
      selectedUnit: null,
      selectedCycle: null,
      selectedGenero: null,
      selectCiclos: null,
      selectCriterioEvaluacion: null,
    },
    actions: {
      syncTokenfromSessionStorage: () => {
        const token = sessionStorage.getItem("token");
        if (token) {
          setStore({ token: token });
        }
      },
      login: async (username, password) => {
        try {
          const response = await api.post("/login", {
            usuario: username,
            clave: password,
          });

          if (response.status !== 200) {
            alert("Usuario o contraseña incorrectos");
            return false;
          }

          const { access_token } = response.data;
          const decodeToken = jwtDecode(access_token);
          const { roles, permisos, persona } = decodeToken;

          sessionStorage.setItem("token", access_token);
          sessionStorage.setItem("roles", JSON.stringify(roles));
          sessionStorage.setItem("permisos", JSON.stringify(permisos));
          sessionStorage.setItem(
            "persona",
            JSON.stringify(decodeToken.persona)
          );

          setStore({ token: access_token });
          setStore({ roles: roles });
          setStore({ permissions: permisos });
          setStore({ persona_auth: persona });

          return true;
        } catch (error) {
          return false;
        }
      },

      logout: () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("roles");
        sessionStorage.removeItem("permisos");
        sessionStorage.removeItem("persona");
        setStore({ token: null, roles: [], permisos: [], persona_auth: null });
      },

      handleModal: () => {
        const { modal } = getStore();
        setStore({ modal: !modal });
      },

      ...adminActions({ getStore, getActions, setStore }),
      ...academicActions({ getStore, getActions, setStore }),
      ...notesActions({ getStore, getActions, setStore }),
      ...loginActions({ getStore, getActions, setStore }),
      ...reportActions({ getStore, getActions, setStore }),
      ...passwordActions({ getStore, getActions, setStore }),
      ...catalogoActions({ getStore, getActions, setStore }),
      ...proyeccionesActions({ getStore, getActions, setStore }),
    },
  };
};

export default getState;
