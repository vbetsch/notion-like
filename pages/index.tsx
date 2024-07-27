import React, { ReactElement, useEffect, useState } from 'react';
import Title from '@/components/Title';
import BoardsList from '@/components/boards/BoardsList';
import { BoardType } from '@/types/db/BoardType';
import { LOGGER } from '@/services/logger';
import { API } from '@/api/index';
import styles from '@/styles/pages/boardsPage.module.css';

export default function Home(): ReactElement {
	const [boards, setBoards] = useState<BoardType[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		API.QUERIES.BOARDS.getBoards()
			.then(data => {
				console.log('(27/07/2024 17:36)  @victor  [ index.tsx:16 ]  data  ', data);
				data ? setBoards(data.boards) : LOGGER.print_no_data('boards');
			})
			.catch(error => {
				LOGGER.print_stack(error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return (
		<div className={styles.boardsPage}>
			<Title text={'Boards'} />
			<BoardsList boards={boards} loading={loading} />
		</div>
	);
}
