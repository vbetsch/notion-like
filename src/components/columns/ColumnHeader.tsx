import React, { Dispatch, ReactElement, useState } from 'react';
import { BoardPagePhases } from '@/pages/ui/board';
import styles from '@/styles/components/columns.module.css';
import Button, { ButtonTypes } from '@/components/buttons/Button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import InputText from '@/components/inputs/InputText';
import LoadingButton from '@/components/buttons/LoadingButton';

export interface ColumnHeaderProperties {
	phase: BoardPagePhases;
	setPhase: Dispatch<React.SetStateAction<BoardPagePhases>>;
	name?: string;
}

export default function ColumnHeader(props: ColumnHeaderProperties): ReactElement {
	const [loading, setLoading] = useState<boolean>(false);

	const clickOnAddColumn = () => {
		props.setPhase(BoardPagePhases.EDITING);
	};

	const clickOnSaveButton = () => {
		props.setPhase(BoardPagePhases.DONE);
	};

	switch (props.phase) {
		case BoardPagePhases.WAITING_FOR_CREATING:
			return (
				<div className={styles.columnHeader} style={{ height: 40 }}>
					<Button
						type={ButtonTypes.DISCREET}
						onClick={clickOnAddColumn}
						text={'New column'}
						iconProps={{ icon: faPlus }}
					/>
				</div>
			);
		case BoardPagePhases.EDITING:
			return (
				<div className={styles.columnHeader}>
					<InputText />
					<LoadingButton
						type={ButtonTypes.PLAIN}
						loading={loading}
						onClick={clickOnSaveButton}
						text={'Done'}
					/>
				</div>
			);
		case BoardPagePhases.DONE:
			return (
				<div
					className={styles.columnHeader}
					style={{ height: 40, backgroundColor: 'darkgrey', paddingLeft: 15 }}
				>
					{props.name}
				</div>
			);
	}
}
