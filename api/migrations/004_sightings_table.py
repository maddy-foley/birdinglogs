steps = [
    [
        """
        CREATE TABLE sightings (
            id SERIAL PRIMARY KEY NOT NULL,
            birds_id INTEGER NOT NULL REFERENCES birds(id) ON DELETE CASCADE,
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            comments VARCHAR(1000),
            spotted_on TIMESTAMP

        );
        """,
        """
        DROP TABLE sightings;
        """
    ]
]
