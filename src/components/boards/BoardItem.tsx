import React, { ReactElement } from 'react';
import { BoardType } from '@/types/db/BoardType';
import styles from '@/styles/components/boards.module.css';
import { useRouter } from 'next/navigation';

export interface BoardItemProperties {
	board: BoardType;
}

export default function BoardItem(props: BoardItemProperties): ReactElement {
	const router = useRouter();

	const clickOnBoard = () => {
		router.push(`/board/${props.board._id}`);
	};

	return (
		<div className={styles.boardItem} onClick={clickOnBoard}>
			<div>{props.board.name}</div>
		</div>
	);
}
