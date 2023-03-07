steps = [
    [
        """
        CREATE TABLE birds (
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(100) NOT NULL,
            picture_url VARCHAR(500),
            description TEXT,
            family_id integer REFERENCES families (id)
        );
        """,
        """
        DROP TABLE birds;
        """
    ]
]
