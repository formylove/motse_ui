import {Icon} from 'antd';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1594566_tupl204rxs8.js',
});

export const TYPE = {
  NATIVE: 'icon-mobile-android',
  WEB: 'icon-monitor',
  SPA: 'icon-web-section-alt',
  SERVICE: 'icon-server',
};

export default IconFont;
