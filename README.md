## install libraries
```
npm install
bundle install --path vendor/bundle
```

## build resource
```
export PATH=$PATH:./node_modules/.bin
webpack -w
```

## run server
```
bundle exec ruby server.rb -o 0.0.0.0 -p 4566
```
