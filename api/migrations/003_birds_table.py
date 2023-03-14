steps = [
    [
        """
        CREATE TABLE birds (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            picture_url VARCHAR(500),
            description TEXT,
            account_id integer REFERENCES accounts (id) ON DELETE CASCADE,
            family_id integer REFERENCES families (id) ON DELETE CASCADE
        );
        """,
        """
        DROP TABLE birds;
        """
    ]
]
