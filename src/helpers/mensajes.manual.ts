import * as Readline from "node:readline";
import "colors.ts";

type ReadlineOptions = {
  input: NodeJS.ReadStream;
  output: NodeJS.WritableStream;
};

class Menu {
  static mostarMenu(): Promise<string> {
    return new Promise<string>((resolve) => {
      console.clear();

      console.log("==========================".green);
      console.log(" Seleccione una opcion ".green);
      console.log("==========================\n".green);

      console.log(`${"1.".green} Crear una tarea`);
      console.log(`${"2.".green} Crear una tarea`);
      console.log(`${"3.".green} Listar tareas`);
      console.log(`${"4.".green} Listar tareas completadas`);
      console.log(`${"5.".green} Completar tarea(s)`);
      console.log(`${"6.".green} Borrar una tarea`);
      console.log(`${"0.".green} Salir\n`);

      const options: ReadlineOptions = {
        input: process.stdin,
        output: process.stdout,
      };

      const readline: Readline.Interface = Readline.createInterface(options);

      readline.question("Selecione una opcion\n", (opt: string): void => {
        resolve(opt);
        readline.close();
      });
    });
  }

  static pausa(): Promise<void> {
    return new Promise<void>((resolve) => {
      const options: ReadlineOptions = {
        input: process.stdin,
        output: process.stdout,
      };

      const readline: Readline.Interface = Readline.createInterface(options);

      readline.question(
        `\nPresione ${"ENTER".green} para continuar\n`,
        (): void => {
          readline.close();
          resolve();
        }
      );
    });
  }
}

export default Menu;
