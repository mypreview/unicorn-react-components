/**
 * External dependencies
 *
 * @ignore
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 *
 * @ignore
 */
import { PREFIX } from '.';

/**
 * Generates component specific CSS class names.
 *
 * @function
 * @since 	   1.0.0
 * @param  	   {string}    name          Name of the component.
 * @param  	   {Array}     classNames    Optional. Additional CSS class names.
 * @return     {string}                  Component specific CSS class names for customization purposes.
 * @ignore
 */
export default ( name, classNames = [] ) => classnames( PREFIX, `${ PREFIX }--${ name }`, classNames );
