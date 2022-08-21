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
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { ifCondition } from '@wordpress/compose';

/**
 * Internal dependencies
 *
 * @ignore
 */
import { Icon } from '../';
import Constants from './constants';

/**
 * A ToolbarButton that is used to toggle the state of the requirement for a control.
 *
 * @function
 * @since 	   1.4.0
 * @param      {Object}         props            Component properties.
 * @param      {string}         props.label      Label property as the tooltip.
 * @param  	   {Function}       props.onClick    Callback function for processing click events on the button component.
 * @param 	   {boolean} 	    props.value      The current state of the button to be active or inactive.
 * @return     {JSX.Element}                     Component to render.
 * @example
 *
 * <IsRequiredToolbarButton onClick={ () => setAttributes( { isRequired: ! isRequired } ) } value={ isRequired } />
 */
function IsRequiredToolbarButton( { label, onClick, value } ) {
	return (
		<ToolbarGroup>
			<ToolbarButton icon={ <Icon stroke="currentColor" d={ Constants.D } /> } isActive={ Boolean( value ) } label={ label } onClick={ onClick } />
		</ToolbarGroup>
	);
}

IsRequiredToolbarButton.propTypes = {
	label: PropTypes.string,
	onClick: PropTypes.func,
	value: PropTypes.bool,
};

IsRequiredToolbarButton.defaultProps = {
	label: undefined,
	onClick: () => {},
	value: false,
};

export default ifCondition( ( { doRender } ) => Boolean( doRender ) )( IsRequiredToolbarButton );
