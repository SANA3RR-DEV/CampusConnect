from sqlalchemy import select

from app.db.session import Base, SessionLocal, engine
from app.models.school import School

# Initial school seed records. Confirm official names and current structure
# with the university before using these records in a public production launch.
SCHOOLS = [
    ("School of Arts, Humanities and Social Sciences", "arts-humanities-social-sciences"),
    ("School of Management Sciences", "management-sciences"),
    ("School of Mathematics and Natural Sciences", "mathematics-natural-sciences"),
    ("School of Law, Governance and Public Policy", "law-governance-public-policy"),
    ("School of Biosciences", "biosciences"),
    ("School of Engineering", "engineering"),
]


def main():
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as db:
        for name, slug in SCHOOLS:
            exists = db.scalar(select(School).where(School.slug == slug))
            if not exists:
                db.add(School(name=name, slug=slug))
        db.commit()
    print("Database initialized; school seed data is present.")


if __name__ == "__main__":
    main()
