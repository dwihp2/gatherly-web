Product Requirements Document: Gatherly MVP
Author: GitHub Copilot (as Product Manager) Status: Draft Last Updated: August 1, 2025

1. Overview
This document outlines the requirements for the Minimum Viable Product (MVP) of Gatherly, a self-service, mobile-first ticketing SaaS platform designed for the Indonesian market. The MVP will focus on providing the core functionality for small to medium Event Organizers (EOs) to create, manage, and sell tickets for their events, and for attendees to purchase them seamlessly.

**Language Policy**: The application will be built in English as the primary language for the MVP. While designed for the Indonesian market, English will be used for all interface text, documentation, and communications to ensure broader accessibility and easier international expansion. Indonesian localization will be considered for post-MVP development.

2. Problem Statement
Small to medium event organizers in Indonesia (e.g., workshop hosts, campus committees, local music communities) lack access to a simple, affordable, and trustworthy ticketing solution. Existing platforms can be overly complex, carry high fees, or lack integration with locally preferred payment methods. This creates a barrier to entry for smaller events and a cumbersome purchasing experience for attendees.

3. Goals & Objectives
Business Goal: Validate the core product-market fit. Acquire the first 50 active Event Organizers and successfully process 1,000 paid tickets within 3 months of launch.
Product Goal: Deliver the fastest and simplest event creation and ticket-selling experience on the market. An organizer should be able to go from sign-up to a live event page in under 10 minutes.
User Goals:
Organizer: "I want to easily create a page for my event, set a ticket price, and start selling online without any technical help."
Attendee: "I want to buy a ticket for an event quickly on my phone using QRIS or my e-wallet and get my e-ticket instantly."
4. User Personas
Primary Persona: "Rina", the Campus Event Organizer

Who: A university student leading a committee for a campus music festival.
Needs: A free or very low-cost platform. Extreme ease of use. A simple dashboard to track sales and a reliable way to check in attendees on event day.
Pain Points: Limited budget, no technical team, needs to report sales figures to the university.
Secondary Persona: "Budi", the Ticket Buyer

Who: A young professional looking to attend a local workshop.
Needs: A mobile-friendly purchase flow. Payment via GoPay/OVO/DANA (QRIS). Instant confirmation and an e-ticket sent to his email or WhatsApp.
Pain Points: Complicated checkout forms, being forced to use credit cards, fear of fake tickets or scams.
5. MVP Scope: Features & User Stories
The MVP is defined by the following epics and user stories.

Epic 1: Organizer Event Management
User Story	Acceptance Criteria	Priority
As an EO, I can sign up for an account using my email and password.	- Simple sign-up form. <br>- Email verification is required to activate the account.	High
As an EO, I can create a new event with essential details.	- A single form to input: Event Name, Date & Time, Location, a short Description, and upload one Event Poster image.	High
As an EO, I can create at least one ticket type for my event.	- Ability to add a ticket type with a Name (e.g., "Regular") and a Price (in IDR). <br>- Can set a total quantity available for that ticket type.	High
As an EO, I can view a simple dashboard for my event.	- Dashboard shows: Total Sales (IDR), Number of Tickets Sold. <br>- A downloadable list of attendees with their Name, Email, and Ticket Type.	High
As an EO, I can publish my event to generate a shareable public link.	- A "Publish" button makes the event page live. <br>- The system generates a unique, shareable URL (e.g., gatherly.com/events/nama-event-unik).	High
Epic 2: Attendee Ticket Purchase
User Story	Acceptance Criteria	Priority
As an Attendee, I can view a clean, mobile-first public event page.	- Page displays all event details provided by the EO. <br>- A clear "Buy Ticket" call-to-action is visible.	High
As an Attendee, I can select a ticket and proceed to checkout.	- User provides their Full Name, Email, and WhatsApp Number.	High
As an Attendee, I can pay for my ticket using a primary Indonesian payment method.	- Integration with a payment gateway (e.g., Xendit/Midtrans) to provide a QRIS payment option at a minimum.	High
As an Attendee, I receive my e-ticket upon successful payment.	- After payment, a confirmation page is shown. <br>- An email is sent instantly containing the e-ticket as a PDF attachment with a unique QR code.	High
Epic 3: Event Day Check-in
User Story	Acceptance Criteria	Priority
As an Event Staff, I can scan attendee QR codes using a web-based scanner.	- EO can access a special scanner URL from their dashboard. <br>- The page uses the phone's camera to scan QR codes. No app installation is needed.	High
As an Event Staff, I get clear visual feedback upon scanning a ticket.	- Valid Ticket: Green screen with "Check-in Success" and attendee name. <br>- Duplicate Scan: Yellow screen with "Already Checked In". <br>- Invalid Ticket: Red screen with "Invalid Ticket".	High
6. Post-MVP Features (Future Scope)
These features will be prioritized for development after the MVP has been launched and validated.

Tier 1: Paid Features (Pro Plan)
Multiple Ticket Tiers: Allow EOs to create Early Bird, VIP, and other tiered tickets.
Custom Branding: Remove "Powered by Gatherly" branding and allow EOs to use their own logo.
Discount Codes: Ability for EOs to create and manage promotional codes.
Detailed Analytics: Advanced dashboard with sales charts, attendee demographics, and traffic sources.
Team Access: Allow EOs to invite team members to manage the event.
Tier 2: Platform Expansion
Dedicated Mobile App: A React Native app for organizers (management) and attendees (ticket wallet, event discovery).
Anti-Scalper Features: Link tickets to National ID (NIK), implement dynamic QR codes.
Seat-mapping: Allow organizers for seated events (theaters, auditoriums) to create a seat map.
Merchandise & Add-ons: Sell merchandise or other items alongside tickets.
WhatsApp Integration: Send tickets and notifications directly via WhatsApp.
7. Success Metrics
Activation Rate: % of new sign-ups who create and publish their first event. (Target: >40%)
Transaction Volume: Total number of paid tickets sold per month. (Target: 500+/month by Month 3)
Organizer Retention: % of EOs who create a second event within 2 months of their first. (Target: >25%)
User Satisfaction (NPS/CSAT): Simple feedback form for both EOs and attendees after a transaction.
8. Out of Scope for MVP
Subscription plans (MVP will use a simple commission fee per ticket sold).
Seated events / seat selection.
Custom domains for event pages.
Waiting lists for sold-out events.
Any features listed in the "Post-MVP" section.