/**
 * External dependencies
 *
 * @ignore
 */
import { useGetTerms } from '@mypreview/unicorn-react-hooks';
import { groupBy, map } from 'lodash';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 *
 * @ignore
 */
import { TreeSelect } from '@wordpress/components';
import { ifCondition } from '@wordpress/compose';
import { useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Renders a component is used to generate select input fields with
 * interface to select the parent page/term in a hierarchy of pages/terms.
 *
 * @function
 * @since 	   1.1.0
 * @param      {Object}         props              	   Component properties.
 * @param 	   {string}  	    props.label      	   Label property as the content.
 * @param	   {string}		    props.noOptionLabel    Label to represent empty selection.
 * @param 	   {Function}  	    props.onChange 	       Function that receives the value of the input.
 * @param 	   {string}  	    props.taxonomy    	   Taxonomy name that the term is part of.
 * @param 	   {string}  	    props.value            Link object value for the button component.
 * @return     {JSX.Element}                       	   Component to render.
 * @example
 *
 * <TermsTreeSelect
 *     label={ { __( 'Category' ) } }
 *     onChange={ ( value ) => setAttributes( { categories: value } ) }
 *     taxonomy={ 'categories' }
 *     value={ '12' }
 * />
 */
function TermsTreeSelect( { label, noOptionLabel, onChange, taxonomy, value, ...otherProps } ) {
	const { termsOptions } = useGetTerms( taxonomy );
	const termsTree = useMemo( () => {
		const flatTermsWithParentAndChildren = map( termsOptions, ( term ) => ( {
			children: [],
			parent: null,
			...term,
		} ) );

		const termsByParent = groupBy( flatTermsWithParentAndChildren, 'parent' );
		if ( termsByParent.null && termsByParent.null.length ) {
			return flatTermsWithParentAndChildren;
		}
		const fillWithChildren = ( terms ) =>
			map( terms, ( term ) => {
				const children = termsByParent[ term.id ];
				return {
					...term,
					children: children && children.length ? fillWithChildren( children ) : [],
				};
			} );

		return fillWithChildren( termsByParent[ '0' ] || [] );
	}, [ termsOptions ] );

	return <TreeSelect { ...{ label, noOptionLabel, onChange } } selectedId={ value } tree={ termsTree } { ...otherProps } />;
}

TermsTreeSelect.propTypes = {
	label: PropTypes.string,
	noOptionLabel: PropTypes.string,
	onChange: PropTypes.func,
	taxonomy: PropTypes.string,
	value: PropTypes.string,
};

TermsTreeSelect.defaultProps = {
	label: undefined,
	noOptionLabel: __( 'All' ),
	onChange: () => {},
	taxonomy: undefined,
	value: undefined,
};

export default ifCondition( ( { taxonomy } ) => Boolean( taxonomy ) )( TermsTreeSelect );
