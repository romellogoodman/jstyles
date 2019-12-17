import React from 'react';

const JS_ID = '_jstyles';

const ctx = this || {};

let cache = {
  c: 0
};

const getSheet = target => {
  let sheet = target ? target.querySelector('#' + JS_ID) : self[JS_ID];

  if (!sheet) {
    let _target = target || document.head;
    sheet = _target.appendChild(document.createElement('style'));
    sheet.innerHTML = ' ';
    sheet.id = JS_ID;
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

const toRule = (styles, className) => `${className} { ${styles} }`;

const createStyles = (styles, props) => {
  if (typeof styles !== 'object') {
    console.error('Please provide an object');
    return '';
  }

  return Object.keys(styles)
    .map(
      key =>
        `${key}: ${
          typeof styles[key] === 'function' ? styles[key](props) : styles[key]
        };`
    )
    .join('');
};

const hashStyles = ({props = {}, sheet, styles}) => {
  // look up or generate and cache hash
  const styleStr = createStyles(styles, props);
  const cacheId = JSON.stringify(styleStr);
  const className = cache[cacheId] || (cache[cacheId] = toHash(cacheId));

  // look up or create rule
  const rule =
    cache[className] || (cache[className] = toRule(styleStr, className));

  // update sheet with rule
  updateSheet(rule, sheet);

  // return classname without .
  return className.slice(1);
};

export const css = styleObject =>
  hashStyles({
    sheet: getSheet(ctx.target),
    styles: styleObject
  });

export const styled = (tag, styleObject) => {
  return function Obss(props = {}) {
    const _props = {...props};

    _props.className = hashStyles({
      props,
      sheet: getSheet(ctx.target),
      styles: styleObject
    });

    return React.createElement(tag, _props);
  };
};
