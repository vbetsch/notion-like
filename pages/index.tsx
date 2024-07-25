import React from 'react';
import { useEffect, useState } from 'react';
import { DATA } from '../src/services/data';
import { API } from '../src/api';
import DynamicLoading from '../src/components/loading/DynamicLoading';

export default function Home(): JSX.Element {
	const [loading, setLoading] = useState<boolean>(false);
	const [hello, setHello] = useState<string>('');

	useEffect(() => {
		DATA.getData(API.QUERIES.getHelloWorld(), setHello, setLoading, 'No hello were found');
	}, []);

	return (
		<div>
			<p>hello world</p>
			<DynamicLoading loading={loading}>
				<span>{hello}</span>
			</DynamicLoading>
		</div>
	);
}
