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
`xpiles` is a **build tool / configuration suite** tuned for **IoT devices / Docker Containers** where there is a need for a **tiny footprint**. It allows you to take a very **large** **ES2017** project, cross-compile to `4.X`, reduce source code size, and gzip the contents to be uploaded to another computer.

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

### Usage

```
npm install -g xpiles

xpiles compile --inputFile=index.js outputFile=dist/bundle.js
```

From here you have a `bundle.js` file that can be executed. Now something to the effect of:

```
scp dist/bundle.js root@192.168.3.1:~/bundle.js
```
to upload the tiny build file, turning multiple megabytes into kilobytes!


##### Works in Progress
- Switch over to google closure compiler, after this issue is resolved: https://github.com/google/closure-compiler-js/issues/88
  - Perhaps will just use node's clustering to envoke the command line.. but that doesn't fit wth rollup
- Add a `upload` command that will scp the bundle file for you.
- Run tests on build and upload
- man pages
- Improved documentation
- File Watching to auto build and upload
- Integration with a wrapper package on the device to auto-restart after upload (Separate Repo)