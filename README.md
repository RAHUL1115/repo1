# Repo1

This is a tracker module that tracks version changes of other repositories. This module won't work for public/personal repositories as in order to track changes for your repository, you need to have the push access to this package's repository. this module and repository is for personal made for training and testing purposes.

## **usage**

- this package cannot be used directly. You need to use this package in your application (@rahul1115/repo2 & @rahul1115/repo3).

- this package is self publishing package. Whenever you publish a package it will read the latest version form package.json of the parent  repository and add it in it's own repository database and update itself.

- to use this package in your application you need to to add a postpublish script in your application.

```json
"postpublish" : "git clone https://github.com/rahul1115/repo1.git ./.tracker/ && cd ./.tracker/ && npm install && cd ./../ && node ./.tracker/publish.js"
```