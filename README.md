# Icono
### Unique icons generated by a given string

<img src="https://i.imgur.com/b9A35vg.png" width="40%"> <img src="https://i.imgur.com/hOHu7gn.png" width="40%">

<img src="https://i.imgur.com/MTJ2QvD.png" width="40%"> <img src="https://i.imgur.com/DhYhkyT.png" width="40%">


## Description

Inspired by Github's [Identicons](https://github.blog/2013-08-14-identicons/), this website takes any string of any length and creates a hash out of it, which is then used to generate a unique series of pixels on a canvas. This image is then reflected vertically, horizontally, and diagonally to give it symmetry.

There is also a button to save your icon as a Jpeg, if you wish to use it for anything.

Try it out at [icono.edavalos.com](https://icono.edavalos.com/)

## How does it work?

The hashing algorithm is simple really. It takes the ascii code of every character in the screen and converts it into binary. This resulting series of 1's and 0's is then made to be exactly 10 chars long. It will almost always be longer, but in the case that it is shorter, i.e. a one character string is given, then it is prefixed with the appropriate ammount of zeros. To shorten it however, it incrementally removes characters alternating between the first and last until the length reaches 10.

This new string of 1's and 0's is then repeated 10 times to get a new string of length 100, which composes the entirety of the pixels in the image. With each repetition though, an offset is given based on the length of the initial string to create a unique pattern in each row.

There are 6 color options, and one is selected for each string by the index of `length % 6`
