from django.core.exceptions import ValidationError


class ValidateResearchField:
    def __init__(self, name):
        self.name = name

    def start_validation(self):
        from .models import ResearchField

        if ResearchField.is_name_exist(name=self.name):
            raise ValidationError("Invalid research field nane - research field already exist.")


class ValidateResearch:
    def __init__(self, name, field_id):
        self.name = name
        self.field_id = field_id

    def start_validation(self):
        self.validate_research_name_unique()
        self.validate_field_exist()

    def validate_research_name_unique(self):
        from .models import Research

        if Research.is_research_name_exist(name=self.name):
            raise ValidationError("Invalid research nane - research already exist.")

    def validate_field_exist(self):
        from .models import ResearchField

        if not ResearchField.is_id_exist(field_id=self.field_id):
            raise ValidationError("Invalid research field id - id does not exist.")
