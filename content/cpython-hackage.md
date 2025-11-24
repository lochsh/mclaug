Title: Let's break CPython together, for fun and mischief
Slug: cpython-hackage
Date: 13th October 2019
Cover: /images/hack-preview.png

I promise that nothing we do here will be useful.

But I promise it will be entertaining, and (hopefully) educational:

* if you don't know anything about the CPython internals, you're about to
learn (a bit)

* if you do know about the CPython internals, you're hopefully about to
learn some new ways to abuse them 😉

## Clarification
Before we proceed to hackage, let me make sure it's clear what I'm talking
about when I say "CPython internals". CPython is the reference implementation
of Python, and it's what most people use. It's what comes as standard on any
system I've ever used.

A Python implementation includes the interpreter, the built-in types and the
standard library. With CPython, apart from much of the standard library which
is in Python, this is all written in C. There are other implementations:

* PyPy is written in Python itself and has a JIT compiler, it's really fast
* Jython runs on the JVM
* IronPython runs on .NET the Microsoft framework

Everything we do here is exploiting the specific implementation details
of CPython.

### YMMV
Please bear in mind that Python was not designed to do the things we're going
to do, and some of the fun things that worked with the version of Python I used
here, my operating system, &c., might end up segfaulting for you. Running stuff
in ipython rather than the standard REPL will also likely end up with more
issues occurring when things are hacked.

