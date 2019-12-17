import React from 'react';
import {render} from 'react-dom';

import {css, styled} from 'jstyles';

const mainClass = css({
  'box-sizing': 'border-box',
  'background-color': 'papayawhip',
  padding: '80px',
  width: '100%'
});

const Div = styled('div', {
  'background-color': 'white',
  padding: '20px'
});

const Title = styled('h2', {
  color: 'pink',
  'font-size': p => p.size || '20px',
  'font-style': 'italic'
});

const App = () => {
  return (
    <main className={mainClass}>
      <Div>
        <Title size="48px">hello world</Title>
      </Div>
    </main>
  );
};

render(<App />, document.getElementById('root'));
