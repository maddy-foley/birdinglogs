import json
import datetime
from pydantic import BaseModel
from typing import Optional
from queries.db import pool
from datetime import date
from models.family import FamilyIn
from models.birds import BirdIn



# Get json data from wine bid
with open('data/families.json') as data:
    data = json.load(data)
    output = [
        FamilyIn(
            family = bird
        ) for bird in data
    ]



for bird in output:
    with pool.connection() as conn:
        with conn.cursor() as cur:
            result = cur.execute(
                """
                INSERT INTO families
                    (family)
                VALUES
                    (%s)
                RETURNING id;
                """,
                [
                    bird.family
                ]
            )
            print("added family")


# Get json data from wine bid
with open('data/dictbirdfamily.json') as data:
    data = json.load(data)
    birds = list(data.keys())
    bird_list = [
        BirdIn(
            name = bird,
            description = data[bird]['summary'],
            picture_url = data[bird]['image'],
            family = data[bird]['family']
        ) for bird in birds
    ]

count = 0
for bird in bird_list:
    count += 1
    with pool.connection() as conn:
        with conn.cursor() as cur:
            item = cur.execute(
                """
                SELECT id
                FROM families
                WHERE family=%s;
                """,
                [ bird.family ]
            )
            fam_id = item.fetchone()[0]
    with pool.connection() as conn2:
        with conn2.cursor() as cur2:
            result = cur2.execute(
                """
                INSERT INTO birds
                    (name, picture_url, description, family_id)
                VALUES
                    (%s, %s, %s, %s)
                RETURNING id;
                """,
                [
                    bird.name,
                    bird.picture_url,
                    bird.description,
                    fam_id
                ]
            )
            print(f"Bird #{count} added.")
