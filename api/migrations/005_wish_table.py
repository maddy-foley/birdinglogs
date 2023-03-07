steps = [
    [
        """
        CREATE TABLE wishes (
            id SERIAL PRIMARY KEY NOT NULL,
            birds_id INTEGER NOT NULL REFERENCES birds(id) ON DELETE CASCADE,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
        );
        """,
        """
        DROP TABLE wishes;
        """
    ]
]
