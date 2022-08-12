/**
 * External dependencies
 *
 * @ignore
 */
import { normalizeJsonify, sanitizeSlug, stringify } from '@mypreview/unicorn-js-utils';
import { useDidUpdate } from '@mypreview/unicorn-react-hooks';
import { gt, map } from 'lodash';
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
import { componentClassName } from '../utils';

/**
 * The "HtmlAttrs" component allows creating a set of HTML attributes
 * to be added to the wrapper tag of another block instance.
 *
 * @function
 * @since 	   1.2.0
 * @param      {Object}         props                    		Component properties.
 * @param      {string}         props.instanceId         		Reference to the Component to render.
 * @param      {Function}       props.onChange 	        		Whether the query items are being fetched at the moment.
 * @param      {Object}    	    props.otherAddButtonProps 		Additional properties passed to the "AddButton" component.
 * @param      {Object}    	    props.otherNameProps 			Additional properties passed to the "TextInput -> Name (Key)" field.
 * @param      {Object}    	    props.otherRemoveButtonProps    Additional properties passed to the "TextInput -> Value" field.
 * @param      {Object}    	    props.otherValueProps    		Additional properties passed to the "RemoveButton" component.
 * @param 	   {string}  	    props.value 	            	The current width of the field/element.
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
						marginTop: 20,
					},
					[ `.${ componentClassName( 'sortable__item' ) }` ]: { alignItems: 'flex-end' },
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
							value={ attribute?.name || '' }
							{ ...otherNameProps }
						/>
						<TextControl
							autoComplete="random-string"
							css={ { '&': { marginBottom: '0 !important', '> div': { marginBottom: 0 } } } }
							label={ __( 'Value' ) }
							onChange={ ( value ) => handleOnChange( { ...attribute, value: escapeHTML( value ) }, index ) }
							value={ attribute?.value || '' }
							{ ...otherValueProps }
						/>
						{ gt( attributes.length, 1 ) && (
							<RemoveButton
								css={ { '.components-button&': { marginTop: 24, marginLeft: 8 } } }
								onClick={ () => handleOnClickRemove( index ) }
								{ ...otherRemoveButtonProps }
							/>
						) }
					</Flex>
				) ) }
			</Sortable>
			<AddButton css={ { marginTop: 22 } } onClick={ handleOnClickAdd } text={ __( 'Add attribute' ) } { ...otherAddButtonProps } />
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
	value: PropTypes.number,
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
