import React from 'react';
import { ReactElement } from 'react';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import styles from '@/styles/components/button.module.css';

export interface ButtonProperties {
	text: string;
	iconProps?: FontAwesomeIconProps;
	onClick: () => void;
}

export default function Button(props: ButtonProperties): ReactElement {
	return (
		<button className={styles.button} onClick={props.onClick}>
			{props.iconProps && <FontAwesomeIcon icon={props.iconProps.icon} />}
			<span>{props.text}</span>
		</button>
	);
}
