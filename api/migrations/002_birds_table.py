steps = [
    [
        """
        CREATE TABLE birds (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            picture_url VARCHAR(1000),
            description VARCHAR(5000),
            family_id INTEGER NOT NULL REFERENCES families(id) ON DELETE CASCADE

        );
        """,
        """
        DROP TABLE birds;
        """
    ]
]
