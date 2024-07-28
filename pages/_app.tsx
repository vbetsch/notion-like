import '@/public/css/index.css';
import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Notion Like</title>
			</Head>
			<main>
				<Component {...pageProps} />
			</main>
		</>
	);
}
