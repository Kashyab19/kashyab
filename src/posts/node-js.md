---
title:  Node.js and Concurrency
date: 2026-01-03
tags: Node.js, Concurrency, Substack
---

Happy New Year!

Is Node.js single threaded? I answer with a lot of confidence that it is single-threaded. Then a follow up question, "How do we handle concurrency in Node.js if its just single threaded? (assume your API gets 1000s of requests at the same time)". I stutter and stammer for a long time and I give up.

I am on a quest right now to find the answer to concurrency and single-threading architecture.

## The Foundation: Threads, Cores, and Processes

Before we dissect Node.js architecture, let's establish what we're working with. In the CS world, a *thread* is the **smallest logical processing unit** that can be scheduled by the operating system - they are software constructs, whereas a *core* is a **physical processing unit** (silicon) that handles instructions independently.

### The Relationship

The relationship among these three distinct concepts:

- A **process** contains one or more **threads**
- **Threads** within a process are scheduled to run on **cores**
- The OS scheduler decides which thread runs on which core at any given moment

> **Key Takeaway**: Only cores are physical hardware; threads and processes are software/logical constructs managed by the operating system.

## The Question: Is Node.js Really Single-Threaded?

Node.js, a runtime environment, uses a single-threaded model. This means it uses a **single thread** to handle multiple tasks. If we're going to build an API that serves 10,000s of parallel requests, wouldn't it make sense to use a multi-threaded architecture? How does Node.js really scale to achieve concurrency?

> **The Answer**: Node.js takes advantage of an event-driven, non-blocking I/O model.

## The Event Loop: The Heart of Node.js

At the core of Node.js lies the **Event Loop** - the mechanism that makes single-threaded concurrency possible. The event loop continuously cycles through a series of phases, executing callbacks and handling events.

### How It Works: The High-Level View

1. **Event Queue**: An incoming request (like an HTTP request or a file read) is placed in an event queue
2. **Event Loop**: Picks up tasks from the event queue and processes them
3. **Callbacks**: For each task, Node.js executes the associated callback function. If a callback involves a blocking operation (like file I/O or network requests), it delegates this to the thread pool
4. **Thread Pool**: Node.js uses a thread pool (managed by `libuv` - a C++ library) to handle blocking operations. Once completed, the results are placed back into the event queue for the event loop to process

### The Restaurant Analogy

Here's a simple mental model: Imagine Node.js as the only waiter in a restaurant.

1. **Take an order** (receive request)
2. **Give order to kitchen** (delegate to system/thread pool)
3. **While waiting, take more orders** (non-blocking)
4. **When food is ready, deliver it** (execute callback)
5. **Repeat**

The core idea: **Never be idle, always be processing something.**

### The Six Phases: A Deep Dive

The event loop runs continuously through six phases in order, and each phase has a FIFO queue of callbacks to execute:

1. **Timers**: Executes callbacks scheduled by `setTimeout()` and `setInterval()`
2. **Pending Callbacks**: Executes I/O callbacks deferred from the previous loop iteration
3. **Idle, Prepare**: Internal use only - preparation for the next round
4. **Poll**: Retrieves new I/O events and executes I/O-related callbacks
5. **Check**: Executes `setImmediate()` callbacks
6. **Close Callbacks**: Executes close event callbacks (e.g., `socket.on('close', ...)`)

## The Thread Pool: When Single-Threaded Isn't Enough

Okay, what about the thread pool? Node.js uses a default thread pool of 4 threads (configurable via `UV_THREADPOOL_SIZE`) to handle certain blocking operations.

### Operations That Use the Thread Pool

- **File System**: All file operations except `fs.watch()`
- **DNS**: `dns.lookup()` only
- **Crypto**: Some computationally expensive crypto operations
- **Zlib**: All compression/decompression operations

### Operations That DON'T Use the Thread Pool

- **Network I/O**: Uses native async mechanisms (epoll/kqueue/IOCP) - this is why Node.js excels at handling many concurrent network connections
- **Timers**: Managed by the event loop itself
- **Child processes**: Managed by the OS

## Why Single-Threaded? The Design Philosophy

This is a deliberate design choice. But why?

The single-threaded design was an architectural decision by Ryan Dahl (Node.js creator) to solve specific problems with traditional multi-threaded server architectures.

### The Cost of Multi-Threading

**Thread Management Overhead:**

- Context switching between threads is expensive
- CPU spends significant time just switching between threads
- Thread synchronization requires locks/mutexes
- Deadlocks, race conditions, and complex debugging become common

By avoiding these overheads, Node.js can handle many concurrent connections efficiently with a single thread, as long as the work is I/O-bound rather than CPU-bound.

## When Node.js Shines vs. When It Struggles

### Perfect For

- **Chat applications**: Lots of connections, little processing
- **API servers**: Quick request/response cycles
- **Real-time apps**: WebSocket connections
- **I/O heavy operations**: File uploads, database queries
- **Microservices**: Lightweight, fast startup times

### Not Great For

- **CPU-intensive work**: Video processing, machine learning
- **Heavy calculations**: Scientific computing, image manipulation
- **Blocking operations**: Synchronous heavy processing that blocks the event loop

Think of it like our waiter - great at taking orders and delivering food (I/O operations), not great at cooking the food itself (CPU-intensive work).

## Conclusion

Node.js achieves concurrency through its event-driven, non-blocking architecture. While it uses a single main thread for JavaScript execution, it leverages:

1. **The Event Loop** for managing asynchronous operations
2. **The Thread Pool** (via libuv) for blocking I/O operations
3. **Native async mechanisms** for network I/O

Is Node.js really single threaded? Yes and a no. It's single-threaded in JavaScript execution, but multi-threaded in its I/O handling, all orchestrated by the event loop.