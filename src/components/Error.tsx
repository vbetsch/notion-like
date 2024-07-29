import React from 'react';
import { ReactElement } from 'react';
import styles from '@/styles/components/error.module.css';

interface ErrorProperties {
	message: string;
}

export default function Error(props: ErrorProperties): ReactElement {
	return <span className={styles.error}>{props.message}</span>;
}
