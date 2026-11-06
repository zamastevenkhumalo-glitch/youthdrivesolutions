# YouthDrive Solutions — Administration Dashboard (Phase 1)

This is a standalone local React prototype built alongside the public YouthDrive website.

## Setup

From the repository root:

```bash
cd admin
npm install
npm run dev
```

Visit **http://localhost:5174/**. The existing public `frontend/` can continue running at http://localhost:5173/.

## Included

- Business overview: KPIs, monthly activity chart and service-request breakdown
- Customer directory for website and offline enquiries
- Service-request list with status changes
- Vehicle-sourcing enquiry list with status changes
- Payments ledger with clearly fictional records
- Local date-range and search filters, demo CSV exports, and sample-enquiry form

All changes are **in memory only** and reset on refresh. All data is invented for demonstration; it does not represent YouthDrive's actual customers, revenue, or sales.

## Important: not yet private or production-ready

This proof of concept has **no authentication, authorization, database, or payment-provider integration**. It must not be deployed to a public website or used with personal customer details. A route named `/admin` or a hidden URL would not provide security.

A production version needs secure invite-only staff login, role-based authorization enforced server-side, database access controls, audit logs, backups, and verified payment webhooks. Public customers will still be able to use the main service website without registering.

The proposed eventual entry point is `https://admin.youthdrivesolutions.co.za`, but it does not exist yet.

## Test

```bash
npm run build
```

Development branch: `react-redesign`. Keep the existing `frontend/` untouched.
