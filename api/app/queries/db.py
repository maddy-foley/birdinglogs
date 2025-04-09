from psycopg_pool import ConnectionPool
import os


pool = ConnectionPool(conninfo=os.environ.get('DATABASE_URL'))
