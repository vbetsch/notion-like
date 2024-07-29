import React, { Dispatch, useState } from 'react';
import { ReactElement } from 'react';
import { Phases } from '@/enums/Phases';
import { CardModelType } from '@/db/types/models/CardModelType';
import Button, { ButtonTypes } from '@/components/buttons/Button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import InputText from '@/components/inputs/InputText';
import LoadingButton from '@/components/buttons/LoadingButton';
import { API } from '@/api/index';
import { LOGGER } from '@/services/logger';
import { CardCreateDto } from '@/db/types/dto/cards';
import Error from '@/components/Error';

interface CardItemProperties {
	phase: Phases;
	setPhase: Dispatch<React.SetStateAction<Phases>>;
	columnId: string;
	data?: CardModelType;
}

export default function CardItem(props: CardItemProperties): ReactElement {
	const [name, setName] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>('');
	const [error, setError] = useState<string | null>(null);

	const clickOnAddCard = () => {
		props.setPhase(Phases.EDITING);
	};

	const clickOnSaveButton = () => {
		const _data: CardCreateDto = {
			name: inputValue,
			columnId: props.columnId,
		};
		setLoading(true);
		setError(null);
		API.QUERIES.CARDS.createCards(props.columnId, _data)
			.then(data => {
				if (data && 'reason' in data) {
					setError(data.message || data.reason);
				} else {
					setName(data.card_inserted.name);
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
				<div>
					<Button
						type={ButtonTypes.DISCREET}
						onClick={clickOnAddCard}
						text={'New card'}
						iconProps={{ icon: faPlus }}
					/>
				</div>
			);
		case Phases.EDITING:
			return (
				<div style={{ gap: 10 }}>
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
			return <div>{name || (props.data && props.data.name)}</div>;
	}
}
