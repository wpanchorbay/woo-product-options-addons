import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import OptionsApp from './OptionsApp';

const rootElement = document.getElementById( 'product-options-addons-woo' );
if ( rootElement ) {
	createRoot( rootElement ).render( <OptionsApp /> );
}
