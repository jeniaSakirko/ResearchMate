# Generated by Django 4.0.6 on 2022-07-21 21:19

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("base_user", "0001_initial"),
        ("research", "0002_test_data"),
    ]

    operations = [
        migrations.CreateModel(
            name="Researcher",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "base_user",
                    models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to="base_user.baseuser"),
                ),
            ],
        ),
        migrations.CreateModel(
            name="ManageResearch",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "research",
                    models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to="research.research"),
                ),
                (
                    "researcher",
                    models.ForeignKey(
                        null=True, on_delete=django.db.models.deletion.SET_NULL, to="researcher.researcher"
                    ),
                ),
            ],
        ),
    ]
