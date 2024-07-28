import React, { ReactElement } from 'react';
import Loading from './Loading';

export interface DynamicLoadingProperties {
	loading: boolean;
	children: ReactElement;
}

export default function DynamicLoading(props: DynamicLoadingProperties): ReactElement {
	return <div className={'loadingContainer'}>{props.loading ? <Loading /> : props.children}</div>;
}
