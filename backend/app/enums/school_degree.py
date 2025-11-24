import enum

class SchoolDegreeEnum(str, enum.Enum):
    incomplete_first_degree = "Incomplete First Degree"
    complete_first_degree = "Complete First Degree"
    complete_second_degree = "Complete Second Degree"
    higher_education = "Higher Education"
    postgraduate = "Postgraduate"