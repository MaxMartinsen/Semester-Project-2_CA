import './src/index.css';
import 'flowbite';
import './src/css/iconsfont.css';

import { toggleTabs } from './src/js/components/components.mjs';

document.addEventListener('DOMContentLoaded', () => {
  toggleTabs('.tab-trigger', '.tab-content');
});
