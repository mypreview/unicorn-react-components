/**
 * WordPress dependencies
 *
 * @ignore
 */
import { __ } from '@wordpress/i18n';

/**
 * The object exported from this file has been determined to be frozen mainly
 * to prevent new properties from being added to it, existing properties from
 * being removed, and avoid the values of existing properties from being changed.
 *
 * @ignore
 */
export default Object.freeze( {
	DEFAULT_MAX_ITEMS: 100,
	DEFAULT_MIN_ITEMS: 1,
	MAX_CATEGORIES_SUGGESTIONS: 20,
	ORDER_OPTIONS: [
		{
			label: __( 'Newest to oldest' ),
			value: 'date/desc',
		},
		{
			label: __( 'Oldest to newest' ),
			value: 'date/asc',
		},
		{
			label: __( 'A → Z' ),
			value: 'title/asc',
		},
		{
			label: __( 'Z → A' ),
			value: 'title/desc',
		},
	],
} );
