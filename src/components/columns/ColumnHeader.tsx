import React, { Dispatch, ReactElement, useState } from 'react';
import styles from '@/styles/components/columns.module.css';
import Button, { ButtonTypes } from '@/components/buttons/Button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import InputText from '@/components/inputs/InputText';
import LoadingButton from '@/components/buttons/LoadingButton';
import { API } from '@/api/index';
import { ColumnCreateDto } from '@/db/types/dto/columns';
import { LOGGER } from '@/services/logger';
import { ColumnModelType } from '@/db/types/models/ColumnModelType';
import { Phases } from '@/enums/Phases';
import Error from '@/components/Error';

export interface ColumnHeaderProperties {
	phase: Phases;
	setPhase: Dispatch<React.SetStateAction<Phases>>;
	boardId: string;
	data?: ColumnModelType;
}

export default function ColumnHeader(props: ColumnHeaderProperties): ReactElement {
	const [loading, setLoading] = useState<boolean>(false);
	const [name, setName] = useState<string | null>(null);
	const [inputValue, setInputValue] = useState<string>('');
	const [error, setError] = useState<string | null>(null);

	const clickOnAddColumn = () => {
		props.setPhase(Phases.EDITING);
	};

	const clickOnSaveButton = () => {
		const _data: ColumnCreateDto = {
			name: inputValue,
			order: 10,
			cards: [],
			boardId: props.boardId,
		};
		setLoading(true);
		setError(null);
		API.QUERIES.COLUMNS.createColumn(props.boardId, _data)
			.then(data => {
				if (data && 'reason' in data) {
					setError(data.message || data.reason);
				} else {
					setName(data.column_inserted.name);
					props.setPhase(Phases.DONE);
				}
			})
			.catch(error => {
				LOGGER.print_stack(error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	switch (props.phase) {
		case Phases.WAITING_FOR_CREATING:
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
		case Phases.EDITING:
			return (
				<div className={styles.columnHeader} style={{ gap: 10 }}>
					<InputText value={inputValue} setValue={setInputValue} />
					<LoadingButton
						type={ButtonTypes.PLAIN}
						loading={loading}
						onClick={clickOnSaveButton}
						text={'Done'}
					/>
					{error && <Error message={error} />}
				</div>
			);
		case Phases.DONE:
			return (
				<h3 className={styles.columnHeader} style={{ height: 40 }}>
					{name || (props.data && props.data.name)}
				</h3>
			);
	}
}
