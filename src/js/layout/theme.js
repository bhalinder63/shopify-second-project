/*
 * Basic file with global javascripts.
 * Files imported here will be available on every page.
 */

import 'Styles/layout/theme.scss';

// Global Files
import Alpine from '../utils/alpinebase';
import Image from '../components/image';
import { formValidation } from '../components/global/form-validation';
import Overlay from '../components/overlay';
import { initFooter } from '../components/global/footer';
import { initCart } from '../components/global/cart';

Alpine();
Image();
formValidation();
Overlay();
initFooter();
initCart();
