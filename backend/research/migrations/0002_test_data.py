from django.db import migrations, transaction


class Migration(migrations.Migration):
    dependencies = [
        ("research", "0001_initial"),
    ]

    def generate_data(apps, schema_editor):
        from research.models import Research, ResearchField

        field_test_data = ["Brain"]
        research_test_data = [("Plasticity of the motor network", 1, 50)]

        with transaction.atomic():
            for name in field_test_data:
                field = ResearchField.create(name=name)
                field.save()

            for name, field_id, capacity in research_test_data:
                research = Research.create(name=name, field_id=field_id, capacity=capacity)
                research.save()

    operations = [
        migrations.RunPython(generate_data),
    ]
