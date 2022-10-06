/**
 * External dependencies
 *
 * @ignore
 */
import { formattedContent } from '@mypreview/unicorn-js-utils';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 *
 * @ignore
 */
import { Button, Flex, FlexItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { cancelCircleFilled } from '@wordpress/icons';

/**
 * Internal dependencies
 *
 * @ignore
 */
import { componentClassName } from '../utils';

/**
 * Pill element with a remove button.
 * This component is typically used as the output when iterating over a collection of items that should
 * be displayed as pills/tags rather than standalone.
 *
 * @function
 * @since	   1.7.1
 * @param	   {Object}			props 			 		  Component properties.
 * @param	   {string}			props.label 	 		  Label shown in the element.
 * @param  	   {Function}    	props.onClick    		  Callback function for processing click events on the button component.
 * @param  	   {Object}    	    props.otherButtonProps    Additional properties passed to the "Button" component.
 * @return     {JSX.Element} 					 		  Component to render.
 * @example
 *
 * <Pill
 *     label={ label }
 *     onClick={ handleOnClickPill }
 * />
 */
function Pill( { label, onClick, otherButtonProps, ...otherProps } ) {
	return (
		<Flex
			align="center"
			className={ componentClassName( 'pill' ) }
			css={ { '&': { background: '#efefef', borderRadius: 12, color: '#757575', padding: '0 8px', margin: '0 !important', overflow: 'hidden' } } }
			direction="row"
			justify="flex-start"
			wrap
			{ ...otherProps }
		>
			<FlexItem css={ { '&': { marginBottom: '0 !important', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } } }>
				{ formattedContent( label ) }
			</FlexItem>
			{ onClick && (
				<FlexItem css={ { lineHeight: 1, margin: '0 !important' } }>
					<Button
						css={ {
							'&': {
								color: 'inherit !important',
								padding: '0 !important',
								minWidth: 'unset !important',
							},
						} }
						isLink
						isSmall
						icon={ cancelCircleFilled }
						iconSize={ 20 }
						label={ __( 'Remove' ) }
						onClick={ onClick }
						showTooltip
						{ ...otherButtonProps }
					/>
				</FlexItem>
			) }
		</Flex>
	);
}

Pill.propTypes = {
	label: PropTypes.string,
	onClick: PropTypes.func,
};

Pill.defaultProps = {
	label: undefined,
	onClick: () => {},
};

export default Pill;
