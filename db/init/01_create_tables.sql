CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL,
    display_name TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cards (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    element TEXT,
    weight INT,
    status TEXT DEFAULT 'unprocessed',
    parent_id INT REFERENCES cards(id),
    created_by INT REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS card_logs (
    id SERIAL PRIMARY KEY,
    card_id INT REFERENCES cards(id),
    user_id INT REFERENCES users(id),
    action TEXT NOT NULL,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);
