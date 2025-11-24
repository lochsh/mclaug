Title: Rust: a future for real-time and safety-critical software without C or C++
Slug: rust-a-future-for-real-time-and-safety-critical-software
Date: 20th August 2019

# Overview
Rust is a fairly new programming language that I'm really excited about. I gave 
a talk about it to my coworkers, primarily aimed at C++ programmers. This is 
that talk translated to a blog post. I hope you will be excited about Rust too 
by the end of this blog post!

A quick overview: Rust is syntactically similar to C++, but semantically very 
different. It's heavily influenced by functional programming languages like 
Haskell and OCaml. It's statically typed, with full type inference, rather than 
the partial type inference that C++ has. It's as fast as C and C++ while making 
guarantees about memory safety that are impossible to make in those languages.

# house[-1]
Before we look at Rust in any more detail, I want you to imagine yourself in a 
scenario. Imagine that you are a builder setting up the gas supply in a new house. Your 
boss tells you to connect the gas pipe in the basement to the gas main on the 
pavement. You go downstairs, and find that there's a glitch: this house doesn't 
have a basement!

So, what do you do? Perhaps you do nothing, or perhaps you decide to 
whimsically interpret your instruction by attaching the gas main to some other 
nearby fixture, like the air conditioning intake for the office next door. 
Either way, suppose you report back to your boss that you're done.

![KWABOOM](/images/rust-talk/explosion.png
"A cartoon explosion, in red and yellow, with some shrapnel"){.callout}

KWABOOM! When the dust settles from the explosion, you would be guilty of 
criminal negligence.[^1]

Yet this is exactly what happens in some programming languages. In C you could 
have an array, or in C++ you could have a vector, ask for the -1 index, and 
anything could happen. The result could be different any time you run the 
program, and you might not realise that something is wrong. This is called 
undefined behaviour, and the possibility of it can't be eliminated entirely, 
because low-level hardware operations are inherently unsafe, but it's something 
that is protected against in many languages, just not C and C++.

The lack of memory safety guarantees from these languages, and the ease with 
which undefined behaviour can be invoked, is terrifying when you think of how 
much of the world runs on software. Heartbleed, the famous SSL vulnerability, 
was due to this lack of memory safety; Stagefright, a famous Android 
vulnerability,  was due to undefined behaviour from signed integer overflow in 
C++.

<html>
<div class=info_box>
Memory safety is crucial to both the correctness and reliability of a program.
</div>
<html>

Vulnerabilities aren't the only concern. Memory safety is crucial to both the 
correctness and reliability of a program. No one wants their program to crash 
out of nowhere, no matter how minor the application: reliability matters. As 
for correctness, I have a friend who used to work on rocket flight simulation 
software and they found passing in the same initialisation data but with a 
different filename gave you a different result, because some uninitialised 
memory was being read, it happened to read the program argument's memory, and 
so the simulation was seeded with garbage values based on the filename. 
Arguably their entire business was a lie.

# So why not use memory safe languages like Python or Java?
Languages like Python and Java use garbage collection to automatically protect 
us from bad memory accesses, like

* use-after-frees (when you access memory that has been deallocated)

* double frees (when you release memory that's already been released, 
  potentially corrupting the heap)

* memory leaks (when memory that isn't being used is never released. This isn't 
  necessarily dangerous but can cause your system to crash and destroy 
  performance.)

Languages like Python and Java protect from these situations automatically. A 
garbage collector will run as part of the JVM or the Python interpreter, and 
periodically check memory to find unused objects, releasing their associated resources and
memory.

But it does this at great cost. Garbage collection is slow, it uses a lot of 
memory, and crucially it means that at any point &ndash; you don't know when &ndash; 
the program will halt &ndash; for how long, you don't know &ndash; to clean up the 
garbage.

<html>
<div class=info_box>
**Python and Java**<br>memory safe at the cost of speed and determinism
<br><br>
**C and C++**<br>fast and deterministic at the cost of memory safety
</div>
<html>

This lack of predictability makes it impossible to use Python or Java for
real-time applications, where you must guarantee that operations will complete
within a specified period of time. It's not about being as fast as possible,
it's about guaranteeing you will be fast enough every single time.

So of course, there are social reasons why C and C++ are popular: it's what 
people know and they've been around a long time. But they are also popular because 
they are fast and deterministic.
Unfortunately, this comes at the cost of memory safety. Even worse, many
real-time applications are also safety critical, like control software in cars 
and surgical robots. As a result, safety critical applications often use these 
dangerous languages.

