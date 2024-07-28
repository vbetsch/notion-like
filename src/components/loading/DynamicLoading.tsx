import React, { ReactElement } from 'react';
import Loading from './Loading';
import styles from '@/styles/components/loading.module.css';

export interface DynamicLoadingProperties {
	loading: boolean;
	children: ReactElement;
}

export default function DynamicLoading(props: DynamicLoadingProperties): ReactElement {
	return <div className={styles.dynamicLoading}>{props.loading ? <Loading /> : props.children}</div>;
}
