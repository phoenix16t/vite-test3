var script$1 = /*#__PURE__*/{
  name: 'TestlibSample',

  // vue component name
  data() {
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
    changedBy() {
      const {
        message
      } = this;
      if (!message.action) return 'initialized';
      return `${message.action} ${message.amount || ''}`.trim();
    }

  },
  methods: {
    increment(arg) {
      const amount = typeof arg !== 'number' ? 1 : arg;
      this.counter += amount;
      this.message.action = 'incremented by';
      this.message.amount = amount;
    },

    decrement(arg) {
      const amount = typeof arg !== 'number' ? 1 : arg;
      this.counter -= amount;
      this.message.action = 'decremented by';
      this.message.amount = amount;
    },

    reset() {
      this.counter = this.initCounter;
      this.message.action = 'reset';
      this.message.amount = null;
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "testlib-sample"
  }, [_c('p', [_vm._v("The counter was " + _vm._s(_vm.changedBy) + " to "), _c('b', [_vm._v(_vm._s(_vm.counter))]), _vm._v(".")]), _vm._v(" "), _c('button', {
    on: {
      "click": _vm.increment
    }
  }, [_vm._v("\n    Click +1\n  ")]), _vm._v(" "), _c('button', {
    on: {
      "click": _vm.decrement
    }
  }, [_vm._v("\n    Click -1\n  ")]), _vm._v(" "), _c('button', {
    on: {
      "click": function ($event) {
        return _vm.increment(5);
      }
    }
  }, [_vm._v("\n    Click +5\n  ")]), _vm._v(" "), _c('button', {
    on: {
      "click": function ($event) {
        return _vm.decrement(5);
      }
    }
  }, [_vm._v("\n    Click -5\n  ")]), _vm._v(" "), _c('button', {
    on: {
      "click": _vm.reset
    }
  }, [_vm._v("\n    Reset\n  ")])]);
};

var __vue_staticRenderFns__$1 = [];
/* style */

const __vue_inject_styles__$1 = function (inject) {
  if (!inject) return;
  inject("data-v-0cff8cd2_0", {
    source: ".testlib-sample[data-v-0cff8cd2]{display:block;width:400px;margin:25px auto;border:1px solid #ccc;background:#eaeaea;text-align:center;padding:25px}.testlib-sample p[data-v-0cff8cd2]{margin:0 0 1em}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__$1 = "data-v-0cff8cd2";
/* module identifier */

const __vue_module_identifier__$1 = undefined;
/* functional template */

const __vue_is_functional_template__$1 = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__$1 = /*#__PURE__*/normalizeComponent({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, false, createInjector, undefined, undefined);

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
//
var script = {
  name: 'HelloWorld',
  props: {
    msg: String
  }
};

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('div', {
    staticClass: "hello"
  }, [_c('h1', [_vm._v(_vm._s(_vm.msg))]), _vm._v(" "), _vm._m(0), _vm._v(" "), _c('h3', [_vm._v("Installed CLI Plugins")]), _vm._v(" "), _vm._m(1), _vm._v(" "), _c('h3', [_vm._v("Essential Links")]), _vm._v(" "), _vm._m(2), _vm._v(" "), _c('h3', [_vm._v("Ecosystem")]), _vm._v(" "), _vm._m(3)]);
};

var __vue_staticRenderFns__ = [function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('p', [_vm._v("\n    For a guide and recipes on how to configure / customize this project,"), _c('br'), _vm._v("\n    check out the\n    "), _c('a', {
    attrs: {
      "href": "https://cli.vuejs.org",
      "target": "_blank",
      "rel": "noopener"
    }
  }, [_vm._v("vue-cli documentation")]), _vm._v(".\n  ")]);
}, function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('ul', [_c('li', [_c('a', {
    attrs: {
      "href": "https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel",
      "target": "_blank",
      "rel": "noopener"
    }
  }, [_vm._v("babel")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint",
      "target": "_blank",
      "rel": "noopener"
    }
  }, [_vm._v("eslint")])])]);
}, function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('ul', [_c('li', [_c('a', {
    attrs: {
      "href": "https://vuejs.org",
      "target": "_blank",
      "rel": "noopener"
    }
  }, [_vm._v("Core Docs")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "https://forum.vuejs.org",
      "target": "_blank",
      "rel": "noopener"
    }
  }, [_vm._v("Forum")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "https://chat.vuejs.org",
      "target": "_blank",
      "rel": "noopener"
    }
  }, [_vm._v("Community Chat")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "https://twitter.com/vuejs",
      "target": "_blank",
      "rel": "noopener"
    }
  }, [_vm._v("Twitter")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "https://news.vuejs.org",
      "target": "_blank",
      "rel": "noopener"
    }
  }, [_vm._v("News")])])]);
}, function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('ul', [_c('li', [_c('a', {
    attrs: {
      "href": "https://router.vuejs.org",
      "target": "_blank",
      "rel": "noopener"
    }
  }, [_vm._v("vue-router")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "https://vuex.vuejs.org",
      "target": "_blank",
      "rel": "noopener"
    }
  }, [_vm._v("vuex")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "https://github.com/vuejs/vue-devtools#vue-devtools",
      "target": "_blank",
      "rel": "noopener"
    }
  }, [_vm._v("vue-devtools")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "https://vue-loader.vuejs.org",
      "target": "_blank",
      "rel": "noopener"
    }
  }, [_vm._v("vue-loader")])]), _vm._v(" "), _c('li', [_c('a', {
    attrs: {
      "href": "https://github.com/vuejs/awesome-vue",
      "target": "_blank",
      "rel": "noopener"
    }
  }, [_vm._v("awesome-vue")])])]);
}];
/* style */

const __vue_inject_styles__ = function (inject) {
  if (!inject) return;
  inject("data-v-be2d54ec_0", {
    source: "h3[data-v-be2d54ec]{margin:40px 0 0}ul[data-v-be2d54ec]{list-style-type:none;padding:0}li[data-v-be2d54ec]{display:inline-block;margin:0 10px}a[data-v-be2d54ec]{color:#42b983}.hello[data-v-be2d54ec]{font-family:Avenir,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-align:center;color:#2c3e50;margin-top:60px}",
    map: undefined,
    media: undefined
  });
};
/* scoped */


const __vue_scope_id__ = "data-v-be2d54ec";
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, createInjector, undefined, undefined);

/* eslint-disable import/prefer-default-export */

var components = /*#__PURE__*/Object.freeze({
  __proto__: null,
  HelloWorld: __vue_component__,
  TestlibSample: __vue_component__$1
});

// Import vue components

const install = function installTestlib(Vue) {
  Object.entries(components).forEach(([componentName, component]) => {
    Vue.component(componentName, component);
  });
}; // Create module definition for Vue.use()

export default install;
export { __vue_component__ as HelloWorld, __vue_component__$1 as TestlibSample };