import React, { useEffect, useState } from 'react';
import { ReactElement } from 'react';
import { useSearchParams } from 'next/navigation';
import { API } from '@/api/index';
import { LOGGER } from '@/services/logger';
import DynamicLoading from '@/components/loading/DynamicLoading';
import Title from '@/components/Title';
import styles from '@/styles/pages/boardPage.module.css';
import Column from '@/components/columns/Column';
import ColumnsList from '@/components/columns/ColumnsList';
import { BoardModelType } from '@/db/types/models/BoardModelType';
import { ColumnDto } from '@/db/types/dto/columns';

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
	// const [columns, setColumns] = useState<ColumnModelType[]>([]);
	const [columns, setColumns] = useState<ColumnDto[]>([]);
	const searchParams = useSearchParams();
	const searchId = searchParams.get('id');

	const getBoard = () => {
		if (!searchId) {
			setBoardLoading(false);
		} else {
			API.QUERIES.BOARDS.getOneBoard(searchId)
				.then(data => {
					data ? setBoard(data.board) : LOGGER.print_no_data('board');
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
		console.log('(28/07/2024 22:00)  @victor  [ index.tsx:51 ]  3');
		setColumnsLoading(true);
		const _data: ColumnDto[] = [
			{
				_id: 'test1',
				name: 'Todo',
				order: 1,
				cards: [],
				boardId: 'test',
			},
			{
				_id: 'test2',
				name: 'In Progress',
				order: 2,
				cards: [],
				boardId: 'test',
			},
			{
				_id: 'test3',
				name: 'Done',
				order: 3,
				cards: [],
				boardId: 'test',
			},
		];
		setColumns(_data);
		setColumnsLoading(false);
	};

	useEffect(() => {
		console.log('(28/07/2024 21:59)  @victor  [ index.tsx:80 ]  1');
		getBoard();
	}, [searchId]);

	useEffect(() => {
		console.log('(28/07/2024 22:00)  @victor  [ index.tsx:83 ]  2');
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
						phase={BoardPagePhases.DONE}
						setPhase={setPhase}
					/>
				)}
				{searchId && board && <Column phase={phase} setPhase={setPhase} />}
			</div>
		</DynamicLoading>
	);
}
