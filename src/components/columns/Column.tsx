import React, { Dispatch } from 'react';
import { ReactElement } from 'react';
import { BoardPagePhases } from '@/pages/ui/board';

interface ColumnProperties {
	phase: BoardPagePhases;
	setPhase: Dispatch<React.SetStateAction<BoardPagePhases>>;
	name?: string;
}

export default function Column(props: ColumnProperties): ReactElement {
	switch (props.phase) {
		case BoardPagePhases.WAITING_FOR_CREATING:
			return <div>waiting for creation</div>;
		case BoardPagePhases.EDITING:
			return <div>editing</div>;
		case BoardPagePhases.DONE:
			return <div>done</div>;
	}
}
