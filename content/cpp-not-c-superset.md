Title: C++ is not a superset of C
Slug: cpp-is-not-a-superset-of-c
Date: 2 September 2019

If you're not familiar with both languages, you might have heard people say 
that C++ is a superset of C. If you're experienced in both languages, you'll 
know that this is not true at all.

Of course, C++ has many features that C does not; but there are also a few 
features that only C has. And, perhaps most importantly, there is code that 
compiles in both languages but does different things.

There's a lot of information about the differences between the two languages 
available, but a lot of it seems scattered. I wanted to have a go at creating a 
concise guide for the details that are often overlooked, with excerpts from the 
language standards to back these up.

## Notes
This is primarily aimed at people who are familiar with at least one of C or 
C++.

When I refer to C++, I mean C++11 onwards, though much of this will apply to 
earlier standards. I'll be referencing the C++17 standard[^1].

When I refer to C, I mean C99 onwards. I'll be referencing the C11 
standard[^2].

It's worth noting that a lot of compilers aren't fully compliant, or have 
extensions that aren't part of the standard. To me, this is part of what makes 
it difficult to pick apart what is standard, what is non-compliant, and what is 
implementation defined. I recommend [Compiler Explorer](https://godbolt.org) if 
you want to see what other compilers might output if you are experimenting with 
any examples.

## Update
I've made some updates after [some helpful feedback](https://news.ycombinator.com/item?id=20869451):

* fixing mistakes in the `const` section

* clarifying the use of implicit int in the `auto` section

The original post is on the [Internet 
Archive](https://web.archive.org/web/20190903193635/https://mcla.ug/blog/cpp-is-not-a-superset-of-c.html).

# Code that compiles in both languages, but does different things in each
This is the category of differences that I think is most important. Not 
everything that C and C++ appear to share is as it seems.

## const

### What can be a constant expression?
The keyword `const` has a different semantic meaning in C++ than in C, but it's 
more subtle than I originally thought when first writing this blog post.

The differences come down to what each language allows to be a _constant 
expression_. A constant expression can be evaluated at compile time. 
Compile-time evaluation is needed for e.g. the size of a static array, as in 
the following example which will compile in C++, but whether it compiles in C 
will be implementation defined:

<html>
<div class=code>
<pre id='vimCodeElement'>
<span id="L1" class="LineNr">1 </span><span class="Type">const</span> <span class="Type">size_t</span> buffer_size = <span class="Number">5</span>;
<span id="L2" class="LineNr">2 </span><span class="Type">int</span> buffer[buffer_size];
<span id="L3" class="LineNr">3 </span>
<span id="L4" class="LineNr">4 </span><span class="Comment">// int main() {</span>
<span id="L5" class="LineNr">5 </span>    <span class="Comment">// ...</span>
<span id="L6" class="LineNr">6 </span><span class="Comment">// }</span>
</pre>
</div>
</html>

We'll need to piece together a few different pieces of the C11 standard to 
understand why this is implementation defined.

C11 6.6 paragraph 6 defines an _integer constant expression_:
> An integer constant expression shall have integer type and shall only have 
> operands that  are  integer  constants,  enumeration  constants,  character
> constants, `sizeof` expressions whose results are integer constants, and 
> floating constants that are the immediate operands of casts. Cast operators 
> in an integer constant expression shall only convert arithmetic types to 
> integer types, except as part of an operand to the `sizeof` operator.

But what is an "integer constant"? From 6.4.4, these are literal values, not 
variables, e.g. `1`.

What this boils down to is that only expressions like `1` or `5 + 7` can be 
constant expressions in C. Variables can't be constant expressions. As 
expected, this example [doesn't compile with 
gcc](https://godbolt.org/z/oMq16u). But [it _does_ compile with 
Clang](https://godbolt.org/z/GgQU8X): why?

The answer is one final piece of the puzzle, C11 6.6 paragraph 10:
> An implementation may accept other forms of constant expressions.

A portable version of the code above in C would have to use a preprocessor 
macro:

<html>
<div class=code>
<pre id='vimCodeElement'>
<span id="L1" class="LineNr">1 </span><span class="PreProc">#define </span><span class="Function">BUFFER_SIZE </span><span class="PreProc">(</span><span class="Number">5</span><span class="PreProc">)</span>
<span id="L2" class="LineNr">2 </span><span class="Type">int</span> buffer[BUFFER_SIZE];
</pre>
</div>
</html>

The keyword `const` was created for this very purpose by Bjarne Stroustrop[^3]: 
to reduce the need for macros. C++ is much more permissive about what can be a 
constant expression, making `const` variables more powerful.

It was a surprise to me to learn that `const` originated in what would become 
C++, and was then adopted by C. I had assumed that `const` came from C, and C++ 
took the same concept and extended it in order to reduce the need for macros. I 
understand macros are embraced by C, but it seems a shame to deliberately 
reduce the usefulness of `const` when standardising C.

### Linkage
Another difference is that file-scope `const` variables have internal linkage 
by default in C++. This is so that you can make a `const` declaration in a 
header without having multiple definition errors[^4]

### Modifying const variables
The following code is a constraint violation in C:

<html>
<div class=code>
<pre id="vimCodeElement"><span id="L1" class="LineNr">1 </span><span class="Type">const</span> <span class="Type">int</span> foo = <span class="Number">1</span>;
<span id="L2" class="LineNr">2 </span><span class="Type">int</span>* bar = &amp;foo;
<span id="L3" class="LineNr">3 </span>*bar = <span class="Number">2</span>;
</pre>
</div>
</html>

C11 6.5.16.1 paragraph 1 lists some constraints, one of which must be true for 
an assignment to be valid. The relevant constraint for our example:
> the left operand has atomic, qualified, or unqualified pointer type, 
> and (considering the type the left operand would have after lvalue 
> conversion) both operands are pointers to qualified or unqualified versions 
> of compatible types, and *the type pointed to by the left has all the 
> qualifiers of the type pointed to by the right*

To be conformant, the compiler must generate a diagnostic if there's a 
constraint violation. This could be a warning or an error. I've found that it 
is generally a warning, meaning this [can often be compiled in 
C](https://godbolt.org/z/DZdBRW), though would give undefined behaviour[^5]:

[This is would not compile as C++](https://godbolt.org/z/yMUvpg). I think this 
is because in C++ `const T` is a distinct type from `T`, and the implicit 
conversion is not allowed. In C, the `const` is just a qualifier. I could be 
misunderstanding, however.

C++17 6.7.3:
> The cv-qualified or cv-unqualified versions of a type are distinct types

## Function declarations with no arguments

<html>
<div class=code>
<pre id='vimCodeElement'>
<span id="L1" class="LineNr">1 </span><span class="Type">int</span> <span class="Function">func</span>();
</pre>
</div>
</html>

In C++, this declares a function that takes no arguments. But in C, this 
declares a function that could take any number of arguments of any type.

From the C11 standard 6.7.6.3 paragraphs 10 and 14:
> The special case of an unnamed parameter of type void as the only item in the 
> list specifies that the function has no parameters.

> An empty list in a function declarator that is part of a definition of that 
> function specifies that the function has no parameters. The empty list in a 
> function declarator that is not part of a definition of that function 
> specifies that no information about the number or types of the parameters is 
> supplied.

So the following would be legit C:

<html>
<div class=code>
<pre id='vimCodeElement'>
<span id="L1" class="LineNr">1 </span><span class="Comment">// func.h</span>
<span id="L2" class="LineNr">2 </span><span class="Type">int</span> <span class="Function">func</span>();
</pre>
</div>
</html>

<html>
<div class=code>
<pre id='vimCodeElement'>
<span id="L1" class="LineNr">1 </span><span class="Comment">// func.c</span>
<span id="L2" class="LineNr">2 </span><span class="Type">int</span> <span class="Function">func</span>(<span class="Type">int</span> foo, <span class="Type">int</span> bar) {
<span id="L3" class="LineNr">3 </span>    <span class="Statement">return</span> foo + bar;
<span id="L4" class="LineNr">4 </span>}
</pre>
</div>
</html>

<html>
<div class=code>
<pre id='vimCodeElement'>
<span id="L1" class="LineNr">1 </span><span class="Comment">// main.c</span>
<span id="L2" class="LineNr">2 </span><span class="PreProc">#include </span><span class="String">&quot;func.h&quot;</span>
<span id="L3" class="LineNr">3 </span>
<span id="L4" class="LineNr">4 </span><span class="Type">int</span> <span class="Function">main</span>() {
<span id="L5" class="LineNr">5 </span>    <span class="Statement">return</span> <span class="Function">func</span>(<span class="Number">5</span>, <span class="Number">6</span>);
<span id="L6" class="LineNr">6 </span>}
</pre>
</div>
</html>

This would result in a compiler error in C++:
```
 main.c:5:12: error: no matching function for call to 'func'
   return func(5, 6);
          ^~~~
 ./func.h:2:5: note: candidate function not viable:
 requires 0 arguments, but 2 were provided
```

### The effect of name mangling
There are some common implementation details that allow us to take this 
further. On my Linux machine using Clang, the following C compiles and links 
(though the result would of course be undefined):

<html>
<div class=code>
<pre id='vimCodeElement'>
<span id="L1" class="LineNr">1 </span><span class="Comment">// func.h</span>
<span id="L2" class="LineNr">2 </span><span class="Type">int</span> <span class="Function">func</span>(<span class="Type">int</span> foo, <span class="Type">int</span> bar);
</pre>
</div>
</html>

<html>
<div class=code>
<pre id='vimCodeElement'>
<span id="L1" class="LineNr">1 </span><span class="PreProc">#include </span><span class="String">&lt;stdio.h&gt;</span>
<span id="L2" class="LineNr">2 </span>
<span id="L3" class="LineNr">3 </span><span class="Comment">// func.c</span>
<span id="L4" class="LineNr">4 </span><span class="Type">int</span> <span class="Function">func</span>(<span class="Type">float</span> foo, <span class="Type">float</span> bar) {
<span id="L5" class="LineNr">5 </span>    <span class="Statement">return</span> <span class="Function">printf</span>(<span class="String">&quot;</span><span class="Special">%f</span><span class="String">, </span><span class="Special">%f</span><span class="Special">\n</span><span class="String">&quot;</span>, foo, bar);
<span id="L6" class="LineNr">6 </span>}
</pre>
</div>
</html>

<html>
<div class=code>
<pre id='vimCodeElement'>
<span id="L1" class="LineNr">1 </span><span class="Comment">// main.c</span>
<span id="L2" class="LineNr">2 </span><span class="PreProc">#include </span><span class="String">&quot;func.h&quot;</span>
<span id="L3" class="LineNr">3 </span>
<span id="L4" class="LineNr">4 </span><span class="Type">int</span> <span class="Function">main</span>() {
<span id="L5" class="LineNr">5 </span>    <span class="Statement">return</span> <span class="Function">func</span>(<span class="Number">5</span>, <span class="Number">6</span>);
<span id="L6" class="LineNr">6 </span>}
</pre>
</div>
</html>

This does not compile in C++. C++ compilers commonly use name mangling to 
enable function overloading. They "mangle" the names of functions in order to 
encode their arguments, e.g. by appending the argument types to the function 
name. Generally, C compilers just store the function name as the symbol. We can 
see this by comparing the symbol table of `func.o` when compiled as C and C++.

As C:
```
╰─λ objdump -t func.o

func.o:     file format elf64-x86-64

SYMBOL TABLE:
0000000000000000 l    df *ABS*  0000000000000000 foo.c
0000000000000000 l    d  .text  0000000000000000 .text
0000000000000000 l    d  .rodata.str1.1 0000000000000000 .rodata.str1.1
0000000000000000 g     F .text  000000000000002e func
0000000000000000         *UND*  0000000000000000 printf
```

As C++:
```
╰─λ objdump -t func.o

func.o:     file format elf64-x86-64

SYMBOL TABLE:
0000000000000000 l    df *ABS*  0000000000000000 foo.c
0000000000000000 l    d  .text  0000000000000000 .text
0000000000000000 l    d  .rodata.str1.1 0000000000000000 .rodata.str1.1
0000000000000000 g     F .text  000000000000003b _Z4funcff
0000000000000000         *UND*  0000000000000000 printf
```

These implementation details are not part of the standards, but I'd be 
surprised to see an implementation that did something wildly different.

## auto
I mostly include this for fun, as I think it's not as well known as it could 
be. `auto` is used for type-inference in C++, but is also a C keyword, just one 
that I've never actually seen used.

`auto` is used to declare something with automatic storage class. It's rarely 
seen because this is the default storage class for all variables declared 
within a block.

The following C has a constraint violation, namely not specifying a type[^6]. 
This could error, but I've never found a compiler to give it anything but a 
warning about implicit conversion:

<html>
<div class=code>
<pre id='vimCodeElement'>
<span id="L1" class="LineNr">1 </span><span class="Type">int</span> <span class="Function">main</span>() {
<span id="L2" class="LineNr">2 </span>    <span class="Type">auto</span> x = <span class="String">&quot;actually an int&quot;</span>;
<span id="L3" class="LineNr">3 </span>    <span class="Statement">return</span> x;
<span id="L4" class="LineNr">4 </span>}
</pre>
</div>
</html>

Before C99, it was legal to have no type specifiers, and the type would be 
assumed to be `int`. This is what happens when I compile this with 
[Clang](https://godbolt.org/z/ok1OSi) and [gcc](https://godbolt.org/z/v5TTqP), 
and so we get a warning due to implicitly converting a `char` array to `int`.

In C++ this wouldn't compile, as the type of `x` is inferred to be `const char*`:

```
error: cannot initialize return object of type 'int' with an lvalue of type 'const char *'
    return x;
```

# Features C has that C++ doesn't have
Despite C being a very small language, and C++ being huge, there are a few 
features that C has that C++ does not.

## Variable length arrays
VLAs allow you to define an array of automatic storage duration with variable 
length. E.g.

<html>
<div class=code>
<pre id='vimCodeElement'>
<span id="L1" class="LineNr">1 </span><span class="Type">void</span> <span class="Function">f</span>(<span class="Type">int</span> n) {
<span id="L2" class="LineNr">2 </span>  <span class="Type">int</span> arr[n];
<span id="L3" class="LineNr">3 </span>  <span class="Comment">// ......</span>
<span id="L4" class="LineNr">4 </span>}
</pre>
</div>
</html>

VLAs were actually made optional in the C11 standard, which makes them not very 
portable.

These aren't part of C++, probably in part because the C++ standard library 
relies heavily on dynamic memory allocation to create containers like 
`std::vector` that can be used similarly. There are reasons you might not want 
this dynamic allocation, but then perhaps you would not be using C++.

## Restricted pointers
C defines a third type qualifier (in addition to `const` and `volatile`): 
`restrict`[^7]. This is only used with pointers. Making a pointer restricted is 
telling the compiler "I will only access the underlying object via this pointer 
for the scope of this pointer". Consequently it can't be aliased. If you break 
this promise you will get undefined behaviour.

This exists to aid optimisation. A classic example is `memmove` where you can 
tell the compiler that the `src` and `dst` do not overlap.

From C11 6.7.3 paragraph 8:
> An object that is accessed through a restrict-qualified pointer has a special 
> association with that pointer. This association, defined in 6.7.3.1 below, 
> requires that all accesses to that object use, directly or indirectly, the 
> value of that particular pointer.135)The intended use of the restrict 
> qualifier (like the register storage class) is to promote optimization, and 
> deleting all instances of the qualifier from all preprocessing translation 
> units composing a conforming program does not change its meaning (i.e., 
> observable behavior)

Restricted pointers aren't part of the C++ standard but are actually supported 
as extensions by many compilers[^8].

I'm suspicious of `restrict`. It seems like playing with fire, and anecdotally 
it seems common to run into compiler optimisation bugs when using it because 
it's exercised so little[^9]. But it's easy to be suspicious of something I've 
never actually used.

## Designated initialisers
C99 brought in an incredibly useful way to initialise structs, and I do not 
understand why it has not been adopted by C++.

<html>
<div class=code>
<pre id='vimCodeElement'>
<span id="L1" class="LineNr"> 1 </span><span class="Type">typedef</span> <span class="Type">struct</span> {
<span id="L2" class="LineNr"> 2 </span>    <span class="Type">float</span> red;
<span id="L3" class="LineNr"> 3 </span>    <span class="Type">float</span> green;
<span id="L4" class="LineNr"> 4 </span>    <span class="Type">float</span> blue;
<span id="L5" class="LineNr"> 5 </span>} Colour;
<span id="L6" class="LineNr"> 6 </span>
<span id="L7" class="LineNr"> 7 </span><span class="Type">int</span> <span class="Function">main</span>() {
<span id="L8" class="LineNr"> 8 </span>    Colour c = { .red = <span class="Number">0.1</span>, .green = <span class="Number">0.5</span>, .blue = <span class="Number">0.9</span> };
<span id="L9" class="LineNr"> 9 </span>    <span class="Statement">return</span> <span class="Number">0</span>;
<span id="L10" class="LineNr">10 </span>}
</pre>
</div>
</html>

In C++ you would have to initialise like this: `Colour c = { 0.1, 0.5, 0.9 };` 
which is harder to read and not robust to changes in the definition of 
`Colour`. You could instead define a constructor but why should we have to do 
this for a simple aggregate type? I hear designated initialisers are now coming 
in C++20. It only took 21 years...

[^1]: The closest working draft I could find for free online: 
[http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/n4713.pdf](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/n4713.pdf)
[^2]: [http://www.open-std.org/jtc1/sc22/wg14/www/docs/n1548.pdf](http://www.open-std.org/jtc1/sc22/wg14/www/docs/n1548.pdf)
[^3]: [Sibling Rivalry, 2002, Bjarne 
Stroustrup](http://www.stroustrup.com/sibling_rivalry.pdf)
[^4]: C++11 standard appendix C.1.2
[^5]: From C11 6.7.3 paragraph 6:  If an attempt is made to modify an object 
defined with a const-qualified type through use of an lvalue with 
non-const-qualified type, the behavior is undefined.
[^6]: C11 6.7.2
[^7]: C11 also defines type qualifier `_Atomic` but I didn't include it here 
for reasons of: conciseness; it's ugly (it's a shame it couldn't be `atomic`, 
too much existing code uses that); I don't know how common it is as a lot of 
people still use C99; C++ also has atomic types as part of the STL so it wasn't 
an interesting example.
[^8]: 
[https://gcc.gnu.org/onlinedocs/gcc-6.4.0/gcc/Restricted-Pointers.html](https://gcc.gnu.org/onlinedocs/gcc-6.4.0/gcc/Restricted-Pointers.html)
[^9]: 
[https://software.intel.com/en-us/forums/intel-c-compiler/topic/474141](https://software.intel.com/en-us/forums/intel-c-compiler/topic/474141)
