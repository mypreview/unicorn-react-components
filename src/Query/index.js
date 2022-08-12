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
import { ifCondition } from '@wordpress/compose';

/**
 * Internal dependencies
 *
 * @ignore
 */
import { Loading, NotFound } from '../';

/**
 * The "Query" component to render queried items.
 *
 * @function
 * @since 	   1.0.0
 * @param      {Object}        props                       Component properties.
 * @param      {Function}      props.Component             Reference to the Component to render.
 * @param      {boolean}       props.havePosts 	           Determines whether current query has posts to loop over.
 * @param      {boolean}       props.isLoading 	           Whether the query items are being fetched at the moment.
 * @param      {Object}    	   props.otherLoadingProps 	   Additional properties passed to the "Loading" component.
 * @param      {Object}    	   props.otherNotFoundProps    Additional properties passed to the "NotFound" component.
 * @return     {JSX.Element}                               Component to render.
 * @example
 *
 * <Query
 *    className={ className }
 *    Component={ Loop }
 *    doRender
 *    havePosts={ havePosts }
 *    isLoading={ isLoading }
 *    query={ slicedQuery }
 * />
 */
function Query( { Component, havePosts, isLoading, otherLoadingProps, otherNotFoundProps, ...otherProps } ) {
	return isLoading ? <Loading { ...otherLoadingProps } /> : havePosts ? <Component { ...otherProps } /> : <NotFound { ...otherNotFoundProps } />;
}

Query.propTypes = {
	Component: PropTypes.element,
	doRender: PropTypes.bool,
	havePosts: PropTypes.bool,
	isLoading: PropTypes.bool,
	otherLoadingProps: PropTypes.object,
	otherNotFoundProps: PropTypes.object,
};

Query.defaultProps = {
	Component: undefined,
	doRender: true,
	havePosts: false,
	isLoading: true,
	otherLoadingProps: {},
	otherNotFoundProps: {},
};

export default ifCondition( ( { doRender } ) => Boolean( doRender ) )( Query );
