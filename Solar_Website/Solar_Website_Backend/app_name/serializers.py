# from rest_framework import serializers
# from .models import PaperRank

# class PaperRankSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PaperRank
#         fields = '__all__'

# class PaperRankSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PaperRank
#         fields = [
#         'Authors', 
#         'Authors_full_names', 
#         'Author_ID', 
#         'Title', 
#         'Year', 
#         'Source_title', 
#         'Volume', 
#         'Issue', 
#         'Art_No', 
#         'Page_start', 
#         'Page_end',
#         'Page_count', 
#         'Citations', 
#         'DOI', 
#         'Link',
#         'Affiliations',
#         'Authors_with_Affiliations',
#         'Abstract',
#         'Author_Keywords',
#         'Index_Keywords',
#         'Molecular_Sequence_Numbers',
#         'Chemicals',
#         'Tradenames',
#         'Manufacturers',
#         'Funding_Details',
#         'Funding_Texts',
#         'Reference',
#         'Correspondence_Address',
#         'Editors',
#         'Publisher',
#         'Sponsors',
#         'Conference_name',
#         'Conference_date',
#         'Conference_location',
#         'Conference_code',
#         'ISSN',
#         'ISBN',
#         'CODEN',
#         'PubMed_ID',
#         'Language', 
#         'Abbreviated_Source_Title',
#         'Document', 
#         'Publication_Stage',
#         'Open_Access',
#         'Source',
        
#         ]

from rest_framework import serializers
from .models import PaperRank

class PaperRankSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaperRank
        fields = '__all__'

    field_mapping = {
        "Author full names": "Authors_full_names",
        "Author(s) ID": "Author_ID",
        "Source title": "Source_title",
        "Art. No.": "Art_No",
        "Page start": "Page_start",
        "Page end": "Page_end",
        "Page count": "Page_count",
        "Cited by": "Citations",
        "Authors with affiliations": "Authors_with_Affiliations",
        "Author Keywords": "Author_Keywords",
        "Index Keywords": "Index_Keywords",
        "Molecular Sequence Numbers": "Molecular_Sequence_Numbers",
        "Chemicals/CAS": "Chemicals",
        "Funding Details": "Funding_Details",
        "Funding Texts": "Funding_Texts",
        "Correspondence Address": "Correspondence_Address",
        "Conference name": "Conference_name",
        "Conference date": "Conference_date",
        "Conference location": "Conference_location",
        "Conference code": "Conference_code",
        "PubMed ID": "PubMed_ID",
        "Language of Original Document": "Language",
        "Abbreviated Source Title": "Abbreviated_Source_Title",
        "Document Type": "Document",
        "Publication Stage": "Publication_Stage",
        "Open Access": "Open_Access",
        "References": "Reference",
        "EID": "EID",
    }

    def to_representation(self, instance):
        data = super().to_representation(instance)
        reverse_mapping = {v: k for k, v in self.field_mapping.items()}
        
        transformed_data = {}
        for key, value in data.items():
            display_key = reverse_mapping.get(key, key)
            transformed_data[display_key] = value
            
        return transformed_data

    def to_internal_value(self, data):
        transformed_data = {}
        
        for key, value in data.items():
            db_key = self.field_mapping.get(key, key)
            transformed_data[db_key] = value
            
        return super().to_internal_value(transformed_data)