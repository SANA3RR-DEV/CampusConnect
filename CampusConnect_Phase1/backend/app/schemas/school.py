from pydantic import BaseModel, ConfigDict


class SchoolRead(BaseModel):
    id: int
    name: str
    slug: str
    description: str | None
    is_active: bool

    model_config = ConfigDict(from_attributes=True)
