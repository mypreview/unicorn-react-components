/**
 * External dependencies
 *
 * @ignore
 */
import { ifArray } from '@mypreview/unicorn-js-utils';
import { useFindPostById } from '@mypreview/unicorn-react-hooks';
import { map, toString } from 'lodash';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 *
 * @ignore
 */
import { BaseControl, FlexBlock, RadioControl } from '@wordpress/components';
import { withInstanceId } from '@wordpress/compose';
import { useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 *
 * @ignore
 */
import { Query } from '../';
import { componentClassName } from '../utils';

/**
 * This component renders an array of given posts, and allows users to select one post from a set.
 *
 * @function
 * @since	   1.8.0
 * @param	   {Object}		    props               Component properties.
 * @param	   {string} 		props.help 		   	A small help text displayed below the input field.
 * @param      {string}         props.instanceId    A unique id for each instance of this component.
 * @param	   {string} 		props.isLoading 	Whether the query items are being fetched at the moment.
 * @param	   {string} 		props.label 		Label property as the content.
 * @param	   {Function}	    props.onChange 		Callback function to be triggered when the selected radio-option changes.
 * @param	   {Array}	    	props.options 		Set of "{ label, value }" pairs that can be selected.
 * @param	   {string}		    props.value    		Selected post id.
 * @return     {JSX.Element}     					Component to render.
 * @example
 *
 * <ListRadioSelect
 *     isLoading={ isLoading }
 *     onChange={ ( postId ) => setAttributes( { postId } ) }
 *     options={ [ { value: 100, label: 'My blog post' }, { value: 108, label: 'My other blog post' } ] }
 *     value={ "100" }
 * />
 *
 * // => String "100"
 */
function ListRadioSelect( { help, instanceId, isLoading, label, onChange, options, value, ...otherProps } ) {
	const selected = useFindPostById( value, options, 'value' );
	const { filteredOptions, havePosts } = useMemo( () => {
		const _options = map( options, ( { value: id, ...otherArgs } ) => ( {
			...otherArgs,
			value: toString( id ),
		} ) );
		return { havePosts: ifArray( _options ), filteredOptions: _options };
	}, [ options ] );

	return (
		<BaseControl
			css={ { width: '100%' } }
			className={ componentClassName( 'list-radio-select' ) }
			help={ help }
			id={ `list-radio-select-${ instanceId }` }
			label={ label }
		>
			<FlexBlock
				css={ {
					border: '1px solid #e0e0e0',
					boxSizing: 'border-box',
					margin: 0,
					padding: 0,
					maxHeight: '17em',
					overflowX: 'hidden',
					overflowY: 'scroll',
					'.components-radio-control__option': {
						alignItems: 'center',
						background: '#fff',
						borderBlock: '.5px solid #f0f0f0',
						color: '#757575',
						display: 'flex',
						margin: 0,
						padding: '12px 16px',
					},
					label: {
						flexGrow: 1,
					},
				} }
			>
				<Query
					Component={ RadioControl }
					doRender
					isLoading={ isLoading }
					havePosts={ havePosts }
					selected={ toString( selected?.value ) }
					options={ filteredOptions }
					onChange={ onChange }
					{ ...otherProps }
				/>
			</FlexBlock>
		</BaseControl>
	);
}

ListRadioSelect.propTypes = {
	help: PropTypes.string,
	instanceId: PropTypes.string,
	isLoading: PropTypes.bool,
	label: PropTypes.string,
	onChange: PropTypes.func,
	options: PropTypes.arrayOf( PropTypes.shape( { label: PropTypes.string, value: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ) } ) ),
	value: PropTypes.number,
};

ListRadioSelect.defaultProps = {
	help: undefined,
	instanceId: undefined,
	isLoading: true,
	label: undefined,
	onChange: () => {},
	options: [],
	value: undefined,
};

export default withInstanceId( ListRadioSelect );
