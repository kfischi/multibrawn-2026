The Netlify deploy errored, with the following guidance provided:

**Diagnosis:**  
The build fails during Next.js type checking because the `PropertyCard` component expects its `property` prop to match a type where `features` is a `string[]`, but the data passed at [`gallery/page.tsx`](#L68-L76) includes objects whose `features` field is typed (or inferred) as `string`. This mismatch triggers the TypeScript error reported at [`gallery/page.tsx` line 78](#L68-L73), stopping the build.

**Solution:**  
Ensure the `features` field in the objects you pass to `<PropertyCard />` is an array of strings. You can do this by either updating the data source so every property uses `features: string[]`, or by adjusting the type definition (and `PropertyCard` implementation) to accept both strings and string arrays—for example:

```ts
type Property = {
  id: string;
  name: string;
  type: string;
  location: string;
  image: string;
  features: string[]; // keep array form
  price: string;
  description: string;
};
```

If the source data only has a single string, wrap it before rendering (`features: [property.features]`) or change the data definition so it is stored as an array. Once the prop type matches the data, the build should succeed.

The relevant error logs are:

Line 55: ​
Line 56: [36m$ npm run build[39m
Line 57: > multibrawn-next@1.0.0 build
Line 58: > next build
Line 59:    [1m[38;2;173;127;168m▲ Next.js 15.5.12[39m[22m
Line 60:    - Environments: .env.local, .env.production
Line 61:  [37m[1m [22m[39m Creating an optimized production build ...
Line 62: Retrying 1/3...
Line 63:  [32m[1m✓[22m[39m Compiled successfully in 10.1s
Line 64:  [37m[1m [22m[39m Linting and checking validity of types ...
Line 65: [31mFailed to compile.
Line 66: [39m
Line 67: [36m./src/app/(marketing)/gallery/page.tsx[39m:[33m78[39m:[33m45[39m
Line 68: [31m[1mType error[22m[39m: Type '{ id: string; name: string; type: string; location: string; image: string; features: string
Line 69:   Type '{ id: string; name: string; type: string; location: string; image: string; features: string[]; price: string; descriptio
Line 70: [0m [90m 76 |[39m         [33m<[39m[33mdiv[39m className[33m=[39m{styles[33m.[39mpropertiesGrid}[33m>[39m
Line 71:  [90m 77 |[39m           {allProperties[33m.[39mmap((property) [33m=>[39m (
Line 72: [31m[1m>[22m[39m[90m 78 |[39m             [33m<[39m[33mPropertyCard[39m key[33m=[39m{property[33m.[39mid} property
Line 73:  [90m    |[39m                                             [31m[1m^[22m[39m
Line 74:  [90m 79 |[39m           ))}
Line 75:  [90m 80 |[39m         [33m<[39m[33m/[39m[33mdiv[39m[33m>[39m
Line 76:  [90m 81 |[39m       [33m<[39m[33m/[39m[33msection[39m[33m>[39m[0m
Line 77: Next.js build worker exited with code: 1 and signal: null
Line 78: [91m[1m​[22m[39m
Line 79: [91m[1m"build.command" failed                                        [22m[39m
Line 80: [91m[1m────────────────────────────────────────────────────────────────[22m[39m
Line 81: ​
Line 82:   [31m[1mError message[22m[39m
Line 83:   Command failed with exit code 1: npm run build
Line 84: ​
Line 85:   [31m[1mError location[22m[39m
Line 86:   In build.command from netlify.toml:
Line 87:   npm run build
Line 88: ​
Line 89:   [31m[1mResolved config[22m[39m
Line 90:   build:
Line 91:     command: npm run build
Line 92:     commandOrigin: config
Line 93:     environment:
Line 94:       - NEXT_PUBLIC_SUPABASE_ANON_KEY
Line 95:       - NEXT_PUBLIC_SUPABASE_URL
Line 96:       - SCRAPER_SECRET_KEY
Line 97:       - SUPABASE_SERVICE_ROLE_KEY
Line 98:       - NODE_VERSION
Line 99:       - SECRETS_SCAN_ENABLED
Line 100:     publish: /opt/build/repo/.next
Line 101:     publishOrigin: config
Line 102:   headers:
Line 103:     - for: /*
      values:
        Referrer-Policy: strict-origin-when-cross-origin
        X-Content-Type-Options: nosniff
   
Line 104: Build failed due to a user error: Build script returned non-zero exit code: 2
Line 105: Failing build: Failed to build site
Line 106: Finished processing build request in 36.166s
Line 107: Failed during stage 'building site': Build script returned non-zero exit code: 2
