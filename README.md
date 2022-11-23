# Design Pokemon's Pokedex

## Thought process
1. Try to gather main requirements, these are the must have features.
2. Find common features that could be expected but aren't specified in requirements (optional)
3. Figure out the non-functional requirements. These are mostly related to code quality.
4. Study API and plan out what are the models we'll need to build in typescript.
5. Codebase architecture (can be opinionated but should have good DX(Developer Experience) )

## Outcome

### Requirements
- Paginated list of pokemons
- Detailed page of a pokemon
- Add mock pokemon feature that doesn't use API
- E2E testing
- Mobile Responsive
- Error Handling

### Good to haves features
- Searching
- Filter by type
- Sorting

### Non-functional Requirements
- Loading indicators
- Infintie scrolling
- Optimization for number of rendered items on screen to prevent memory overflow
- Added pokemon should persist even after refreshing page
- Should be easy to plug in Add Pokemon API to replace mock ones.

### Non-achieveable requirements
- Sorting with added pokemons + fetched ones. This will not be achievable for paginated list because to do this, we'll need to get entire list of pokemon to combine with added ones. Otherwise, this will result in lost of data accuracy.


#### Step by steps
1. Choose a framework. Decided to go for NextJS because it's much faster for me to create MVPs and deploy them.
2. Start with base nextjs typescript boilerplate (with eslint).
3. Install some node packages I plan to use. (prettier, tailwindcss, react-query, axios)
  - prettier for code formatting consistency
  - tailwindcss, faster styling and smaller css bundle
  - react-query for handling data-fetching states (can be used for local states as well, didn't use Redux because it felt overkill)
  - axios over fetch() because it's just easier and require less code to handle responses from API
4. Setup codebase structure
5. Setup API functions & Models
6. 


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
