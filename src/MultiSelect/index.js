/**
 * External dependencies
 *
 * @ignore
 */
import { formattedContent, removeAtIndex } from '@mypreview/unicorn-js-utils';
import { useInputValue } from '@mypreview/unicorn-react-hooks';
import { concat, escapeRegExp, filter, find, forEach, map, merge, indexOf, includes, invoke, isEqual } from 'lodash';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 *
 * @ignore
 */
import { BaseControl, Button, CheckboxControl, FlexBlock, TextControl } from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { useEffect, useMemo, useState } from '@wordpress/element';

/**
 * Internal dependencies
 *
 * @ignore
 */
import Constants from './constants';
import { Pills } from './components';
import { ErrorMessage } from '../';
import { componentClassName } from '../utils';

/**
 * MultiSelect component designed to provide the ability to search for and select
 * any number of options from a set of "{ label, value }" pairs in any order.
 *
 * @function
 * @since	   1.5.1
 * @param	   {Object}		    props                  Component properties.
 * @param	   {string} 		props.help 		   	   A small help text displayed below the input field.
 * @param	   {boolean} 	    props.isClearable	   Is the select value clearable.
 * @param	   {boolean} 	    props.isSearchable	   Whether to enable search functionality.
 * @param	   {string} 		props.label 		   Label property as the content.
 * @param	   {Object} 		props.messages 		   Labels and notices for subcomponents. Merges user defined values into defaults.
 * @param	   {Function}	    props.onChange 		   Callback function to be triggered when the selected options change.
 * @param	   {Array}		    props.options 		   Set of "{ label, value }" pairs that can be selected.
 * @param	   {boolean} 	    props.withSelectAll    Enable "Select All" checkbox option.
 * @param	   {Array}		    props.value    		   List of values of the options that are currently selected.
 * @return     {JSX.Element}     					   Component to render.
 * @example
 *
 * <MultiSelect
 *    options={ [ { value: 100, label: 'My blog post' }, { value: 108, label: 'My other blog post' } ] }
 *    onChange={ ( value ) => { setAttributes( { ids: value } ); } }
 *    value={ ids }
 * />
 *
 * // => Array [ 100, 108 ]
 */
function MultiSelect( { help, isClearable, isSearchable, label: title, messages: _messages, onChange, options, withSelectAll, value: selectedOptions } ) {
	const [ selected, setSelected ] = useState( [] );
	const instanceId = useInstanceId( MultiSelect );
	const [ searchText, setSearchText ] = useInputValue( '' );
	const messages = merge( {}, Constants.MESSAGES, _messages );

	useEffect( () => {
		const _options = [];
		forEach( selectedOptions, ( value ) => {
			const option = find( options, [ 'value', value ] );
			if ( !! option ) {
				_options.push( option );
			}
		} );
		setSelected( _options );
	}, [ selectedOptions, options ] );
	const filteredOptions = useMemo( () => {
		if ( ! Boolean( searchText.length ) ) {
			return options;
		}
		const pattern = new RegExp( escapeRegExp( searchText ), 'i' );
		return filter( options, ( { label } ) => invoke( label, 'match', pattern ) );
	}, [ searchText, options ] );
	const handleOnChangeSelectAll = () => {
		if ( ! isEqual( selected.length, options.length ) ) {
			onChange( map( options, ( { value } ) => value ) );
		} else {
			onChange( [] );
		}
	};
	const handleOnChangeOption = ( option ) => {
		const _index = indexOf( selectedOptions, option );
		if ( -1 === _index ) {
			onChange( concat( selectedOptions, option ) );
		} else {
			onChange( removeAtIndex( selectedOptions, _index ) );
		}
	};

	return (
		<BaseControl className={ componentClassName( 'multi-select' ) } help={ help } label={ title } id={ `multi-select-${ instanceId }` }>
			<FlexBlock css={ { paddingTop: 12 } }>
				<p>
					<strong>{ `${ selected.length } ${ messages.selected }` }</strong>
					{ isClearable && Boolean( selected.length ) && (
						<Button css={ { marginLeft: 12 } } isDestructive isSmall onClick={ () => onChange( [] ) } text={ messages.clear } />
					) }
				</p>
				<Pills
					doRender={ Boolean( selected.length ) }
					onRemove={ ( newIndex ) => onChange( removeAtIndex( selectedOptions, newIndex ) ) }
					onSort={ onChange }
					value={ selected }
				/>
				{ isSearchable && (
					<div css={ { marginBottom: 17 } }>
						<TextControl label={ messages.search } type="search" onChange={ setSearchText } />
						<ErrorMessage
							css={ { marginBottom: 0 } }
							doRender={ Boolean( searchText.length ) && ! Boolean( filteredOptions.length ) }
							status="warning"
						>
							{ messages.noResults }
						</ErrorMessage>
					</div>
				) }
				<ul
					css={ {
						margin: 0,
						padding: 4,
						maxHeight: 300,
						overflowY: 'scroll',
						li: {
							listStyleType: 'none',
						},
					} }
				>
					{ withSelectAll && ! Boolean( searchText.length ) && (
						<li>
							<CheckboxControl
								checked={ isEqual( selected.length, options.length ) }
								/* translators: Number of options selected from list. */
								label={ `${ messages.selectAll } (${ options.length })` }
								onChange={ handleOnChangeSelectAll }
							/>
						</li>
					) }
					{ map( filteredOptions, ( { value, label } ) => (
						<li key={ value }>
							<CheckboxControl
								checked={ includes( selectedOptions, value ) }
								label={ formattedContent( label ) }
								onChange={ () => handleOnChangeOption( value ) }
							/>
						</li>
					) ) }
				</ul>
			</FlexBlock>
		</BaseControl>
	);
}

MultiSelect.propTypes = {
	help: PropTypes.string,
	isClearable: PropTypes.bool,
	isSearchable: PropTypes.bool,
	label: PropTypes.string,
	messages: PropTypes.exact( {
		clear: PropTypes.string,
		noResults: PropTypes.string,
		search: PropTypes.string,
		selectAll: PropTypes.string,
		selected: PropTypes.string,
	} ),
	onChange: PropTypes.func,
	options: PropTypes.arrayOf(
		PropTypes.shape( { label: PropTypes.string, value: PropTypes.oneOfType( [ PropTypes.number, PropTypes.object, PropTypes.string ] ) } )
	),
	withSelectAll: PropTypes.bool,
	value: PropTypes.array,
};

MultiSelect.defaultProps = {
	help: undefined,
	isClearable: true,
	isSearchable: true,
	label: undefined,
	messages: {},
	onChange: () => {},
	options: [],
	withSelectAll: true,
	value: [],
};

export default MultiSelect;
