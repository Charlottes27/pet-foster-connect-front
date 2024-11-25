import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import './index.css';
import App from './App/App.tsx';
import { AuthProvider } from "./components/AuthContext/AuthContext.tsx";

createRoot(document.getElementById('root')!).render(
<AuthProvider>
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>
</AuthProvider>,
)