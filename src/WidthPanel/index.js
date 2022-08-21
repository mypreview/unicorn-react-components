/**
 * External dependencies
 *
 * @ignore
 */
import { ifArray } from '@mypreview/unicorn-js-utils';
import { map, isUndefined } from 'lodash';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 *
 * @ignore
 */
import { BaseControl, Button, ButtonGroup, PanelBody } from '@wordpress/components';
import { ifCondition, useInstanceId } from '@wordpress/compose';

/**
 * A group component that creates a list of "Width" options to choose from.
 * It can also coordinate the checked state of multiple Button components.
 *
 * @function
 * @since 	   1.4.0
 * @param      {Object}         props              Component properties.
 * @param      {string}         props.ariaLabel    A string value that labels the "ButtonGroup" interactive component.
 * @param      {string}         props.help         A help text will be generated using help property as the content.
 * @param 	   {Function}  	    props.onChange     A callback function invoked when any of the values change.
 * @param 	   {Array}  	    props.range 	   List of options to adjust the width of the field.
 * @param 	   {string}  	    props.title 	   Title of the panel. This shows even when it is closed.
 * @param 	   {number}  	    props.value 	   The current width of the field/element.
 * @return     {JSX.Element}                       The component to be rendered.
 * @example
 *
 * <WidthPanel onChange={ ( value ) => onChange( { width: value } ) } title={ __( 'Width settings' ) } value={ 25 } />
 */
function WidthPanel( { ariaLabel, help, onChange, range, title, value } ) {
	const instanceId = useInstanceId( WidthPanel );
	const handleChange = ( newWidth ) => {
		// Check if we are toggling the width off
		const width = value === newWidth ? undefined : newWidth;
		// Notify the update.
		onChange( width );
	};

	return (
		<PanelBody title={ title }>
			<BaseControl help={ help } id={ `width-panel-${ instanceId }` }>
				<ButtonGroup aria-label={ ariaLabel }>
					{ map( range, ( widthValue ) => {
						return (
							<Button
								isSmall
								key={ widthValue }
								onClick={ () => handleChange( widthValue ) }
								variant={ widthValue === value ? 'primary' : undefined }
							>
								{ widthValue }%
							</Button>
						);
					} ) }
				</ButtonGroup>
			</BaseControl>
		</PanelBody>
	);
}

WidthPanel.propTypes = {
	ariaLabel: PropTypes.string,
	help: PropTypes.string,
	onChange: PropTypes.func,
	range: PropTypes.arrayOf( PropTypes.number ),
	title: PropTypes.string,
	value: PropTypes.number,
};

WidthPanel.defaultProps = {
	ariaLabel: undefined,
	help: undefined,
	onChange: () => {},
	range: [ 25, 50, 75, 100 ],
	title: undefined,
	value: undefined,
};

export default ifCondition( ( { range, value } ) => ! isUndefined( value ) && ifArray( range ) && Boolean( range?.length > 1 ) )( WidthPanel );
