import React, { Dispatch } from 'react';
import { ReactElement } from 'react';
import { Phases } from '@/enums/Phases';
import { CardModelType } from '@/db/types/models/CardModelType';

interface CardItemProperties {
	phase: Phases;
	setPhase: Dispatch<React.SetStateAction<Phases>>;
	columnId: string;
	data?: CardModelType;
}

export default function CardItem(props: CardItemProperties): ReactElement {
	switch (props.phase) {
		case Phases.WAITING_FOR_CREATING:
			return <div>WAITING_FOR_CREATING</div>;
		case Phases.EDITING:
			return <div>EDITING</div>;
		case Phases.DONE:
			return <div>{props.data && props.data.name}</div>;
	}
}
