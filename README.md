# Plasta

Note: If you pulled this branch when it was under Gautam's account, you will need to update your remote url: https://help.github.com/articles/changing-a-remote-s-url/

## Setup

### Git

1. Follow the Github [SSH setup](https://help.github.com/articles/connecting-to-github-with-ssh/)

1. Run:

        $ cd <your projects folder>
        $ git clone git@github.com:shelaq/plasta.git

1. Follow the instructions in the `backend` and `frontend` folders.


## Contributing

For coding style, install a plugin for [editor config](https://editorconfig.org/#download) corresponding to your text editor.

### Git

* We branch off of `master` for feature branches and prefix them with our name. Eg. `gautam/readme-update`.
* We don't 'merge', so there are no merge commits. We always rebase on top of another branch.
* Thus, our individual commits are wholesome and (ideally) individually reversible on top of master. This means we should have related changes together in a commit which may be bigger in size but also have a meaningful message.

#### Some useful commands

At any point, you can see which branch you're on, which files are modified, which are staged, and your available commands at the moment (to commit, continue rebasing, etc.):

    $ git status

See modified files, stash current changes and pop:

    $ git diff
    $ git stash
    # Do stuff
    $ git stash pop

General flow:

    $ git checkout master
    $ git pull
    $ git checkout -b gautam/readme-update
    # Make changes
    $ git add .
    $ git commit -m "Update readme"
    $ git push -u origin gautam/readme-update

Rebase on top of master:

    $ git pull origin master --rebase
    # Resolve conflicts if any, may appear for every commit you have
    $ git add .
    $ git rebase --continue
    # or git rebase --abort
    # repeat until all resolved
    $ git push -f

Amend last commit:

    # Make changes
    $ git add .
    $ git commit --amend
    $ git push -f

Rebase commits (re-order, drop, squash, reword):

    # Make changes
    $ git commit -m "Add instructions"
    $ git rebase -i HEAD~2 # for last 2 commits
    # Follow instructions as shown
    $ git push -f

Checkout someone else's branch:

    $ git fetch
    $ git checkout <remote-branch-name>

Set git editor to vim:

    $ git config --global core.editor 'vim'

