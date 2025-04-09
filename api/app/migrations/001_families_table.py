steps = [
    [
        """
        CREATE TABLE families (
            id SERIAL PRIMARY KEY NOT NULL,
            family VARCHAR(100) NOT NULL
        );
        """,
        """
        DROP TABLE families;
        """
    ]
]
