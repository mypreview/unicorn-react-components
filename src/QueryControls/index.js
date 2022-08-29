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
import { RangeControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 *
 * @ignore
 */
import { TermsTreeSelect } from '../';
import { componentClassName } from '../utils';
import Constants from './constants';

/**
 * Helper component to adjust arguments to query (retrieve) posts.
 *
 * @function
 * @since 	   1.1.0
 * @param      {Object}         props                              Component properties.
 * @param  	   {number}     	props.maxItems                     Maximum number of items.
 * @param  	   {number}         props.minItems                     Minimum number of items.
 * @param  	   {number}    	    props.numberOfItems                The selected number of items to retrieve via the query.
 * @param  	   {Function}    	props.onNumberOfItemsChange        A function that receives the new number of items value.
 * @param  	   {Function}    	props.onOrderChange                A function that receives the new order value.
 * @param  	   {Function}    	props.onOrderByChange              A function that receives the new orderby value.
 * @param  	   {Function}    	props.onTermChange                 A function that receives the new term (category) value.
 * @param  	   {string}    	    props.order                        The order in which to retrieve posts.
 * @param  	   {string}    	    props.orderBy                      The meta key by which to order posts.
 * @param  	   {Object}    	    props.otherOrderProps              Additional properties to be added to the "Order" control.
 * @param  	   {Object}    	    props.otherTermsTreeSelectProps    Additional properties to be added to the "Term" dropdown control.
 * @param  	   {Object}    	    props.otherNumberOfItemsProps      Additional properties to be added to the "Number of items" (Range) control.
 * @param  	   {string}    	    props.selectedTermId               The selected term (category) id.
 * @param  	   {string}    	    props.taxonomy                     Taxonomy (term) name.
 * @return     {JSX.Element}                                       Component to render.
 * @example
 *
 * <QueryControls
 *	maxItems={ maxLimit }
 *	numberOfItems={ limit }
 *	order={ order }
 *	orderBy={ orderby }
 *	onNumberOfItemsChange={ ( value ) => setAttributes( { limit: value } ) }
 *	onOrderByChange={ ( value ) => setAttributes( { orderby: value } ) }
 *	onOrderChange={ ( value ) => setAttributes( { order: value } ) }
 * />
 */
function QueryControls( {
	maxItems,
	minItems,
	numberOfItems,
	onNumberOfItemsChange,
	onOrderChange,
	onOrderByChange,
	onTermChange,
	order,
	orderBy,
	otherOrderProps,
	otherTermsTreeSelectProps,
	otherNumberOfItemsProps,
	selectedTermId,
	taxonomy,
} ) {
	return (
		<div className={ componentClassName( 'query-controls' ) }>
			{ onOrderChange && onOrderByChange && (
				<SelectControl
					label={ __( 'Order by' ) }
					value={ `${ orderBy }/${ order }` }
					options={ Constants.ORDER_OPTIONS }
					onChange={ ( value ) => {
						const [ newOrderBy, newOrder ] = value.split( '/' );
						if ( newOrder !== order ) {
							onOrderChange( newOrder );
						}
						if ( newOrderBy !== orderBy ) {
							onOrderByChange( newOrderBy );
						}
					} }
					{ ...otherOrderProps }
				/>
			) }
			{ taxonomy && onTermChange && (
				<TermsTreeSelect
					label={ __( 'Term' ) }
					onChange={ onTermChange }
					taxonomy={ taxonomy }
					value={ selectedTermId }
					{ ...otherTermsTreeSelectProps }
				/>
			) }
			{ onNumberOfItemsChange && (
				<RangeControl
					label={ __( 'Number of items' ) }
					max={ maxItems }
					min={ minItems }
					onChange={ onNumberOfItemsChange }
					required
					value={ numberOfItems }
					{ ...otherNumberOfItemsProps }
				/>
			) }
		</div>
	);
}

QueryControls.propTypes = {
	maxItems: PropTypes.number,
	minItems: PropTypes.number,
	numberOfItems: PropTypes.number,
	onNumberOfItemsChange: PropTypes.func,
	onOrderChange: PropTypes.func,
	onOrderByChange: PropTypes.func,
	onTermChange: PropTypes.func,
	order: PropTypes.string,
	orderBy: PropTypes.string,
	otherOrderProps: PropTypes.object,
	otherTermsTreeSelectProps: PropTypes.object,
	otherNumberOfItemsProps: PropTypes.object,
	selectedTermId: PropTypes.string,
	taxonomy: PropTypes.string,
};

QueryControls.defaultProps = {
	maxItems: Constants.DEFAULT_MAX_ITEMS,
	minItems: Constants.DEFAULT_MIN_ITEMS,
	numberOfItems: undefined,
	onNumberOfItemsChange: undefined,
	onOrderChange: undefined,
	onOrderByChange: undefined,
	onTermChange: undefined,
	order: undefined,
	orderBy: undefined,
	otherOrderProps: undefined,
	otherTermsTreeSelectProps: undefined,
	otherNumberOfItemsProps: undefined,
	selectedTermId: undefined,
	taxonomy: undefined,
};

export default QueryControls;
