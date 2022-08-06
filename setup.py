#!/usr/bin/env python
# -*- encoding: utf-8 -*-

import io
import re
from glob import glob
from os.path import basename, dirname, join, splitext

from setuptools import find_packages, setup


def read(*names, **kwargs):
    with io.open(
        join(dirname(__file__), *names),
        encoding=kwargs.get("encoding", "utf8"),
    ) as fh:
        return fh.read()


setup(
    name="ResarchMate",
    version="0.0.0",
    license="Apache-2.0",
    description="Python package to manage and interact with ongoing researches",  # noqa: E501
    long_description="{}\n{}".format(
        re.compile("^.. start-badges.*^.. end-badges", re.M | re.S).sub("", read("README.rst")),  # noqa: E501
        re.sub(":[a-z]+:`~?(.*?)`", r"``\1``", read("CHANGELOG.rst")),
    ),
    author="Jenia Sakirko, Lior Janah, Gabi Galfrin",
    author_email="jenia.sakirko@gmail.com",
    url="https://github.com/jeniaSakirko/ResearchMate",
    packages=find_packages("backend"),
    package_dir={"": "backend"},
    py_modules=[splitext(basename(path))[0] for path in glob("backend/*.py")],
    include_package_data=True,
    zip_safe=False,
    classifiers=[
        "Development Status :: 5 - Production/Stable",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Operating System :: Unix",
        "Operating System :: POSIX",
        "Operating System :: Microsoft :: Windows",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3 :: Only",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
        "Programming Language :: Python :: Implementation :: CPython",
        "Programming Language :: Python :: Implementation :: PyPy",
        "Topic :: Utilities",
    ],
    project_urls={
        "Documentation": "https://ResearchMate.readthedocs.io/",
        "Changelog": "https://ResearchMate.readthedocs.io/en/latest/changelog.html",  # noqa: E501
        "Issue Tracker": "https://github.com/jeniaSakirko/ResearchMate/issues",
    },
    keywords=[
        # eg: 'keyword1', 'keyword2', 'keyword3',
    ],
    python_requires=">=3.6",
    install_requires=[
        "django",
        "django-rest-framework",
        "django-cors-headers",
        "backports.weakref",
    ],
    extras_require={
        "dev": ["pre-commit", "flake8", "black", "isort", "pytest-django"],
        "test": ["pytest", "tox"],
    },
)
