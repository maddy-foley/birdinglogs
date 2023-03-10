steps = [
    [
        """
        CREATE TABLE sightings (
            id SERIAL PRIMARY KEY NOT NULL,
            bird_id INTEGER NOT NULL REFERENCES birds(id) ON DELETE CASCADE,
            account_id INTEGER NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
            comment VARCHAR(1000),
            spotted_on DATE
        );
        """,
        """
        DROP TABLE sightings;
        """
    ]
]
