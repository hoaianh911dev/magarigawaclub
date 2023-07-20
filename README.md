# Vite
+ Improving the dev server start time by first dividing the modules in an application into 2 categories: dependencies and source code
    -> Dependencies are mostly plain Javascript that do not change often during development(library).Vite pre-bundles dependencies using esbuild. It is written in Go and pre-bundles dependencies 10-100x faster than Javascript-based bundlers.
    -> Source code often contains non-plain Javascript that needs transforming(JSX, CSS, Vue...) and will be edited very often.
+ Vite only needs to transform and serve source code on demand, as the browser requests it. 

# Vue 3 + TypeScript + Vite

npm run dev
# Server with nodejs => api, json-server => mock db, jsonwebtoken => authencation
npm run server-api
# realtime chat
Firebase
# slide
swiperjs
# support component
element-plus
# translate
vue-i18n
# call api
axios
# support css
tailwindcss, scss
# notify
sweetalert2
# qrcode
qrcode
# send mail 
mailtrap
# template mail
pug
# server
**@tanstack/vue-query: npm install vue-query**
+ Provides hooks for fetching, caching and updating asynchronous data
+ Support Vue 2.x and 3.x
+ Based on React-Query. 
+ Reason: While most traditional state management libraries are great for working with client state, they are not so great at working with async or server state. This is because server state is totally different. All for reason for use:
-> Deduping multiple request for same data into a single request
-> Knowing when data is "out of date"
-> Updating to data as quickly as possible
-> Performance optimizations like pagination and lazy loading data
-> Managing memory and grabage collection of server state
-> Memoizing query result with structural sharing
=> In summary,  Vue-query is hands down one of the best libraries for managing server state. We can be customized to us liking as your application grows. It allows you to control your app data before it starts to control you.
*****WHY YOU NEED USE TO VUE-QUERY?*****
+ Help you remove many lines of complicated and misunderstood code
+ Make your application more maintainable and easier to build new features without worrying about wiring up new server state data sources
+ Make your application feel faster and more responsive than ever before
+ Help you save on bandwidth and increase memory performance
=> How it works: fetching available data immediately(not wait call API). However, API is called implicit to update data
+ invalidateQueries('list-items'): update data new from API
**Devtools Vue-Query**
+ They help visualize all of the inner workings of Vue Query and will likely save you hours of debugging if you find yourself in a pinch
+ Require: devtools
