```
▀████    ▐████▀    ▄███████▄  ▄█   ▄█          ▄████████    ▄████████ 
  ███▌   ████▀    ███    ███ ███  ███         ███    ███   ███    ███ 
   ███  ▐███      ███    ███ ███▌ ███         ███    █▀    ███    █▀  
   ▀███▄███▀      ███    ███ ███▌ ███        ▄███▄▄▄       ███        
   ████▀██▄     ▀█████████▀  ███▌ ███       ▀▀███▀▀▀     ▀███████████ 
  ▐███  ▀███      ███        ███  ███         ███    █▄           ███ 
 ▄███     ███▄    ███        ███  ███▌    ▄   ███    ███    ▄█    ███ 
████       ███▄  ▄████▀      █▀   █████▄▄██   ██████████  ▄████████▀  

```

## What is this?
`xpiles` is a set of **dev tools** tuned for **IoT devices / Docker Containers** where there is a need for a **tiny footprint**. It allows you to take a very **large** **ES2017** project, cross-compile to `4.X`, reduce source code size, and gzip the contents to be uploaded to another form of computer.

**Hot Reloading** functionality also allows you to seemlessly develop and test on a remote machine!

##### Under the hood
- [rollup](https://rollupjs.org/guide/en)
- [babel](https://babeljs.io/)
- [uglifyjs](https://github.com/mishoo/UglifyJS2/tree/harmony)
- [google's closure-compiler-js](https://github.com/google/closure-compiler-js)

### Why is this useful?

Imagine you are trying to run a Nodejs server on the Onion Omega2 and only have 9mb of disk space. You've all ready installed ssh, nodejs, and only have 3.5mb left until there is no more storage.. 

With `npm` installed, you are down to 500kb left on disk. The depency of `Nodejs` **AND** `npm` just ins't realistic in this scenario.

Using `xpiles` you can get around this problem by eliminating the need for `npm` on the embedded device running node! 

###### This build tool will package all dependencies into 1 single file, minimize it, then uglify it, so you don't waste a precious byte when storage is a premium!

An additional benefit, is a **Hot Reloading** dev server! You can make changes to source code, and have it automagically uploaded and ran on the remote machine!

### Usage

##### Basic

```
npm install -g xpiles

xpiles compile --src=index.js --dest=build/bundle.js
```

From here you have a `bundle.js` file that can be executed. To upload and run the *tiny* build file:

```
xpiles run --host=192.168.3.1 --user=root --bundle=build/bundle.js
```

##### Hot Reloading

```
xpiles watch --src=index.js --dest=build/bundle.js --host=192.168.3.1 --user=root
```
Above will prompt you for a password, to use an Identity file:
```
xpiles watch --src=index.js --dest=build/bundle.js --host=192.168.3.1 --user=root -i ~/.ssh/id_rsa
```


##### Works in Progress
- Switch over to google closure compiler, after this issue is resolved: https://github.com/google/closure-compiler-js/issues/88
  - Perhaps will just use node's clustering to envoke the command line.. but that doesn't fit wth rollup
- Run tests on build and upload
- man pages
- Improved documentation
- Docker exec support (rather than just ssh and scp)

### We want to hear from you!!
##### Please, open an issue on GitHub for any thoughts, complaints or cudos!!