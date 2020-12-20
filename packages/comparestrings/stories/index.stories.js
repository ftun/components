import React, { useState } from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import CompareStrings from '../src/index';

export default {
	title: 'Compare Strings',
	component: CompareStrings,
	decorators: [withKnobs],
};

export const defaultRender = () => {
	const _stringOriginal = text('Original Text', 'Texto Original 1');
	const _stringNew = text('Change Text', 'Texto Nuevo 2');

	const _validation = {
		NORMAL : 0,
		INSERTS : 1,
		DELETES : 2
	};
	const [state, setState] = useState({validation:"",stringValidation:""});


    return  <div className="row">
				<div className="col s12 m12">
					<h6>Validation {state.validation}</h6>
					<iframe srcDoc={state.stringValidation} width="100%" height="80"></iframe>
					<br/>
				</div>
				<div className="col s12 m4 l4 text-center">
					<button type="button" className="btn btn-success hollow" onClick={() => {
						setState({stringValidation: ""});
						setState({validation:"Normal (Insert and Deletes)", stringValidation:  CompareStrings(_stringOriginal, _stringNew)});
					}}>
						Normal(Inserts,Deletes)
					</button>
				</div>
				<div className="col s12 m4 l4 text-center">
					<button type="button" className="btn hollow" onClick={() => {
						setState({stringValidation: ""});
						setState({validation:"Only Inserts", stringValidation: CompareStrings(_stringOriginal, _stringNew, _validation.INSERTS)});
					}}>
						Only Inserts
					</button>
				</div>
				<div className="col s12 m4 l4 text-center">
					<button type="button" className="btn btn-danger" onClick={() => {
						setState({stringValidation: ""});
						setState({validation:"Only Deletes", stringValidation: CompareStrings(_stringOriginal, _stringNew, _validation.DELETES)});
					}}>
						Only Deletes
					</button>
				</div>
			</div>;
};
