'use strict';function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}var script$1 = /*#__PURE__*/{
  name: 'TestlibSample',
  // vue component name
  data: function data() {
    return {
      counter: 5,
      initCounter: 5,
      message: {
        action: null,
        amount: null
      }
    };
  },
  computed: {
    changedBy: function changedBy() {
      var message = this.message;
      if (!message.action) return 'initialized';
      return "".concat(message.action, " ").concat(message.amount || '').trim();
    }
  },
  methods: {
    increment: function increment(arg) {
      var amount = typeof arg !== 'number' ? 1 : arg;
      this.counter += amount;
      this.message.action = 'incremented by';
      this.message.amount = amount;
    },
    decrement: function decrement(arg) {
      var amount = typeof arg !== 'number' ? 1 : arg;
      this.counter -= amount;
      this.message.action = 'decremented by';
      this.message.amount = amount;
    },
    reset: function reset() {
      this.counter = this.initCounter;
      this.message.action = 'reset';
      this.message.amount = null;
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        return () => { };
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: () => context._renderStyles(context._styles)
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return (id, style) => addStyle(id, style, context);
}
function addStyle(id, css, context) {
    const group = css.media || 'default' ;
    const style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        let code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    let css = '';
    for (const key in styles) {
        const style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "testlib-sample"
  }, [_vm._ssrNode("<p data-v-0cff8cd2>" + _vm._ssrEscape("The counter was " + _vm._s(_vm.changedBy) + " to ") + "<b data-v-0cff8cd2>" + _vm._ssrEscape(_vm._s(_vm.counter)) + "</b>.</p> <button data-v-0cff8cd2>\n    Click +1\n  </button> <button data-v-0cff8cd2>\n    Click -1\n  </button> <button data-v-0cff8cd2>\n    Click +5\n  </button> <button data-v-0cff8cd2>\n    Click -5\n  </button> <button data-v-0cff8cd2>\n    Reset\n  </button>")]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-0cff8cd2_0", {
    source: ".testlib-sample[data-v-0cff8cd2]{display:block;width:400px;margin:25px auto;border:1px solid #ccc;background:#eaeaea;text-align:center;padding:25px}.testlib-sample p[data-v-0cff8cd2]{margin:0 0 1em}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$1 = "data-v-0cff8cd2";
/* module identifier */

var __vue_module_identifier__$1 = "data-v-0cff8cd2";
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject shadow dom */

var __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, undefined, createInjectorSSR, undefined);//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  name: 'HelloWorld',
  props: {
    msg: String
  }
};/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "hello"
  }, [_vm._ssrNode("<h1 data-v-be2d54ec>" + _vm._ssrEscape(_vm._s(_vm.msg)) + "</h1> <p data-v-be2d54ec>\n    For a guide and recipes on how to configure / customize this project,<br data-v-be2d54ec>\n    check out the\n    <a href=\"https://cli.vuejs.org\" target=\"_blank\" rel=\"noopener\" data-v-be2d54ec>vue-cli documentation</a>.\n  </p> <h3 data-v-be2d54ec>Installed CLI Plugins</h3> <ul data-v-be2d54ec><li data-v-be2d54ec><a href=\"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel\" target=\"_blank\" rel=\"noopener\" data-v-be2d54ec>babel</a></li> <li data-v-be2d54ec><a href=\"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint\" target=\"_blank\" rel=\"noopener\" data-v-be2d54ec>eslint</a></li></ul> <h3 data-v-be2d54ec>Essential Links</h3> <ul data-v-be2d54ec><li data-v-be2d54ec><a href=\"https://vuejs.org\" target=\"_blank\" rel=\"noopener\" data-v-be2d54ec>Core Docs</a></li> <li data-v-be2d54ec><a href=\"https://forum.vuejs.org\" target=\"_blank\" rel=\"noopener\" data-v-be2d54ec>Forum</a></li> <li data-v-be2d54ec><a href=\"https://chat.vuejs.org\" target=\"_blank\" rel=\"noopener\" data-v-be2d54ec>Community Chat</a></li> <li data-v-be2d54ec><a href=\"https://twitter.com/vuejs\" target=\"_blank\" rel=\"noopener\" data-v-be2d54ec>Twitter</a></li> <li data-v-be2d54ec><a href=\"https://news.vuejs.org\" target=\"_blank\" rel=\"noopener\" data-v-be2d54ec>News</a></li></ul> <h3 data-v-be2d54ec>Ecosystem</h3> <ul data-v-be2d54ec><li data-v-be2d54ec><a href=\"https://router.vuejs.org\" target=\"_blank\" rel=\"noopener\" data-v-be2d54ec>vue-router</a></li> <li data-v-be2d54ec><a href=\"https://vuex.vuejs.org\" target=\"_blank\" rel=\"noopener\" data-v-be2d54ec>vuex</a></li> <li data-v-be2d54ec><a href=\"https://github.com/vuejs/vue-devtools#vue-devtools\" target=\"_blank\" rel=\"noopener\" data-v-be2d54ec>vue-devtools</a></li> <li data-v-be2d54ec><a href=\"https://vue-loader.vuejs.org\" target=\"_blank\" rel=\"noopener\" data-v-be2d54ec>vue-loader</a></li> <li data-v-be2d54ec><a href=\"https://github.com/vuejs/awesome-vue\" target=\"_blank\" rel=\"noopener\" data-v-be2d54ec>awesome-vue</a></li></ul>")]);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-be2d54ec_0", {
    source: "h3[data-v-be2d54ec]{margin:40px 0 0}ul[data-v-be2d54ec]{list-style-type:none;padding:0}li[data-v-be2d54ec]{display:inline-block;margin:0 10px}a[data-v-be2d54ec]{color:#42b983}.hello[data-v-be2d54ec]{font-family:Avenir,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-align:center;color:#2c3e50;margin-top:60px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-be2d54ec";
/* module identifier */

var __vue_module_identifier__ = "data-v-be2d54ec";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, createInjectorSSR, undefined);/* eslint-disable import/prefer-default-export */var components$1=/*#__PURE__*/Object.freeze({__proto__:null,HelloWorld: __vue_component__,TestlibSample: __vue_component__$1});var install = function installTestlib(Vue) {
  Object.entries(components$1).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        componentName = _ref2[0],
        component = _ref2[1];

    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()
var components=/*#__PURE__*/Object.freeze({__proto__:null,'default': install,HelloWorld: __vue_component__,TestlibSample: __vue_component__$1});// only expose one global var, with component exports exposed as properties of
// that global var (eg. plugin.component)

Object.entries(components).forEach(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      componentName = _ref2[0],
      component = _ref2[1];

  if (componentName !== 'default') {
    install[componentName] = component;
  }
});module.exports=install;