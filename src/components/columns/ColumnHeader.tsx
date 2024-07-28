import React, { Dispatch, ReactElement } from 'react';
import { BoardPagePhases } from '@/pages/ui/board';
import styles from '@/styles/components/columns.module.css';
import Button from '@/components/buttons/Button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export interface ColumnHeaderProperties {
	phase: BoardPagePhases;
	setPhase: Dispatch<React.SetStateAction<BoardPagePhases>>;
	name?: string;
}

export default function ColumnHeader(props: ColumnHeaderProperties): ReactElement {
	const clickOnAddColumn = () => {
		props.setPhase(BoardPagePhases.DONE);
	};

	switch (props.phase) {
		case BoardPagePhases.WAITING_FOR_CREATING:
			return (
				<div className={styles.columnHeader}>
					<Button onClick={clickOnAddColumn} text={'New column'} iconProps={{ icon: faPlus }} />
				</div>
			);
		case BoardPagePhases.EDITING:
			return <div className={styles.columnHeader}>editing</div>;
		case BoardPagePhases.DONE:
			return (
				<div className={styles.columnHeader} style={{ backgroundColor: 'darkgrey', paddingLeft: 15 }}>
					{props.name}
				</div>
			);
	}
}
