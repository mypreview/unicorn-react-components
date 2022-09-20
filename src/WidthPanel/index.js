/**
 * External dependencies
 *
 * @ignore
 */
import map from 'lodash/map';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 *
 * @ignore
 */
import { BaseControl, Button, ButtonGroup, PanelBody } from '@wordpress/components';
import { withInstanceId } from '@wordpress/compose';

/**
 * Internal dependencies
 *
 * @ignore
 */
import { componentClassName } from '../utils';

/**
 * A group component that creates a list of "Width" options to choose from.
 * It can also coordinate the checked state of multiple Button components.
 *
 * @function
 * @since 	   1.6.2
 * @param      {Object}         props               Component properties.
 * @param      {string}         props.ariaLabel     A string value that labels the "ButtonGroup" interactive component.
 * @param      {string}         props.help          A help text will be generated using help property as the content.
 * @param      {string}         props.instanceId    A unique id for each instance of this component.
 * @param 	   {Function}  	    props.onChange      A callback function invoked when any of the values change.
 * @param 	   {Array}  	    props.range 	    List of options to adjust the width of the field.
 * @param 	   {string}  	    props.title 	    Title of the panel. This shows even when it is closed.
 * @param 	   {number}  	    props.value 	    The current width of the field/element.
 * @return     {JSX.Element}                        The component to be rendered.
 * @example
 *
 * <WidthPanel onChange={ ( value ) => onChange( { width: value } ) } title={ __( 'Width settings' ) } value={ 25 } />
 */
function WidthPanel( { ariaLabel, help, instanceId, onChange, range, title, value } ) {
	const handleChange = ( newWidth ) => {
		// Check if we are toggling the width off.
		const width = value === newWidth ? undefined : newWidth;
		// Update attributes.
		onChange( width );
	};

	return (
		<PanelBody title={ title }>
			<BaseControl className={ componentClassName( 'width-panel' ) } help={ help } id={ `width-panel-${ instanceId }` }>
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
	instanceId: PropTypes.string,
	onChange: PropTypes.func,
	range: PropTypes.arrayOf( PropTypes.number ),
	title: PropTypes.string,
	value: PropTypes.number,
};

WidthPanel.defaultProps = {
	ariaLabel: undefined,
	help: undefined,
	instanceId: undefined,
	onChange: () => {},
	range: [ 25, 50, 75, 100 ],
	title: undefined,
	value: undefined,
};

export default withInstanceId( WidthPanel );
