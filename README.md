# jstyles

[![npm version](https://badge.fury.io/js/jstyles.svg)](https://badge.fury.io/js/jstyles)

```
import { css, styled } from 'jstyles';

const titleClass = css`
  color: 'red'
`

// <h2 className={titleClass}>hello world</h2>

const Div = styled('div')`
  padding: '20px',
  font-size ${p => p.size || '20px'};
`;

// <Div size={'32px'} />
```
