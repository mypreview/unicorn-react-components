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
import { Button, Flex, FlexItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { close } from '@wordpress/icons';

/**
 * Pill element with a remove button.
 * This component is typically used as the output when iterating over a collection of items that should
 * be displayed as pills/tags rather than standalone.
 *
 * @function
 * @since	   1.5.0
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
			css={ { '&': { background: '#efefef', borderRadius: 12, padding: '4px 12px', marginBottom: '8px !important', marginRight: 12 } } }
			direction="row"
			justify="flex-start"
			wrap
			{ ...otherProps }
		>
			<FlexItem css={ { marginTop: 4, marginBottom: '4px !important' } } aria-hidden>
				{ label }
			</FlexItem>
			{ onClick && (
				<FlexItem css={ { margin: '0 !important' } }>
					<Button
						css={ {
							'&': {
								padding: '0 !important',
								minWidth: 'unset',
								width: 'auto !important',
							},
						} }
						isLink
						isSmall
						icon={ close }
						iconSize={ 18 }
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
