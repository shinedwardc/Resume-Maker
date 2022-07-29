# Installation

1. Clone the repository with git
2. `corepack enable` to install the correct version of pnpm (faster package manager with no conflicts) or use the [installation guide](https://pnpm.io/installation)
3. pnpm install
4. Copy .env.template to .env in backend and set `MONGODB_URI=` equal to your mongodb uri, which can be any blank mongo database (or use the one in https://github.com/WebSciSystems2022Blue/secrets)
5. Grab firebase key with firebase google auth enabled from google firebase and place the key in firebasekey.json (or use the one in https://github.com/WebSciSystems2022Blue/secrets)
6. Build backend and run frontend with `pnpm run start`
