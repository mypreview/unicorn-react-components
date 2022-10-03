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
import { __ } from '@wordpress/i18n';
import { edit as editIcon } from '@wordpress/icons';

/**
 * Toolbar button component used to demonstrate "Edit" action.
 *
 * @function
 * @since 	   1.9.0
 * @param 	   {Object} 	    props 			 Component properties.
 * @param      {string}         props.group      Block toolbar group name.
 * @param      {Function}       props.onClick    Callback function for processing click events on the toolbar button component.
 * @param      {Function}       props.title      Toolbar button title as the tooltip.
 * @return     {JSX.Element}     				 Component to render.
 * @example
 *
 * <EditToolbarControl doRender={ ! isPlaceholder } onClick={ togglePlaceholder } />
 */
function EditToolbarControl( { group, onClick, title } ) {
	return (
		<BlockControls group={ group }>
			<ToolbarGroup css={ { '&': { paddingLeft: '0 !important', paddingRight: '0 !important' } } }>
				<ToolbarButton icon={ editIcon } onClick={ onClick } title={ title } />
			</ToolbarGroup>
		</BlockControls>
	);
}

EditToolbarControl.propTypes = {
	group: PropTypes.string,
	onClick: PropTypes.func,
	title: PropTypes.string,
};

EditToolbarControl.defaultProps = {
	group: 'block',
	onClick: () => {},
	title: __( 'Edit' ),
};

export default ifCondition( ( { doRender } ) => Boolean( doRender ) )( EditToolbarControl );