For a long time, this has been a fundamental trade-off. You either get speed
and predictability, or you get memory safety.

Rust completely overturns this, which is what makes it so exciting and notable.

# What this blog post will cover
These are the questions I hope to answer in this post:

* What are Rust's design goals?

* How does Rust achieve memory safety?

* What does polymorphism look like in Rust?

* What is Rust tooling like?

# What are Rust's design goals?
* Concurrency without data races

    * Concurrency happens whenever different parts of your program might 
      execute at different times or out of order.

    * We'll discuss data races more later, but they're a common hazard when 
      writing concurrent programs, as many of you will know.

* Abstraction without overhead

    * This just means that the conveniences and expressive power that the 
      language provides don't come at a run time cost, it doesn't slow your 
      program down to use them.

* Memory safety without garbage collection

    * We've just talked about what these two terms mean. Let's have a look at 
      how Rust achieves this previously contradictory pairing.

# Memory safety without garbage collection
How Rust achieves memory safety is simultaneously really simple and really
complex.

It's simple because all it involves is enforcing a few simple rules, which are
really easy to understand.

In Rust, all objects have an _owner_, tracked by the compiler. There can only 
be one owner at a time, which is very different to how things work in most 
other programming languages. It ensures that there is exactly one binding to 
any given resource.
This alone would be very restrictive, so of course we can also give out 
references according to strict rules. Taking a reference is often called 
"borrowing" in Rust and I'm going to use that language here.

The rules for borrowing are:

> Any borrow must last for a scope no greater than that of the owner.
>
> You may have one or the other of these two kinds of borrows, but not both at 
> the same time:

>    one or more immutable references to a resource
>    OR
>    exactly one mutable reference.

The first rule eliminates use-after-frees. The second rule eliminates data
races. A data race happens when:

* two or more pointers access the same memory location at the same time

* at least one of them is writing

* and the operations aren't synchronised.

The memory is left in an unknown state.

We didn't have a heap when I worked as an embedded engineer, and we had a 
hardware trap for null pointer derefs. So a lot of common memory safety issues 
weren't a major concern. Data races were the main type of bug I was really 
scared of. Races can be difficult to detect until you make a seemingly insignificant 
change to the code, or there's a slight change in the external conditions, and 
suddenly the winner of the race changes. A data race caused multiple deaths
in Therac-25 when patients were given lethal doses of radiation during cancer 
treatment.

<html>
<div class=info_box>
Rust's key innovation is enforcing its memory safety rules at compile time.
</div>
<html>

As I said, these rules are simple and shouldn't be surprising for anyone who's 
ever had to deal with the possibility of data races before
&ndash; but when I said that they are also complex, I meant it is incredibly smart 
that Rust is able to enforce these rules at compile time. This is Rust's key innovation.

There are some memory-safety checks that have to be runtime &ndash; like array
bounds checking. But if you are writing idiomatic Rust you'll almost never need
these &ndash; you wouldn't usually be directly indexing an array. Instead you'd be
using higher-order functions like fold, map and filter &ndash; you will be familiar
with this type of function if you've written Haskell/Scala or even Python.

## unsafe Rust
I mentioned earlier that the possibility of undefined behaviour isn't something 
that can be eliminated entirely, due to the inherently unsafe nature of low 
level operations. Rust allows you to do such operations within specific unsafe 
blocks. I believe C# and Ada have similar constructs for disabling certain 
safety checks. You'll often need this in Rust when doing embedded programming, 
or low level systems programming. The ability to isolate the potentially unsafe 
parts of your code is incredibly useful &ndash; those parts will be subject to a 
higher level of scrutiny, and if you have a bug that looks like a memory 
problem, those will be the only place that can be causing it, rather than 
absolutely anywhere in your code.

The unsafe block doesn't disable the borrow checker, which is the part of the 
compiler that enforces the borrowing rules we just talked about
&ndash; it just allows you to dereference raw pointers, or access/modify mutable 
static variables. The benefits of the ownership system are still there.

# Revisiting ownership
Speaking of the ownership system, I want to compare it with ownership in C++.

