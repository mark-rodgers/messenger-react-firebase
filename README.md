<p align="center">
  <img src="./src/assets/logo3.svg" width="300">
</p>

# messenger-react-firebase

messenger-react-firebase is a Facebook Messenger "clone" using React and Firebase.

### Features

- Occaecat amet elit consequat sunt minim veniam irure ut.
- Occaecat Lorem labore tempor quis duis reprehenderit aute cupidatat in aliquip.
- Nulla est irure laboris consectetur tempor est anim labore occaecat laboris.

### Install / Setup

```bash
git clone https://github.com/mark-rodgers/messenger-react-firebase.git
cd messenger-react-firebase
npm install
```

Before running the app, you will need to create a Firebase project and add your Firebase config to this project. Project credentials can be found in the [Firebase console](https://console.firebase.google.com) under Project Settings > General > Your Apps.

Once you've created a Firebase project, copy `.env.example` to a new file called `.env.local` in the root of the project and update it with the values for your Firebase project.

### Usage

This will use Vite to run a local development server. Vite is already configured to use [SWC](https://swc.rs), a rust-based bundler that is much faster than Babel.

```bash
npm run dev
```

### Building

```bash
npm run build
```

### Previewing Production Build

This will use Vite to run a local server to preview the production build.

```bash
npm run preview
```
