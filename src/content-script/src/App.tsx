/// <reference types="chrome" />
import { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';
import BaseAPI from '../../Api/BaseAPI';
import Loader from '../../components/Loader';

function App() {
	const [aiText, setAiText] = useState<String>('');
	const [isLoading, setIsLoading] = useState<Boolean>(false);
	const timer = useRef<NodeJS.Timer | null>(null);

	useEffect(() => {
		chrome.runtime.onMessage.addListener(receiveMessage);
	}, []);

	const receiveMessage = useCallback(
		(message: { action: string; text: string }) => {
			console.log('onMessageReceive');
			if (message.action === 'highlight') {
				debounce(messageApi, 2000)(message.text);
			}
			chrome.runtime.onMessage.removeListener(receiveMessage);
		},
		[]
	);

	const debounce = useCallback((func: Function, time: number) => {
		return (...args: any[]) => {
			if (timer.current) {
				clearInterval(timer.current);
			}
			timer.current = setTimeout(() => {
				func(...args);
			}, time);
		};
	}, []);

	const messageApi = (text: string) => {
		try {
			chrome.storage.sync.get('userData', async (data) => {
				setIsLoading(true);
				let payload = JSON.stringify({
					text: text,
					id: data?.userData?.id,
				});

				const response = await BaseAPI.post('call-openai-api', payload, {
					headers: { 'Content-Type': 'application/json' },
				});
				if (response?.data?.data?.statusCode === 200) {
					setAiText(response.data.data.text);
					setIsLoading(false);
				}
			});
		} catch (error: any) {
			setIsLoading(false);
		}
	};
	const closePopUp = () => {
		document !== null &&
			document.getElementById('tmp-chrome-ext') &&
			document.getElementById('tmp-chrome-ext')?.remove();
	};

	return (
		<div className="">
			<header className="">
				<div className="tooltip-box">
					<img
						src="https://cdn3.iconfinder.com/data/icons/pyconic-icons-1-2/512/close-512.png"
						className="close-icon"
						alt=""
						onClick={closePopUp}
					/>
					{isLoading ? <Loader /> : <p className="text">{aiText}</p>}
				</div>
			</header>
		</div>
	);
}

export default App;