Ownership semantics in C++ changed the language drastically when C++11 came 
out. But the language paid such a high price for backwards compatibility. 
Ownership, to me, feels unnaturally tacked onto C++. The previously simple value
taxonomy was butchered by it[^2]. In many ways it was a great achievement to 
massively modernise such a widely used language, but Rust shows us what a 
language can look like when ownership is a core design concept from the 
beginning.

<html>
<div class=info_box>
C++ smart pointers are just a library on top of an outdated system, and as such 
can be misused and abused in ways that Rust just does not allow.</div>
<html>

C++'s type system does not model object lifetime at all. You can't check for
use-after-frees at compile time. Smart pointers are just a library on top of an 
outdated system, and as such can be misused and abused in ways that Rust just 
does not allow.

Let's take a look at some (simplified) C++ code I wrote at work, where this 
misuse occurs. Then we can look at a Rust equivalent, which (rightly) doesn't compile.

# Abusing smart pointers in C++
<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr"> 1 </span><span class="PreProc">#include </span><span class="String">&lt;functional&gt;</span>
<span id="L2" class="LineNr"> 2 </span><span class="PreProc">#include </span><span class="String">&lt;memory&gt;</span>
<span id="L3" class="LineNr"> 3 </span><span class="PreProc">#include </span><span class="String">&lt;vector&gt;</span>
<span id="L4" class="LineNr"> 4 </span>
<span id="L5" class="LineNr"> 5 </span><span class="Constant">std</span>::<span class="Type">vector</span>&lt;DataValueCheck&gt; <span 
class="Function">createChecksFromStrings</span>(
<span id="L6" class="LineNr"> 6 </span>        <span class="Constant">std</span>::<span class="Type">unique_ptr</span>&lt;Data&gt; data,
<span id="L7" class="LineNr"> 7 </span>        <span class="Constant">std</span>::<span class="Type">vector</span>&lt;<span class="Constant">std</span>::<span class="Type">string</span>&gt; dataCheckStrs) {
<span id="L8" class="LineNr"> 8 </span>
<span id="L9" class="LineNr"> 9 </span>    <span class="Type">auto</span> createCheck = [&amp;](<span class="Constant">std</span>::<span 
class="Type">string</span> checkStr) {
<span id="L10" class="LineNr">10 </span>        <span class="Statement">return</span> <span class="Function">DataValueCheck</span>(checkStr, <span class="Constant">std</span>::<span class="Function">move</span>(data));
<span id="L11" class="LineNr">11 </span>    };
<span id="L12" class="LineNr">12 </span>
<span id="L13" class="LineNr">13 </span>    <span class="Constant">std</span>::<span class="Type">vector</span>&lt;DataValueCheck&gt; checks;
<span id="L14" class="LineNr">14 </span>    <span class="Constant">std</span>::<span class="Function">transform</span>(
<span id="L15" class="LineNr">15 </span>            dataCheckStrs.<span class="Function">begin</span>(),
<span id="L16" class="LineNr">16 </span>            dataCheckStrs.<span class="Function">end</span>(),
<span id="L17" class="LineNr">17 </span>            <span class="Constant">std</span>::<span class="Function">back_inserter</span>(checks),
<span id="L18" class="LineNr">18 </span>            createCheck);
<span id="L19" class="LineNr">19 </span>
<span id="L20" class="LineNr">20 </span>    <span class="Statement">return</span> checks;
<span id="L21" class="LineNr">21 </span>}
</pre>
</div>
</html>
The idea of this code is that we take some strings defining some checks to be
performed on some data, e.g. is a value within a particular range. We
then create a vector of check objects by parsing these strings.

First, we create a lambda that captures by reference, hence the ampersand. The
unique pointer to the data is moved in this lambda, which was a mistake.

