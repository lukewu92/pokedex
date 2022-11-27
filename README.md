## Prerequisite
First, install packages,
```bash
npm install
# or
yarn
```


Then, run development mode

```bash
npm start
# or
yarn start
```

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

### Good to haves features
- Searching
- Filter by type
- Sorting
- E2E testing
- Mobile Responsive
- Error Handling

### Non-functional Requirements
- Loading indicators
- Infinity scrolling
- Optimization for number of rendered items on screen to prevent memory overflow (can use `react-virtual` to deal with this)
- Added pokemon should persist even after refreshing page
- Should be easy to plug in Add Pokemon API to replace mock ones.

### Non-achieveable requirements
- Sorting with added pokemons + fetched ones. This will not be achievable for paginated list because to do this, we'll need to get entire list of pokemon to combine with added ones. Otherwise, this will result in lost of data accuracy.


#### Step by steps
1.  Choose a framework. Decided to go for NextJS because it's much faster for me to create MVPs and deploy them.
2.  Start with base nextjs typescript boilerplate (with eslint).
3.  Install some node packages I plan to use. (prettier, tailwindcss, react-query, axios)
    - prettier for code formatting consistency
    - tailwindcss, faster styling and smaller css bundle
    - react-query for handling data-fetching states (can be used for local states as well, didn't use Redux because it felt overkill)
    - axios over fetch() because it's just easier and require less code to handle responses from API
4.  Setup codebase structure
5.  Setup API functions & Models structure

6. Setup react-query client
##### Starts implemented API -  Fetching pokemons
7.  Setup fetch pokemons API and models
8.  Setup query hooks to fetch pokemon list
9. Setup query hooks to fetch pokemon details by pokemon name or id

##### Pokemon list UI
10. Create list component that calls the query hooks to fetch pokemon list.
11. Create listing of pokemon that shows (Pokemon Index, Name, Image, Type)
12. Noticed that, these info needs to call fetch pokemon details to get image
13. Fetch pokemon details as well for every pokemon, but use a different query key
14. Show loaders while pokemon infos are being fetched but show name first.
15. Display `PokemonID`, `Name`, `Image`, `Type` to pokemon list item.
16. Make it responsive
17. Create interaction, clicking on it will bring user to `/pokemons/{{pokemonId}}` route.

##### On Pokemon Detail page
18. Retrieve pokemonId from router
19. Fetch pokemon details with pokemonId by calling the same query hooks as previous one to get pokemon details (shouldn't have to call api again unless cache/refresh clears)
20. Add a back button + show detailed pokemon information.
21. Show `Image`, `Types`, `Weight`, `Height`, `Moves`, `Abilities`, `Stats`

##### Adding a Pokemon (will be using indexedDB for browser storage)
22.  Setup indexedDB (for storing pokemon info locally) - Using this because larger size limit (for images)
23. IndexedDB initialization flow - OpenDB -> Create DB tables/object store (precheck before creating)
24. Add functions to add a pokemon record into object store
25. Get functions to get pokemon list
26. Setup query hooks to add to existing added pokemon list & to fetch from list

##### Sanitize added pokemon data from form data
27. Since we're gonna be uploading images, we will need to convert image data into base64 and vice versa.
28. Call query hook to add pokemon list which also calls function to store record into object store in indexedDB.
29. update query data manually after adding to indexedDB is successful to match query data with indexedDB.
