/**
 * Utility for libraries from the `Lodash`.
 *
 * @ignore
 */
import { ifArray, pickRelevantMediaFiles } from '@mypreview/unicorn-js-utils';
import { every, map, merge } from 'lodash';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 *
 * @ignore
 */
import { isBlobURL } from '@wordpress/blob';
import { BlockControls, BlockIcon, MediaPlaceholder, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { DropZone, FormFileUpload, ToolbarButton, ToolbarItem, ToolbarGroup, withNotices } from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';
import { useDispatch } from '@wordpress/data';
import { mediaUpload } from '@wordpress/editor';
import { edit as editIcon, gallery as galleryIcon } from '@wordpress/icons';

/**
 * Internal dependencies
 *
 * @ignore
 */
import Constants from './constants';
import { Constants as UtilsConstants } from '../utils';

/**
 * This component provides a set of UI buttons that allows users to open and interact with the WordPress media library.
 * This placeholder component could make it possible to provide an integration with the core blocks that handle media files.
 *
 * @function
 * @since	   1.6.0
 * @param 	   {Object}         		props    		  		 Component properties.
 * @param 	   {boolean} 	       	    props.isSelected    	 Whether or not this element is currently selected.
 * @param	   {Object} 				props.messages 		     Labels and notices for subcomponents. Merges user defined values into defaults.
 * @param 	   {Object} 	       		props.noticeOperations   A number of functions to add notices to the editor.
 * @param 	   {boolean|JSX.Element}    props.noticeUI    	     The rendered NoticeList.
 * @param 	   {Function} 	       	    props.onChange    	     Function that receives the value of the media control.
 * @param      {string}        		    props.sizeSlug		     The currently-selected image size slug (thumbnail, large, etc).
 * @param 	   {Array} 	       		    props.value    	  	     Gallery images.
 * @param 	   {boolean} 	       		props.withFileUpload     Whether to render an additional button to upload extra images to the gallery.
 * @return     {JSX.Element} 			  		  		 		 Component to render.
 * @example
 *
 * <GalleryUpload
 *    isSelected={ isSelected }
 *    onChange={ ( value ) => { setAttributes( { images: value } ); } }
 *    sizeSlug="large"
 *    value={ images }
 * />
 *
 * // => Array [ { alt: '', caption: '', id: "21", url: 'http://dev.local/wp-content/uploads/2022/09/image.jpg' } ]
 */
function GalleryUpload( { isSelected, messages: _messages, noticeOperations, noticeUI, onChange, sizeSlug, value: images, withFileUpload } ) {
	const instanceId = useInstanceId( GalleryUpload );
	const { lockPostSaving, unlockPostSaving } = useDispatch( 'core/editor' );
	const messages = merge( {}, Constants.MESSAGES, _messages );
	const returnMappedImages = ( media ) => map( media, ( image ) => pickRelevantMediaFiles( image, sizeSlug ) );
	const handleOnSelectImages = ( media ) => {
		const mapped = returnMappedImages( media );
		onChange( mapped );
	};
	const handleOnFilesDrop = ( files ) => {
		const lockName = `GalleryUploadBlockLock-${ instanceId }`;
		lockPostSaving( lockName );
		mediaUpload( {
			allowedTypes: [ UtilsConstants.IMAGE_MEDIA_TYPE ],
			filesList: files,
			onFileChange: ( media ) => {
				const mapped = returnMappedImages( media );
				onChange( [ ...images, ...mapped ] );
				if ( ! every( mapped, ( image ) => isBlobURL( image.url ) ) ) {
					unlockPostSaving( lockName );
				}
			},
			onError: noticeOperations.createErrorNotice,
		} );
	};
	const handleOnUploadFiles = ( event ) => handleOnFilesDrop( event.target.files );

	return ! ifArray( images ) ? (
		<MediaUploadCheck fallback={ <p>{ messages.permission }</p> }>
			<MediaPlaceholder
				accept={ `${ UtilsConstants.IMAGE_MEDIA_TYPE }/*` }
				allowedTypes={ [ UtilsConstants.IMAGE_MEDIA_TYPE ] }
				disableDropZone
				icon={ <BlockIcon icon={ galleryIcon } /> }
				labels={ {
					title: messages.title,
					instructions: messages.instructions,
				} }
				multiple
				onError={ noticeOperations.createErrorNotice }
				onSelect={ handleOnSelectImages }
				notices={ noticeUI }
			/>
		</MediaUploadCheck>
	) : (
		<>
			{ noticeUI }
			<BlockControls group="other">
				<ToolbarGroup css={ { padding: '0 !important' } }>
					<ToolbarItem>
						{ () => (
							<MediaUpload
								allowedTypes={ [ UtilsConstants.IMAGE_MEDIA_TYPE ] }
								gallery
								multiple
								onSelect={ handleOnSelectImages }
								render={ ( { open } ) => <ToolbarButton icon={ editIcon } onClick={ open } title={ messages.edit } /> }
								value={ map( images, ( img ) => img.id ) }
							/>
						) }
					</ToolbarItem>
				</ToolbarGroup>
			</BlockControls>
			<DropZone onFilesDrop={ handleOnFilesDrop } />
			{ isSelected && withFileUpload && (
				<div
					css={ {
						marginTop: 4,
						width: '100%',
						'.components-form-file-upload': {
							width: '100%',
						},
					} }
				>
					<FormFileUpload
						accept={ `${ UtilsConstants.IMAGE_MEDIA_TYPE }/*` }
						css={ {
							'&': {
								marginTop: 45,
								justifyContent: 'center !important',
								width: '100%',
							},
						} }
						icon="insert"
						multiple
						onChange={ handleOnUploadFiles }
					>
						{ messages.upload }
					</FormFileUpload>
				</div>
			) }
		</>
	);
}

GalleryUpload.propTypes = {
	isSelected: PropTypes.bool,
	messages: PropTypes.exact( {
		edit: PropTypes.string,
		instructions: PropTypes.string,
		permission: PropTypes.string,
		title: PropTypes.string,
		upload: PropTypes.string,
	} ),
	noticeOperations: PropTypes.func,
	noticeUI: PropTypes.oneOfType( [ PropTypes.bool, PropTypes.element ] ),
	onChange: PropTypes.func,
	sizeSlug: PropTypes.string,
	value: PropTypes.arrayOf(
		PropTypes.shape( {
			alt: PropTypes.string,
			caption: PropTypes.string,
			fullUrl: PropTypes.string,
			id: PropTypes.number,
			link: PropTypes.string,
			url: PropTypes.string,
		} )
	),
	withFileUpload: PropTypes.bool,
};

GalleryUpload.defaultProps = {
	isSelected: false,
	messages: {},
	noticeOperations: () => {},
	noticeUI: undefined,
	onChange: () => {},
	sizeSlug: undefined,
	value: [],
	withFileUpload: true,
};

export default withNotices( GalleryUpload );
