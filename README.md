# Tricentis Frontend Codebase (NextJS/React + WordPress backend)

## Tech stack overview

- [NextJS](https://nextjs.org/docs/getting-started) - React Framework for site builds
- [CSS Modules](https://nextjs.org/docs/basic-features/built-in-css-support) - Component-Level CSS (aka CSS Modules) with Sass support
- [Storybook](https://storybook.js.org/) - Component focused test harness for isolated component development and documentation

## Useful tech references

- [next-wordpress-starter](https://github.com/colbyfayock/next-wordpress-starter) - Sample headless NextJS/WordPress project
- [Patronage Headless WordPress + Next.js starter](https://github.com/patronage/bubs-next) - Sample headless NextJS/WordPress project
- [next/image API reference](https://nextjs.org/docs/api-reference/next/image) - reference on how `next/image` component works to optimize images at request time
- [next/getStaticPaths() reference](https://nextjs.org/docs/api-reference/data-fetching/get-static-paths) - details on routes handle pathing params and slugs
- [CSS Modules reference](https://github.com/css-modules/css-modules) - reference on how to use `CSS Modules` for locally scoped CSS (used for modules)
- [Writing Storybook stories reference](https://storybook.js.org/docs/react/writing-stories/args) - reference on how to write stories and use arguments for stories
- [WPGraphQL documentation](https://www.wpgraphql.com/docs/introduction/) - reference on how GraphQL works with WordPress (ex: [menus](https://www.wpgraphql.com/docs/menus/))

## Getting started

## Overview

- Use `yarn`, not `npm` for installing packages and running commands
- Use [VSCode](https://code.visualstudio.com/) (so we can all leverage same plugins and ensure consistent formatting)
- Install [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) plugin for VSCode and enable it so that your code reformats on save
- All modules should have Storybook stories created that demonstrate common use cases for the module

### Local setup

- Run `yarn install` in the root
- Create an `.env.local` in the project root (reference `NextJS Boilerplate local .env example` in 1Password)
  - `PREVIEW_JWT` - JWT token (as defined with `graphql_jwt_auth_secret_key` filter in WordPress PHP - [ref](https://github.com/wp-graphql/wp-graphql-jwt-authentication))
  - `PREVIEW_USER` - WP user to use for previewing post content
  - `PREVIEW_PASS` - WP user password to use for previewing post content
  - `PREVIEW_SECRET` - Secret text validated server-side by `preview.js`

### SSL setup instructions (required for the form components only)

If you would like to test the form component, you will need to add a local domain name to your hosts file and generate a locally signed SSL certificate to prevent the `SimpleDTO` script from throwing `CORS` errors. The `SimpleDTO` script is required for form prefill to function.

**To enable SSL and run the server.js file:**

- Add `127.0.0.1 local.tricentis.com` to your hosts file
  - On Windows, it is located at `C:\Windows\System32\drivers\etc`
  - On Mac, follow [these instructions](https://setapp.com/how-to/edit-mac-hosts-file) being sure to run `sudo killall -HUP mDNSResponder` after the changes
- Create a `certificates` folder in tricentis-frontend and cd into it.
- If you are using bash or another terminal that has openssl, you can run the following command:
  `openssl req -newkey rsa:2048 -nodes -keyout local.tricentis.com.key.pem -x509 -days 365 -out local.tricentis.com.cert.pem`
- It will prompt you to enter values for various fields. All of them can be left bank **except** the `Common Name`, which you should be assigned the value: `tricentis.com`. You should now have a 2 new files inside certificates.
- Change directory back into the root directory, and you can now start the custom server with `node server.js` (you will run this instead of `yarn run dev`)
- NextJs compiler and fast refresh will still work properly for development, but you will now need to use the domain name `https://local.tricentis.com:3000/` when viewing your local site. (This has not been tested with the sample preview url).

### Package.json commands

| Command                    | Use Case                                                               |
| -------------------------- | ---------------------------------------------------------------------- |
| `yarn run dev`             | run in dev mode (live refresh)                                         |
| `yarn run build`           | run a build                                                            |
| `yarn run start`           | start the Node server hosting what was built                           |
| `yarn run storybook`       | for isolated component level testing                                   |
| `yarn run build-storybook` | build a static Storybook to `storybook-static` (used by Netlify build) |

NOTE:: There is no `clean` build command as NextJS does not use any caching between builds (as best we know).

---

## Developer guidance

### Accessibility and theming

- Theming should be set at a component levels with a class of `light-theme` (default/optional), `midtone-theme`, or `dark-theme`
- Atoms that require accessibility should have styles that change with a parent class of `accessibility-colors`
- Accessibility colors can be tested in storybook by switching between the `default` and `accessibile` themes in the top toolbar
- Accessibility can be tested in Storybook via the Accessibility tab, using addon-ally https://storybook.js.org/addons/@storybook/addon-a11y (tests can be rerun by clicking the button in the bottom right of the Accessibility panel)

### REST Api documentation

REST api docs are available on a dedicated documentation multidev: https://restapi-tricentis-backend.pantheonsite.io/wp-admin/options-general.php?page=swagger-ui. Note that this is only viewable after logging into https://restapi-tricentis-backend.pantheonsite.io/editor-login.

> Important:
> Any REST api backend updates that are made on `be-develop` must be copied to `restapi-tricentis-backend` in order to keep documentaiton up to date.

## Helpful things to know

- There is a test page `/_dev` that shows some common styles
- The `next/image` component should be used for showing all images.
  - It uses a request-time optimization pattern by which the backend Node server optimizes the image at request time and caches for subsequent requests.
  - Unlike Gatsby, images are not generated at build time, but request time
  - NOTE: Domains must be whitelisted in `next.config.js` to allow `next/image` to work for a given image url
- Adding a new language requires updates to the 'netlify-plugin-menu-json-generator-narwhal' and 'netlify-plugin-rss-xml-generator-narwhal' plugins so that it knows what languages to query for

### Component organization

Modules are organized in a loose atomic design structure ([reference article](https://andela.com/insights/structuring-your-react-application-atomic-design-principles/)) of `atoms > molecules > modules`. The simplest components are `atoms`, components which wrap and use atoms are `molecules`, and `modules` are components that would be put on a page.

### Process to make a module

- Clone a module folder
- Rename all references of the module name with your new module name
- Include `@import "../../../styles/baseline/_styles";` in your `.module.css`
- Define Storybook stories in `[modulename].stories.jsx`

### Process to make a page template

- Add new page template name in `StringConstants.js` (under `PageTemplates`) which matches the name used in the WordPress backend
- Create a new template folder in `components/page-templates` (ex: `TeamMemberArchvieTemplate`) and create the corresponding `.jsx` and `.module.scss` files
- Build out the page template referencing other page templates
- Edit `PageTemplateSelector.jsx` to return the new template component when the page.template matches
- Edit `[...slug].js` in `getStaticPaths()` to indicate that it knows how to handle the new template (referencing it's StringConstants name)
- Edit `wplib/pages.getPageTemplateDataByDatabaseID()` to use a graphql query for the page template

### Maintaining the custom redirection Netlify plugin (netlify-plugin-redirects-narwhal)

We have a Netlify plugin we have created (`/plugins/netlify-plugin-redirects-narwhal`) that queries for all redirects (from the Redirection WordPress plugin (and its corresponding GraphQL plugin)) and pushes them into Netlify's collection of redirects for a deployment.

When maintaining this plugin, you will want to add the following to your `netlify.toml` so that you can test the plugin locally with `netlify start`:

```
[[plugins]]
package = "@netlify/plugin-nextjs"

[build]
command = "yarn build"
publish = ".next"
```

These changes (^) are not included in the `netlify.toml` on Netlify as they will override the build settings for our builds, and break our Storybook builds which use a different build command and publish folder, and don't use the NextJS Netlify plugin.

### How preview works

Preview works by directing the user to an `/api/preview/` route passing along the `id` of the page as well as a `secret` (which must match `PREVIEW_SECRET` as defined in environment variables). So long as the NextJS server is running, the `/api/preview/` endpoint will verify the secret, make sure the page exists, authenticate as a user to generate a bearer token, and then redirect to the proper page URL passing along two cookies (`__prerender_bypass` and `__next_preview_data`) that indicate preview mode is on, and to get revisions in the REST call to get the latest preview data.

References:

- [Next.js Preview Mode documentation](https://nextjs.org/docs/advanced-features/preview-mode)
- [Next.js WordPress Example Github](https://github.com/vercel/next.js/tree/canary/examples/cms-wordpress)

#### How to troubleshoot preview (quick route)

- Run `yarn run dev` locally
- Visit a sample page preview url (ex: `// http://localhost:3000/api/preview?secret=[PREVIEW_SECRET]&id=3093&type=postType&typeValue=page` - replacing `[PREVIEW_SECRET]` with environment `PREVIEW_SECRET`)
- Visit a sample CPT preview url (ex: `http://localhost:3000/api/preview?secret=[PREVIEW_SECRET]&id=1395&type=postType&typeValue=case_study` - replacing `[PREVIEW_SECRET]` with environment `PREVIEW_SECRET`)

#### How to troubleshoot preview (full route)

- Create a new backend multi-dev instance
- Create a new frontend code branch with your preview changes
- Setup a new Netlify Site configured to build using the new backend endpoint and building your frontend branch
- Update the Jamstack plugin settings on the new backend multi-dev instance to point to your front-end branch's preview api route (/api/preview)

NOTE:: Configuring a new Netlify instance is needed so that the environment can point to the proper backend you are testing with

#### Known issues with preview

- Previewing of some forms (ex: Preference Center) do not look correct as the logic is based on the url ending in /preference-center (which will not be the case for a preview)
- `wp-graphql` does not respond properly with preview data if the data is queried by `slug` or `uri` - the data must be queried by `database id` or `id`. ([github issue reference](https://github.com/wp-graphql/wp-graphql/issues/1673))
  - NOTE: The current WP preview plugin we are using uses database id (ex: `2`) instead of id (ex: `cG9zdDoy`), which is why we are querying by database id currently (see `TODO items` item about potentially switching away from database id)
- Querying for SEO data in a preview request throws errors, so we use a different query for preview just for that (ref: `QUERY_PAGE_BY_ID` vs `QUERY_PAGE_BY_ID_WITH_SEO`)

---

## Common dev issues / Troubleshooting tips

- Component doesn't show within Storybook, but no build errors?
  - Check the console out put for Storybook in a browser - likely showing a runtime error (ex: test stories aren't setting test cases well (ex: name of story variable not consistent between creating it and setting its args)
- Rendering a page gives an Internal Server Error 500
  - Typically a bad GraphQL query - try to run the query manually in GraphiQL in wp-admin
- `rem-calc` method not turning into `rem` units at runtime (ex: Developer Tools shows `rem-calc(16)` instead of `1 rem`)
  - Make sure you are importing `_styles` in your module
- Build fails with `Error: Cannot query field "seo" on type "Page".`
  - The WordPress backend does not have `Yoast` and `WPGraphQL Yoast SEO Addon` plugins installed
- Storybook build is failing due to file being unable to resolve in scss?
  - Make sure to add an alias to that file in `.storybook/main.js`

## Known issues

- WPGraphQL limits responses to only 100 items without changing `graphql_connection_max_query_amount` backend value. Currenlty this is set to 3000 on the backend (so we can query for all redirects - up to 3000). Should consider implementing paged requests when needing to get all items of a given type. (task TR2-79)
- Querying by uri with WPGraphQL does not work for custom post types when used in tandem with WPML. For example, we cannot directly query for a case study by uri - it will return null even though the uri is valid. As such we have to instead query for a listing of all case studies and find the matching id based on uri by ourselves. Ref: KI-WPML-URI-ISSUE [NOTE:: See UPDATE below as this is no longer an issue persay, but an intentional decision]

  - UPDATE: Because of Netlify issue number 1179 ([Github reference](https://github.com/netlify/next-runtime/issues/1179)), having `fallback` set to `false` (like we have) is not preventing paths (which aren't in the paths returned from `GetStaticPaths`) being 404'd properly. As such, whatever URL routes that hit `[[...slug]].js` are attemped to be generated at request time. If it werent for this KI-WPML-URI-ISSUE issue, those bad paths would be passed to a direct backend query, which could open a path for an injection attack. As such, **KI-WPML-URI-ISSUE is considered a good thing (and an approach we want to stick with)** as looking up all valid URLs and comparing them prevents potential injection attacks VS if we were querying the url passed into the route directly.
  - Example of unworking query:

  ```
    query McKessonByUriQuery {
      caseStudy(id: "/fr/case-studies/mckesson/", idType: URI) {
        id
        databaseId
        title
        slug
        uri
        locale {
          locale
        }
      }
    }


  ```

- See `Known issues` in `How preview works` section.

## TODO items

- Address `TODO::` items (in comments of code)
- Fix needing two queries per page (one to get `databaseId` from slug/uri, the other to get data by `databaseId`)
  - Known issue with `wp-graphql` preventing querying of preview data by slug ([ref](https://github.com/wp-graphql/wp-graphql/issues/1673))
  - Fixing this would prevent needing two queries per page
- Switch back to ids and not database IDs?
- Preview plugin currently uses database id (ex: `2`) instead of post ids (ex: `cG9zdDoy`), so keeping with database ids until a different preview plugin is in place

## Change history

- ongoing - initial sprint 1 work
- 2022/02/20 - Initial creation of Tricentis codebase
- 2022/02/20 - Initial release to master (boilerplate)
