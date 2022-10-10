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
import { AlignmentControl, BlockControls } from '@wordpress/block-editor';
import { ifCondition } from '@wordpress/compose';

/**
 * A wrapper component around the "AlignmentControl" component provided by the core.
 *
 * This component renders a toolbar of alignment icon buttons. This is useful for
 * block-level modifications to be made available when a block is selected.
 *
 * @function
 * @since 	   2.2.0
 * @param 	   {Object} 	    props 			  Component properties.
 * @param      {string}         props.group       Block toolbar group name.
 * @param      {Function}       props.onChange    Callback function for processing click events on the toolbar button component.
 * @param      {string}         props.value       Toolbar button title as the tooltip.
 * @return     {JSX.Element}     				  Component to render.
 * @example
 *
 * <AlignmentToolbarControl
 *     doRender
 *     onChange={ ( value ) => setAttributes( { textAlign: value } ) }
 * 	   value={ textAlign }
 * />
 */
function AlignmentToolbarControl( { group, onChange, value, ...otherProps } ) {
	return (
		<BlockControls group={ group }>
			<AlignmentControl onChange={ onChange } value={ value } { ...otherProps } />
		</BlockControls>
	);
}

AlignmentToolbarControl.propTypes = {
	group: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.string,
};

AlignmentToolbarControl.defaultProps = {
	group: 'block',
	onChange: () => {},
	value: undefined,
};

export default ifCondition( ( { doRender } ) => Boolean( doRender ) )( AlignmentToolbarControl );
