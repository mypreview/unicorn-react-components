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
import { Flex, FlexItem, Spinner } from '@wordpress/components';

/**
 * Internal dependencies
 *
 * @ignore
 */
import { componentClassName } from '../utils';

/**
 * Spinners notify users that their action is being processed.
 *
 * @function
 * @since 	   1.0.0
 * @param      {Object}         props          Component properties.
 * @param      {string}    	    props.label    Label shown before the spinner.
 * @return     {JSX.Element}                   Component to render.
 * @example
 *
 * <Loading label={ __( 'Loading posts…' ) } />
 */
function Loading( { label, ...otherProps } ) {
	return (
		<Flex className={ componentClassName( 'loading' ) } justify="flex-start" { ...otherProps }>
			{ label && <FlexItem>{ label }</FlexItem> }
			<FlexItem>
				<Spinner />
			</FlexItem>
		</Flex>
	);
}

Loading.propTypes = {
	label: PropTypes.string,
};

Loading.defaultProps = {
	label: undefined,
};

export default Loading;
