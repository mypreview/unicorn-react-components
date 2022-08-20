/**
 * External dependencies
 *
 * @ignore
 */
import { ifArray } from '@mypreview/unicorn-js-utils';
import { isEqual, join, split, reject } from 'lodash';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 *
 * @ignore
 */
import { Flex, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __, _n, sprintf } from '@wordpress/i18n';
import { isEmail } from '@wordpress/url';

/**
 * Internal dependencies
 *
 * @ignore
 */
import { ErrorMessage } from '../';
import { componentClassName } from '../utils';

/**
 * Email text-input component that lets users input a number of email addresses
 * and provides a layer of validation against any possible invalid data entered.
 *
 * @function
 * @since 	   1.3.0
 * @param      {Object}         props                           Component properties.
 * @param 	   {string}  	    props.help 	                    A small help text displayed below the input field.
 * @param 	   {string}  	    props.label 	                Label property as the content.
 * @param 	   {Function}  	    props.onChange 	                A callback function invoked when any of the values change.
 * @param 	   {Object}  	    props.otherErrorMessageProps    Additional properties passed to the "TextControl" component.
 * @param 	   {Object}  	    props.otherTextControlProps 	Additional properties passed to the "ErrorMessage" component.
 * @param 	   {string}  	    props.placeholder               Text shown as a hint to the user as to what kind of information is expected.
 * @param 	   {string}  	    props.value                     The current value of the input.
 * @param 	   {boolean}  	    props.withError 	            Whether to output validation error message below the field.
 * @return     {JSX.Element}                                    Component to render.
 * @example
 *
 * <EmailControl onChange={ ( value ) => onChange( { to: value } ) } />
 */
function EmailControl( { help, label, onChange, otherErrorMessageProps, otherTextControlProps, placeholder, value, withError } ) {
	const [ errors, setErrors ] = useState( [] );
	const handleOnKeyDown = ( event ) => {
		if ( isEqual( 'Enter', event?.key ) ) {
			event.preventDefault();
			event.stopPropagation();
		}
	};
	const handleOnBlur = ( event ) => {
		const {
			target: { value: emails },
		} = event;
		setErrors( reject( split( emails, ',' ), isEmail ) || [] );
	};

	return (
		<Flex className={ componentClassName( 'email-control' ) } direction="column">
			<TextControl
				css={ {
					'&&': {
						marginBottom: 0,
					},
				} }
				help={ help }
				label={ label }
				onBlur={ handleOnBlur }
				onChange={ onChange }
				onKeyDown={ handleOnKeyDown }
				placeholder={ placeholder }
				value={ value }
				{ ...otherTextControlProps }
			/>
			<ErrorMessage doRender={ withError && ifArray( errors ) } { ...otherErrorMessageProps }>
				{ sprintf(
					/* translators: %s: Invalid email address(es). */
					_n( '%s is not a valid email address.', '%s are not valid email addresses.', errors.length ),
					join( errors, __( ' and ' ) )
				) }
			</ErrorMessage>
		</Flex>
	);
}

EmailControl.propTypes = {
	help: PropTypes.string,
	label: PropTypes.string,
	onChange: PropTypes.func,
	otherErrorMessageProps: PropTypes.object,
	otherTextControlProps: PropTypes.object,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	withError: PropTypes.bool,
};

EmailControl.defaultProps = {
	help: undefined,
	label: undefined,
	onChange: () => {},
	otherErrorMessageProps: {},
	otherTextControlProps: {},
	placeholder: undefined,
	value: '',
	withError: true,
};

export default EmailControl;
