import React, { ReactElement } from 'react';
import DynamicLoading from '@/components/loading/DynamicLoading';
import Button, { ButtonProperties } from '@/components/buttons/Button';

export interface LoadingButtonProperties extends ButtonProperties {
	loading: boolean;
}

export default function LoadingButton(props: LoadingButtonProperties): ReactElement {
	return (
		<DynamicLoading loading={props.loading}>
			<Button text={props.text} iconProps={props.iconProps} onClick={props.onClick} />
		</DynamicLoading>
	);
}
