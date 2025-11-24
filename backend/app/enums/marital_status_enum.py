import enum

class MaritalStatusEnum(str, enum.Enum):
    single = "Single"
    married = "Married"
    divorced = "Divorced"
    widowed = "Widowed"