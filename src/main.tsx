import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// @ts-ignore
import ClickSpark from './components/ui/ClickSpark';
import './index.css';

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
      <App />
    </ClickSpark>
  </React.StrictMode>
);
