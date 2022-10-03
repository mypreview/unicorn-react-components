/**
 * External dependencies
 *
 * @ignore
 */
import { useGetSiteData } from '@mypreview/unicorn-react-hooks';
import PropTypes from 'prop-types';

/**
 * WordPress dependencies
 *
 * @ignore
 */
import { useSelect } from '@wordpress/data';
import { sprintf, __ } from '@wordpress/i18n';
import { addQueryArgs } from '@wordpress/url';

/**
 * Internal dependencies
 *
 * @ignore
 */
import { AddButton, ErrorMessage } from '../';

/**
 * A wrapper component around the "Button" component provided by the core.
 *
 * This component has been created to represent creating a new post-type post
 * with consideration for ease of styling and following D.R.Y principle.
 *
 * @function
 * @since 	   2.0.0
 * @param      {Object}         props             	  Component properties.
 * @param  	   {JSX.Element}    props.children    	  Any React element or elements can be passed as children. They will be rendered within the wrapper.
 * @param  	   {string}    		props.errorMessage    Error message displayed when the current user doesn’t have enough permission to create new posts.
 * @param  	   {string}    		props.postType    	  The post type. Default "post".
 * @return     {JSX.Element}                      	  Component to render.
 * @example
 *
 * <NewPostLink postType="page" />
 */
function NewPostLink( { children, errorMessage, postType, ...otherProps } ) {
	const canCreate = useSelect( ( select ) => !! select( 'core' ).canUser( 'create', 'posts' ), [] );
	const { siteData } = useGetSiteData();
	const newPostUrl = addQueryArgs( `${ siteData?.url }/wp-admin/post-new.php`, {
		post_type: postType,
	} );

	return (
		<>
			<AddButton doRender={ canCreate } icon={ undefined } href={ newPostUrl } label={ undefined } variant="link" { ...otherProps }>
				{ children || /* translators: %s: Post type name. */ sprintf( __( 'Create a new %s' ), postType ) }
			</AddButton>
			<ErrorMessage css={ { marginBottom: 0 } } doRender={ ! canCreate } status="warning">
				{ errorMessage }
			</ErrorMessage>
		</>
	);
}

NewPostLink.propTypes = {
	children: PropTypes.element,
	errorMessage: PropTypes.string,
	postType: PropTypes.string,
};

NewPostLink.defaultProps = {
	children: undefined,
	errorMessage: __( 'You don’t have permission to create posts.' ),
	postType: 'post',
};

export default NewPostLink;
