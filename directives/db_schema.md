# Database Schema Directive

## Tables

### `public.applications`

Stores high-friction form submissions from `/apply`.

| Column | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | `gen_random_uuid()` | Primary Key |
| `created_at` | `timestamptz` | `now()` | Submission time |
| `email` | `text` | - | **Unique**. Contact email. |
| `first_name` | `text` | - | Applicant name. |
| `venue_name` | `text` | - | Business name. |
| `annual_weddings` | `int` | - | **Logic Gate**. >20 = Qualified. |
| `pain_point` | `text` | - | "Ghosting", "Leads", etc. |
| `status` | `text` | `'new'` | `new`, `qualified`, `rejected`, `booked`. |

## RLS Policies

- **Insert**: Public (Anonymous) allowed.
- **Select/Update**: Authenticated Admin roles only.
