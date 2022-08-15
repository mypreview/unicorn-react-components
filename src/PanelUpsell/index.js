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
import { ExternalLink, HorizontalRule, PanelBody } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Creates a collapsible promotional container that contains upsell
 * notifications and links which can be toggled open or closed.
 *
 * @private
 * @function
 * @since 	   1.2.2
 * @param      {Object}         props               Component properties.
 * @param  	   {string}     	props.pluginSlug    Plugin slug to leave rating/review on the plugin directory.
 * @param  	   {boolean}    	props.withDonate    Promo for outlining donation link/website.
 * @param  	   {boolean}    	props.withHireMe    Promo for offering consultation.
 * @param  	   {boolean}        props.withRate      Promo for asking to rate for the plugin.
 * @return     {JSX.Element}                        Component to render.
 * @example
 *
 * <PanelUpsell pluginSlug="block-data-attribute" />
 */
function PanelUpsell( { pluginSlug, withDonate, withHireMe, withRate, ...otherProps } ) {
	return (
		<PanelBody
			css={ {
				strong: {
					display: 'block',
				},
			} }
			initialOpen
			title={ sprintf(
				/* translators: %s: Emoji. */
				__( '%s More' ),
				'⚡'
			) }
			{ ...otherProps }
		>
			{ withHireMe && (
				<>
					<p>
						<strong>{ __( 'Need help customizing this plugin?' ) }</strong>
						{ __( 'Get free of charge advice on what could be done or how complex different approaches are.' ) }
						<ExternalLink href="https://mahdiyazdani.com">{ __( 'Start a consultation' ) }</ExternalLink>
					</p>
					<HorizontalRule />
				</>
			) }
			{ withRate && pluginSlug && (
				<p>
					<strong>{ __( 'Liked the idea behind this plugin?' ) }</strong>
					{ __( 'Share your experience by leaving this plugin ' ) }
					<ExternalLink href={ sprintf( 'https://wordpress.org/support/plugin/%s/reviews/?filter=5#new-post', pluginSlug ) }>
						{ /* translators: %s: Emoji. */ sprintf( __( '5 stars %s if you like it.' ), '⭐⭐⭐⭐⭐' ) }
					</ExternalLink>
				</p>
			) }
			{ withDonate && (
				<p>
					{ __( 'You can also make a small ' ) }
					<ExternalLink href="https://www.buymeacoffee.com/mahdiyazdani">{ __( 'donation' ) }</ExternalLink>
					{ __( ' so I can continue maintaining and evolving my projects and new ones.' ) }
				</p>
			) }
		</PanelBody>
	);
}

PanelUpsell.propTypes = {
	pluginSlug: PropTypes.string,
	withDonate: PropTypes.bool,
	withHireMe: PropTypes.bool,
	withRate: PropTypes.bool,
};

PanelUpsell.defaultProps = {
	pluginSlug: undefined,
	withDonate: true,
	withHireMe: true,
	withRate: true,
};

export default PanelUpsell;
