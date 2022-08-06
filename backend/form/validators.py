from django.core.exceptions import ValidationError
from django.core.validators import URLValidator


class ValidateFormMetadata:
    def __init__(self, name, url, research_id):
        self.name = name
        self.url = url
        self.research_id = research_id

    def start_validation(self):
        self.validate_form_name_unique_for_research()
        self.validate_form_url()
        self.validate_research_exist()

    def validate_form_name_unique_for_research(self):
        from .models import FormMetadata

        if FormMetadata.is_form_name_exist(name=self.name):
            raise ValidationError("Invalid form name - name already exist.")

    def validate_form_url(self):
        try:
            validator = URLValidator()
            validator(self.url)
        except ValidationError:
            raise ValidationError("Invalid form URL.")

    def validate_research_exist(self):
        from .models import Research

        if not Research.is_research_id_exist(research_id=self.research_id):
            raise ValidationError("Invalid research id - id does not exist.")
