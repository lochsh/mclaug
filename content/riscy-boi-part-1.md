Title: Designing a RISC-V CPU, Part 1: Learning hardware design as a software engineer
Slug: risc-v-cpu-part-1
Date: 16th February 2021
Cover: /images/riscyboi.png

I have no experience in digital logic design. That is, I didn't until I
recently decided that I would like to try designing my own CPU and running it
on an FPGA! If you too are a software engineer with a vague interest in
hardware design, I hope this series of posts about what I've learnt will be
helpful and interesting. In this first installment, I hope to answer these
questions:

* What is digital logic design?

* How do I get started, and what tools might I use?

In future installments, I will go into more detail about my CPU design and the
RISC-V architecture, as well as hopefully answering these questions:

* What about digital logic design is fundamentally different from software
  design?

* What about digital logic design is similar to software design?

You can see the code for my CPU at the time of writing
[here](https://github.com/lochsh/riscy-boi/tree/47e94dc6e9665f73c871add002c34d1516fd5106)
or an up to date version [here](https://github.com/lochsh/riscy-boi).

## What is digital logic design?
Digital logic design is designing logic circuits that operate on binary values.
The elementary components are logic gates: an AND gate, for example, has two
inputs and one output. The output is 1 iff[^1] both inputs are 1.

Typically, we design synchronous circuits which use flip-flops to store state,
and thereby synchronise the operation of the circuit to a common clock.
Flip-flops are composed of logic gates.

Analogue circuit design is concerned with the electronic components that make
up logic gates, like transistors and diodes. This level of abstraction is often
needed for applications dealing directly with signals derived from analogue
sensors, like radio receivers. When designing a CPU, this level of abstraction
would not be feasible: modern CPUs can have billions of transistors!

Instead, we use tools that can translate our digital logic design into
different useful formats: the configuration of an FPGA (see below); a
simulation; silicon layout.

## What is an FPGA and why are they used?
We noted above that the same digital logic design tools can be used whether we
are creating a custom ASIC to be made into silicon, or configuring an FPGA. A
Field-Programmable Gate Array is an integrated circuit containing an array of
programmable logic blocks. You could imagine it is as a big array of logic
gates that can be connected together in various ways.

Making a custom chip generally costs millions, and of course once your chip is
manufactured it cannot be changed. Thus, generally FPGAs are used when:

* You cannot afford to create a custom ASIC due to lack of capital (e.g. if
  you're just some hacker like me and not ARM or Intel)

* You cannot afford to create a custom ASIC because your volume is too low to
  make it worth the high one-off costs (e.g. if you are making a small quantity
  of MRI machines with custom data acquisition hardware)

* You need the flexibility

The downsides? FPGAs have a much higher per-chip cost, and they are generally
much slower as a consequence of being able to connect logic blocks together in
very flexible ways. In contrast, a custom design can be reduced to the minimum
number of transistors, with no concern for flexibility.

I think it's helpful context to compare the custom ASIC design process against
that of an FPGA design:

* <span style="color:#fc04a2">Logic design</span>: just like we'd do for an FPGA, the logic design of an ASIC is
  done in a hardware description language.

* <span style="color:#fc04a2">Verification</span>: FPGA designs may well be verified, but you might expect the
  process for an ASIC design to be more rigorous &ndash; after all, the design
  can't be changed once manufactured! Often verification will involve formally
  verifying[^2] parts of the design.

* <span style="color:#fc04a2">Synthesis</span>: This creates a _netlist_: a list of logic blocks and their
  connections. The connections are called _nets_, and the blocks are called
  _cells_. For both FPGAs and ASICs, the cells are vendor-specific.

* <span style="color:#fc04a2">Placement and routing</span> (P&R): for an FPGA, this involves mapping the logic
  blocks described in the netlist to actual blocks in the FPGA. The resulting
  binary is often called a _bitstream_.  For an ASIC, this involves deciding
  where to place the cells on the silicon, and how to connect them up. Both
  applications generally use automated optimisation tools for this.

## What tools do I need?

### A hardware description language: I am using [nMigen](https://github.com/nmigen/nmigen)[^3]
You may have heard of Verilog or VHDL: both popular hardware description
languages (HDLs). I use "popular" here to mean widely used, not widely loved.

I won't pretend to know much about these tools: I only know that smarter people
than me with vast logic design experience have a lot of hate for them.
Due to the problems with Verilog and other similar tools, there have been
various attempts at making more useful and friendlier alternatives.  nMigen is
one such project, which creates a domain-specific language in Python. In their
own words:

> Despite being faster than schematics entry, hardware design with Verilog and
> VHDL remains tedious and inefficient for several reasons. The event-driven
> model introduces issues and manual coding that are unnecessary for
> synchronous circuits, which represent the lion's share of today's logic
> designs. Counterintuitive arithmetic rules result in steeper learning curves
> and provide a fertile ground for subtle bugs in designs. Finally, support for
> procedural generation of logic (metaprogramming) through "generate"
> statements is very limited and restricts the ways code can be made generic,
> reused and organized.
>
> To address those issues, we have developed the nMigen FHDL, a library that
> replaces the event-driven paradigm with the notions of combinatorial and
> synchronous statements, has arithmetic rules that make integers always behave
> like mathematical integers, and most importantly allows the design's logic to
> be constructed by a Python program. This last point enables hardware
> designers to take advantage of the richness of the Python language—object
> oriented programming, function parameters, generators, operator overloading,
> libraries, etc.—to build well organized, reusable and elegant designs.

If, like me, you've never used Verilog, then not all of this will have more
than abstract meaning to you. But it certainly sounds promising,
and I can attest that it has been very straightforward to get started with
logic design without the reportedly large barrier of grappling with Verilog. I
would recommend it, particularly if you are already familiar with Python!

The only downside I can think of is that nMigen is still in development, and
in particular the documentation is not complete. There is a helpful community
at #nmigen on [chat.freenode.net](chat.freenode.net).

### A wave viewer for inspecting simulations: I am using [GTKWave](http://gtkwave.sourceforge.net/)
nMigen provides simulation tooling: I use it in my tests, written using
`pytest`. I record the signals during these tests and view them in a wave
viewer to help debug.

![gtkwave](/images/gtkwave.png "A screenshot of GTKWave"){.callout}

### Optional: An FPGA dev board. I am using a myStorm BlackIce II
You don't need an FPGA dev board to create your own CPU. You could do
everything in simulation! The fun of having a board to work with, for me, is
being able to flash LEDs and see my design in action.

Of course, if you were creating something more useful than my very basic CPU,
then you would probably want some hardware to run it on, and this would be less
"optional"!

## Getting started with nMigen
Rather than immediately trying to design a CPU, I started by making an
Arithmetic Logic Unit (ALU) in nMigen. The ALU is a key piece of any CPU design
that I have seen: it performs arithmetic operations.

Why start with this? I knew I would need an ALU for my CPU; I knew I could make
a simple one; I knew that the feeling of making something is an important
motivator when starting a new project!

My design looked something like this:

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr"> 1 </span><span class="String">&quot;&quot;&quot;</span><span class="String">Arithmetic Logic Unit</span><span class="String">&quot;&quot;&quot;</span>
<span id="L2" class="LineNr"> 2 </span><span class="PreProc">import</span> enum
<span id="L3" class="LineNr"> 3 </span>
<span id="L4" class="LineNr"> 4 </span><span class="PreProc">import</span> nmigen <span class="Statement">as</span> nm
<span id="L5" class="LineNr"> 5 </span>
<span id="L6" class="LineNr"> 6 </span>
<span id="L7" class="LineNr"> 7 </span><span class="Statement">class</span> <span class="Function">ALUOp</span><span class="lv12c">(</span>enum<span class="op_lv12">.</span>IntEnum<span class="lv12c">)</span><span class="op_lv0">:</span>
<span id="L8" class="LineNr"> 8 </span>    <span class="String">&quot;&quot;&quot;</span><span class="String">Operations for the ALU</span><span class="String">&quot;&quot;&quot;</span>
<span id="L9" class="LineNr"> 9 </span>    ADD <span class="op_lv0">=</span> <span class="Number">0</span>
<span id="L10" class="LineNr">10 </span>    SUB <span class="op_lv0">=</span> <span class="Number">1</span>
<span id="L11" class="LineNr">11 </span>
<span id="L12" class="LineNr">12 </span>
<span id="L13" class="LineNr">13 </span><span class="Statement">class</span> <span class="Function">ALU</span><span class="lv12c">(</span>nm<span class="op_lv12">.</span>Elaboratable<span class="lv12c">)</span><span class="op_lv0">:</span>
<span id="L14" class="LineNr">14 </span>    <span class="String">&quot;&quot;&quot;</span>
<span id="L15" class="LineNr">15 </span><span class="String">    Arithmetic Logic Unit</span>
<span id="L16" class="LineNr">16 </span>
<span id="L17" class="LineNr">17 </span><span class="String">    * op (in): the opcode</span>
<span id="L18" class="LineNr">18 </span><span class="String">    * a (in): the first operand</span>
<span id="L19" class="LineNr">19 </span><span class="String">    * b (in): the second operand</span>
<span id="L20" class="LineNr">20 </span>
<span id="L21" class="LineNr">21 </span><span class="String">    * o (out): the output</span>
<span id="L22" class="LineNr">22 </span><span class="String">    </span><span class="String">&quot;&quot;&quot;</span>
<span id="L23" class="LineNr">23 </span>
<span id="L24" class="LineNr">24 </span>    <span class="Statement">def</span> <span class="Function">__init__</span><span class="lv12c">(</span>self<span class="op_lv12">,</span> width<span class="lv12c">)</span><span class="op_lv0">:</span>
<span id="L25" class="LineNr">25 </span>        <span class="String">&quot;&quot;&quot;</span>
<span id="L26" class="LineNr">26 </span><span class="String">        Initialiser</span>
<span id="L27" class="LineNr">27 </span>
<span id="L28" class="LineNr">28 </span><span class="String">        Args:</span>
<span id="L29" class="LineNr">29 </span><span class="String">            width (int): data width</span>
<span id="L30" class="LineNr">30 </span><span class="String">        </span><span class="String">&quot;&quot;&quot;</span>
<span id="L31" class="LineNr">31 </span>        self<span class="op_lv0">.</span>op <span class="op_lv0">=</span> nm<span class="op_lv0">.</span>Signal<span class="lv12c">()</span>
<span id="L32" class="LineNr">32 </span>        self<span class="op_lv0">.</span>a <span class="op_lv0">=</span> nm<span class="op_lv0">.</span>Signal<span class="lv12c">(</span>width<span class="lv12c">)</span>
<span id="L33" class="LineNr">33 </span>        self<span class="op_lv0">.</span>b <span class="op_lv0">=</span> nm<span class="op_lv0">.</span>Signal<span class="lv12c">(</span>width<span class="lv12c">)</span>
<span id="L34" class="LineNr">34 </span>        self<span class="op_lv0">.</span>o <span class="op_lv0">=</span> nm<span class="op_lv0">.</span>Signal<span class="lv12c">(</span>width<span class="lv12c">)</span>
<span id="L35" class="LineNr">35 </span>
<span id="L36" class="LineNr">36 </span>    <span class="Statement">def</span> <span class="Function">elaborate</span><span class="lv12c">(</span>self<span class="op_lv12">,</span> _<span class="lv12c">)</span><span class="op_lv0">:</span>
<span id="L37" class="LineNr">37 </span>        m <span class="op_lv0">=</span> nm<span class="op_lv0">.</span>Module<span class="lv12c">()</span>
<span id="L38" class="LineNr">38 </span>
<span id="L39" class="LineNr">39 </span>        <span class="Statement">with</span> m<span class="op_lv0">.</span>Switch<span class="lv12c">(</span>self<span class="op_lv12">.</span>op<span class="lv12c">)</span><span class="op_lv0">:</span>
<span id="L40" class="LineNr">40 </span>            <span class="Statement">with</span> m<span class="op_lv0">.</span>Case<span class="lv12c">(</span>ALUOp<span class="op_lv12">.</span>ADD<span class="lv12c">)</span><span class="op_lv0">:</span>
<span id="L41" class="LineNr">41 </span>                m<span class="op_lv0">.</span>d<span class="op_lv0">.</span>comb <span class="op_lv0">+=</span> self<span class="op_lv0">.</span>o<span class="op_lv0">.</span>eq<span class="lv12c">(</span>self<span class="op_lv12">.</span>a <span class="op_lv12">+</span> self<span class="op_lv12">.</span>b<span class="lv12c">)</span>
<span id="L42" class="LineNr">42 </span>            <span class="Statement">with</span> m<span class="op_lv0">.</span>Case<span class="lv12c">(</span>ALUOp<span class="op_lv12">.</span>SUB<span class="lv12c">)</span><span class="op_lv0">:</span>
<span id="L43" class="LineNr">43 </span>                m<span class="op_lv0">.</span>d<span class="op_lv0">.</span>comb <span class="op_lv0">+=</span> self<span class="op_lv0">.</span>o<span class="op_lv0">.</span>eq<span class="lv12c">(</span>self<span class="op_lv12">.</span>a <span class="op_lv12">-</span> self<span class="op_lv12">.</span>b<span class="lv12c">)</span>
<span id="L44" class="LineNr">44 </span>        <span class="Statement">return</span> m
</pre>
</div>
</html>

As you can see, we've created a lot of nMigen `Signal` instances to represent
well...the signals that define the interface to our ALU! But what is this
`elaborate` method? My understanding is that "elaboration" is the name for the
first step in synthesising the netlist (see above). The idea in the nMigen code
above is that we've created some _elaboratable_ structure (by inheriting from
`nm.Elaboratable`), i.e. something that describes digital logic we want to
synthesise. The `elaborate` method describes that digital logic. It has to
return an nMigen `Module`.

Let's have a closer look at the contents of the `elaborate` method. The
`Switch` will create some kind of decision logic in the synthesised design.
But what is `m.d.comb`? nMigen has the concept of synchronous (`m.d.sync`)
and combinatorial[^4] (`m.d.comb`) control domains. From the nMigen
[docs](https://nmigen.info/nmigen/latest/lang.html#lang-domains):

> A control domain is a named group of signals that change their value in
> identical conditions.
>
> All designs have a single predefined _combinatorial domain_, containing all
> signals that change immediately when any value used to compute them changes.
> The name comb is reserved for the combinatorial domain.
>
> A design can also have any amount of user-defined _synchronous domains_, also
> called clock domains, containing signals that change when a specific edge
> occurs on the domain’s clock signal or, for domains with asynchronous reset,
> on the domain’s reset signal. Most modules only use a single synchronous
> domain[...]
>
> The behavior of assignments differs for signals in combinatorial and
> synchronous domains. Collectively, signals in synchronous domains contain the
> state of a design, whereas signals in the combinatorial domain cannot form
> feedback loops or hold state.

Let's think about a shift register as an example piece of logic that we wish to
design. Let's say our shift register has 8 bits, and every clock cycle the bit
values are shifted one bit along (with the left-most value coming from an input
signal). This is necessarily synchronous: you couldn't create this
functionality by simply wiring the bits together, which in nMigen is what
assigning them in the combinatorial domain would represent.

In the next installment of this blog series, I'll have more detail on my CPU
design. As it stands at the moment, I'm trying to retire one instruction per
cycle with no pipelining &ndash; this is unusual, but my hope was that it would
make various aspects of the CPU simpler. A consequence of this is that much of
my logic is combinatorial, rather than synchronous, as I have very little state
to maintain between clock cycles. At the moment, something is wrong with my
register file design, and there's a chance I'll have to reassess my "no
pipelining" idea in order to fix it.

## Writing tests
I like using `pytest` for Python tests, but you can of course use whatever
framework appeals to you. Here are my tests for the ALU code above:

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr"> 1 </span><span class="String">&quot;&quot;&quot;</span><span class="String">ALU tests</span><span class="String">&quot;&quot;&quot;</span>
<span id="L2" class="LineNr"> 2 </span><span class="PreProc">import</span> nmigen<span class="op_lv0">.</span>sim
<span id="L3" class="LineNr"> 3 </span><span class="PreProc">import</span> pytest
<span id="L4" class="LineNr"> 4 </span>
<span id="L5" class="LineNr"> 5 </span><span class="PreProc">from</span> riscy_boi <span class="PreProc">import</span> alu
<span id="L6" class="LineNr"> 6 </span>
<span id="L7" class="LineNr"> 7 </span>
<span id="L8" class="LineNr"> 8 </span><span class="op_lv0">@</span>pytest<span class="op_lv0">.</span>mark<span class="op_lv0">.</span>parametrize<span class="lv12c">(</span>
<span id="L9" class="LineNr"> 9 </span>        <span class="String">&quot;</span><span class="String">op, a, b, o</span><span class="String">&quot;</span><span class="op_lv12">,</span> <span class="lv11c">[</span>
<span id="L10" class="LineNr">10 </span>            <span class="lv10c">(</span>alu<span class="op_lv10">.</span>ALUOp<span class="op_lv10">.</span>ADD<span class="op_lv10">,</span> <span class="Number">1</span><span class="op_lv10">,</span> <span class="Number">1</span><span class="op_lv10">,</span> <span class="Number">2</span><span class="lv10c">)</span><span class="op_lv11">,</span>
<span id="L11" class="LineNr">11 </span>            <span class="lv10c">(</span>alu<span class="op_lv10">.</span>ALUOp<span class="op_lv10">.</span>ADD<span class="op_lv10">,</span> <span class="Number">1</span><span class="op_lv10">,</span> <span class="Number">2</span><span class="op_lv10">,</span> <span class="Number">3</span><span class="lv10c">)</span><span class="op_lv11">,</span>
<span id="L12" class="LineNr">12 </span>            <span class="lv10c">(</span>alu<span class="op_lv10">.</span>ALUOp<span class="op_lv10">.</span>ADD<span class="op_lv10">,</span> <span class="Number">2</span><span class="op_lv10">,</span> <span class="Number">1</span><span class="op_lv10">,</span> <span class="Number">3</span><span class="lv10c">)</span><span class="op_lv11">,</span>
<span id="L13" class="LineNr">13 </span>            <span class="lv10c">(</span>alu<span class="op_lv10">.</span>ALUOp<span class="op_lv10">.</span>ADD<span class="op_lv10">,</span> <span class="Number">258</span><span class="op_lv10">,</span> <span class="Number">203</span><span class="op_lv10">,</span> <span class="Number">461</span><span class="lv10c">)</span><span class="op_lv11">,</span>
<span id="L14" class="LineNr">14 </span>            <span class="lv10c">(</span>alu<span class="op_lv10">.</span>ALUOp<span class="op_lv10">.</span>ADD<span class="op_lv10">,</span> <span class="Number">5</span><span class="op_lv10">,</span> <span class="Number">0</span><span class="op_lv10">,</span> <span class="Number">5</span><span class="lv10c">)</span><span class="op_lv11">,</span>
<span id="L15" class="LineNr">15 </span>            <span class="lv10c">(</span>alu<span class="op_lv10">.</span>ALUOp<span class="op_lv10">.</span>ADD<span class="op_lv10">,</span> <span class="Number">0</span><span class="op_lv10">,</span> <span class="Number">5</span><span class="op_lv10">,</span> <span class="Number">5</span><span class="lv10c">)</span><span class="op_lv11">,</span>
<span id="L16" class="LineNr">16 </span>            <span class="lv10c">(</span>alu<span class="op_lv10">.</span>ALUOp<span class="op_lv10">.</span>ADD<span class="op_lv10">,</span> <span class="Number">2</span><span class="op_lv10">**</span><span class="Number">32</span> <span class="op_lv10">-</span> <span class="Number">1</span><span class="op_lv10">,</span> <span class="Number">1</span><span class="op_lv10">,</span> <span class="Number">0</span><span class="lv10c">)</span><span class="op_lv11">,</span>
<span id="L17" class="LineNr">17 </span>            <span class="lv10c">(</span>alu<span class="op_lv10">.</span>ALUOp<span class="op_lv10">.</span>SUB<span class="op_lv10">,</span> <span class="Number">1</span><span class="op_lv10">,</span> <span class="Number">1</span><span class="op_lv10">,</span> <span class="Number">0</span><span class="lv10c">)</span><span class="op_lv11">,</span>
<span id="L18" class="LineNr">18 </span>            <span class="lv10c">(</span>alu<span class="op_lv10">.</span>ALUOp<span class="op_lv10">.</span>SUB<span class="op_lv10">,</span> <span class="Number">4942</span><span class="op_lv10">,</span> <span class="Number">0</span><span class="op_lv10">,</span> <span class="Number">4942</span><span class="lv10c">)</span><span class="op_lv11">,</span>
<span id="L19" class="LineNr">19 </span>            <span class="lv10c">(</span>alu<span class="op_lv10">.</span>ALUOp<span class="op_lv10">.</span>SUB<span class="op_lv10">,</span> <span class="Number">1</span><span class="op_lv10">,</span> <span class="Number">2</span><span class="op_lv10">,</span> <span class="Number">2</span><span class="op_lv10">**</span><span class="Number">32</span> <span class="op_lv10">-</span> <span class="Number">1</span><span class="lv10c">)</span><span class="lv11c">]</span><span class="lv12c">)</span>
<span id="L20" class="LineNr">20 </span><span class="Statement">def</span> <span class="Function">test_alu</span><span class="lv12c">(</span>comb_sim<span class="op_lv12">,</span> op<span class="op_lv12">,</span> a<span class="op_lv12">,</span> b<span class="op_lv12">,</span> o<span class="lv12c">)</span><span class="op_lv0">:</span>
<span id="L21" class="LineNr">21 </span>    alu_inst <span class="op_lv0">=</span> alu<span class="op_lv0">.</span>ALU<span class="lv12c">(</span><span class="Number">32</span><span class="lv12c">)</span>
<span id="L22" class="LineNr">22 </span>
<span id="L23" class="LineNr">23 </span>    <span class="Statement">def</span> <span class="Function">testbench</span><span class="lv12c">()</span><span class="op_lv0">:</span>
<span id="L24" class="LineNr">24 </span>        <span class="Statement">yield</span> alu_inst<span class="op_lv0">.</span>op<span class="op_lv0">.</span>eq<span class="lv12c">(</span>op<span class="lv12c">)</span>
<span id="L25" class="LineNr">25 </span>        <span class="Statement">yield</span> alu_inst<span class="op_lv0">.</span>a<span class="op_lv0">.</span>eq<span class="lv12c">(</span>a<span class="lv12c">)</span>
<span id="L26" class="LineNr">26 </span>        <span class="Statement">yield</span> alu_inst<span class="op_lv0">.</span>b<span class="op_lv0">.</span>eq<span class="lv12c">(</span>b<span class="lv12c">)</span>
<span id="L27" class="LineNr">27 </span>        <span class="Statement">yield</span> nmigen<span class="op_lv0">.</span>sim<span class="op_lv0">.</span>Settle<span class="lv12c">()</span>
<span id="L28" class="LineNr">28 </span>        <span class="Statement">assert</span> <span class="lv12c">(</span><span class="Statement">yield</span> alu_inst<span class="op_lv12">.</span>o<span class="lv12c">)</span> <span class="op_lv0">==</span> o
<span id="L29" class="LineNr">29 </span>
<span id="L30" class="LineNr">30 </span>    comb_sim<span class="lv12c">(</span>alu_inst<span class="op_lv12">,</span> testbench<span class="lv12c">)</span>
</pre>
</div>
</html>

and my `conftest.py`:
<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr"> 1 </span><span class="String">&quot;&quot;&quot;</span><span class="String">Test configuration</span><span class="String">&quot;&quot;&quot;</span>
<span id="L2" class="LineNr"> 2 </span><span class="PreProc">import</span> os
<span id="L3" class="LineNr"> 3 </span><span class="PreProc">import</span> shutil
<span id="L4" class="LineNr"> 4 </span>
<span id="L5" class="LineNr"> 5 </span><span class="PreProc">import</span> nmigen<span class="op_lv0">.</span>sim
<span id="L6" class="LineNr"> 6 </span><span class="PreProc">import</span> pytest
<span id="L7" class="LineNr"> 7 </span>
<span id="L8" class="LineNr"> 8 </span>
<span id="L9" class="LineNr"> 9 </span>VCD_TOP_DIR <span class="op_lv0">=</span> os<span class="op_lv0">.</span>path<span class="op_lv0">.</span>join<span class="lv12c">(</span>
<span id="L10" class="LineNr">10 </span>        os<span class="op_lv12">.</span>path<span class="op_lv12">.</span>dirname<span class="lv11c">(</span>os<span class="op_lv11">.</span>path<span class="op_lv11">.</span>realpath<span class="lv10c">(</span>__file__<span class="lv10c">)</span><span class="lv11c">)</span><span class="op_lv12">,</span>
<span id="L11" class="LineNr">11 </span>        <span class="String">&quot;</span><span class="String">tests</span><span class="String">&quot;</span><span class="op_lv12">,</span>
<span id="L12" class="LineNr">12 </span>        <span class="String">&quot;</span><span class="String">vcd</span><span class="String">&quot;</span><span class="lv12c">)</span>
<span id="L13" class="LineNr">13 </span>
<span id="L14" class="LineNr">14 </span>
<span id="L15" class="LineNr">15 </span><span class="Statement">def</span> <span class="Function">vcd_path</span><span class="lv12c">(</span>node<span class="lv12c">)</span><span class="op_lv0">:</span>
<span id="L16" class="LineNr">16 </span>    directory <span class="op_lv0">=</span> os<span class="op_lv0">.</span>path<span class="op_lv0">.</span>join<span class="lv12c">(</span>VCD_TOP_DIR<span class="op_lv12">,</span> node<span class="op_lv12">.</span>fspath<span class="op_lv12">.</span>basename<span class="op_lv12">.</span>split<span class="lv11c">(</span><span class="String">&quot;</span><span class="String">.</span><span class="String">&quot;</span><span class="lv11c">)[</span><span class="Number">0</span><span class="lv11c">]</span><span class="lv12c">)</span>
<span id="L17" class="LineNr">17 </span>    os<span class="op_lv0">.</span>makedirs<span class="lv12c">(</span>directory<span class="op_lv12">,</span> exist_ok<span class="op_lv12">=</span><span class="Function">True</span><span class="lv12c">)</span>
<span id="L18" class="LineNr">18 </span>    <span class="Statement">return</span> os<span class="op_lv0">.</span>path<span class="op_lv0">.</span>join<span class="lv12c">(</span>directory<span class="op_lv12">,</span> node<span class="op_lv12">.</span>name <span class="op_lv12">+</span> <span class="String">&quot;</span><span class="String">.vcd</span><span class="String">&quot;</span><span class="lv12c">)</span>
<span id="L19" class="LineNr">19 </span>
<span id="L20" class="LineNr">20 </span>
<span id="L21" class="LineNr">21 </span><span class="op_lv0">@</span>pytest<span class="op_lv0">.</span>fixture<span class="lv12c">(</span>scope<span class="op_lv12">=</span><span class="String">&quot;</span><span class="String">session</span><span class="String">&quot;</span><span class="op_lv12">,</span> autouse<span class="op_lv12">=</span><span class="Function">True</span><span class="lv12c">)</span>
<span id="L22" class="LineNr">22 </span><span class="Statement">def</span> <span class="Function">clear_vcd_directory</span><span class="lv12c">()</span><span class="op_lv0">:</span>
<span id="L23" class="LineNr">23 </span>    shutil<span class="op_lv0">.</span>rmtree<span class="lv12c">(</span>VCD_TOP_DIR<span class="op_lv12">,</span> ignore_errors<span class="op_lv12">=</span><span class="Function">True</span><span class="lv12c">)</span>
<span id="L24" class="LineNr">24 </span>
<span id="L25" class="LineNr">25 </span>
<span id="L26" class="LineNr">26 </span><span class="op_lv0">@</span>pytest<span class="op_lv0">.</span>fixture
<span id="L27" class="LineNr">27 </span><span class="Statement">def</span> <span class="Function">comb_sim</span><span class="lv12c">(</span>request<span class="lv12c">)</span><span class="op_lv0">:</span>
<span id="L28" class="LineNr">28 </span>
<span id="L29" class="LineNr">29 </span>    <span class="Statement">def</span> <span class="Function">run</span><span class="lv12c">(</span>fragment<span class="op_lv12">,</span> process<span class="lv12c">)</span><span class="op_lv0">:</span>
<span id="L30" class="LineNr">30 </span>        sim <span class="op_lv0">=</span> nmigen<span class="op_lv0">.</span>sim<span class="op_lv0">.</span>Simulator<span class="lv12c">(</span>fragment<span class="lv12c">)</span>
<span id="L31" class="LineNr">31 </span>        sim<span class="op_lv0">.</span>add_process<span class="lv12c">(</span>process<span class="lv12c">)</span>
<span id="L32" class="LineNr">32 </span>        <span class="Statement">with</span> sim<span class="op_lv0">.</span>write_vcd<span class="lv12c">(</span>vcd_path<span class="lv11c">(</span>request<span class="op_lv11">.</span>node<span class="lv11c">)</span><span class="lv12c">)</span><span class="op_lv0">:</span>
<span id="L33" class="LineNr">33 </span>            sim<span class="op_lv0">.</span>run_until<span class="lv12c">(</span><span class="Number">100e-6</span><span class="lv12c">)</span>
<span id="L34" class="LineNr">34 </span>
<span id="L35" class="LineNr">35 </span>    <span class="Statement">return</span> run
<span id="L36" class="LineNr">36 </span>
<span id="L37" class="LineNr">37 </span>
<span id="L38" class="LineNr">38 </span><span class="op_lv0">@</span>pytest<span class="op_lv0">.</span>fixture
<span id="L39" class="LineNr">39 </span><span class="Statement">def</span> <span class="Function">sync_sim</span><span class="lv12c">(</span>request<span class="lv12c">)</span><span class="op_lv0">:</span>
<span id="L40" class="LineNr">40 </span>
<span id="L41" class="LineNr">41 </span>    <span class="Statement">def</span> <span class="Function">run</span><span class="lv12c">(</span>fragment<span class="op_lv12">,</span> process<span class="lv12c">)</span><span class="op_lv0">:</span>
<span id="L42" class="LineNr">42 </span>        sim <span class="op_lv0">=</span> nmigen<span class="op_lv0">.</span>sim<span class="op_lv0">.</span>Simulator<span class="lv12c">(</span>fragment<span class="lv12c">)</span>
<span id="L43" class="LineNr">43 </span>        sim<span class="op_lv0">.</span>add_sync_process<span class="lv12c">(</span>process<span class="lv12c">)</span>
<span id="L44" class="LineNr">44 </span>        sim<span class="op_lv0">.</span>add_clock<span class="lv12c">(</span><span class="Number">1</span> <span class="op_lv12">/</span> <span class="Number">10e6</span><span class="lv12c">)</span>
<span id="L45" class="LineNr">45 </span>        <span class="Statement">with</span> sim<span class="op_lv0">.</span>write_vcd<span class="lv12c">(</span>vcd_path<span class="lv11c">(</span>request<span class="op_lv11">.</span>node<span class="lv11c">)</span><span class="lv12c">)</span><span class="op_lv0">:</span>
<span id="L46" class="LineNr">46 </span>            sim<span class="op_lv0">.</span>run<span class="lv12c">()</span>
<span id="L47" class="LineNr">47 </span>
<span id="L48" class="LineNr">48 </span>    <span class="Statement">return</span> run
</pre>
</div>
</html>

Every test generates a `vcd` file for me to view in a wave viewer, like
GTKWave, for debugging purposes. You'll notice that the combinatorial
simulation fixture runs for an arbitrary small time period, whereas the
synchronous simulation feature runs for a defined number of clock cycles.

Yielding a signal in the test function requests its current value from the
simulator. For combinatorial logic, we yield `nmigen.sim.Settle()` to ask the
simulation to complete.

For synchronous logic, you can also yield without an argument to start a new
clock cycle.

## Designing a CPU
Once I'd gotten familiar with nMigen, I started trying to draw a block diagram
for my CPU. I will go into much more detail on this on the next installment of
this blog series, but I will briefly say that I started by drawing out the
logic required for one instruction, then drew out the logic for another
instruction, then figured out how to combine them. Here's the first messy
sketch:

![sketch](/images/block-diagram-sktech.jpg "A screenshot of my first CPU design sketch"){.callout}

This block diagram step was extremely valuable in figuring out what the
interfaces of different components needed to be, but I wouldn't have wanted to
do it before playing around in nMigen first and learning a bit about digital
logic design in the process. The jazzed up block diagram currently looks like
this:

![block](/images/riscyboi.png "Block diagram of current CPU design"){.callout}

Stay tuned for the next installment where I actually delve into RISC-V and CPU
design. I expect there to be a third installment of me reworking my design and
getting it working on the entire instruction set (RV32I) that I am implementing
:)

[^1]: "if and only if"
[^2]: If you're a software engineer who has worked on high assurance software,
such as that for a high risk medical device, you might think "formal
verification" refers to any formalised verification process. Here I use formal
verification to refer to mathematically proving correctness, see
[https://en.wikipedia.org/wiki/Formal_verification](https://en.wikipedia.org/wiki/Formal_verification)
[^3]: Note that you want the nmigen project under the nmigen organisation on
GitHub. You do not want the one under the m-labs organisation. The situation is
a bit unfortunate and complicated, but just know that the former is only one
under active development. It's possible that the active project might change
name soon &ndash; I'll do my best to update this blog post should that happen.
[^4]: also known as combinational
