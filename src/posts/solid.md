---
title: SOLID Principles
date: 2025-11-13
tags: Design Patterns, Software
---

Design Patterns aka the Design Motifs are a blueprint/template to solve problems when designing software. It's like a blueprint to build a kitchen - meaning what you need to build a kitchen and not the pre-fabricated version of a kitchen itself. There are a few **solid principles** that make these patterns work and they are called **SOLID Principles** (pun intended)

Let's break down these principles in a fun way to understand them further and how we can implement them:
1. S - Single Responsibility Principle
2. O - Open/Closed Principle
3. L - Liskov Substitution Principle
4. I - Interface Segregation Principle
5. D - Dependency Inversion Principle

## S: Single Responsibility Principle

Lego Analogy: Imagine a single LEGO brick. A 2x4 red brick has only one job: Be a 2x4 red brick, and not anything else. Now, imagine the same 2x4 brick and a wheel molded together to make a weird shape. Where would we use it? Nowhere.

Technical Definition: A class should have only one reason to change. 

Technical Example: A `UserManagerService` class should not manage the user states, send emails, and generate reports. There should be two more classes to do so - `EmailService` and `ReportGeneratorService`

## O: Open/Closed Principle

Lego Analogy: You don't take the 2x4 brick, rip it apart, and add a new part. Instead, you snap a new 1x2 piece or a wheel extending the functionality of the 2x4 instead of breaking it.

Technical Definition: A class should be **open** for extension, and **closed** for modification

Technical Example: There is a new feature request - generate email reports. Unlike my frayed attention span, you remember that there is a class called `ReportGeneratorService` which you can add the new feature request to. You don't add a new type inside `ReportGeneratorService` but extend a new class or an interface called `EmailReportGeneratorService`

## L: Liskov Substitution Principle:

Lego Analogy: You have a box named **Lego 2x2 bricks** which has a lot of colored 2x2 bricks. All the bricks inside the box would fit. Now, you pull a real-life 2x2 brick - it looks like the lego 2x2 but it's not a good substitute.

Technical Definition: Objects of a superclass must be replaceable with objects of a subclass without affecting the correctness of the program.

Technical Example: There is a base class `Bird` and subclasses `Robin` (not the Batman) and `Penguin` - you cannot assume that a bird can fly. If you try to invoke a `Penguin` in your fly(), it's going to crash. This is a classic violation of Circle-Oval and Square-Rectangle problem. 

## I: Interface Segregation Principle

Lego Analogy: When you buy a lego set, it comes with multiple small booklets. Why don't they give a 1000-page giant book? It means that to build a little car, you would have to find your way through 100s of unwanted pages - no "fat" interfaces.

Technical Definition: Clients should not be forced to depend on methods that they do not use.

Technical Example: Assume that you have a `IMultiPrinter` that scans, reports, and prints. I don't need everything at once. It's safe to create `IPrinter`, `IScanner` and `IReporter` and implement it according to your will.

## D: Dependency Inversion Principle

Lego Analogy: A LEGO baseplate (high-level) doesn't have a specific "spaceship-wing-shaped hole" in it. That would be crazy. Instead, the baseplate just has standard studs (an abstraction). Any other LEGO piece (low-level), from a wing to a tree, is designed to fit those same studs. Both depend on the "stud standard," not each other.

Technical Definition: High-level modules should not depend on low-level modules. Both should depend on abstractions.

Technical Example: Your `PaymentProcessor` (high-level) shouldn't know what `StripeService` (low-level) is. Instead, it should depend on an IPaymentGateway interface (the abstraction). Then, your StripeService can "plug into" that interface, and so can PayPalService later.





