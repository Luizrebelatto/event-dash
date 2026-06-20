CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS event_statuses (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL
);

INSERT INTO event_statuses (id, label)
VALUES
  ('draft', 'Draft'),
  ('active', 'Active'),
  ('finished', 'Finished')
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  date DATE NOT NULL,
  status_id TEXT NOT NULL REFERENCES event_statuses(id),
  guests_limit INTEGER NOT NULL,
  photos_per_guest INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('invited', 'joined')),
  photos_count INTEGER NOT NULL DEFAULT 0,
  joined_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);