from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.models.report_model import Base


DATABASE_URL = "postgresql+psycopg2://postgres:tiger@localhost:5432/civicflow"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()