We then fill our vector with checks constructed from moved data. The problem is
that only the first move will be successful. Unique pointers are move-only.
So after the first loop in `std::transform`, probably the unique pointer is
nulled (the standard only specifies that it will be left in a valid but unknown
state, but in my experience with Clang it's generally nulled).

Using that null pointer later results in undefined behaviour! In my case, I got
a segmentation fault, which is what will happen on a nullptr deref on most
hosted systems, because the zero memory page is usually reserved. But this
behaviour certainly isn't guaranteed. A bug like this could in theory lie dormant for a while, and then
your application would crash out of nowhere.

The use of the lambda here is a large part of what makes this dangerous. The
compiler just sees a function pointer at the call-site. It can't inspect the
lambda the way it might a standard function.

For context on understanding how this bug came about, originally, we were
using a shared_ptr to store the data, which would have made
this code fine. We wrongly thought we could store it in a unique_ptr instead,
and this bug came about when we made the change. It went unnoticed in part
because the compiler didn't complain.

I'm glad this happened because it means I can show you a real example of a C++ 
memory
safety bug that went unnoticed by both me and my code reviewer, until it later 
showed up in a test[^3]. It doesn't matter if you're an experienced programmer 
&ndash;
these bugs happen! And the compiler can't save you. We must demand better
tools, for our sanity and for public safety. This is an ethical concern.

With that in mind, let's look at a Rust version.

# In Rust, that bad move is not allowed
<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr">1 </span><span class="Keyword">pub</span> <span class="Keyword">fn</span> <span class="Function">create_checks_from_strings</span>(
<span id="L2" class="LineNr">2 </span>        data: <span class="Type">Box</span><span class="Statement">&lt;</span>Data<span class="Statement">&gt;</span>,
<span id="L3" class="LineNr">3 </span>        data_check_strs: <span class="Type">Vec</span><span class="Statement">&lt;</span><span class="Type">String</span><span class="Statement">&gt;</span>)
<span id="L4" class="LineNr">4 </span>    <span class="Statement">-&gt;</span> <span class="Type">Vec</span><span class="Statement">&lt;</span>DataValueCheck<span class="Statement">&gt;</span>
<span id="L5" class="LineNr">5 </span>{
<span id="L6" class="LineNr">6 </span>    <span class="Keyword">let</span> create_check <span class="Statement">=</span> <span class="Statement">|</span>check_str: <span class="Type">&amp;</span><span class="Type">String</span><span class="Statement">|</span> <span class="PreProc">DataValueCheck</span><span class="Special">::</span><span class="Function">new</span>(check_str, data);
<span id="L7" class="LineNr">7 </span>    data_check_strs.<span class="Function">iter</span>().<span class="Function">map</span>(create_check).<span class="Function">collect</span>()
<span id="L8" class="LineNr">8 </span>}
</pre>
</div>
</html>
This is our first look at some Rust code. Now is a good time for me to mention 
that variables are immutable by default. For something to be modifiable, we 
need to use the `mut` keyword &ndash; kind of like the opposite of `const` in C 
and C++.

The Box type just means that we've allocated on the heap. I chose it here 
because unique_ptrs are also heap allocated. We don't need anything else to be 
analogous with unique_ptr because of Rust's rule about each object having only 
one owner at a time.

We're then creating a closure, and then using the higher order function `map` 
to apply it to the strings. It's very similar to the C++ version, but less 
verbose.

But! This doesn't compile, and here's the error message.
<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr"> 1 </span>error[E0525]: expected a closure that 
implements the `<span class="Type">FnMut</span>` <span 
class="Keyword">trait</span>, but this closure only implements `<span 
class="Type">FnOnce</span>`
<span id="L2" class="LineNr"> 2 </span>  <span class="Statement">-</span><span class="Statement">-&gt;</span> bad_move.rs:<span class="Number">1</span>:<span class="Number">8</span>
<span id="L3" class="LineNr"> 3 </span>   <span class="Statement">|</span>
<span id="L4" class="LineNr"> 4 </span> <span class="Number">6</span> <span class="Statement">|</span>     <span class="Keyword">let</span> create_check <span class="Statement">=</span> <span class="Statement">|</span>check_str: <span class="Type">&amp;</span><span class="Type">String</span><span class="Statement">|</span> <span class="PreProc">DataValueCheck</span><span class="Special">::</span><span class="Function">new</span>(check_str, data);
<span id="L5" class="LineNr"> 5 </span>   <span class="Statement">|</span>                        <span class="Statement">^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^----^</span>
<span id="L6" class="LineNr"> 6 </span>   <span class="Statement">|</span>                        <span class="Statement">|</span>                                                     <span class="Statement">|</span>
<span id="L7" class="LineNr"> 7 </span>   <span class="Statement">|</span>                        <span class="Statement">|</span>                                 closure is `<span class="Type">FnOnce</span>` because it moves
<span id="L8" class="LineNr"> 8 </span>   <span class="Statement">|</span>                        <span class="Statement">|</span>                                 the variable `data` out of its environment
<span id="L9" class="LineNr"> 9 </span>   <span class="Statement">|</span>                        this closure implements `<span class="Type">FnOnce</span>`, not `<span class="Type">FnMut</span>`
<span id="L10" class="LineNr">10 </span> <span class="Number">7</span> <span class="Statement">|</span>     data_check_strs.<span class="Function">iter</span>().<span class="Function">map</span>(create_check).<span class="Function">collect</span>()
<span id="L11" class="LineNr">11 </span>   <span class="Statement">|</span>                            <span class="Statement">---</span> the requirement to implement `<span class="Type">FnMut</span>` derives from here
<span id="L12" class="LineNr">12 </span>
<span id="L13" class="LineNr">13 </span>error: aborting due to previous error
<span id="L14" class="LineNr">14 </span>
<span id="L15" class="LineNr">15 </span>For more information about this error, try `rustc <span class="Statement">--</span>explain E0525`.
</pre>
</div>
</html>

