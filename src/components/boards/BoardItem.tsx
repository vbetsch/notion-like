import React, { ReactElement } from 'react';
import styles from '@/styles/components/boards.module.css';
import { useRouter } from 'next/router';
import { BoardType } from '@/db/types/BoardType';

export interface BoardItemProperties {
	board: BoardType;
}

export default function BoardItem(props: BoardItemProperties): ReactElement {
	const router = useRouter();

	const clickOnBoard = () => {
		router
			.push({
				pathname: '/ui/board',
				query: { id: props.board._id as string },
			})
			.then()
			.catch();
	};

	return (
		<div className={styles.boardItem} onClick={clickOnBoard}>
			<div>{props.board.name}</div>
		</div>
	);
}
