import React, { Dispatch, ReactElement } from 'react';
import DynamicLoading from '@/components/loading/DynamicLoading';
import styles from '@/styles/components/columns.module.css';
import ColumnItem from '@/components/columns/ColumnItem';
import { BoardPagePhases } from '@/pages/ui/board';
import { ColumnDto } from '@/db/types/dto/columns';

export interface ColumnsListProperties {
	loading: boolean;
	// columns: ColumnModelType[];
	columns: ColumnDto[];
	dynamicPhase: BoardPagePhases;
	staticPhase: BoardPagePhases;
	setPhase: Dispatch<React.SetStateAction<BoardPagePhases>>;
	boardId: string;
}

export default function ColumnsList(props: ColumnsListProperties): ReactElement {
	return (
		<DynamicLoading loading={props.loading}>
			<div className={styles.columnsList}>
				{props.columns &&
					// props.columns.map((column: ColumnModelType, key: number) => (
					props.columns.map((column: ColumnDto, key: number) => (
						<ColumnItem
							key={key}
							phase={props.staticPhase}
							setPhase={props.setPhase}
							name={column.name}
							boardId={props.boardId}
						/>
					))}
				<ColumnItem phase={props.dynamicPhase} setPhase={props.setPhase} boardId={props.boardId} />
			</div>
		</DynamicLoading>
	);
}
