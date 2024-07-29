import React, { Dispatch, ReactElement } from 'react';
import DynamicLoading from '@/components/loading/DynamicLoading';
import { CardModelType } from '@/db/types/models/CardModelType';
import CardItem from '@/components/cards/CardItem';
import { Phases } from '@/enums/Phases';
import styles from '@/styles/components/cards.module.css';

export interface CardsListProperties {
	loading: boolean;
	cards: CardModelType[];
	dynamicPhase: Phases;
	staticPhase: Phases;
	setPhase: Dispatch<React.SetStateAction<Phases>>;
	columnId: string;
}

export default function CardsList(props: CardsListProperties): ReactElement {
	return (
		<DynamicLoading loading={props.loading}>
			<div className={styles.cardsList}>
				{props.cards &&
					props.cards.map((card: CardModelType, key: number) => (
						<CardItem
							key={key}
							phase={props.staticPhase}
							setPhase={props.setPhase}
							columnId={props.columnId}
							data={card}
						/>
					))}
				<CardItem phase={props.dynamicPhase} setPhase={props.setPhase} columnId={props.columnId} />
			</div>
		</DynamicLoading>
	);
}
