# A Simple Universal Boilerplate for Web Apps

A Simple boilerplate to get started without any extras. Uses:

- React
- Redux
- JSPM
- React Router
- Express
- Simple Redux Router


To get started:

```sh
git clone --depth=1 https://github.com/mutahhir/reduxiplate.git ./my-app
```

where `my-app` is the name of your directory.

**Note:** You can go ahead and delete the .git directory and start a new repo by doing the following:

```sh
cd ./my-app
rm -rf .git
git init
```

Then you can commit the boiler plate with a simple `git add -A && git commit -m "Initial Commit"`.

You need to install JSPM globally first:

```sh
npm install -g jspm
```

then install all the dependencies:

```sh
npm install && jspm install
```

Run the boilerplate:

```sh
npm start
```

Enjoy!
