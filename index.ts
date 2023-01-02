// para poder encontar los modulos en la compilacion hay que poner la extencion del archivo del cual se va a importar
import { v4 as uuidv4 } from "uuid";
import "colors.ts";

import { Menu, Opt, Colection } from "./src/helpers/inquirer.js";
import { Tareas, Tarea } from "./src/models/Tareas.js";

async function main(): Promise<void> {
  let opt: Opt;

  const tareas = new Tareas();

  try {
    do {
      console.log("#########################");
      console.log();
      console.log("#########################");

      opt = await Menu.MenuPrincipal();

      switch (opt.opcion) {
        case "1":
          //crear opcion
          const desc = await Menu.leerInput("Descripcion:");
          const id: string = uuidv4();

          const tarea: Tarea = {
            id: id,
            description: desc.desc ?? "",
            Complete_At: null,
          };
          await tareas.createNewTarea(tarea);
          break;

        case "2":
          const arrTareas: Tarea[] = await tareas.getTareas();
          const newArrTareas = tareas.getTareasList(arrTareas);
          newArrTareas.map((tarea: string) => console.log(tarea));
          break;

        case "3":
          const arrTareasCompletadas: Tarea[] = await tareas.getTareas();
          const newArrTareasCompletadas = tareas.getTareasList(
            arrTareasCompletadas,
            "completado"
          );
          newArrTareasCompletadas.map((tarea: string) => console.log(tarea));
          break;

        case "4":
          const arrTareasPendientes: Tarea[] = await tareas.getTareas();
          const newArrTareasPendientes = tareas.getTareasList(
            arrTareasPendientes,
            "pendiente"
          );
          newArrTareasPendientes.map((tarea: string) => console.log(tarea));
          break;

        case "5":
          const arrTareasCompletar: Tarea[] = await tareas.getTareas();
          const completeOptions: Colection = {
            message: "Cual desea completar?\n",
            type: "list",
            name: "opcion",
            choices: arrTareasCompletar
              .filter((tarea) => tarea.Complete_At === null)
              .map((tarea, index) =>
                Menu.createNewMenuTarea(
                  tarea.id,
                  `${(index + 1 + ".").green} ${tarea.description} | ${
                    tarea.Complete_At ?? "Pendiente".red
                  }`
                )
              ),
          };

          const optTarea = await Menu.createNewMenu(completeOptions);
          if (optTarea.opcion !== "salir") {
            tareas.completeTareas(optTarea.opcion);
          }
          break;

        case "6":
          const arrTareasEliminar: Tarea[] = await tareas.getTareas();
          const deletedOptions: Colection = {
            message: "Cual desea completar?\n",
            type: "list",
            name: "opcion",
            choices: arrTareasEliminar.map((tarea, index) =>
              Menu.createNewMenuTarea(
                tarea.id,
                `${(index + 1 + ".").green} ${tarea.description} | ${
                  tarea.Complete_At?.green ?? "Pendiente".red
                }`
              )
            ),
          };

          const optTareaDelete = await Menu.createNewMenu(deletedOptions);
          if (optTareaDelete.opcion !== "salir") {
            tareas.deleteTarea(optTareaDelete.opcion);
          }

          break;
      }

      await Menu.pausa();

      // if (opt !== "0") await Menu.pausa();
    } while (opt.opcion !== "0");
  } catch (error) {
    console.error(error);
  }
}

main();
