steps = [
    [
        """
        CREATE TABLE wishes (
            id SERIAL PRIMARY KEY NOT NULL,
            bird_id INTEGER NOT NULL REFERENCES birds(id) ON DELETE CASCADE,
            account_id INTEGER NOT NULL REFERENCES accounts(id) ON DELETE CASCADE
        );
        """,
        """
        DROP TABLE wishes;
        """
    ]
]
