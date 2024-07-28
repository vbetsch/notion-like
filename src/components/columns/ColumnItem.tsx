import React from 'react';
import { ReactElement } from 'react';
import ColumnHeader, { ColumnHeaderProperties } from '@/components/columns/ColumnHeader';
import styles from '@/styles/components/columns.module.css';

interface ColumnProperties extends ColumnHeaderProperties {}

export default function ColumnItem(props: ColumnProperties): ReactElement {
	return (
		<div className={styles.columnItem}>
			<ColumnHeader phase={props.phase} setPhase={props.setPhase} name={props.name} />
			<div>
				<p>card</p>
				<p>card</p>
				<p>card</p>
			</div>
		</div>
	);
}
