import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { Block } from "@blocknote/core";


const BlockNoteComponent: React.FC<{ blocks: Block[] }> = ({ blocks }) => {
	const editor = useCreateBlockNote({
		initialContent: blocks,
	});

	const setStorage = async (key: string, data: any) => {
		console.log(`saving to storage ${key}`, data);
		return await chrome.storage.local.set({ [key]: JSON.stringify(data) });
	};

	return <BlockNoteView
		theme={'light'}
		onChange={async () => {
			await setStorage('editorData', editor.document);
		}}
		editor={editor}
	/>;
}

const SidePanel: React.FC = () => {

	const getStorage = async <T = any>(key: string, log: boolean = true) => {
		const a: { [key: string]: string } = await chrome.storage.local.get([key]);
		log && console.log(`retrieved from storage ${key}`, a[key]);
		return JSON.parse(a[key]) as T;
	};

	const [blocks, setBlocks] = useState<Block[] | undefined>(undefined);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getStorage('editorData');
				if (data) {
					setBlocks(data);
				} else {
					setBlocks(undefined);
				}
			} catch (error) {
				console.error('Error loading data from storage:', error);
				setBlocks(undefined);
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);

	useEffect(() => {
		console.log('Blocks updated:', blocks);
	}, [blocks]);

	// Don't render the editor until we've loaded the initial data
	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="side-panel py-6">
			{blocks ? (
				<BlockNoteComponent blocks={blocks} />
			) : (
				<p>No data found. Please add some content.</p>
			)}
		</div>
	);

};

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<SidePanel />
	</React.StrictMode>
);
