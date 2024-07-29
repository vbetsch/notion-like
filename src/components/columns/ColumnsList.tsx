import React, { Dispatch, ReactElement } from 'react';
import DynamicLoading from '@/components/loading/DynamicLoading';
import styles from '@/styles/components/columns.module.css';
import ColumnItem from '@/components/columns/ColumnItem';
import { ColumnModelType } from '@/db/types/models/ColumnModelType';
import { Phases } from '@/enums/Phases';

export interface ColumnsListProperties {
	loading: boolean;
	columns: ColumnModelType[];
	dynamicPhase: Phases;
	staticPhase: Phases;
	setPhase: Dispatch<React.SetStateAction<Phases>>;
	boardId: string;
}

export default function ColumnsList(props: ColumnsListProperties): ReactElement {
	return (
		<DynamicLoading loading={props.loading}>
			<div className={styles.columnContainer}>
				<div className={styles.columnsList}>
					{props.columns &&
						props.columns.map((column: ColumnModelType, key: number) => (
							<ColumnItem
								key={key}
								phase={props.staticPhase}
								setPhase={props.setPhase}
								boardId={props.boardId}
								data={column}
							/>
						))}
					<ColumnItem phase={props.dynamicPhase} setPhase={props.setPhase} boardId={props.boardId} />
				</div>
			</div>
		</DynamicLoading>
	);
}
