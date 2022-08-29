/**
 * External dependencies
 *
 * @ignore
 */
import map from 'lodash/map';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 *
 * @ignore
 */
import { ifCondition } from '@wordpress/compose';
import { useCallback } from '@wordpress/element';

/**
 * Internal dependencies
 *
 * @ignore
 */
import { Sortable, Pill } from '../../';

/**
 * List of selection options, displayed as pills.
 * This component is used in "MultiSelect" to render the selected options as a list of pills.
 * Items provided as { label, value } pairs and can be deselected by clicking on the remove icon.
 *
 * @private
 * @function
 * @since	   1.5.0
 * @param	   {Object}			props 			  Component properties.
 * @param	   {Function}		props.onRemove    Callback function to trigger when the remove button in a tag is clicked.
 * @param	   {Function}		props.onSort	  Callback function to be triggered when the user finishes a sorting gesture.
 * @param	   {Array}			props.value		  The objects of the currently selected items.
 * @return	   {JSX.Element}    				  Component to render.
 * @example
 *
 * <Pills
 * 		onRemove={ handleOnClickSelectedOptionTag }
 * 		onSort={ onChange }
 * 		value={ selectedOptions }
 * 	/>
 */
function Pills( { onRemove, onSort, value: items } ) {
	const handleOnChange = useCallback( ( newItems ) => {
		onSort( map( newItems, ( { props: { value } } ) => value ) );
	}, [] );

	return (
		<Sortable
			css={ {
				'&': {
					display: 'flex',
					flexDirection: 'row',
					flexWrap: 'wrap',
					justifyContent: 'flex-start',
					maxHeight: 300,
					marginBottom: 17,
					marginTop: 17,
					overflowY: 'scroll',
				},
			} }
			onChange={ handleOnChange }
			withSortableKnob={ false }
		>
			{ map( items, ( { value, label }, index ) => (
				<Pill key={ value } label={ label } onClick={ () => onRemove( index ) } value={ value } />
			) ) }
		</Sortable>
	);
}

Pills.propTypes = {
	onRemove: PropTypes.func,
	onSort: PropTypes.func,
	value: PropTypes.arrayOf(
		PropTypes.shape( { label: PropTypes.string, value: PropTypes.oneOfType( [ PropTypes.number, PropTypes.object, PropTypes.string ] ) } )
	),
};

Pills.defaultProps = {
	onRemove: () => {},
	onSort: () => {},
	value: [],
};

export default ifCondition( ( { doRender } ) => Boolean( doRender ) )( Pills );
