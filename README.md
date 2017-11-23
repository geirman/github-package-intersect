This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# Github Package Intersection
Helps you find example repos that are the intersection of two dependencies. For example, find repos that are dependent on both `react-native` and `graphql`.

## Setup
This is a create-react-app, so after you clone the repo then run `yarn`, create a `.env.local` file in the root with the following key...

```
// .env.local
REACT_APP_CREDENTIALS=githubusername:githubpassword
```

then run...
```
yarn start
```

Enter your two package names and click search... boom!
