=============
ResearchMate
=============

Overview
========

**ResearchMate** is an open-source Python package to manage and interact with ongoing researches.

The main goal is establishing a Django Application that offers different views and functionality
that are relevant for every-day use by mostly-academic researchers.

* Free software: MIT License

Getting Started
================

These instructions will get you up and running on your local machine.

Prerequisites
==============

In order to run **ResearchMate** you should install:

* Download and Install `Vagrant`_.
* Download and Install `Virtual Box`_.

Run the project on your local machine
======================================
A step by step series that tell you how to get **ResearchMate** up and running:

1. Clone the repository
2. Open command prompt in **ResearchMate** directory
3. Spin the environment using :code:`vagrant up`
4. That's it! your virtual machine is up and running
5. Go to http://localhost:3000 in your web browser
6. You can enter the virtual machine by running :code:`vagrant ssh`
7. When finished, run :code:`vagrant destroy -f` to tear down the environment

NOTE: By running this command all changes on the virtual machine will be deleted.

Built With
===========
* `Python`_ - Python is an interpreted, high-level, general-purpose programming language
* `Vagrant`_ - Vagrant is a tool for building and managing virtual machine environments in a single workflow
* `Virtual Box`_ - VirtualBox is a powerful x86 and AMD64/Intel64 virtualization product for enterprise as well as home use


Development & Contributions
============================
Contributions to this project is always welcome!

To join in, please follow the `Contribution Guidelines`_.

TLDR:

* Explain your suggestion/bug so we'll know what your working on (`open an issue`_)
* `Fork`_ the repository.
* `Clone`_ your fork locally.
* Install `pre-commit`_ hooks to avoid styling issues.
* `Commit`_ & `push`_ your changes to your fork.
* Create a `Pull Request`_ associated with your suggested issue.

.. _Vagrant: https://www.vagrantup.com/
.. _Virtual Box: https://www.virtualbox.org/
.. _Python: https://www.python.org/
.. _Contribution Guidelines: https://github.com/jeniaSakirko/ResearchMate/blob/main/CONTRIBUTING.rst
.. _open an issue: https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-an-issue
.. _Fork: https://docs.github.com/en/get-started/quickstart/fork-a-repo
.. _Clone: https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository
.. _pre-commit: https://pre-commit.com/
.. _Commit: https://github.com/git-guides/git-commit
.. _push: https://github.com/git-guides/git-push
.. _Pull Request: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests
