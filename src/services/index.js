import axios from "axios";
import { blogConfig } from "../config";

// Definición de los endpoints disponibles
const ENDPOINTS = {
  jwt: "jwtServiceUrl",
  postMain: "postMainServiceUrl",
  draft: "draftServiceUrl",
  search: "searchServiceUrl",
};

// Servicios que requieren autenticación
const AUTHENTICATED_SERVICES = ["postMain", "postById", "tags", "postByTag", "draft", "search"];

class ApiService {
  constructor() {
    this.services = {};
    this.authToken = null;
    this.initializeServices();
  }

  // Inicializa todas las instancias de axios
  initializeServices() {
    Object.entries(ENDPOINTS).forEach(([serviceName, configKey]) => {
      this.services[serviceName] = axios.create({
        baseURL: blogConfig[configKey],
      });
    });
  }

  // Obtiene un servicio específico
  getService(serviceName) {
    if (!this.services[serviceName]) {
      throw new Error(`Service "${serviceName}" not found`);
    }
    return this.services[serviceName];
  }

  // Configura el token de autenticación para todos los servicios que lo requieren
  setAuthToken(res) {
    const token = res.body;
    this.authToken = token;

    AUTHENTICATED_SERVICES.forEach((serviceName) => {
      const service = this.services[serviceName];
      if (token) {
        service.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        delete service.defaults.headers.common["Authorization"];
      }
    });
  }

  // Métodos helper para acceder a servicios específicos
  get jwt() {
    return this.getService("jwt");
  }
  get postMain() {
    return this.getService("postMain");
  }
  get postById() {
    return this.getService("postById");
  }
  get tags() {
    return this.getService("tags");
  }
  get postByTag() {
    return this.getService("postByTag");
  }
  get draft() {
    return this.getService("draft");
  }
  get search() {
    return this.getService("search");
  }
}

// Instancia única del servicio
const apiService = new ApiService();

// Exportar el servicio principal
export default apiService;

// Exportar función de configuración de token
export const setAuthToken = (res) => apiService.setAuthToken(res);