One really great thing about the Rust community is there's a really strong 
focus on making sure there's lots of resources for people to learn, and on 
having readable error messages. You can even ask the compiler for more 
information about the error
message, and it will show you a minimal example with explanations.

When we create our closure, the data variable is moved inside it because of the
one owner rule. The compiler 
then infers that the closure can only be run once: further calls are illegal as 
we no longer own the variable. Then, the function `map` requires a callable 
that can be called repeatedly and mutate state, so the compilation fails.

I think this snippet shows how powerful the type system is in Rust compared to 
C++, and how different it is to program in a language where the compiler tracks 
object lifetime.

You'll notice that the error message here mentions traits: "expected a closure 
that implements FnMut trait", for example. Traits are a language feature that 
tell the compiler what functionality a type must provide. Traits are Rust's 
mechanism for polymorphism.

# Polymorphism
In C++ there's a lot of different ways of doing polymorphism, which I think 
contributes to how bloated the language can feel. There's templates,
function & operator overloading for static polymorphism, and subtyping for 
dynamic polymorphism. These can have major downsides: subtyping can lead to 
very high coupling, and templates can be unpleasant to use due to their lack of 
parameterisation.

In Rust, traits provide a unified way of specifying both static and dynamic 
interfaces. They are Rust's sole notion of interface. They only support the
"implements" relationship, not the "extends" relationship. This encourages 
designs that are based on composition, not implementation inheritance, leading to less 
coupling.

Let's have a look at an example.
<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr"> 1 </span><span class="Keyword">trait</span> <span class="Identifier">Rateable</span> {
<span id="L2" class="LineNr"> 2 </span>    <span class="Special">/// Rate fluff out of 10</span>
<span id="L3" class="LineNr"> 3 </span>    <span class="Special">/// Ratings above 10 for exceptionally soft bois</span>
<span id="L4" class="LineNr"> 4 </span>    <span class="Keyword">fn</span> <span class="Function">fluff_rating</span>(<span class="Type">&amp;</span><span class="Constant">self</span>) <span class="Statement">-&gt;</span> <span class="Type">f32</span>;
<span id="L5" class="LineNr"> 5 </span>}
<span id="L6" class="LineNr"> 6 </span>
<span id="L7" class="LineNr"> 7 </span><span class="Keyword">struct</span> <span class="Identifier">Alpaca</span> {
<span id="L8" class="LineNr"> 8 </span>    days_since_shearing: <span class="Type">f32</span>,
<span id="L9" class="LineNr"> 9 </span>    age: <span class="Type">f32</span>
<span id="L10" class="LineNr">10 </span>}
<span id="L11" class="LineNr">11 </span>
<span id="L12" class="LineNr">12 </span><span class="Keyword">impl</span> Rateable <span class="Statement">for</span> Alpaca {
<span id="L13" class="LineNr">13 </span>    <span class="Keyword">fn</span> <span class="Function">fluff_rating</span>(<span class="Type">&amp;</span><span class="Constant">self</span>) <span class="Statement">-&gt;</span> <span class="Type">f32</span> {
<span id="L14" class="LineNr">14 </span>        <span class="Number">10.0</span> <span class="Statement">*</span> <span class="Number">365.0</span> <span class="Statement">/</span> <span class="Constant">self</span>.days_since_shearing
<span id="L15" class="LineNr">15 </span>    }
<span id="L16" class="LineNr">16 </span>}
</pre>
</div>
</html>

