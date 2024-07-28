import React, { useEffect, useState } from 'react';
import { ReactElement } from 'react';
import { useSearchParams } from 'next/navigation';
import { API } from '@/api/index';
import { LOGGER } from '@/services/logger';
import DynamicLoading from '@/components/loading/DynamicLoading';
import Title from '@/components/Title';
import { BoardModelType } from '@/db/types/models/BoardModelType';

export default function BoardPage(): ReactElement {
	const [loading, setLoading] = useState<boolean>(true);
	const [board, setBoard] = useState<BoardModelType | null>(null);
	const searchParams = useSearchParams();
	const searchId = searchParams.get('id');

	useEffect(() => {
		if (!searchId) {
			setLoading(false);
		} else {
			API.QUERIES.BOARDS.getOneBoard(searchId)
				.then(data => {
					data ? setBoard(data.board) : LOGGER.print_no_data('board');
				})
				.catch(error => {
					LOGGER.print_stack(error);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}, [searchId]);

	return (
		<DynamicLoading loading={loading}>
			<Title
				text={searchId && board ? `${board.name}` : `No board found ${searchId ? `with id ${searchId}` : ''}`}
			/>
		</DynamicLoading>
	);
}
