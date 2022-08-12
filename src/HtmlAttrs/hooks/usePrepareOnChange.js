/**
 * External dependencies
 *
 * @ignore
 */
import { insertAtIndex, removeAtIndex } from '@mypreview/unicorn-js-utils';
import map from 'lodash/map';

/**
 * WordPress dependencies
 *
 * @ignore
 */
import { useState } from '@wordpress/element';

/**
 * Prepares choices made by interacting with the sortable component.
 *
 * @private
 * @function
 * @since 	   1.2.0
 * @name       usePrepareOnChange
 * @param 	   {string}    initialChoices    Choices stored from the previous state.
 * @return     {Object}                      Prepared choices and a few methods to alter existing state.
 */
export default ( initialChoices ) => {
	const [ choices, setChoices ] = useState( initialChoices );

	const handleOnSortEnd = ( value ) => {
		setChoices( map( value, ( { props: { choice } } ) => choice ) );
	};
	const handleOnChange = ( value, index ) => {
		setChoices( ( arr ) => insertAtIndex( arr, value, index ) );
	};
	const handleOnClickAdd = () => {
		setChoices( ( arr ) => insertAtIndex( arr, '', arr.length ) );
	};
	const handleOnClickRemove = ( index ) => {
		setChoices( ( arr ) => removeAtIndex( arr, index ) );
	};

	return { preparedChoices: choices, handleOnSortEnd, handleOnChange, handleOnClickAdd, handleOnClickRemove };
};
