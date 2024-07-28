import React from 'react';
import { ReactElement } from 'react';
// import styles from '@/styles/components/inputs.module.css';

export interface InputTextProperties {}

export default function InputText(props: InputTextProperties): ReactElement {
	return <input type="text" />;
}
