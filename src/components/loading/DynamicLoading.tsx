import React, { ReactElement } from 'react';
import Loading from './Loading';

interface DynamicProperties {
	loading: boolean;
	children: ReactElement;
}

export default function DynamicLoading(props: DynamicProperties): ReactElement {
	return <div className={'loadingContainer'}>{props.loading ? <Loading /> : props.children}</div>;
}
