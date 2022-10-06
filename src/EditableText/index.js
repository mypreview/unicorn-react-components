/**
 * External dependencies
 *
 * @ignore
 */
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 *
 * @ignore
 */
import { RichText } from '@wordpress/block-editor';
import { ifCondition } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 *
 * @ignore
 */
import { Constants } from '../utils';

/**
 * A wrapper component around the "RichText" component provided by the core.
 *
 * RichText is a component that allows developers to render a contenteditable input,
 * providing users with the option to format block content to make it bold, italics,
 * linked, or use other formatting.
 *
 * @function
 * @since 	   1.0.0
 * @param      {Object}         props              Component properties.
 * @param 	   {string}  	    props.className    The CSS class name(s) that will be added to the component element.
 * @param 	   {boolean}  	    props.isSave       Whether the field is meant to be rendered on the front-end.
 * @param 	   {Function}  	    props.onChange 	   Function that receives the value of the input.
 * @param 	   {Function}  	    props.onFocus 	   Function that is called when the element receives focus.
 * @param 	   {string}  	    props.value        Title property as the content.
 * @return     {JSX.Element}                       Component to render.
 * @example
 *
 * <EditableText
 *     className={ `${ className }__title` }
 *     doRender={ elements?.title }
 *     onChange={ ( value ) => setAttributes( { title: value } ) }
 *     placeholder={ __( 'Title…' ) }
 *     tagName="h3"
 *     value={ title }
 * />
 */
function EditableText( { className, isSave, onChange, onFocus, value, ...otherProps } ) {
	return isSave ? (
		RichText.isEmpty( value ) ? null : (
			<RichText.Content className={ className } value={ value } { ...otherProps } />
		)
	) : (
		<RichText
			allowedFormats={ Constants.ALLOWED_RICHTEXT_FORMATS }
			className={ className }
			multiline={ false }
			onChange={ onChange }
			unstableOnFocus={ onFocus }
			placeholder={ __( 'Enter text…' ) }
			preserveWhiteSpace
			value={ value }
			withoutInteractiveFormatting
			__unstableOnSplitAtEnd={ [] }
			{ ...otherProps }
		/>
	);
}

EditableText.propTypes = {
	className: PropTypes.string,
	doRender: PropTypes.bool,
	isSave: PropTypes.bool,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	value: PropTypes.string,
};

EditableText.defaultProps = {
	className: undefined,
	doRender: true,
	isSave: false,
	onChange: () => {},
	onFocus: () => {},
	value: undefined,
};

export default ifCondition( ( { doRender } ) => Boolean( doRender ) )( EditableText );
