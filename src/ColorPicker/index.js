/**
 * External dependencies
 *
 * @ignore
 */
import { useGetEditorSettings } from '@mypreview/unicorn-react-hooks';
import get from 'lodash/get';
import classnames from 'classnames';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 *
 * @ignore
 */
import { getColorClassName, getColorObjectByColorValue } from '@wordpress/block-editor';
import { BaseControl, ColorPalette } from '@wordpress/components';
import { withInstanceId } from '@wordpress/compose';
import { useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 *
 * @ignore
 */
import Constants from './constants';
import { componentClassName } from '../utils';

/**
 * This component renders a custom color selector, which makes it easy to create, adjust, and experiment with theme colors.
 *
 * @function
 * @since	   2.1.0
 * @param	   {Object}		    props               Component properties.
 * @param	   {string} 		props.context 		Context/place where color is being used e.g: background, link, text.
 * @param	   {string} 		props.help 		   	A small help text displayed below the color select element.
 * @param      {string}         props.instanceId    A unique id for each instance of this component.
 * @param	   {string} 		props.label 		Label property as the content.
 * @param	   {Function}	    props.onChange 		Callback called when a color is selected.
 * @param	   {string}		    props.value    		Selected color hex value.
 * @return     {JSX.Element}     					Component to render.
 * @example
 *
 * <ColorPicker
 * 	  context="background"
 * 	  label={ __( 'Background' ) }
 *    onChange={ ( value ) => setAttributes( { color: value } ) }
 *    value={ "#FFFFFF" }
 * />
 *
 * // => Object { color: "#ff5252", name: "Primary", slug: "primary", className: "has-background has-primary-background-color" }
 */
function ColorPicker( { context, help, instanceId, label, onChange, value, ...otherProps } ) {
	const { colors } = useGetEditorSettings();
	const handleOnChange = useCallback(
		( newValue ) => {
			const colorObject = getColorObjectByColorValue( colors, newValue );
			const className = classnames( {
				[ get( Constants, [ 'classNames', context ] ) ]: context && newValue,
				[ getColorClassName( get( Constants, [ 'context', context ] ), colorObject?.slug ) ]: colorObject?.slug,
			} );

			onChange( { color: newValue, ...colorObject, className } );
		},
		[ colors ]
	);

	return (
		<BaseControl
			css={ { width: '100%' } }
			className={ componentClassName( 'color-picker' ) }
			help={ help }
			id={ `color-picker-${ instanceId }` }
			label={ label }
		>
			<ColorPalette clearable colors={ colors } disableCustomColor={ false } onChange={ handleOnChange } value={ value } { ...otherProps } />
		</BaseControl>
	);
}

ColorPicker.propTypes = {
	context: PropTypes.string,
	help: PropTypes.string,
	instanceId: PropTypes.string,
	label: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.string,
};

ColorPicker.defaultProps = {
	context: 'background',
	help: undefined,
	instanceId: undefined,
	label: __( 'Color' ),
	onChange: () => {},
	value: undefined,
};

export default withInstanceId( ColorPicker );