There's nothing complicated going on here, I decided a simple but fun example 
was best. First, we're defining a trait called `Rateable`. For a type to be 
`Rateable`, it has to implement a function called `fluff_rating` that returns a 
float.

Then we define a type called `Alpaca` and implement this interface for it. We 
could do the same for another type, say `Cat`!
<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr"> 1 </span><span class="Keyword">enum</span> <span class="Identifier">Coat</span> {
<span id="L2" class="LineNr"> 2 </span>    Hairless,
<span id="L3" class="LineNr"> 3 </span>    Short,
<span id="L4" class="LineNr"> 4 </span>    Medium,
<span id="L5" class="LineNr"> 5 </span>    Long
<span id="L6" class="LineNr"> 6 </span>}
<span id="L7" class="LineNr"> 7 </span>
<span id="L8" class="LineNr"> 8 </span><span class="Keyword">struct</span> <span class="Identifier">Cat</span> {
<span id="L9" class="LineNr"> 9 </span>    coat: Coat,
<span id="L10" class="LineNr">10 </span>    age: <span class="Type">f32</span>
<span id="L11" class="LineNr">11 </span>}
<span id="L12" class="LineNr">12 </span>
<span id="L13" class="LineNr">13 </span><span class="Keyword">impl</span> Rateable <span class="Statement">for</span> Cat {
<span id="L14" class="LineNr">14 </span>    <span class="Keyword">fn</span> <span class="Function">fluff_rating</span>(<span class="Type">&amp;</span><span class="Constant">self</span>) <span class="Statement">-&gt;</span> <span class="Type">f32</span> {
<span id="L15" class="LineNr">15 </span>        <span class="Statement">match</span> <span class="Constant">self</span>.coat {
<span id="L16" class="LineNr">16 </span>            <span class="PreProc">Coat</span><span class="Special">::</span>Hairless <span class="Statement">=&gt;</span> <span class="Number">0.0</span>,
<span id="L17" class="LineNr">17 </span>            <span class="PreProc">Coat</span><span class="Special">::</span>Short <span class="Statement">=&gt;</span> <span class="Number">5.0</span>,
<span id="L18" class="LineNr">18 </span>            <span class="PreProc">Coat</span><span class="Special">::</span>Medium <span class="Statement">=&gt;</span> <span class="Number">7.5</span>,
<span id="L19" class="LineNr">19 </span>            <span class="PreProc">Coat</span><span class="Special">::</span>Long <span class="Statement">=&gt;</span> <span class="Number">10.0</span>
<span id="L20" class="LineNr">20 </span>        }
<span id="L21" class="LineNr">21 </span>    }
<span id="L22" class="LineNr">22 </span>}
</pre>
</div>
</html>

Here you can see me using pattern matching, another Rust feature. It's similar 
in usage to a switch statement in C but semantically very different. Cases in 
switch blocks are just gotos; pattern matching has required coverage 
completeness. You have to cover every case for it to compile. Plus you can 
match on ranges and other constructs that makes it a lot more flexible.

So, now that we've implemented this trait for these two types, we can have a 
generic function[^4].

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr">1 </span><span class="Keyword">fn</span> <span class="Function">pet</span><span class="Statement">&lt;</span>T: Rateable<span class="Statement">&gt;</span>(boi: T) <span class="Statement">-&gt;</span> <span class="Type">&amp;</span><span class="Type">str</span> {
<span id="L2" class="LineNr">2 </span>    <span class="Statement">match</span> boi.<span class="Function">fluff_rating</span>() {
<span id="L3" class="LineNr">3 </span>        <span class="Number">0.0</span>...<span class="Number">3.5</span> <span class="Statement">=&gt;</span> <span class="String">&quot;naked alien boi...but precious nonetheless&quot;</span>,
<span id="L4" class="LineNr">4 </span>        <span class="Number">3.5</span>...<span class="Number">6.5</span> <span class="Statement">=&gt;</span> <span class="String">&quot;increased floof...increased joy&quot;</span>,
<span id="L5" class="LineNr">5 </span>        <span class="Number">6.5</span>...<span class="Number">8.5</span> <span class="Statement">=&gt;</span> <span class="String">&quot;approaching maximum fluff&quot;</span>,
<span id="L6" class="LineNr">6 </span>        _ <span class="Statement">=&gt;</span> <span class="String">&quot;sublime. the softest boi!&quot;</span>
<span id="L7" class="LineNr">7 </span>}
</pre>
</div>
</html>

