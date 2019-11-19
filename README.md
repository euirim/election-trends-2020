# election-trends-2020

| Title | election-trends-2020 |
|-|-|
| Developer    | [Euirim Choi](euirim@gmail.com) |
| Link | [https://projects.euirim.org/2020-twitter-election/](https://projects.euirim.org/2020-twitter-election/) |

## Usage
To start the development server, run `gulp`.
```
$ gulp
```

## Publishing
Publishing involves three steps:
1. Preview the rendered page by triggering the same render process as in production using a local server inside the dist folder.
```
$ gulp preview
```

2. Publish to the [staging bucket](http://euirim.org/article/2019/election-trends-2020/).
``` 
$ gulp publish
```

3. If everything checks out, publish to production. 
```
$ gulp publish --production
```

4. If you need to invalidate files you’ve previously published in CloudFront’s cache:
```
$ gulp publish --invalidate
```

**WARNING:** Your dist folder will be synced to the directory specified under `publishPath` in `meta.json`. Files in AWS at that location that are *not* in your dist directory will be **deleted.**

See the docs on [readthedocs](https://generator-politico-interactives.readthedocs.io/en/latest/) for more info.

---

©2019 Euirim Choi
