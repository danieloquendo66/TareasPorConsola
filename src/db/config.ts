import { Tarea } from "../models/Tareas.js";

class DataBase {
  private static primaryRoute: string = "http://localhost:3001";

  static async getTareas(): Promise<Tarea[]> {
    try {
      const request = await fetch(`${DataBase.primaryRoute}/tareas`);
      const response: Tarea[] = await request.json();

      return response;
    } catch (error) {
      throw error;
    }
  }

  static async createNewTarea(body: Tarea) {
    try {
      await fetch(`${DataBase.primaryRoute}/tareas`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      throw error;
    }
  }

  static async editTarea(idTarea: string | undefined): Promise<void> {
    try {
      await fetch(`${DataBase.primaryRoute}/tareas/${idTarea}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Complete_At: new Date().toDateString() }),
      });
    } catch (error) {
      throw error;
    }
  }

  static async deleteTarea(idTarea: string | undefined): Promise<void> {
    try {
      await fetch(`${DataBase.primaryRoute}/tareas/${idTarea}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

export default DataBase;
