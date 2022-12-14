/**
 * External dependencies
 *
 * @ignore
 */
import { normalizeJsonify, sanitizeSlug, stringify } from '@mypreview/unicorn-js-utils';
import { useDidUpdate } from '@mypreview/unicorn-react-hooks';
import { gt, map, trim } from 'lodash';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 *
 * @ignore
 */
import { Flex, TextControl } from '@wordpress/components';
import { withInstanceId } from '@wordpress/compose';
import { escapeHTML } from '@wordpress/escape-html';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 *
 * @ignore
 */
import { usePrepareOnChange } from './hooks';
import { AddButton, RemoveButton, Sortable } from '../';

/**
 * The "HtmlAttrs" component allows creating a set of HTML attributes
 * to be added to the wrapper tag of another block instance.
 *
 * @function
 * @since 	   1.2.2
 * @param      {Object}         props                    		Component properties.
 * @param      {string}         props.instanceId         		A unique id for each instance of this component.
 * @param      {Function}       props.onChange 	        	 	A callback function invoked when any of the values change.
 * @param      {Object}    	    props.otherAddButtonProps 		Additional properties passed to the "AddButton" component.
 * @param      {Object}    	    props.otherNameProps 			Additional properties passed to the "TextInput -> Name (Key)" field.
 * @param      {Object}    	    props.otherRemoveButtonProps    Additional properties passed to the "TextInput -> Value" field.
 * @param      {Object}    	    props.otherValueProps    		Additional properties passed to the "RemoveButton" component.
 * @param 	   {string}  	    props.value 	            	A JSON string formatted of the current value of inputs.
 * @return     {JSX.Element}                                	Component to render.
 * @example
 *
 * <HtmlAttrs onChange={ ( value ) => setAttributes( { attrs: value } ) } value={ attrs } />
 */
function HtmlAttrs( { instanceId, onChange, otherAddButtonProps, otherNameProps, otherRemoveButtonProps, otherValueProps, value: attrs, ...otherProps } ) {
	const attributes = normalizeJsonify( attrs );
	const { preparedChoices, handleOnSortEnd, handleOnChange, handleOnClickAdd, handleOnClickRemove } = usePrepareOnChange( attributes );

	useDidUpdate( () => {
		onChange( stringify( preparedChoices ) );
	}, [ preparedChoices ] );

	return (
		<>
			<Sortable
				css={ {
					'> div': {
						alignItems: 'flex-end',
						marginLeft: -5,
						marginTop: 20,
						'&:first-of-type': {
							marginTop: 0,
						},
					},
				} }
				onChange={ handleOnSortEnd }
				{ ...otherProps }
			>
				{ map( attributes, ( attribute, index ) => (
					<Flex align="center" choice={ attribute } key={ `${ index }-${ instanceId }` }>
						<TextControl
							autoComplete="random-string"
							css={ { '&': { marginBottom: '0 !important', '> div': { marginBottom: 0 } } } }
							label={ __( 'Name' ) }
							onChange={ ( value ) => handleOnChange( { ...attribute, name: sanitizeSlug( value ) }, index ) }
							value={ trim( attribute?.name ) || '' }
							{ ...otherNameProps }
						/>
						<TextControl
							autoComplete="random-string"
							css={ { '&': { marginBottom: '0 !important', '> div': { marginBottom: 0 } } } }
							label={ __( 'Value' ) }
							onChange={ ( value ) => handleOnChange( { ...attribute, value: escapeHTML( value ) }, index ) }
							value={ trim( attribute?.value ) || '' }
							{ ...otherValueProps }
						/>
						<RemoveButton
							css={ { '.components-button&': { height: 30, marginTop: 24, marginLeft: 8, minWidth: 30, width: 30 } } }
							doRender={ gt( attributes.length, 1 ) }
							onClick={ () => handleOnClickRemove( index ) }
							{ ...otherRemoveButtonProps }
						/>
					</Flex>
				) ) }
			</Sortable>
			<AddButton css={ { marginTop: 22 } } doRender onClick={ handleOnClickAdd } text={ __( 'Add attribute' ) } { ...otherAddButtonProps } />
		</>
	);
}

HtmlAttrs.propTypes = {
	instanceId: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	otherAddButtonProps: PropTypes.object,
	otherNameProps: PropTypes.object,
	otherRemoveButtonProps: PropTypes.object,
	otherValueProps: PropTypes.object,
	value: PropTypes.string,
};

HtmlAttrs.defaultProps = {
	instanceId: undefined,
	onChange: () => {},
	otherAddButtonProps: {},
	otherNameProps: {},
	otherRemoveButtonProps: {},
	otherValueProps: {},
	value: undefined,
};

export default withInstanceId( HtmlAttrs );
