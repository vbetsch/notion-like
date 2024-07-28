import React, { ReactElement } from 'react';
import Button, { ButtonProperties, ButtonTypes } from '@/components/buttons/Button';

export interface LoadingButtonProperties extends ButtonProperties {
	loading: boolean;
}

export default function LoadingButton(props: LoadingButtonProperties): ReactElement {
	return (
		<Button
			type={props.loading ? ButtonTypes.LOADING : props.type}
			text={props.loading ? 'Loading...' : props.text}
			iconProps={props.iconProps}
			onClick={props.onClick}
		/>
	);
}
