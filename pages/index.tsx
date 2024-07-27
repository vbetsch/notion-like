import React, { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import DynamicLoading from '@/components/loading/DynamicLoading';
import { DATA } from '@/services/data';
import { API } from '@/api/index';

export default function Home(): ReactElement {
	const [loading, setLoading] = useState<boolean>(false);
	const [hello, setHello] = useState<string>('');

	useEffect(() => {
		DATA.getData(API.QUERIES.HELLO.getHelloWorld(), setHello, setLoading, 'No hello were found');
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
