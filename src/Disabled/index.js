/**
 * External dependencies
 *
 * @ignore
 */
import classnames from 'classnames';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 *
 * @ignore
 */
import { forwardRef } from '@wordpress/element';

/**
 * Internal dependencies
 *
 * @ignore
 */
import { componentClassName } from '../utils';

/**
 * Disabled is a component which disables descendant tabbable elements and prevents pointer interaction.
 *
 * @function
 * @since 	   1.7.0
 * @param      {Object}         props             Component properties.
 * @param  	   {JSX.Element}    props.children    Any React element or elements can be passed as children. They will be rendered within the wrapper.
 * @param  	   {string}    		props.tagName     The tag name of the editable element. Default: "div".
 * @param 	   {Object} 	    ref    			  Enhancer used to enable passing a ref to its wrapped component.
 * @return     {JSX.Element}                      Component to render.
 * @example
 *
 * <Disabled tagName="li">
 *     <a href="https://www.example.com">{ children }</a>
 * </Disabled>
 */
function Disabled( { children, tagName, ...otherProps }, ref ) {
	const Tag = tagName;

	return (
		<Tag
			className={ classnames( 'components-disabled', componentClassName( 'disabled' ) ) }
			css={ {
				'&': {
					position: 'relative',
					pointerEvents: 'none',
				},
				'&::after': {
					content: '""',
					position: 'absolute',
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,
				},
				// Also make nested blocks unselectable.
				'*': {
					pointerEvents: 'none',
				},
			} }
			ref={ ref }
			{ ...otherProps }
		>
			{ children }
		</Tag>
	);
}

Disabled.propTypes = {
	children: PropTypes.element,
	tagName: PropTypes.string,
};

Disabled.defaultProps = {
	children: undefined,
	tagName: 'div',
};

export default forwardRef( Disabled );
