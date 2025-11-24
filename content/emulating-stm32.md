Title: Emulating an STM32F4 in QEMU to test ARM assembly
Slug: emulating-stm32-qemu
Date: 4 April 2020

I recently published a blog post titled [How to flash an
LED](https://mcla.ug/blog/how-to-flash-an-led.html){:target="_blank"} about writing ARM assembly
for an STM32. I was running my code on a
[1bitsy](https://1bitsy.org/){:target="_blank"}
development board, but I wanted anyone to be able to have a go at writing the
assembly and testing it &ndash; even if they didn't have the right hardware.
You can find [the repo on my
Github](https://github.com/lochsh/gpio-toggle-exercise){:target="_blank"}.

Finding the specific QEMU tools I needed took a while, so I wanted to document
it in this blog post.

## The quest for a QEMU STM32F4 machine
[QEMU](https://www.qemu.org/){:target="_blank"} is a "generic and open source machine emulator
and virtualizer". An example where emulation is useful: if you are writing
software for an embedded target, reliable automated tests can be a challenge.
Emulating your embedded target on your host computer makes allows for easier
testing, and for isolating problems to do with the real hardware from problems
to do with the software.

The 1bitsy has a STM32F415 microcontroller, so I was looking for emulation for
a development board with a similar MCU. QEMU comes with a set of built-in
machines, and you can write your own machines to emulate the hardware you
desire.

Unfortunately, none of the built-in machines suited my purposes. There were
multiple Cortex M3 machines, but none of them were STM32s, and there were no
Cortex M4 machines. I wanted to use an STM32F4 so as to avoid confusion for
people going from my assembly blog post to the emulation. I also gave the blog
post as a talk at work, and didn't want my coworkers to be confused by the
inconsistency. Creating my own QEMU machine was not remotely feasible on the
timescales I was working on for my work talk, and I believe it is a lot of
work! So, I searched the internet for an available STM32F4 QEMU machine.

### Enter GNU MCU Eclipse...maybe
During this search, I came across many mentions of [GNU MCU
Eclipse](https://gnu-mcu-eclipse.github.io/){:target="_blank"}, a suite of tools for the Eclipse
IDE which included an STM32F4 Discovery board.

I am a [vim](https://www.vim.org/){:target="_blank"} die-hard with no desire to use Eclipse, so I
was hopeful to find a way to be able to extract these tools and easily use
them outside of Eclipse.

It turns out the fork of QEMU that this toolsuite is using is available
separately as [xPack QEMU
ARM](https://xpack.github.io/qemu-arm/){:target="_blank"}.

### xPack QEMU ARM has an STM32F4 Discovery machine
xPack [recommend](https://xpack.github.io/qemu-arm/install/){:target="_blank"} using
[xpm](https://www.npmjs.com/package/xpm){:target="_blank"} to install their QEMU ARM fork, but I
found the manual installation instructions worked fine on Ubuntu. This gives
us, among other things, the `qemu-system-gnuarmeclipse` binary.

## Connecting to the emulator via gdb
We can run our target executable on the emulator like this, with the `gdb`
switch telling QEMU to wait for a connection from gdb before continuing the
program's execution. Here, we tell it listen on TCP port 3333.
<html>
<div class=code>
<pre id='vimCodeElement'>
<span id="L1" class="LineNr">1 </span>qemu<span class="op_lv0">-</span>system<span class="op_lv0">-</span>gnuarmeclipse <span class="Statement">\</span>
<span id="L2" class="LineNr">2 </span>    <span class="op_lv0">-</span>cpu cortex<span class="op_lv0">-</span>m4 <span class="Statement">\</span>
<span id="L3" class="LineNr">3 </span>    <span class="op_lv0">-</span>machine STM32F4<span class="op_lv0">-</span>Discovery <span class="Statement">\</span>
<span id="L4" class="LineNr">4 </span>    <span class="op_lv0">-</span>gdb tcp<span class="op_lv0">::</span><span class="Number">3333</span> <span class="Statement">\</span>
<span id="L5" class="LineNr">5 </span>    <span class="op_lv0">-</span>nographic <span class="Statement">\</span>
<span id="L6" class="LineNr">6 </span>    <span class="op_lv0">-</span>kernel <span class="Statement">&quot;</span><span class="PreProc">${</span><span class="PreProc">TARGET</span><span class="PreProc">}</span><span class="Statement">&quot;</span>
</pre>
</div>
</html>

Then we can connect from gdb:
<html>
<div class=code>
<pre id='vimCodeElement'>
<span id="L1" class="LineNr">1 </span>gdb<span class="op_lv0">-</span>multiarch <span class="Statement">\</span>
<span id="L2" class="LineNr">2 </span>    <span class="op_lv0">-</span>q <span class="Statement">&quot;</span><span class="PreProc">${</span><span class="PreProc">TARGET</span><span class="PreProc">}</span><span class="Statement">&quot;</span> <span class="Statement">\</span>
<span id="L3" class="LineNr">3 </span>    <span class="op_lv0">-</span>ex <span class="Statement">&quot;</span><span class="String">target remote :3333</span><span class="Statement">&quot;</span>
</pre>
</div>
</html>

## Automated testing of ARM assembly on the STM32F4 emulator
I put all this together into a bash script so I could test that assembly for
toggling a GPIO pin was doing what it should, by reading register values from
gdb at breakpoints set in the assembly file:

<html>
<div class=code>
<pre id='vimCodeElement' style="overflow-x: scroll; width: 100%; white-space: pre;">
<span id="L1" class="LineNr"> 1 </span><span class="Comment">#!/usr/bin/env bash</span>
<span id="L2" class="LineNr"> 2 </span><span class="Statement">set</span><span class="Identifier"> </span><span class="Special">-euo</span><span class="Identifier"> pipefail</span>
<span id="L3" class="LineNr"> 3 </span><span class="Identifier">TARGET</span>=<span class="PreProc">$1</span>
<span id="L4" class="LineNr"> 4 </span>
<span id="L5" class="LineNr"> 5 </span>qemu<span class="op_lv0">-</span>system<span class="op_lv0">-</span>gnuarmeclipse <span class="Statement">\</span>
<span id="L6" class="LineNr"> 6 </span>    <span class="op_lv0">-</span>cpu cortex<span class="op_lv0">-</span>m4 <span class="Statement">\</span>
<span id="L7" class="LineNr"> 7 </span>    <span class="op_lv0">-</span>machine STM32F4<span class="op_lv0">-</span>Discovery <span class="Statement">\</span>
<span id="L8" class="LineNr"> 8 </span>    <span class="op_lv0">-</span>gdb tcp<span class="op_lv0">::</span>3333 <span class="Statement">\</span>
<span id="L9" class="LineNr"> 9 </span>    <span class="op_lv0">-</span>nographic <span class="Statement">\</span>
<span id="L10" class="LineNr">10 </span>    <span class="op_lv0">-</span>kernel <span class="Statement">&quot;</span><span class="PreProc">${</span><span class="PreProc">TARGET</span><span class="PreProc">}</span><span class="Statement">&quot;</span> <span class="op_lv0">&gt;</span> <span class="op_lv0">/</span>dev<span class="op_lv0">/</span>null <span class="op_lv0">&amp;</span>
<span id="L11" class="LineNr">11 </span><span class="Identifier">QEMU_PID</span>=<span class="PreProc">$!</span>
<span id="L12" class="LineNr">12 </span>
<span id="L13" class="LineNr">13 </span><span class="Statement">if </span><span class="Statement">[</span> <span class="Statement">!</span> <span class="Statement">-d</span> <span class="Statement">&quot;</span><span class="String">/proc/</span><span class="PreProc">${</span><span class="PreProc">QEMU_PID</span><span class="PreProc">}</span><span class="Statement">&quot;</span> <span class="Statement">]</span>
<span id="L14" class="LineNr">14 </span><span class="Statement">then</span>
<span id="L15" class="LineNr">15 </span>    <span class="Statement">echo</span><span class="String"> -ne </span><span class="Statement">&quot;</span><span class="Special">\033</span><span class="String">[31m Failed to start QEMU</span><span class="Statement">&quot;</span>
<span id="L16" class="LineNr">16 </span>    <span class="Statement">echo</span><span class="String"> -e </span><span class="Statement">&quot;</span><span class="Special">\033</span><span class="String">[0m</span><span class="Statement">&quot;</span>
<span id="L17" class="LineNr">17 </span>    <span class="Statement">exit</span> <span class="Number">1</span>
<span id="L18" class="LineNr">18 </span><span class="Statement">fi</span>
<span id="L19" class="LineNr">19 </span>
<span id="L20" class="LineNr">20 </span><span class="Function">function</span> <span class="Function">read_address() {</span>
<span id="L21" class="LineNr">21 </span>    <span class="Statement">local</span><span class="Identifier"> ADDRESS=</span><span class="PreProc">$1</span>
<span id="L22" class="LineNr">22 </span>    <span class="Identifier">VALUE</span>=<span class="PreProc">$(</span><span class="Special">gdb-multiarch \</span>
<span id="L23" class="LineNr">23 </span><span class="Special">        </span><span class="Special">-q</span><span class="Special"> </span><span class="Statement">&quot;</span><span class="PreProc">${</span><span class="PreProc">TARGET</span><span class="PreProc">}</span><span class="Statement">&quot;</span><span class="Special"> \</span>
<span id="L24" class="LineNr">24 </span><span class="Special">        </span><span class="Special">-ex</span><span class="Special"> </span><span class="Statement">&quot;</span><span class="String">target remote :3333</span><span class="Statement">&quot;</span><span class="Special"> \</span>
<span id="L25" class="LineNr">25 </span><span class="Special">        </span><span class="Special">-ex</span><span class="Special"> </span><span class="Statement">&quot;</span><span class="String">x/1xw </span><span class="PreProc">${</span><span class="PreProc">ADDRESS</span><span class="PreProc">}</span><span class="Statement">&quot;</span><span class="Special"> \</span>
<span id="L26" class="LineNr">26 </span><span class="Special">        </span><span class="Special">--batch</span><span class="Special"> </span><span class="Statement">|</span><span class="Special"> </span><span class="Statement">tail</span><span class="Special"> </span><span class="Number">-1</span><span class="Special"> </span><span class="Statement">|</span><span class="Special"> cut </span><span class="Special">-f</span><span class="Special"> </span><span class="Number">2</span><span class="PreProc">)</span>
<span id="L27" class="LineNr">27 </span><span class="Function">}</span>
<span id="L28" class="LineNr">28 </span>
<span id="L29" class="LineNr">29 </span><span class="Function">function</span> <span class="Function">test_address() {</span>
<span id="L30" class="LineNr">30 </span>    <span class="Statement">local</span><span class="Identifier"> ADDRESS=</span><span class="PreProc">$1</span>
<span id="L31" class="LineNr">31 </span>    <span class="Statement">local</span><span class="Identifier"> REGISTER_NAME=</span><span class="PreProc">$2</span>
<span id="L32" class="LineNr">32 </span>    <span class="Statement">local</span><span class="Identifier"> EX_VALUE=</span><span class="PreProc">$3</span>
<span id="L33" class="LineNr">33 </span>
<span id="L34" class="LineNr">34 </span>    read_address <span class="Statement">&quot;</span><span class="PreProc">${</span><span class="PreProc">ADDRESS</span><span class="PreProc">}</span><span class="Statement">&quot;</span>
<span id="L35" class="LineNr">35 </span>    <span class="Statement">if </span><span class="Statement">[</span> <span class="Statement">&quot;</span><span class="PreProc">$VALUE</span><span class="Statement">&quot;</span> <span class="Statement">=</span> <span class="String">&quot;</span><span class="PreProc">${</span><span class="PreProc">EX_VALUE</span><span class="PreProc">}</span><span class="String">&quot;</span> <span class="Statement">]</span>
<span id="L36" class="LineNr">36 </span>    <span class="Statement">then</span>
<span id="L37" class="LineNr">37 </span>        <span class="Statement">echo</span><span class="String"> -ne </span><span class="Statement">&quot;</span><span class="Special">\033</span><span class="String">[32m</span><span class="Special">✓</span><span class="String"> </span><span class="PreProc">${</span><span class="PreProc">REGISTER_NAME</span><span class="PreProc">}</span><span class="String"> correctly set to </span><span class="PreProc">${</span><span class="PreProc">EX_VALUE</span><span class="PreProc">}</span><span class="Statement">&quot;</span>
<span id="L38" class="LineNr">38 </span>    <span class="Statement">else</span>
<span id="L39" class="LineNr">39 </span>        <span class="Statement">echo</span><span class="String"> -ne </span><span class="Statement">&quot;</span><span class="Special">\033</span><span class="String">[31m</span><span class="Special">✘</span><span class="String"> </span><span class="PreProc">${</span><span class="PreProc">REGISTER_NAME</span><span class="PreProc">}</span><span class="String"> was </span><span class="PreProc">${</span><span class="PreProc">VALUE</span><span class="PreProc">}</span><span class="String">, want </span><span class="PreProc">${</span><span class="PreProc">EX_VALUE</span><span class="PreProc">}</span><span class="Statement">&quot;</span>
<span id="L40" class="LineNr">40 </span>    <span class="Statement">fi</span>
<span id="L41" class="LineNr">41 </span>
<span id="L42" class="LineNr">42 </span>    <span class="Statement">echo</span><span class="String"> -e </span><span class="Statement">&quot;</span><span class="Special">\033</span><span class="String">[0m</span><span class="Statement">&quot;</span>
<span id="L43" class="LineNr">43 </span><span class="Function">}</span>
<span id="L44" class="LineNr">44 </span>
<span id="L45" class="LineNr">45 </span>test_address <span class="Statement">&quot;</span><span class="String">0x40023830</span><span class="Statement">&quot;</span> <span class="Statement">&quot;</span><span class="String">AHB1ENR</span><span class="Statement">&quot;</span> <span class="Statement">&quot;</span><span class="String">0x00000001</span><span class="Statement">&quot;</span>
<span id="L46" class="LineNr">46 </span>test_address <span class="Statement">&quot;</span><span class="String">0x40020000</span><span class="Statement">&quot;</span> <span class="Statement">&quot;</span><span class="String">GPIOA_MODER</span><span class="Statement">&quot;</span> <span class="Statement">&quot;</span><span class="String">0xa8010000</span><span class="Statement">&quot;</span>
<span id="L47" class="LineNr">47 </span>test_address <span class="Statement">&quot;</span><span class="String">0x40020014</span><span class="Statement">&quot;</span> <span class="Statement">&quot;</span><span class="String">GPIOA_ODR</span><span class="Statement">&quot;</span> <span class="Statement">&quot;</span><span class="String">0x00000100</span><span class="Statement">&quot;</span>
<span id="L48" class="LineNr">48 </span>
<span id="L49" class="LineNr">49 </span><span class="Statement">kill</span> <span class="op_lv0">$</span><span class="lv12c">{</span>QEMU_PID<span class="lv12c">}</span> <span class="op_lv0">&amp;&gt;</span> <span class="op_lv0">/</span>dev<span class="op_lv0">/</span>null
</pre>
</div>
</html>

The output looks like this for correct assembly, which you can view
[here](https://github.com/lochsh/gpio-toggle-exercise/blob/master/sneak-peek/working-gpio-toggle.s).

<img src="/images/qemu-output.png" width="400" alt="QEMU script output" class=callout>

This testing is limited, but I'm pleased with it! I put everything in a
Dockerfile in the Github repo to make life easier for people trying this out.

## Bonus 1337 screenshot
This is a screenshot from when I finally got all this working after a couple
evenings of trials:

<img src="/images/qemu-all-screenshot.png" class=callout>

Clockwise from left is the assembly, the bash script, a gdb session where I'd
been poking around, and me running the bash script.

I hope this is post helpful to anyone wanting to emulate an STM32F4 without
having to do it all themselves, and that the tools in my
[GPIO toggling
exercise](https://github.com/lochsh/gpio-toggle-exercise){:target="_blank"} are
useful to anyone who wants to play with ARM assembly but doesn't have the
hardware.
