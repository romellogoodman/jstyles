import React from 'react';
import stylis from 'stylis';

const _ID = '_jstyles';
const ctx = this || {};
let cache = {
  c: 0
};

const getSheet = target => {
  let sheet = target ? target.querySelector('#' + _ID) : self[_ID];

  if (!sheet) {
    let _target = target || document.head;
    sheet = _target.appendChild(document.createElement('style'));
    sheet.innerHTML = ' ';
    sheet.id = _ID;
  }

  return sheet.firstChild;
};

const updateSheet = (css, sheet, append) => {
  if (sheet.data.indexOf(css) < 0) {
    sheet.data += css;
  }
};

const toHash = str =>
  '.jstyles' + str.split('').reduce((out, i) => (out + i.charCodeAt(0)) | 8, 4);

const hashStyles = (ruleSet, sheet) => {
  // look up or generate and cache hash
  const className = cache[ruleSet] || (cache[ruleSet] = toHash(ruleSet));

  // look up or create rule
  const rule =
    cache[className] || (cache[className] = stylis(className, ruleSet));

  // update sheet with rule
  updateSheet(rule, sheet);

  // return classname without .
  return className.slice(1);
};

export const evalRuleSet = (args, props = {}) => {
  const [strs, ...variables] = args;
  let ruleSet = [];

  if (variables && variables.length > 0) {
    strs.forEach((item, index) => {
      ruleSet.push(item);

      const variable = variables && variables[index];

      if (variable) {
        if (typeof variable === 'function') {
          const result = variables[index](props);

          ruleSet.push(result);
        } else {
          ruleSet.push(variable);
        }
      }
    });
  } else {
    ruleSet = ruleSet.concat(strs);
  }

  return ruleSet.join('');
};

export const css = (...args) => {
  const ruleSet = evalRuleSet(args);

  return hashStyles(ruleSet, getSheet(ctx.target));
};

export const styled = tag => {
  return function(...args) {
    return function Obss(props = {}) {
      const _props = {...props};
      const ruleSet = evalRuleSet(args, _props);

      _props.className = hashStyles(ruleSet, getSheet(ctx.target));

      return React.createElement(tag, _props);
    };
  };
};