## To whet your appetite
Let's have a look at the Python language reference. The first two sentences of
the [data model](https://docs.python.org/3/reference/datamodel.html) say this:

> Objects are Python’s abstraction for data. All data in a Python program is
represented by objects or by relations between objects.

In CPython a Python object is defined in the
[`PyObject`](https://github.com/python/cpython/blob/10e5c66789a06dc9015a24968e96e77a75725a7a/Include/object.h#L104)
struct:

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr">1 </span><span class="Type">typedef</span> <span
class="Type">struct</span> _object {
<span id="L2" class="LineNr">2 </span>    _PyObject_HEAD_EXTRA
<span id="L3" class="LineNr">3 </span>    Py_ssize_t ob_refcnt;
<span id="L4" class="LineNr">4 </span>    <span class="Type">struct</span> _typeobject *ob_type;
<span id="L5" class="LineNr">5 </span>} PyObject;
</pre>
</div>
</html>

(The first bit here, `_PyObject_HEAD_EXTRA`, is only valid when compiling Python
with a special tracing debugging feature, so don't worry about it.)

We have the reference count `ob_refcnt`, which is used for memory management
and tells us how many other objects are referencing this one. When the
reference count of an object is zero, its memory and resources can be freed by
the garbage collector.

We also have the type information, `ob_type`, which tells us how to interact
with the object, what its behaviour is, what data it contains.

Going back to the data model:

> Every object has an identity, a type and a value. An object’s identity never
changes once it has been created; you may think of it as the object’s address
in memory. The ‘is’ operator compares the identity of two objects; the id()
function returns an integer representing its identity.

> CPython implementation detail: For CPython, id(x) is the memory address where
x is stored.

So what I'd expect CPython to do is dynamically allocate memory for a new
`PyObject` each time we create a new object.

Let's test this out with some integers:

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr">1 </span>&gt;&gt;&gt; x = <span class="Number">500</span>
<span id="L2" class="LineNr">2 </span>&gt;&gt;&gt; y = <span class="Number">500</span>
<span id="L3" class="LineNr">3 </span>&gt;&gt;&gt; x <span class="Statement">is</span> y
<span id="L4" class="LineNr">4 </span><span class="Function">False</span>
</pre>
</div>
</html>

That makes sense: a new `PyObject` has been allocated for each variable we've
made here, and so they are at different places in memory. But what if we use
smaller integers?

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr">1 </span>&gt;&gt;&gt; x = <span class="Number">5</span>
<span id="L2" class="LineNr">2 </span>&gt;&gt;&gt; y = <span class="Number">5</span>
<span id="L3" class="LineNr">3 </span>&gt;&gt;&gt; x <span class="Statement">is</span> y
<span id="L4" class="LineNr">4 </span><span class="Function">True</span>
</pre>
</div>
</html>

How surprising! Let's have a look in the [CPython
source](https://github.com/python/cpython/blob/10e5c66789a06dc9015a24968e96e77a75725a7a/Objects/longobject.c#L38)
to see why this might be:

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr"> 1 </span><span class="PreProc">#ifndef NSMALLPOSINTS</span>
<span id="L2" class="LineNr"> 2 </span><span class="PreProc">#define NSMALLPOSINTS           </span><span class="Number">257</span>
<span id="L3" class="LineNr"> 3 </span><span class="PreProc">#endif</span>
<span id="L4" class="LineNr"> 4 </span><span class="PreProc">#ifndef NSMALLNEGINTS</span>
<span id="L5" class="LineNr"> 5 </span><span class="PreProc">#define NSMALLNEGINTS           </span><span class="Number">5</span>
<span id="L6" class="LineNr"> 6 </span><span class="PreProc">#endif</span>
<span id="L7" class="LineNr"> 7 </span>
<span id="L8" class="LineNr"> 8 </span><span class="Comment">/*</span><span class="Comment"> Small integers are preallocated in this array so that they</span>
<span id="L9" class="LineNr"> 9 </span><span class="Comment">   can be shared.</span>
<span id="L10" class="LineNr">10 </span><span class="Comment">   The integers that are preallocated are those in the range</span>
<span id="L11" class="LineNr">11 </span><span class="Comment">   -NSMALLNEGINTS (inclusive) to NSMALLPOSINTS (not inclusive).</span>
<span id="L12" class="LineNr">12 </span><span class="Comment">*/</span>
<span id="L13" class="LineNr">13 </span><span class="Type">static</span> PyLongObject small_ints[NSMALLNEGINTS + NSMALLPOSINTS];
</pre>
</div>
</html>

So it seems integers between -5 and 256 inclusive are statically allocated in a
big old array!  This is an optimisation that CPython has chosen to do -- the
idea is that these integers are going to be used a lot, and it would be time
consuming to allocate new memory every time.

But...if that means some integers have a defined place in memory, can
we...corrupt that memory?

## import ctypes

![ctypes](/images/goosebumpsctypes.jpg "Someone whispering 'import ctypes' and goosebumps appearing on the arm of the listener"){.callout}

Most good CPython shenanigans begins with importing ctypes, which is Python's
standard C foreign function interface. An FFI allows different languages to
interoperate. ctypes provides C compatible data types and allows calling
functions from shared libraries and such.

The ctypes docs tell us about the function
[`memmove`](https://docs.python.org/3.7/library/ctypes.html#ctypes.memmove):

> ctypes.memmove(dst, src, count)

>    Same as the standard C memmove library function: copies count bytes from
>    src to dst. dst and src must be integers or ctypes instances that can be
>    converted to pointers.

So what if we copied the memory where 6 is to where 5 is?

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr">1 </span>&gt;&gt;&gt; <span class="PreProc">import</span> ctypes
<span id="L2" class="LineNr">2 </span>&gt;&gt;&gt; <span class="PreProc">import</span> sys
<span id="L3" class="LineNr">3 </span>&gt;&gt;&gt; ctypes.memmove(<span class="Function">id</span>(<span class="Number">5</span>), <span class="Function">id</span>(<span class="Number">6</span>), sys.getsizeof(<span class="Number">5</span>))
<span id="L4" class="LineNr">4 </span>&gt;&gt;&gt; <span class="Number">5</span> + <span class="Number">5</span>
<span id="L5" class="LineNr">5 </span><span class="Number">12</span>
</pre>
</div>
</html>

What fun! But this is small fry stuff. We can do more. We have ambition.

## Ambition
I don't what to change one integer. I want to change ALL the integers.

What if we changed what happens when you add integers together? What if we made
it subtract instead?

![mischief](/images/thearm.gif "The Arm from Twin Peaks rubbing his hands together mischeviously"){.callout}

The way operator resolution works in Python is that the corresponding "magic
method" or "dunder method" (for double underscores) is called. For example `x +
y` will become `x.__add__(y)`. So the `int.__add__` method is going to be our
target for mischevious hackage.

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr">1 </span><span class="Statement">def</span> <span class="Function">fake_add</span>(x, y):
<span id="L2" class="LineNr">2 </span>    <span class="Statement">return</span> x - y
<span id="L3" class="LineNr">3 </span>&gt;&gt;&gt; <span class="Function">int</span>.__add__ = fake_add
<span id="L4" class="LineNr">4 </span><span class="Type">TypeError</span>: can't set attributes of built-in/extension type </span><span class="String">'</span><span class="Function">int</span><span class="String">'</span>
</pre>
</div>
</html>

Annoying, but unsurprising. Python is permissive in the sense that it doesn't
have access modifiers like C++ or Java &ndash; you can't really define private
attributes of a class. But you can't do just anything, and patching built-ins like
this is one of the things Python prevents us from doing &ndash; unless we try very
hard.

So what can we try instead?  All attribute resolution comes down to looking up
attribute names in an object's dictionary. For example, `x.y` would resolve to
`x.__dict__["y"]`[^1]. What if we try accessing `int.__add__` that way?

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr">1 </span>&gt;&gt;&gt; <span class="Function">int</span>.__dict__[<span class="String">&quot;</span><span class="String">__add__</span><span class="String">&quot;</span>] = fake_add
<span id="L2" class="LineNr">2 </span><span class="Type">TypeError</span>: <span class="String">'</span><span class="String">mappingproxy</span><span class="String">'</span> <span class="Function">object</span> does <span class="Statement">not</span> support item assignment
</pre>
</div>
</html>

Tarnation. But of course, we knew it would not be as easy as this. Perhaps lesser
programmers would give up here. "It's not allowed," they might say. But we are
strong and we are determined.

What is this
[mappingproxy](https://docs.python.org/3/library/types.html#types.MappingProxyType) the interpreter speaks of?
> Read-only proxy of a mapping.

Ok, so this is just some cast over the actual dictionary. If we can cast it to
a dictionary, we can assign to it. But doing this with a Python cast is just
creating a copy:

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr">1 </span>&gt;&gt;&gt; <span
class="Function">dict</span>(<span class="Function">int</span>.__dict__)[<span class="String">&quot;</span><span class="String">__add__</span><span class="String">&quot;</span>] = fake_add
<span id="L2" class="LineNr">2 </span>&gt;&gt;&gt; <span class="Number">1</span> + <span class="Number">5</span>
<span id="L3" class="LineNr">3 </span><span class="Number">6</span>
<span id="L4" class="LineNr">4 </span>&gt;&gt;&gt; (<span class="Number">1</span>).__add__(<span class="Number">5</span>)
<span id="L5" class="LineNr">5 </span><span class="Number">6</span>
<span id="L6" class="LineNr">6 </span>&gt;&gt;&gt; <span class="Function">int</span>.__add__ == fake_add
<span id="L7" class="LineNr">7 </span><span class="Function">False</span>
</pre>
</div>
</html>

We need to go deeper. Let's look at the [CPython
source](https://github.com/python/cpython/blob/10e5c66789a06dc9015a24968e96e77a75725a7a/Objects/descrobject.c#L954) for the mappingproxy type.

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr"> 1 </span><span class="Type">typedef</span> <span class="Type">struct</span> {
<span id="L2" class="LineNr"> 2 </span>    PyObject_HEAD
<span id="L3" class="LineNr"> 3 </span>    PyObject *mapping;
<span id="L4" class="LineNr"> 4 </span>} mappingproxyobject;
<span id="L5" class="LineNr"> 5 </span>
<span id="L6" class="LineNr"> 6 </span><span class="Type">static</span> PyMappingMethods mappingproxy_as_mapping = {
<span id="L7" class="LineNr"> 7 </span>    (lenfunc)mappingproxy_len,                  <span class="Comment">/*</span><span class="Comment"> mp_length </span><span class="Comment">*/</span>
<span id="L8" class="LineNr"> 8 </span>    (binaryfunc)mappingproxy_getitem,           <span class="Comment">/*</span><span class="Comment"> mp_subscript </span><span class="Comment">*/</span>
<span id="L9" class="LineNr"> 9 </span>    <span class="Number">0</span>,                                          <span class="Comment">/*</span><span class="Comment"> mp_ass_subscript </span><span class="Comment">*/</span>
<span id="L10" class="LineNr">10 </span>};
</pre>
</body>
</div>
</html>

The `PyMappingMethods` of a type tell us how it behaves as a mapping: what does
`x[key]` do (`mp_subscript`)? What does `x[key] = y` do (`mp_ass_subscript`)?

What this is telling us is that the mapping proxy is basically a wrapper around
a normal dictionary with the function pointer to the subscript assignment
method set to NULL.

We can use ctypes to cast this and reveal the underlying dictionary.

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr"> 1 </span><span class="PreProc">import</span> ctypes
<span id="L2" class="LineNr"> 2 </span>
<span id="L3" class="LineNr"> 3 </span>
<span id="L4" class="LineNr"> 4 </span><span class="Statement">class</span> <span class="Function">PyObject</span>(ctypes.Structure):
<span id="L5" class="LineNr"> 5 </span>    <span class="Statement">pass</span>
<span id="L6" class="LineNr"> 6 </span>
<span id="L7" class="LineNr"> 7 </span>
<span id="L8" class="LineNr"> 8 </span>PyObject._fields_ = [
<span id="L9" class="LineNr"> 9 </span>    (<span class="String">'</span><span class="String">ob_refcnt</span><span class="String">'</span>, ctypes.c_ssize_t)
<span id="L10" class="LineNr">10 </span>    (<span class="String">'</span><span class="String">ob_type</span><span class="String">'</span>, ctypes.POINTER(PyObject))
<span id="L11" class="LineNr">11 </span>]
<span id="L12" class="LineNr">12 </span>
<span id="L13" class="LineNr">13 </span>
<span id="L14" class="LineNr">14 </span><span class="Statement">class</span> <span class="Function">MappingProxy</span>(PyObject):
<span id="L15" class="LineNr">15 </span>    _fields_ = [(<span class="String">'</span><span class="String">dict</span><span class="String">'</span>, ctypes.POINTER(PyObject))]
</pre>
</div>
</html>

The trouble is, once we have the dict as a PyObject pointer, how do we get it
back to being a plain old Python dict?  It's no good doing this:

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr">1 </span>&gt;&gt;&gt; MappingProxy.from_address(<span class="Function">id</span>(<span class="Function">int</span>.__dict__)).dict
<span id="L2" class="LineNr">2 </span>&lt;LP_PyObject at <span class="Number">0x7f6e98c8e7b8</span>&gt;
</pre>
</div>
</html>

if we have no way to interpret this as a dict. We can use this pleasing wee
trick from the CPython API, courtesy of [Armin
Ronacher](http://lucumr.pocoo.org/about/)[^2]  which will put it as a value into another existing
dictionary where it will be interpreted the same as any other object, then we
can extract it!

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr"> 1 </span><span class="Statement">def</span> <span class="Function">pyobj_cast</span>(obj):
<span id="L2" class="LineNr"> 2 </span>    <span class="Statement">return</span> ctypes.cast(<span class="Function">id</span>(obj), ctypes.POINTER(PyObject)
<span id="L3" class="LineNr"> 3 </span>
<span id="L4" class="LineNr"> 4 </span>
<span id="L5" class="LineNr"> 5 </span><span class="Statement">def</span> <span class="Function">get_dict</span>(proxy):
<span id="L6" class="LineNr"> 6 </span>    dict_as_pyobj = MappingProxy.from_address(<span class="Function">id</span>(proxy)).dict
<span id="L7" class="LineNr"> 7 </span>    fence = {}
<span id="L8" class="LineNr"> 8 </span>    ctypes.pythonapi.PyDict_SetItem(
<span id="L9" class="LineNr"> 9 </span>            pyobj_cast(fence),
<span id="L10" class="LineNr">10 </span>            pyobj_cast(<span class="String">&quot;</span><span class="String">victory</span><span class="String">&quot;</span>),
<span id="L11" class="LineNr">11 </span>            dict_as_pyobj)
<span id="L12" class="LineNr">12 </span>    <span class="Statement">return</span> fence[<span class="String">&quot;</span><span class="String">victory</span><span class="String">&quot;</span>]
<span id="L13" class="LineNr">13 </span>
<span id="L14" class="LineNr">14 </span>int_dict = get_dict(<span class="Function">int</span>.__dict__)
<span id="L15" class="LineNr">15 </span>int_dict[<span class="String">&quot;</span><span class="String">__add__</span><span class="String">&quot;</span>] = fake_add
</pre>
</div>
</html>

Have we done it???

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr">1 </span>&gt;&gt;&gt; <span class="Number">1</span> + <span class="Number">1</span>
<span id="L2" class="LineNr">2 </span><span class="Number">2</span>
</pre>
</div>
</html>

D'oh! But wait a minute...

<html>
<div class=code>
<pre id='vimCodeElement'>
<span id="L1" class="LineNr">1 </span>&gt;&gt;&gt; (<span class="Number">1</span>).__add__(<span class="Number">1</span>)
<span id="L2" class="LineNr">2 </span><span class="Number">0</span>
</pre>
</div>
</html>

What! But the data model says:
> to evaluate the expression x + y, where x is an instance of a class that has
an \_\_add\_\_() method, x.\_\_add\_\_(y) is called

We've been lied to...this is clearly not true! It seems CPython has some
shortcut in place.

To be fair, they probably didn't think we'd ever find out this "lie" by
performing these shenanigans. We need to go yet deeper still to fulfill our
pointless quest. We _will_ have control of the builtins.

## Full type mappings
Back to the CPython source. What is in this type information that's in the
PyObject struct we looked at earlier? The answer: lots of stuff that I am not going to put here, but the most
interesting parts for our purposes are the [method
suites](https://github.com/python/cpython/blob/10e5c66789a06dc9015a24968e96e77a75725a7a/Doc/includes/typestruct.h#L16):

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr">1 </span><span class="Type">typedef</span> <span
class="Type">struct</span> _typeobject {
<span id="L2" class="LineNr">2 </span>    ...
<span id="L3" class="LineNr">3 </span>    PyNumberMethods *tp_as_number;
<span id="L4" class="LineNr">4 </span>    PySequenceMethods *tp_as_sequence;
<span id="L5" class="LineNr">5 </span>    PyMappingMethods *tp_as_mapping;
<span id="L6" class="LineNr">6 </span>    ...
<span id="L7" class="LineNr">7 </span>} PyTypeObject;
</pre>
</div>
</html>

This struct contains other structs defining the behaviour of the type
via function pointers. We're specifically interested in this
[`tp_as_number`](https://github.com/python/cpython/blob/10e5c66789a06dc9015a24968e96e77a75725a7a/Include/cpython/object.h#L95)
member. Its first member, `nb_add`, is the function pointer to the add
method. This is what we want to overwrite. This is our new target.

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr">1 </span><span class="Type">typedef</span> <span class="Type">struct</span> {
<span id="L2" class="LineNr">2 </span>    binaryfunc nb_add;
<span id="L3" class="LineNr">3 </span>    binaryfunc nb_subtract;
<span id="L4" class="LineNr">4 </span>    binaryfunc nb_multiply;
<span id="L5" class="LineNr">5 </span>    ...
<span id="L6" class="LineNr">6 </span>} PyNumberMethods;
</pre>
</div>
</html>

So, like we made the ctypes mappings before, I want to do it for this entire
`PyTypeObject` struct. Which is big...so I'm not putting it all here!

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr"> 1 </span><span class="PreProc">import</span> ctypes
<span id="L2" class="LineNr"> 2 </span>
<span id="L3" class="LineNr"> 3 </span>
<span id="L4" class="LineNr"> 4 </span><span class="Statement">class</span> <span class="Function">PyObject</span>(ctypes.Structure):
<span id="L5" class="LineNr"> 5 </span>    <span class="Statement">pass</span>
<span id="L6" class="LineNr"> 6 </span>
<span id="L7" class="LineNr"> 7 </span>
<span id="L8" class="LineNr"> 8 </span><span class="Statement">class</span> <span class="Function">PyTypeObject</span>(ctypes.Structure):
<span id="L9" class="LineNr"> 9 </span>    <span class="Statement">pass</span>
<span id="L10" class="LineNr">10 </span>
<span id="L11" class="LineNr">11 </span>
<span id="L12" class="LineNr">12 </span>Py_ssize_t = ctypes.c_ssize_t
<span id="L13" class="LineNr">13 </span>binaryfunc = ctypes.CFUNCTYPE(
<span id="L14" class="LineNr">14 </span>        ctypes.POINTER(PyObject),
<span id="L15" class="LineNr">15 </span>        ctypes.POINTER(PyObject),
<span id="L16" class="LineNr">16 </span>        ctypes.POINTER(PyObject))
<span id="L17" class="LineNr">17 </span>
<span id="L18" class="LineNr">18 </span>
<span id="L19" class="LineNr">19 </span><span class="Statement">class</span> <span class="Function">PyNumberMethods</span>(ctypes.Structure):
<span id="L20" class="LineNr">20 </span>    _fields_ = [
<span id="L21" class="LineNr">21 </span>            (<span class="String">&quot;</span><span class="String">nb_add</span><span class="String">&quot;</span>, binaryfunc),
<span id="L22" class="LineNr">22 </span>            (<span class="String">&quot;</span><span class="String">nb_subtract</span><span class="String">&quot;</span>, binaryfunc),
<span id="L23" class="LineNr">23 </span>            (<span class="String">&quot;</span><span class="String">nb_multiply</span><span class="String">&quot;</span>, binaryfunc),
<span id="L24" class="LineNr">24 </span>            ...
<span id="L25" class="LineNr">25 </span>
<span id="L26" class="LineNr">26 </span>PyTypeObject._fields_ = [
<span id="L27" class="LineNr">27 </span>        ...
<span id="L28" class="LineNr">28 </span>        (<span class="String">&quot;</span><span class="String">tp_as_number</span><span class="String">&quot;</span>, ctypes.POINTER(PyNumberMethods)),
<span id="L29" class="LineNr">29 </span>        ...
<span id="L30" class="LineNr">30 </span>
<span id="L31" class="LineNr">31 </span>
<span id="L32" class="LineNr">32 </span>PyObject._fields_ = [
<span id="L33" class="LineNr">33 </span>        (<span class="String">&quot;</span><span class="String">ob_refcnt</span><span class="String">&quot;</span>, Py_ssize_t),
<span id="L34" class="LineNr">34 </span>        (<span class="String">&quot;</span><span class="String">ob_type</span><span class="String">&quot;</span>, ctypes.POINTER(PyTypeObject))]
</pre>
</div>
</html>

So here we've basically made a Python mapping of the structs we have in C. If
we cast our Python `int` type to the equivalent type struct, we'll reveal the
secrets usually hidden from us.

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr">1 </span>&gt;&gt;&gt; PyLong_Type = ctypes.cast(<span class="Function">id</span>(<span class="Function">int</span>), ctypes.POINTER(PyTypeObject)).contents
<span id="L2" class="LineNr">2 </span>&gt;&gt;&gt; PyLong_Type.tp_as_number.contents.nb_add = PyLong_Type.tp_as_number.contents.nb_subtract
<span id="L3" class="LineNr">3 </span>&gt;&gt;&gt; <span class="Number">10</span> + <span class="Number">4</span>
<span id="L4" class="LineNr">4 </span><span class="Number">6</span>
<span id="L5" class="LineNr">5 </span>&gt;&gt;&gt; <span class="Number">1</span> + <span class="Number">1</span>
<span id="L6" class="LineNr">6 </span><span class="Number">0</span>
<span id="L7" class="LineNr">7 </span>&gt;&gt;&gt; <span class="Number">1</span> + <span class="Number">3</span>
<span id="L8" class="LineNr">8 </span>-<span class="Number">2</span>
</pre>
</div>
</html>

We did it!!! Incredible.

But now we know how to patch built-ins...what if we went further? What if we
added functionality that wasn't there before, rather than altering existing
functionality?

## Nice immutable string you got there. It would be a shame if something should...happen to it 😏
In Python, strings are immutable. You can't go in and change one of the
characters &ndash; you have to create a new string object. When you add characters
to an existing string variable, a new string object is created.[^3]

What if we made strings mutable?

Let's have a look at `PyUnicode_Type` in the [CPython
source](https://github.com/python/cpython/blob/10e5c66789a06dc9015a24968e96e77a75725a7a/Objects/unicodeobject.c)...and
then swiftly look away from all 16k lines of it cos it's distressingly complex
as it has to handle unicode and all its complexities as well as ASCII: good
times. We want to find the
[`tp_as_mapping`](https://github.com/python/cpython/blob/10e5c66789a06dc9015a24968e96e77a75725a7a/Objects/unicodeobject.c#L14126) member of the `PyUnicode_Type`
struct:

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr">1 </span><span class="Type">static</span> PyMappingMethods unicode_as_mapping = {
<span id="L2" class="LineNr">2 </span>    (lenfunc)unicode_length,        <span class="Comment">/*</span><span class="Comment"> mp_length </span><span class="Comment">*/</span>
<span id="L3" class="LineNr">3 </span>    (binaryfunc)unicode_subscript,  <span
class="Comment">/*</span><span class="Comment"> mp_subscript </span><span class="Comment">*/</span>
<span id="L4" class="LineNr">4 </span>    (objobjargproc)<span
class="Number">0</span>,               <span class="Comment">/*</span><span class="Comment"> mp_ass_subscript </span><span class="Comment">*/</span>
<span id="L5" class="LineNr">5 </span>};
</pre>
</div>
</html>

We want to create a new function to point to from the `mp_ass_subscript`
member. Here's my extremely hacked one which wouldn't handle every case, not at
all. But I think it's going to allow us to do what we want.

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr"> 1 </span><span class="Type">static</span> <span class="Type">int</span>
<span id="L2" class="LineNr"> 2 </span><span class="Function">unicode_ass_subscript</span>(PyUnicodeObject* self, PyObject* item, PyObject* value)
<span id="L3" class="LineNr"> 3 </span>{
<span id="L4" class="LineNr"> 4 </span>    Py_ssize_t i = ((PyLongObject*)(item))-&gt;ob_digit[<span class="Number">0</span>];
<span id="L5" class="LineNr"> 5 </span>    <span class="Type">unsigned</span> <span class="Type">int</span> kind = ((PyASCIIObject*)(self))-&gt;state.kind;
<span id="L6" class="LineNr"> 6 </span>    <span class="Type">char</span>* data = ((<span class="Type">char</span>*)((PyASCIIObject*)(self) + <span class="Number">1</span>));
<span id="L7" class="LineNr"> 7 </span>    <span class="Type">char</span>* new_data = ((<span class="Type">char</span>*)((PyASCIIObject*)(value) + <span class="Number">1</span>));
<span id="L8" class="LineNr"> 8 </span>    *(data + kind * i) = *new_data;
<span id="L9" class="LineNr"> 9 </span>    <span class="Statement">return</span> <span class="Number">0</span>;
<span id="L10" class="LineNr">10 </span>}
<span id="L11" class="LineNr">11 </span>
<span id="L12" class="LineNr">12 </span><span class="Type">static</span> PyMappingMethods unicode_as_mapping = {
<span id="L13" class="LineNr">13 </span>    (lenfunc)unicode_length,                 <span class="Comment">/*</span><span class="Comment"> mp_length </span><span class="Comment">*/</span>
<span id="L14" class="LineNr">14 </span>    (binaryfunc)unicode_subscript,           <span class="Comment">/*</span><span class="Comment"> mp_subscript </span><span class="Comment">*/</span>
<span id="L15" class="LineNr">15 </span>    (objobjargproc)unicode_ass_subscript,    <span class="Comment">/*</span><span class="Comment"> mp_ass_subscript </span><span class="Comment">*/</span>
<span id="L16" class="LineNr">16 </span>};
</pre>
</div>
</html>

I don't want to just change the source code of the Python binary I'm using.
That is cheating. I want to break Python from the _inside_.

But I _can_ use this to get the machine code that I want to replace the
subscript assignment function with. (This is now just stupid compared to what
we were doing before...and not at all portable. But we are doing it.).

First, I built CPython with this new source code in there. I can retrieve the
machine code generated by our new function using `objdump`:

<html>
<div class=code>
<pre id='vimCodeElement'>
<span id="L1" class="LineNr">1 </span>objdump Objects/unicodeobject.o
</pre>
</div>
</html>

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr"> 1 </span><span class="Number">00000000000000</span><span class="Identifier">f4</span> &lt;<span class="Identifier">unicode_ass_subscript</span>&gt;:
<span id="L2" class="LineNr"> 2 </span>      <span class="Identifier">f4</span>:   <span class="Number">8</span><span class="Identifier">b</span> <span class="Number">4</span><span class="Identifier">e</span> <span class="Number">18</span>                <span class="Identifier">mov</span>    <span class="Number">0x18</span>(%<span class="Identifier">rsi</span>),%<span class="Identifier">ecx</span>
<span id="L3" class="LineNr"> 3 </span>      <span class="Identifier">f7</span>:   0<span class="Identifier">f</span> <span class="Identifier">b6</span> <span class="Number">47</span> <span class="Number">20</span>             <span class="Identifier">movzbl</span> <span class="Number">0x20</span>(%<span class="Identifier">rdi</span>),%<span class="Identifier">eax</span>
<span id="L4" class="LineNr"> 4 </span>      <span class="Identifier">fb</span>:   <span class="Identifier">c0</span> <span class="Identifier">e8</span> <span class="Number">02 </span>               <span class="Identifier">shr</span>    $<span class="Number">0x2</span>,%<span class="Identifier">al</span>
<span id="L5" class="LineNr"> 5 </span>      <span class="Identifier">fe</span>:   <span class="Number">83</span> <span class="Identifier">e0</span> <span class="Number">07 </span>               <span class="Identifier">and</span>    $<span class="Number">0x7</span>,%<span class="Identifier">eax</span>
<span id="L6" class="LineNr"> 6 </span>     <span class="Number">101</span>:   <span class="Number">48</span> 0<span class="Identifier">f</span> <span class="Identifier">af</span> <span class="Identifier">c1</span>             <span class="Identifier">imul</span>   %<span class="Identifier">rcx</span>,%<span class="Identifier">rax</span>
<span id="L7" class="LineNr"> 7 </span>     <span class="Number">105</span>:   0<span class="Identifier">f</span> <span class="Identifier">b6</span> <span class="Number">52</span> <span class="Number">30</span>             <span class="Identifier">movzbl</span> <span class="Number">0x30</span>(%<span class="Identifier">rdx</span>),%<span class="Identifier">edx</span>
<span id="L8" class="LineNr"> 8 </span>     <span class="Number">109</span>:   <span class="Number">88</span> <span class="Number">54</span> <span class="Number">07 30</span>             <span class="Identifier">mov</span>    %<span class="Identifier">dl</span>,<span class="Number">0x30</span>(%<span class="Identifier">rdi</span>,%<span class="Identifier">rax</span>,<span class="Number">1</span>)
<span id="L9" class="LineNr"> 9 </span>     <span class="Number">10</span><span class="Identifier">d</span>:   <span class="Identifier">b8</span> <span class="Number">00 00 00 00 </span>         <span class="Identifier">mov</span>    $<span class="Number">0x0</span>,%<span class="Identifier">eax</span>
<span id="L10" class="LineNr">10 </span>     <span class="Number">112</span>:   <span class="Identifier">c3</span>                      <span class="Identifier">retq</span>
</pre>

</div>
</html>

Then, in a standard un-patched Python session, let's copy the machine codes
we've just compiled from the C, and make a new function pointer that points to
them:

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr"> 1 </span><span class="PreProc">import</span> ctypes
<span id="L2" class="LineNr"> 2 </span><span class="PreProc">import</span> mmap
<span id="L3" class="LineNr"> 3 </span>
<span id="L4" class="LineNr"> 4 </span>PyUnicode_Type = ctypes.cast(<span class="Function">id</span>(<span class="Function">str</span>), ctypes.POINTER(PyTypeObject)).contents
<span id="L5" class="LineNr"> 5 </span>
<span id="L6" class="LineNr"> 6 </span>payload = (
<span id="L7" class="LineNr"> 7 </span>        b<span class="String">&quot;</span><span class="Special">\x8b\x4e\x18\x0f\xb6\x47\x20\xc0\xe8\x02\x83\xe0\x07\x48\x0f\xaf</span><span class="String">&quot;</span>
<span id="L8" class="LineNr"> 8 </span>        b<span class="String">&quot;</span><span class="Special">\xc1\x0f\xb6\x52\x30\x88\x54\x07\x30\xb8\x00\x00\x00\x00\xc3</span><span class="String">&quot;</span>)
<span id="L9" class="LineNr"> 9 </span>buf = mmap.mmap(
<span id="L10" class="LineNr">10 </span>        -<span class="Number">1</span>,
<span id="L11" class="LineNr">11 </span>        <span class="Function">len</span>(payload),
<span id="L12" class="LineNr">12 </span>        prot=mmap.PROT_READ | mmap.PROT_WRITE | mmap.PROT_EXEC)
<span id="L13" class="LineNr">13 </span>buf.write(payload)
<span id="L14" class="LineNr">14 </span>fpointer = ctypes.c_void_p.from_buffer(buf)
<span id="L15" class="LineNr">15 </span>bad_boi = objobjargproc(ctypes.addressof(fpointer))
<span id="L16" class="LineNr">16 </span>PyUnicode_Type.tp_as_mapping.contents.mp_ass_subscript = bad_boi
</pre>
</div>
</html>

Before we scored this righteous hack, this would happen:
<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr">1 </span>&gt;&gt;&gt; x = <span class="String">&quot;</span><span class="String">hack the planet</span><span class="String">&quot;</span>
<span id="L2" class="LineNr">2 </span>&gt;&gt;&gt; x[<span class="Number">1</span>] = <span class="String">&quot;</span><span class="String">4</span><span class="String">&quot;</span>
<span id="L3" class="LineNr">3 </span><span class="Type">TypeError</span>: <span class="String">'</span><span class="String">str</span><span class="String">'</span> <span class="Function">object</span> does <span class="Statement">not</span> support item assignment
</pre>
</div>
</html>
but now...
<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr">1 </span>&gt;&gt;&gt; x = <span class="String">&quot;</span><span class="String">hack the planet</span><span class="String">&quot;</span>
<span id="L2" class="LineNr">2 </span>&gt;&gt;&gt; x[<span class="Number">1</span>] = <span class="String">&quot;</span><span class="String">4</span><span class="String">&quot;</span>
<span id="L3" class="LineNr">3 </span>&gt;&gt;&gt; <span class="Function">print</span>(x)
<span id="L4" class="LineNr">4 </span><span class="String">&quot;</span><span class="String">h4ck the planet</span><span class="String">&quot;</span>
</pre>
</div>
</html>

![floppy](/images/hackersfloppydraw.gif "Zero Cool in Hackers drawing floppy disks like they are guns...precious"){.callout}

And so our pointless quest is over. I hope you had fun. Sometimes it is good to
remember that computers can be just for fun. 😊

[^1]: More information about this is in the [Data
Model](https://docs.python.org/3/reference/datamodel.html). In short, there is
a defined resolution order for class hierarchies. So if `x.__dict__` didn't
have the key `"y"`, then we'll next look in base classes of `x`, &c.
[^2]: I first seen Armin Ronacher do this on Twitter, so a lot of credit is due to
him for this great trick. Someone has uploaded his code
[here](https://gist.github.com/mahmoudimus/295200) (I can't find original
tweet)
[^3]: There is a good explanation as to why
[here](https://www.quora.com/Why-are-Python-strings-immutable/answer/Michael-Veksler)
