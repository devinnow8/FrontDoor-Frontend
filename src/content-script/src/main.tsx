import React from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import App from './App';

const container = document.getElementById('tmp-chrome-ext');
const root = createRoot(container!);

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