Like in C++, the stuff inside the angle brackets is our type arguments. But 
unlike C++ templates, we are able to parametrise the function. We're able to 
say "this function is only for types that are Rateable". That's not something 
you can do in C++![^5] This has consequences beyond readability. Trait bounds 
on type arguments means the Rust compiler can type check the function once, 
rather than having to check each concrete instantiation separately. This means 
faster compilation and clearer compiler error messages.

You can also use traits dynamically, which isn't preferred as it has a runtime
penalty, but is sometimes necessary. I decided it was best not to cover that in 
this post.

One other big part of traits is the interoperability that comes from standard
traits, like `Add` and `Display`. Implementing add means you can add a type
together with the + operator, implementing Display means you can print it.

# Rust tools
C and C++ don't have a standard way to manage dependencies. There's a few 
different tools for doing this, I haven't heard great things about any of them. 
Using plain Makefiles for your build system is very flexible, but can be 
rubbish to maintain. CMake reduces the maintenance burden but is less flexible 
which can be frustrating.

Rust really shines in this respect. Cargo is the one and only tool used in the 
Rust community for dependency management, packaging and for building and 
running your code. It's similar in many ways to Pipenv and Poetry in Python. 
There's an official package repository to go along with it. I don't have a lot 
more to say about this! It's really nice to use and it makes me sad that C and 
C++ don't have the same thing.

![cargo](/images/rust-talk/cargo.png "cargo usage screenshot"){.callout}

# Should we all use Rust?
There's no universal answer for this. It depends on your application, as with 
any programming language. Rust is already being used very successfully in many 
different places. Microsoft use it for Azure IoT stuff, Mozilla sponsor Rust 
and use it for parts of the Firefox web browser, and many smaller companies are 
using it too.

So depending on your application, it's very much production ready.

<html>
<div class=info_box>
Rust is already being used in production successfully
<br><br>
But for some applications you might find support immature or lacking.
</div>
</html>

### Embedded
In the embedded world, how ready Rust is depends on what you are doing. There 
are mature resources for Cortex-M that are used in production, and there's a 
developing but not yet mature RISC-V toolchain.

For x86 and arm8 bare metal the story is also good, like for Raspberry Pis.
For more vintage architectures like PIC and AVR there isn't great support but I 
don't think for most new projects that should be a big issue.

Cross compilation support is good for all LLVM targets because the Rust 
compiler uses LLVM as its backend.

One thing where embedded Rust is lacking is there are no production grade
RTOSs, and HALs
are less developed. This isn't an insurmountable issue for many projects, but 
it would certainly hamper many too. I expect this to continue growing in the 
next couple years.

### Async
One thing that definitely isn't ready is language async support which is still 
in development. They're still deciding what the async/await syntax should look 
like.

### Interoperability
As for interoperability with other languages, there's a good C FFI in Rust, but 
you have to go through that if you want to call Rust from C++ or vice versa. 
That's very common in many languages, I don't expect it to change. I
mention it because it would make it a bit of a pain to incorporate Rust into an 
existing C++ project: you'd need a C layer between the Rust and C++ and that 
would potentially be adding a lot of complexity.

### Final thoughts
Were I starting from scratch on a new project at work I would definitely vouch 
for Rust. I'm really hopeful that it
represents a better future for software &ndash; one that's more reliable, more
secure and more enjoyable to write.

[^1]: from Ian Barland's ["Why C and C++ are Awful Programming 
Languages"](http://www.radford.edu/ibarland/Manifestoes/whyC++isBad.shtml)

[^2]: The value categories used to just be lvalues (which has an identifiable 
place in memory) and rvalues (which do no not, like literals). It is now [much 
more complicated](https://en.cppreference.com/w/cpp/language/value_category).

[^3]: Yes...I should have had a test already. But for various unjustified 
reasons I didn't write a test that covered this particular code until later.

[^4]: Note: cheekily, I included this code that would not actually compile. 
You’d need the return type to be `&’static str`. This is “lifetime annotation” 
and was outside the scope of my talk, and this blog post. Read about it 
[here](https://doc.rust-lang.org/1.9.0/book/lifetimes.html).

[^5]: I hear a lot of people say that Concepts in C++20 are analogous to 
traits, but this isn't true. I explain why 
[here](https://mcla.ug/blog/cpp20-concepts-are-not-like-rust-traits.html)


