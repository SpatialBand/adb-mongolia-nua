# ADB Mongolia NUA

Viewer for Mongolia geospatial data

## Build Status

Master: [![Build Status](https://travis-ci.org/azavea/adb-mongolia-nua.svg?branch=master)](https://travis-ci.org/azavea/adb-mongolia-nua)

Develop: [![Build Status](https://travis-ci.org/azavea/adb-mongolia-nua.svg?branch=develop)](https://travis-ci.org/azavea/adb-mongolia-nua)

## Development

### Requirements

- Node 4+

### Getting Started

_tldr_
```
npm install
npm run serve
```

The development server will start, and watch for file changes, recompiling and refreshing the
page automatically.

Navigate to [http://localhost:7878](http://localhost:7878) to view the application.

### NPM Commands

The available development commands are:

| Command | Purpose |
|---------|---------|
| `npm run build` | Build the production version of the application to `./dist/` |
| `npm run serve` | Serve the development version of the application locally and watch for changes: [http://localhost:7878](http://localhost:7878) |
| `npm run serve:dist` | Build and serve the production version of the application locally: [http://localhost:7880](http://localhost:7880) |
| `npm run test` | Run the karma test suite once and exit after finishing |
| `npm run test:auto` | Run the karma test suite and then wait, watching for changes |
| `npm run lint` | Manually run the linter on the project js files |

### Testing

Run tests with `npm run test`

## Deployment

### Requirements

 - Java
 - Ruby

### Getting Started

After ensuring that Java/Ruby are installed on your system, install s3_website:
```
gem install s3_website
```
You may need to install with `sudo` depending on your configuration.

Then copy the `.env.example` file to `.env` and add the appropriate access key and secret key to
the file.

### Deploying a new version

_tldr_
```
npm run build
npm run serve:dist
# Load the application in the browser at this point to verify everything in the new build works
s3_website push
```

Whenever a deployment is done, also cut a new tagged release using the git flow model, and add
appropriate comments to the changelog.

### Modifying the deployment

Update the configuration in s3_website.yml, then run `s3_website cfg apply`.

Some changes may require a new deployment, see above.

s3_website docs are on the project's GitHub repo:
https://github.com/laurilehmijoki/s3_website

### S3/CloudFront permissions

If the deployment or configuration changes fail with permissions errors, you may need to ensure
that your keys have the proper permissions to perform the actions that s3_website is attempting.
This configuration should have the permissions that s3_website requires:
https://github.com/laurilehmijoki/s3_website/blob/master/additional-docs/setting-up-aws-credentials.md
