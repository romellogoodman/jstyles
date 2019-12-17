import React from 'react';
import {render} from 'react-dom';

import {css, styled} from 'jstyles';

const mainClass = css`
  box-sizing: border-box;
  background-color: papayawhip;
  padding: 80px;
  width: 100%;
`;

const Div = styled('div')`
  background-color: white;
  padding: 20px;
`;

const Title = styled('h2')`
  color: pink;
  font-size: ${p => p.size || '20px'};
  font-style: italic;
`;

const App = () => {
  const [isBigType, setBigTitle] = React.useState(true);

  return (
    <main className={mainClass}>
      <Div>
        <Title size={isBigType ? '48px' : '20px'}>hello world</Title>
      </Div>
      <p onClick={() => setBigTitle(!isBigType)}>toggle size</p>
    </main>
  );
};

render(<App />, document.getElementById('root'));
