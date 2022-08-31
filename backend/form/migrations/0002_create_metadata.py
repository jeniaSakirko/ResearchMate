from django.db import migrations, transaction


class Migration(migrations.Migration):
    dependencies = [
        ("form", "0001_initial"),
    ]

    def generate_data(apps, schema_editor):
        from form.models import FormMetadata

        test_data = [
            ("Research Protocol", "resources/protocol.pdf", 1),
            ("Written Consent", "resources/consent.pdf", 1),
        ]

        with transaction.atomic():
            for name, url, research_id in test_data:
                FormMetadata.create(name=name, url=url, research_id=research_id)

    operations = [
        migrations.RunPython(generate_data),
    ]
