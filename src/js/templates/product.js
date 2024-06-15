import 'Styles/templates/product.scss';

import { CollectionCard } from '../components/shared/collection-card';
import { ProductDetails } from '../components/shared/product-details';

CollectionCard();
customElements.define('product-details', ProductDetails);
