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
import { plus } from '@wordpress/icons';

/**
 * Internal dependencies
 *
 * @ignore
 */
import { componentClassName } from '../utils';

/**
 * A wrapper component around the "Button" component provided by the core.
 *
 * This component has been created to represent adding items into a list
 * with consideration for ease of styling and following D.R.Y principles.
 *
 * @function
 * @since 	   1.2.0
 * @param      {Object}         props             Component properties.
 * @param  	   {JSX.Element}    props.children    Any React element or elements can be passed as children. They will be rendered within the wrapper.
 * @param  	   {Function}    	props.onClick     Callback function for processing click events on the button component.
 * @return     {JSX.Element}                      Component to render.
 * @example
 *
 * <AddButton onClick={ handleOnClickAdd } />
 */
function AddButton( { children, onClick, ...otherProps } ) {
	return (
		<Button className={ componentClassName( 'add-button' ) } icon={ plus } isSecondary label={ __( 'Add' ) } onClick={ onClick } { ...otherProps }>
			{ children }
		</Button>
	);
}

AddButton.propTypes = {
	children: PropTypes.element,
	onClick: PropTypes.func,
};

AddButton.defaultProps = {
	children: undefined,
	onClick: () => {},
};

export default ifCondition( ( { doRender } ) => Boolean( doRender ) )( AddButton );
