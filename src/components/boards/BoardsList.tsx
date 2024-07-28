import React, { ReactElement } from 'react';
import BoardItem from '@/components/boards/BoardItem';
import DynamicLoading from '@/components/loading/DynamicLoading';
import styles from '@/styles/components/boards.module.css';
import { BoardModelType } from '@/db/types/models/BoardModelType';

export interface BoardsListProperties {
	boards: BoardModelType[];
	loading: boolean;
}

export default function BoardsList(props: BoardsListProperties): ReactElement {
	return (
		<DynamicLoading loading={props.loading}>
			<div className={styles.boardsList}>
				{props.boards &&
					props.boards.map((board: BoardModelType, key: number) => <BoardItem key={key} board={board} />)}
			</div>
		</DynamicLoading>
	);
}
