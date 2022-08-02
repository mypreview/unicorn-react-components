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
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 *
 * @ignore
 */
import { componentClassName } from '../utils';

/**
 * Display static message to communicate prominent not-found message to the user.
 *
 * @function
 * @since 	   1.0.0
 * @param      {Object}         props             Component properties.
 * @param      {JSX.Element}    props.children    Components to be rendered as content.
 * @param      {string}    		props.label    	  The displayed message of a notice.
 * @return     {JSX.Element}                      Component to render.
 * @example
 *
 * <NotFound status="error">
 *     __( 'Nothing is here to display!' )
 * </NotFound>
 */
function NotFound( { children, label, ...otherProps } ) {
	return (
		<Notice className={ componentClassName( 'notfound' ) } css={ { margin: 0, width: '100%' } } isDismissible={ false } status="warning" { ...otherProps }>
			{ children || label }
		</Notice>
	);
}

NotFound.propTypes = {
	children: PropTypes.element,
	label: PropTypes.string,
};

NotFound.defaultProps = {
	children: undefined,
	label: __( 'No posts found to display.' ),
};

export default NotFound;
