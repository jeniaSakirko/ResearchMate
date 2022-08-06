from django.db import migrations, transaction


class Migration(migrations.Migration):
    dependencies = [
        ("form", "0001_initial"),
    ]

    def generate_data(apps, schema_editor):
        from form.models import FormMetadata

        test_data = [
            ("Research Protocol", "https://docs.google.com/document/d/15CpB07ah0GaWBQ4aY8hZQsedYm-LHIHo/edit", 1),
            ("Written Consent", "https://docs.google.com/document/d/1wUWfYI2IgiyhY3W8qn7Hoe0g9H4tHV-D/edit", 1),
        ]

        with transaction.atomic():
            for name, url, research_id in test_data:
                FormMetadata.create(name=name, url=url, research_id=research_id)

    operations = [
        migrations.RunPython(generate_data),
    ]
