import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const theme = create({
  base: 'light',
  brandTitle: 'Sistema Claudio Figueiredo',
  brandUrl: 'https://sistemaclaudio-figueiredo.vercel.app',
  brandTarget: '_self',
});

addons.setConfig({
  theme,
  showToolbar: true,
  showPanel: true,
  panelPosition: 'bottom',
  enableShortcuts: true,
  showNav: true,
  showSearchBox: true,
  showAddons: true,
  showCanvas: true,
  showRoots: true,
}); 