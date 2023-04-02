import yaml from 'js-yaml';
import { readFileSync } from 'fs';
import path from 'path';

const getPath = (filepath) => path.resolve(process.cwd(), '__fixtures__', filepath);
const readFile = (filename) => readFileSync(getPath(filename));

const getParseFile = (file, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(readFile(file), 'utf-8');
    case 'yml':
      return yaml.load(readFile(file), 'utf-8');
    case 'yaml':
      return yaml.load(readFile(file), 'utf-8');
    default:
      throw new Error(`Unknown format of file: ${format}`);
  }
};

export default getParseFile;
