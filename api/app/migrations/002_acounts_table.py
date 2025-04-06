steps = [
    [
        """
        CREATE TABLE accounts(
            id SERIAL PRIMARY KEY NOT NULL,
            name VARCHAR(50) NOT NULL,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(1000) NOT NULL,
            picture_url VARCHAR(1000),
            created_on TIMESTAMP
        );
        """,
        """
        DROP TABLE accounts;
        """
    ]
]
