import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import SettingsApp from './SettingsApp';

const rootElement = document.getElementById( 'woo-product-options-addons' );
if ( rootElement ) {
	createRoot( rootElement ).render( <SettingsApp /> );
}
