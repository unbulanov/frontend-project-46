import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';
import yaml from 'js-yaml';

const getInfo = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  const sortedKeys = _.sortBy(keys);

  const result = sortedKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if ((value1 && value2) && (value1 !== value2)) {
      return {
        type: 'changed',
        key,
        value1,
        value2,
      };
    }
    if (!_.has(data2, key)) {
      return {
        type: 'deleted',
        key,
        value1,
      };
    }
    if (!_.has(data1, key)) {
      return {
        type: 'added',
        key,
        value2,
      };
    }
    return {
      type: 'unchanged',
      key,
      value1,
    };
  });
  return result;
};

const getDiff = (diffArr) => {
  const result = diffArr.map((diff) => {
    const diffType = diff.type;
    switch (diffType) {
      case 'deleted':
        return `- ${diff.key}: ${diff.value1}`;
      case 'unchanged':
        return `  ${diff.key}: ${diff.value1}`;
      case 'changed':
        return (`- ${diff.key}: ${diff.value1}\n+ ${diff.key}: ${diff.value2}`);
      case 'added':
        return `+ ${diff.key}: ${diff.value2}`;
      default:
        return null;
    }
  });
  return `{\n${result.join('\n')}\n}`;
};

const getAbsolutePath = (filepath) => path.resolve(process.cwd(), '__fixtures__', filepath);

const readFile = (filepath) => readFileSync(getAbsolutePath(filepath), 'utf-8');

const getParseFile = (filepath) => yaml.load(readFile(filepath));

const genDiff = (filepath1, filepath2) => {
  const result = getDiff(getInfo(getParseFile(filepath1), getParseFile(filepath2)));
  return result;
};

export default genDiff;
