;(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    192(t, r, o) {
      let content = o(256)
      typeof content === 'string' && (content = [[t.i, content, '']]),
        content.locals && (t.exports = content.locals)
      ;(0, o(34).default)('5a8c462a', content, !0, { sourceMap: !1 })
    },
    211(t, r, o) {
      'use strict'
      const e = o(77)
      const n = o(115)
      const c = o.n(n)
      const l = o(338)
      const d = o(340)
      const v = o(339)
      const f = o(208)
      const component = Object(e.a)(
        {},
        function () {
          const t = this
          const r = t.$createElement
          const o = t._self._c || r
          return o(
            'v-app',
            { attrs: { id: 'default' } },
            [
              o(
                'v-app-bar',
                { attrs: { app: '', flat: '', color: '#A8DBA8' } },
                [
                  o('v-app-bar-nav-icon'),
                  t._v(' '),
                  o('v-toolbar-title', { staticClass: 'white--text' }, [
                    t._v('\n      都留文科大学 ITC質疑応答Bot(仮)\n    ')
                  ])
                ],
                1
              ),
              t._v(' '),
              o('nuxt')
            ],
            1
          )
        },
        [],
        !1,
        null,
        null,
        null
      )
      r.a = component.exports
      c()(component, {
        VApp: l.a,
        VAppBar: d.a,
        VAppBarNavIcon: v.a,
        VToolbarTitle: f.a
      })
    },
    232(t, r, o) {
      o(233), (t.exports = o(234))
    },
    255(t, r, o) {
      'use strict'
      o(192)
    },
    256(t, r, o) {
      const e = o(33)(!1)
      e.push([t.i, 'h1[data-v-8d52fdb6]{font-size:20px}', '']), (t.exports = e)
    },
    56(t, r, o) {
      'use strict'
      const e = {
        layout: 'empty',
        props: { error: { type: Object, default: null } },
        data() {
          return {
            pageNotFound: '404 Not Found',
            otherError: 'An error occurred'
          }
        },
        head() {
          return {
            title:
              this.error.statusCode === 404
                ? this.pageNotFound
                : this.otherError
          }
        }
      }
      const n = (o(255), o(77))
      const c = o(115)
      const l = o.n(c)
      const d = o(338)
      const component = Object(n.a)(
        e,
        function () {
          const t = this
          const r = t.$createElement
          const o = t._self._c || r
          return o(
            'v-app',
            { attrs: { id: 'error' } },
            [
              t.error.statusCode === 404
                ? o('h1', [t._v('\n    ' + t._s(t.pageNotFound) + '\n  ')])
                : o('h1', [t._v('\n    ' + t._s(t.otherError) + '\n  ')]),
              t._v(' '),
              o('NuxtLink', { attrs: { to: '/' } }, [t._v(' Home page ')])
            ],
            1
          )
        },
        [],
        !1,
        null,
        '8d52fdb6',
        null
      )
      r.a = component.exports
      l()(component, { VApp: d.a })
    }
  },
  [[232, 3, 1, 4]]
])
