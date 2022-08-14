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
import { Button } from '@wordpress/components';
import { ifCondition } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { trash } from '@wordpress/icons';

/**
 * Internal dependencies
 *
 * @ignore
 */
import { componentClassName } from '../utils';

/**
 * A wrapper component around the "Button" component provided by the core.
 *
 * This component has been created to represent removing items from a list
 * with consideration for ease of styling and following D.R.Y principle.
 *
 * @function
 * @since 	   1.2.0
 * @param      {Object}         props             Component properties.
 * @param  	   {JSX.Element}    props.children    Any React element or elements can be passed as children. They will be rendered within the wrapper.
 * @param  	   {Function}    	props.onClick     Callback function to for processing click events on the button component.
 * @return     {JSX.Element}                      Component to render.
 * @example
 *
 * <RemoveButton onClick={ handleOnClickRemove } />
 */
function RemoveButton( { children, onClick, ...otherProps } ) {
	return (
		<Button
			className={ componentClassName( 'remove-button' ) }
			icon={ trash }
			isDestructive
			label={ __( 'Remove' ) }
			onClick={ onClick }
			showTooltip
			tooltipPosition="top center"
			{ ...otherProps }
		>
			{ children }
		</Button>
	);
}

RemoveButton.propTypes = {
	children: PropTypes.element,
	onClick: PropTypes.func,
};

RemoveButton.defaultProps = {
	children: undefined,
	onClick: () => {},
};

export default ifCondition( ( { doRender } ) => Boolean( doRender ) )( RemoveButton );
