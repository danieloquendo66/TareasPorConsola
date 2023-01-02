import DataBase from "../db/config.js";
import "colors.ts";

export type Tarea = {
  id: string;
  description: string;
  Complete_At: string | null;
};

export class Tareas {
  // private _listado = new Map<string, Tarea>();

  async createNewTarea(tarea: Tarea): Promise<void> {
    await DataBase.createNewTarea(tarea);
  }

  async getTareas(): Promise<Tarea[]> {
    return await DataBase.getTareas();
  }

  getTareasList(tareas: Tarea[], value: string = "all"): string[] {
    console.log("\n");

    let newArrTareas: string[] = [];

    switch (value) {
      case "completado":
        newArrTareas = tareas
          .filter((tarea) => tarea.Complete_At !== null)
          .map((tarea, index) => {
            const indexTarea: string = (index + 1).toString();
            return `${(indexTarea + ".").green} ${tarea.description} | ${
              tarea.Complete_At?.green
            }`;
          });

        break;

      case "pendiente":
        newArrTareas = tareas
          .filter((tarea) => tarea.Complete_At === null)
          .map((tarea, index) => {
            const indexTarea: string = (index + 1).toString();
            return `${(indexTarea + ".").green} ${tarea.description} | ${
              "Pendiente".red
            }`;
          });

        break;

      case "all":
        newArrTareas = tareas.map((tarea, index) => {
          const complete: string = tarea.Complete_At
            ? tarea.Complete_At.green
            : "Pendiente".red;
          const indexTarea: string = (index + 1).toString();
          return `${(indexTarea + ".").green} ${
            tarea.description
          } | ${complete}`;
        });
        break;
    }

    return newArrTareas;
  }

  async completeTareas(id: string | undefined): Promise<void> {
    DataBase.editTarea(id);
  }

  async deleteTarea(id: string | undefined): Promise<void> {
    DataBase.deleteTarea(id);
  }
}
