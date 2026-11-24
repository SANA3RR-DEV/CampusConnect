from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.models.school import School
from app.schemas.school import SchoolRead

router = APIRouter(prefix="/schools", tags=["schools"])


@router.get("", response_model=list[SchoolRead])
def list_schools(db: Session = Depends(get_db)):
    statement = select(School).where(School.is_active.is_(True)).order_by(School.name)
    return list(db.scalars(statement).all())
