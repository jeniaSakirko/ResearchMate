# Generated by Django 4.1 on 2022-09-09 22:12

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('research', '0004_researchattending_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='researchattending',
            name='status',
            field=models.CharField(choices=[('AS', 'Assigned'), ('IP', 'InProgress'), ('DR', 'Drop'), ('DO', 'Done')],
                                   default='AS', max_length=2),
        ),
    ]
