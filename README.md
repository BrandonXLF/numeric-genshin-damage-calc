# Numeric Genshin Damage Calculator

This React app allows you to easily calculate in-game character damage for Genshin Impact based off of numeric stat values.

The live version of the app is located at <https://www.brandonfowler.me/numeric-genshin-damage-calc/>.

## Running

Install dependencies using `npm install`. Launch the app in development mode using `npm run start` and produce a build of the app using `npm run build`.

## Environment Variables

Environment variables are defined in `.env` and can be overridden locally in the `.env.local` file see [Vite's documentation](https://vite.dev/guide/env-and-mode#env-files) for more info.

* `VITE_ENKA_PROXY` - The prefix to use for requests to Enka.Network API to work around CORS. The proxy should send requests to `https://enka.network/api/[REQUEST_PATH]` By default this is <https://www.brandonfowler.me/enka-proxy>.
