import os
from sqlalchemy import create_engine, Column, Integer, String, Numeric, DateTime, ForeignKey, Table, func, select
from sqlalchemy.orm import sessionmaker, Mapped, relationship, mapped_column
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime
from typing import List, Optional
engine = create_engine(os.getenv('SQLITE_URI'), echo=True)
Base = declarative_base()
DBSession = sessionmaker(bind=engine)

class ApiKey(Base):
    __tablename__ = 'api_keys'

    user_id: Mapped[int] = mapped_column(primary_key=True)
    key: Mapped[str] = mapped_column(unique=True)
    role: Mapped[str] = mapped_column()

    def __repr__(self):
        return f"<ApiKey(user_id={self.user_id}, role={self.role})>"
