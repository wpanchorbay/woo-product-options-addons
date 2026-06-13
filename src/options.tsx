import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import OptionsApp from './OptionsApp';

const rootElement = document.getElementById( 'woo-product-options-addons' );
if ( rootElement ) {
	createRoot( rootElement ).render( <OptionsApp /> );
}
