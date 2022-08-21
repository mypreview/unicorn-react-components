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
import { BlockControls } from '@wordpress/block-editor';
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
 * A Boolean attribute indicating that an option with a non-empty string value must be entered/selected.
 *
 * @function
 * @since 	   1.4.0
 * @param      {Object}         props            Component properties.
 * @param      {string}         props.group      Block toolbar group name.
 * @param      {string}         props.label      Label property as the tooltip.
 * @param  	   {Function}       props.onClick    Callback function for processing click events on the button component.
 * @param 	   {boolean} 	    props.value      The current state of the button to be active or inactive.
 * @return     {JSX.Element}                     Component to render.
 * @example
 *
 * <IsRequiredToolbarControl onClick={ () => setAttributes( { isRequired: ! isRequired } ) } value={ isRequired } />
 */
function IsRequiredToolbarControl( { group, label, onClick, value } ) {
	return (
		<BlockControls group={ group }>
			<ToolbarGroup>
				<ToolbarButton icon={ <Icon stroke="currentColor" d={ Constants.D } /> } isActive={ Boolean( value ) } label={ label } onClick={ onClick } />
			</ToolbarGroup>
		</BlockControls>
	);
}

IsRequiredToolbarControl.propTypes = {
	group: PropTypes.string,
	label: PropTypes.string,
	onClick: PropTypes.func,
	value: PropTypes.bool,
};

IsRequiredToolbarControl.defaultProps = {
	group: 'other',
	label: undefined,
	onClick: () => {},
	value: false,
};

export default ifCondition( ( { doRender } ) => Boolean( doRender ) )( IsRequiredToolbarControl );
