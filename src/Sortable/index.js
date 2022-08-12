/**
 * External dependencies
 *
 * @ignore
 */
import { arrayMoveImmutable } from 'array-move';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import SortableList, { SortableItem, SortableKnob } from 'react-easy-sort';

/**
 * WordPress dependencies
 *
 * @ignore
 */
import { Flex } from '@wordpress/components';
import { withInstanceId } from '@wordpress/compose';
import { Icon, dragHandle } from '@wordpress/icons';

/**
 * Internal dependencies
 *
 * @ignore
 */
import { componentClassName } from '../utils';

/**
 * Sortable component designed to provide the ability to provide a set of higher-order components
 * to turn any collection of elements given into an accessible and touch-friendly sortable list.
 *
 * @function
 * @since 	   1.2.0
 * @param      {Object}         props                     Component properties.
 * @param  	   {JSX.Element}    props.children            Any React element or elements can be passed as children. They will be rendered within the wrapper.
 * @param  	   {string}     	props.instanceId          Unique ID of the current component instance.
 * @param  	   {boolean}     	props.withSortableKnob    Whether the item should be allowed to only be draggable from a specific (knob) handle.
 * @param  	   {Function}     	props.onChange            Callback function to be triggered when the user finishes a sorting gesture.
 * @return     {JSX.Element}                              Component to render.
 * @example
 *
 * <Sortable
 *     onChange={ ( value ) => setAttributes( { items: value } ) }
 * >
 *     { map( items, ( { value, label }, index ) => (
 *         <Element key={ value } label={ label } value={ value } onRemove={ () => onRemove( index ) } />
 *	   ) ) }
 * </Sortable>
 */
function Sortable( { children, instanceId, onChange, withSortableKnob, ...otherProps } ) {
	const handleOnSortEnd = ( oldIndex, newIndex ) => {
		const items = arrayMoveImmutable( children, oldIndex, newIndex );
		onChange( items );
	};

	return (
		<SortableList className={ componentClassName( 'sortable' ) } onSortEnd={ handleOnSortEnd } { ...otherProps }>
			{ map( children, ( item, index ) => (
				<SortableItem key={ `${ index }-${ instanceId }` }>
					<Flex align="center" className={ componentClassName( 'sortable__item' ) } direction="row" expanded={ false }>
						{ withSortableKnob && (
							<SortableKnob>
								<div className={ componentClassName( 'sortable__knob' ) }>
									<Icon icon={ dragHandle } />
								</div>
							</SortableKnob>
						) }
						{ item }
					</Flex>
				</SortableItem>
			) ) }
		</SortableList>
	);
}

Sortable.propTypes = {
	children: PropTypes.element,
	instanceId: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	withSortableKnob: PropTypes.bool,
};

Sortable.defaultProps = {
	children: undefined,
	instanceId: undefined,
	onChange: () => {},
	withSortableKnob: true,
};

export default withInstanceId( Sortable );
