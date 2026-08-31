CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(1000) NOT NULL,
    dueDate date NOT NULL,
    status boolean NOT NULL DEFAULT FALSE
);