from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import PaperRank

# Register your models here.

@admin.register(PaperRank)
class PaperRankAdmin(admin.ModelAdmin):
    list_display = (
        'Authors', 
        'Authors_full_names', 
        'Author_ID', 
        'Title', 
        'Year', 
        'Source_title', 
        'Volume', 
        'Issue', 
        'Art_No', 
        'Page_start', 
        'Page_end',
        'Page_count', 
        'Citations', 
        'DOI', 
        'Link',
        'Affiliations',
        'Authors_with_Affiliations',
        'Abstract',
        'Author_Keywords',
        'Index_Keywords',
        'Molecular_Sequence_Numbers',
        'Chemicals',
        'Tradenames',
        'Manufacturers',
        'Funding_Details',
        'Funding_Texts',
        'Reference',
        'Correspondence_Address',
        'Editors',
        'Publisher',
        'Sponsors',
        'Conference_name',
        'Conference_date',
        'Conference_location',
        'Conference_code',
        'ISSN',
        'ISBN',
        'CODEN',
        'PubMed_ID',
        'Language', 
        'Abbreviated_Source_Title',
        'Document', 
        'Publication_Stage',
        'Open_Access',
        'Source',
        
    )
