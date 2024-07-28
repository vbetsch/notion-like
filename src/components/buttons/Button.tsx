import React from 'react';
import { ReactElement } from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

export enum ButtonTypes {
	DISCREET = 'discreet',
	PLAIN = 'plain',
}

export interface ButtonProperties {
	type: ButtonTypes;
	text: string;
	iconProps?: FontAwesomeIconProps;
	onClick: () => void;
}

export default function Button(props: ButtonProperties): ReactElement {
	return (
		<button className={'button ' + props.type} onClick={props.onClick}>
			{props.iconProps && <FontAwesomeIcon icon={props.iconProps.icon} />}
			<span>{props.text}</span>
		</button>
	);
}
