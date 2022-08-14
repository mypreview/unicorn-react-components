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
import { Notice } from '@wordpress/components';
import { ifCondition } from '@wordpress/compose';

/**
 * Internal dependencies
 *
 * @ignore
 */
import { componentClassName } from '../utils';

/**
 * A wrapper around the WordPress "Notice" component
 * to allow displaying error messages when appropriate.
 *
 * @function
 * @since 	   1.2.0
 * @param      {Object}         props             Component properties.
 * @param      {JSX.Element}    props.children    Components to be rendered as content.
 * @return     {JSX.Element}                      Component to render.
 * @example
 *
 * <ErrorMessage>
 *     __( 'Entered address is not a valid email address!' )
 * </ErrorMessage>
 */
function ErrorMessage( { children, ...otherProps } ) {
	return (
		<Notice className={ componentClassName( 'error-message' ) } css={ { margin: '8px 0 24px 0' } } isDismissible={ false } status="error" { ...otherProps }>
			{ children }
		</Notice>
	);
}

ErrorMessage.propTypes = {
	children: PropTypes.element,
};

ErrorMessage.defaultProps = {
	children: undefined,
};

export default ifCondition( ( { doRender } ) => Boolean( doRender ) )( ErrorMessage );
