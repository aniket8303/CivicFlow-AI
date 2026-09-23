from sqlalchemy import Integer, String, Float
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
# pyrefly: ignore [missing-import]
from pgvector.sqlalchemy import Vector
from sqlalchemy import ForeignKey

class Base(DeclarativeBase):
    pass


class Report(Base):
    __tablename__ = "reports"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    title: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    description: Mapped[str] = mapped_column(
        String(500),
        nullable=False
    )

    location: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    latitude: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    longitude: Mapped[float | None] = mapped_column(
        Float,
        nullable=True
    )

    category: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        default="Other"
    )

    severity: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        default="MEDIUM"
    )

    priority: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        default="MEDIUM"
    )

    summary: Mapped[str] = mapped_column(
        String(500),
        nullable=False,
        default=""
    )

    embedding: Mapped[list[float] | None] = mapped_column(
        Vector(768),
        nullable=True
    )

    incident_id: Mapped[int | None] = mapped_column(
        Integer,
        ForeignKey("incidents.id"),
        nullable=True
    )
    
    incident = relationship("Incident", back_populates="reports")