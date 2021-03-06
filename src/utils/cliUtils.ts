import { CommanderStatic } from 'commander';
import * as path from 'path';

// tslint:disable:no-console

export function getProjectDir(program: CommanderStatic) {
  let projectDir: string | undefined = program.project;

  if (projectDir === undefined) {
    projectDir = process.cwd();
  }

  if (!path.isAbsolute(projectDir)) {
    projectDir = path.join(process.cwd(), projectDir);
  }

  return projectDir;
}

export function checkRequiredOption(name: string, value: any) {
  if (value === undefined) {
    console.log(`Option --${name} is required.`);
    process.exit(1);
  }
}

export function wrapDebug(debug: boolean | undefined, func: () => Promise<void>) {
  return func().catch((reason) => {
    if (debug) {
      console.error(reason);
    } else {
      console.error(`Error: ${reason.message}.`);
      console.error('To see the stacktrace use option -d.');
    }
  });
}
