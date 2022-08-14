/**
 * External dependencies
 *
 * @ignore
 */
import omit from 'lodash/omit';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 *
 * @ignore
 */
import { createElement } from '@wordpress/element';

/**
 * Component used as equivalent of Fragment with unescaped HTML, in cases where
 * it is desirable to render dangerous HTML without needing a wrapper element.
 *
 * To preserve additional props, a `div` wrapper _will_ be created if any props
 * aside from `children` are passed.
 *
 * @function
 * @since 	   1.0.0
 * @param      {Object}         props             Component properties.
 * @param  	   {JSX.Element}    props.children    Any React element or elements can be passed as children. They will be rendered within the wrapper.
 * @param  	   {string}      	props.tagName     The tag name of the wrapper element.
 * @return     {JSX.Element}                      Component to render.
 * @example
 *
 * const content = '<span class=\"amount\"><bdi><span class=\"currency-symbol\">&pound;<\/span>11.05<\/bdi><\/span>';
 * <InnerHTML tagName="span">{ content }</InnerHTML>
 */
function InnerHTML( { children, tagName, ...props } ) {
	// The DIV wrapper will be stripped by serializer, unless there are
	// non-children props present.
	return createElement( tagName, {
		dangerouslySetInnerHTML: { __html: children },
		...omit( props, 'tagName' ),
	} );
}

InnerHTML.propTypes = {
	children: PropTypes.node,
	tagName: PropTypes.string,
};

InnerHTML.defaultProps = {
	children: undefined,
	tagName: 'div',
};

export default InnerHTML;
