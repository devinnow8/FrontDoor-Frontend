import React, { useState, useEffect } from 'react';

const ExtensionToggle: React.FC = () => {
	const [isEnabled, setIsEnabled] = useState<boolean>(false);

	useEffect(() => {
		chrome.storage.sync.get('isEnabled', (data) => {
			setIsEnabled(!!data.isEnabled);
		});
	}, []);

	const toggleExtension = () => {
		const newStatus = !isEnabled;
		setIsEnabled(newStatus);

		chrome.contextMenus.update('highlight', {
			enabled: newStatus,
			visible: newStatus,
		});

		chrome.storage.sync.set({ isEnabled: newStatus }, () => {});
	};

	return (
		<>
			<label className="switch">
				<input type="checkbox" checked={isEnabled} onClick={toggleExtension} />
				<span className="slider round"></span>
			</label>
		</>
	);
};

export default ExtensionToggle;
