import React, { ReactElement } from 'react';
import { BoardType } from '@/types/db/BoardType';
import styles from '@/styles/components/boards.module.css';

export interface BoardItemProperties {
	board: BoardType;
}

export default function BoardItem(props: BoardItemProperties): ReactElement {
	return (
		<div className={styles.boardItem}>
			<div>{props.board.name}</div>
		</div>
	);
}
