/**
Глобальный Vue компонент, позволяющий более удобным способом использовать svg-иконки
*/
import merge from 'lodash/merge';

export default function plugin(Vue) {
  if (plugin.installed) {
    return
  }
  plugin.installed = true

  const classRe = /\bsvg-icon\b/;
  // Импортируем иконки
  // #svg: вынести в отдельный чанк
  const icons = require.context('@/assets/svg/icons', false, /.*\.svg$/);
  icons.keys().forEach(icons);

  Vue.component('svg-icon', {
    functional: true,
    render(_h, ctx) {
      let staticClass = ctx.data.staticClass;
      if (!classRe.test(staticClass)) {
        staticClass = 'svg-icon' + (staticClass && staticClass.length ? (' ' + staticClass) : '')
      }
      return _h('i', {
        'class': ctx.data.class,
        staticClass: staticClass
      }, [
        _h('svg', {
          attrs: merge(ctx.data.attrs, {
            width: ctx.props.width,
            height: ctx.props.height,
            'pointer-events': 'none'
          })
        }, [
          _h('use', {
            attrs: {
              'xlink:href': `#${ctx.props.name}`
            }
          })
        ])
      ]);
    },
    props: {
      name: {
        type: String,
        required: true
      },
      width: String,
      height: String
    }
  });
};
