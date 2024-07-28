import React, { Dispatch } from 'react';
import { ReactElement } from 'react';
import { BoardPagePhases } from '@/pages/ui/board';
import styles from '@/styles/components/columns.module.css';
import Button from '@/components/buttons/Button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface ColumnProperties {
	phase: BoardPagePhases;
	setPhase: Dispatch<React.SetStateAction<BoardPagePhases>>;
	name?: string;
}

export default function ColumnItem(props: ColumnProperties): ReactElement {
	const clickOnAddColumn = () => {
		props.setPhase(BoardPagePhases.DONE);
	};

	switch (props.phase) {
		case BoardPagePhases.WAITING_FOR_CREATING:
			return (
				<div className={styles.columnItem}>
					<Button onClick={clickOnAddColumn} text={'New column'} iconProps={{ icon: faPlus }} />
				</div>
			);
		case BoardPagePhases.EDITING:
			return <div className={styles.columnItem}>editing</div>;
		case BoardPagePhases.DONE:
			return (
				<div className={styles.columnItem} style={{ backgroundColor: 'darkgrey', height: 50 }}>
					{props.name}
				</div>
			);
	}
}
