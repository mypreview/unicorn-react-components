/**
 * External dependencies
 *
 * @ignore
 */
import classnames from 'classnames';
import { isEqual, isUndefined } from 'lodash';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 *
 * @ignore
 */
import { ifCondition } from '@wordpress/compose';

/**
 * Internal dependencies
 *
 * @ignore
 */
import { Constants } from '../utils';

/**
 * Media component to represent image or video element depending
 * on the media type being stored within the block attributes.
 *
 * @function
 * @since 	   1.0.0
 * @param      {Object}         props              Component properties.
 * @param 	   {string}  	    props.alt    	   Alternative text description of the image.
 * @param 	   {string}  	    props.className    The CSS class name(s) that will be added to the component element.
 * @param 	   {number}  	    props.id           ID of selected or stored media element.
 * @param 	   {string}  	    props.mediaType    Media type such as Image or Video file type.
 * @param 	   {string}  	    props.url          Path to the image or video file.
 * @return     {JSX.Element}                       Component to render.
 * @example
 *
 * <Media
 *     className={ `${ className }__media` }
 *     id={ id }
 *     mediaType={ mediaType }
 *     url={ url }
 * />
 */
function Media( { alt, className, id, mediaType, url, ...otherProps } ) {
	return (
		<>
			{ isEqual( mediaType, Constants.IMAGE_MEDIA_TYPE ) && (
				<img alt={ alt } className={ classnames( className, { [ `wp-image-${ id }` ]: id } ) } src={ url } { ...otherProps } />
			) }
			{ isEqual( mediaType, Constants.VIDEO_MEDIA_TYPE ) && (
				<video
					autoPlay={ false }
					className={ className }
					controls
					controlsList="nodownload nofullscreen noremoteplayback"
					loop
					muted
					playsInline
					src={ url }
					{ ...otherProps }
				/>
			) }
		</>
	);
}

Media.propTypes = {
	alt: PropTypes.string,
	className: PropTypes.string,
	id: PropTypes.number,
	mediaType: PropTypes.string,
	url: PropTypes.string,
};

Media.defaultProps = {
	alt: undefined,
	className: undefined,
	id: undefined,
	mediaType: Constants.IMAGE_MEDIA_TYPE,
	url: undefined,
};

export default ifCondition( ( { id } ) => ! isUndefined( id ) )( Media );
