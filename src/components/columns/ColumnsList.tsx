import React, { Dispatch, ReactElement } from 'react';
import DynamicLoading from '@/components/loading/DynamicLoading';
import styles from '@/styles/components/boards.module.css';
import Column from '@/components/columns/Column';
import { BoardPagePhases } from '@/pages/ui/board';
import { ColumnDto } from '@/db/types/dto/columns';

export interface ColumnsListProperties {
	loading: boolean;
	// columns: ColumnModelType[];
	columns: ColumnDto[];
	phase: BoardPagePhases;
	setPhase: Dispatch<React.SetStateAction<BoardPagePhases>>;
}

export default function ColumnsList(props: ColumnsListProperties): ReactElement {
	return (
		<DynamicLoading loading={props.loading}>
			<div className={styles.boardsList}>
				{props.columns &&
					// props.columns.map((column: ColumnModelType, key: number) => (
					props.columns.map((column: ColumnDto, key: number) => (
						<Column key={key} phase={props.phase} setPhase={props.setPhase} name={column.name} />
					))}
			</div>
		</DynamicLoading>
	);
}
