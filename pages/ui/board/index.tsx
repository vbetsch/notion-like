import React, { useEffect, useState } from 'react';
import { ReactElement } from 'react';
import { useSearchParams } from 'next/navigation';
import { API } from '@/api/index';
import { LOGGER } from '@/services/logger';
import DynamicLoading from '@/components/loading/DynamicLoading';
import Title from '@/components/Title';
import styles from '@/styles/pages/boardPage.module.css';
import ColumnsList from '@/components/columns/ColumnsList';
import { BoardModelType } from '@/db/types/models/BoardModelType';
import { ColumnModelType } from '@/db/types/models/ColumnModelType';

export enum BoardPagePhases {
	WAITING_FOR_CREATING = 0,
	EDITING = 1,
	DONE = 2,
}

export default function BoardPage(): ReactElement {
	const [phase, setPhase] = useState<BoardPagePhases>(BoardPagePhases.WAITING_FOR_CREATING);
	const [boardLoading, setBoardLoading] = useState<boolean>(true);
	const [columnsLoading, setColumnsLoading] = useState<boolean>(false);
	const [board, setBoard] = useState<BoardModelType | null>(null);
	const [columns, setColumns] = useState<ColumnModelType[]>([]);
	const searchParams = useSearchParams();
	const searchId = searchParams.get('id');

	const getBoard = () => {
		if (!searchId) {
			setBoardLoading(false);
		} else {
			API.QUERIES.BOARDS.getOneBoard(searchId)
				.then(data => {
					data && 'board' in data ? setBoard(data.board) : LOGGER.print_no_data('board');
				})
				.catch(error => {
					LOGGER.print_stack(error);
				})
				.finally(() => {
					setBoardLoading(false);
				});
		}
	};

	const getColumns = () => {
		if (!searchId || !board) {
			return;
		}
		setColumnsLoading(true);
		API.QUERIES.COLUMNS.getColumns(board._id as string)
			.then(data => {
				data && 'columns' in data ? setColumns(data.columns) : LOGGER.print_no_data('columns');
			})
			.catch(error => {
				LOGGER.print_stack(error);
			})
			.finally(() => {
				setColumnsLoading(false);
			});
	};

	useEffect(() => {
		getBoard();
	}, [searchId]);

	useEffect(() => {
		getColumns();
	}, [board]);

	return (
		<DynamicLoading loading={boardLoading}>
			<div className={styles.boardPage}>
				<Title
					text={
						searchId && board ? `${board.name}` : `No board found ${searchId ? `with id ${searchId}` : ''}`
					}
				/>
				{searchId && board && (
					<ColumnsList
						loading={columnsLoading}
						columns={columns}
						dynamicPhase={phase}
						staticPhase={BoardPagePhases.DONE}
						setPhase={setPhase}
						boardId={board._id as string}
					/>
				)}
			</div>
		</DynamicLoading>
	);
}
