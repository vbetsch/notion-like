import React, { useEffect, useState } from 'react';
import { ReactElement } from 'react';
import ColumnHeader, { ColumnHeaderProperties } from '@/components/columns/ColumnHeader';
import styles from '@/styles/components/columns.module.css';
import { Phases } from '@/enums/Phases';
import CardsList from '@/components/cards/CardsList';
import { CardModelType } from '@/db/types/models/CardModelType';
import { API } from '@/api/index';
import { LOGGER } from '@/services/logger';

interface ColumnProperties extends ColumnHeaderProperties {}

export default function ColumnItem(props: ColumnProperties): ReactElement {
	const [phase, setPhase] = useState<Phases>(Phases.WAITING_FOR_CREATING);
	const [loading, setLoading] = useState<boolean>(false);
	const [cards, setCards] = useState<CardModelType[]>([]);

	useEffect(() => {
		if (!props.data) {
			return;
		}
		setLoading(true);
		API.QUERIES.CARDS.getCards(props.data._id as string)
			.then(data => {
				data && 'cards' in data ? setCards(data.cards) : LOGGER.print_no_data('cards');
			})
			.catch(error => {
				LOGGER.print_stack(error);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return (
		<div className={styles.columnItem}>
			<ColumnHeader phase={props.phase} setPhase={props.setPhase} boardId={props.boardId} data={props.data} />
			{props.phase === Phases.DONE && (
				<CardsList
					loading={loading}
					cards={cards}
					columnId={(props.data && (props.data._id as string)) || ''}
					dynamicPhase={phase}
					staticPhase={Phases.DONE}
					setPhase={setPhase}
				/>
			)}
		</div>
	);
}
