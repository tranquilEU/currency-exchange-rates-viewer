import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from '@/shared/store/store';

import App from '@/App';

import './shared/styles/index.scss';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<App />
				</LocalizationProvider>
			</Provider>
		</QueryClientProvider>
	</StrictMode>
);
