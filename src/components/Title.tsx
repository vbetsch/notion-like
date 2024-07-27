import React from 'react';
import { ReactElement } from 'react';

interface TitleProperties {
	text: string;
}

export default function Title(props: TitleProperties): ReactElement {
	return <h1 className={'title'}>{props.text}</h1>;
}
