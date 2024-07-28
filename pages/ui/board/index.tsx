import React, { useEffect, useState } from 'react';
import { ReactElement } from 'react';
import { useSearchParams } from 'next/navigation';
import { API } from '@/api/index';
import { LOGGER } from '@/services/logger';
import DynamicLoading from '@/components/loading/DynamicLoading';
import Title from '@/components/Title';
import { BoardModelType } from '@/db/types/models/BoardModelType';
import styles from '@/styles/pages/boardPage.module.css';
import Column from '@/components/columns/Column';

export enum BoardPagePhases {
	WAITING_FOR_CREATING = 0,
	EDITING = 1,
	DONE = 2,
}

export default function BoardPage(): ReactElement {
	const [phase, setPhase] = useState<BoardPagePhases>(BoardPagePhases.WAITING_FOR_CREATING);
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
			<div className={styles.boardPage}>
				<Title
					text={
						searchId && board ? `${board.name}` : `No board found ${searchId ? `with id ${searchId}` : ''}`
					}
				/>
				{searchId && board && <Column phase={BoardPagePhases.DONE} setPhase={setPhase} />}
				{searchId && board && <Column phase={phase} setPhase={setPhase} />}
			</div>
		</DynamicLoading>
	);
}
