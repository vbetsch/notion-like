import React, { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import DynamicLoading from '@/components/loading/DynamicLoading';
import { API } from '@/api/index';
import { LOGGER } from '@/services/logger';

export default function Home(): ReactElement {
	const [loading, setLoading] = useState<boolean>(false);
	const [hello, setHello] = useState<string>('');

	useEffect(() => {
		setLoading && setLoading(true);
		API.QUERIES.HELLO.getHelloWorld()
			.then(data => {
				data ? setHello(data.hello) : LOGGER.print_no_data('hello');
			})
			.catch(error => {
				LOGGER.print_stack(error);
			})
			.finally(() => {
				setLoading && setLoading(false);
			});
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
