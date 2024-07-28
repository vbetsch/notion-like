import React, { Dispatch } from 'react';
import { ReactElement } from 'react';

export interface InputTextProperties {
	value: string;
	setValue: Dispatch<React.SetStateAction<string>>;
}

export default function InputText(props: InputTextProperties): ReactElement {
	return <input type="text" value={props.value} onChange={e => props.setValue(e.target.value)} />;
}
