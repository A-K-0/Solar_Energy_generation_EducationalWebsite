from django.db import models

# class PaperRank(models.Model):
#     # Authors = models.CharField(max_length=5000)
#     # Year = models.CharField(max_length=5)
#     # Publisher = models.CharField(max_length=500)
#     # Language = models.CharField(max_length=500)
#     # Document= models.CharField(max_length=500,default="null")
#     # Affiliations = models.CharField(max_length=500)
#     Authors = models.CharField(max_length=5000)
#     Authors_full_names=
#     Author_ID=
#     Title= 
#     Year = models.CharField(max_length=5)
#     Source_title=
#     Volume=
#     Issue=
#     Art_No=
#     Page_start=
#     Page_end=
#     Page_count=
#     Citations=
#     DOI=
#     Link=
#     Affiliations = models.CharField(max_length=500)
#     Authors_with_Affiliations=
#     Abstract=
#     Author_Keywords=
#     Index_Keywords=
#     Molecular_Sequence_Numbers=
#     Chemicals=
#     Tradenames=
#     Manufacturers=
#     Funding_Details=
#     Funding_Texts=
#     Reference=
#     Correspondence_Address=
#     Editors=
#     Publisher = models.CharField(max_length=500)
#     Sponsors=
#     Conference_name=
#     Conference_date=
#     Conference_location=
#     Conference_code=
#     ISSN=
#     ISBN=
#     CODEN=
#     PubMed_ID=
#     Language = models.CharField(max_length=500)
#     Abbreviated_Source_Title=
#     Document= models.CharField(max_length=500,default="null")
#     Publication_Stage=
#     Open_Access=
#     Source=
#     EID=
    
# class PaperRank(models.Model):
#     Authors = models.CharField(max_length=5000, default="Unknown Authors")
#     Authors_full_names = models.TextField(default="Unknown Authors")
#     Author_ID = models.CharField(max_length=1000, default="Unknown")  # Assuming it's a string of IDs
#     Title = models.CharField(max_length=1000, default="Unknown Title")
#     Year = models.CharField(max_length=5, default="0000")
#     Source_title = models.CharField(max_length=1000, default="Unknown Source")
#     Volume = models.CharField(max_length=50, default="N/A")
#     Issue = models.CharField(max_length=50, default="N/A")
#     Art_No = models.CharField(max_length=50, null=True, blank=True)  # Article number might not always be available
#     Page_start = models.CharField(max_length=10, default="N/A")
#     Page_end = models.CharField(max_length=10, default="N/A")
#     Page_count = models.CharField(max_length=10)  # Page count as an integer
#     Citations = models.CharField(max_length=2,null=True, blank=True)
#     DOI = models.CharField(max_length=100, null=True, blank=True)
#     Link = models.CharField(max_length=250,null=True, blank=True)
#     Affiliations = models.CharField(max_length=500, default="Unknown Affiliations")
#     Authors_with_Affiliations = models.TextField(null=True, blank=True)
#     Abstract = models.TextField(null=True, blank=True)
#     Author_Keywords = models.TextField(null=True, blank=True)
#     Index_Keywords = models.TextField(null=True, blank=True)
#     Molecular_Sequence_Numbers = models.CharField(max_length=500, null=True, blank=True)
#     Chemicals = models.TextField(null=True, blank=True)
#     Tradenames = models.TextField(null=True, blank=True)
#     Manufacturers = models.TextField(null=True, blank=True)
#     Funding_Details = models.TextField(null=True, blank=True)
#     Funding_Texts = models.TextField(null=True, blank=True)
#     Reference = models.TextField(null=True, blank=True)
#     Correspondence_Address = models.TextField(null=True, blank=True)
#     Editors = models.TextField(null=True, blank=True)
#     Publisher = models.CharField(max_length=500, default="Unknown Publisher")
#     Sponsors = models.TextField(null=True, blank=True)
#     Conference_name = models.CharField(max_length=500, null=True, blank=True)
#     Conference_date = models.CharField(max_length=100, null=True, blank=True)
#     Conference_location = models.CharField(max_length=500, null=True, blank=True)
#     Conference_code = models.CharField(max_length=100, null=True, blank=True)
#     ISSN = models.CharField(max_length=50, null=True, blank=True)
#     ISBN = models.CharField(max_length=50, null=True, blank=True)
#     CODEN = models.CharField(max_length=50, null=True, blank=True)
#     PubMed_ID = models.CharField(max_length=50, null=True, blank=True)
#     Language = models.CharField(max_length=500, default="Unknown Language")
#     Abbreviated_Source_Title = models.CharField(max_length=500, null=True, blank=True)
#     Document = models.CharField(max_length=500, default="null")
#     Publication_Stage = models.CharField(max_length=50, null=True, blank=True)
#     Open_Access = models.CharField(max_length=100,default=False)
#     Source = models.CharField(max_length=100, null=True, blank=True)
    



#     def __str__(self):
#         return self.Title

    
    
from django.db import models

class PaperRank(models.Model):
    Authors = models.TextField(default="Unknown Authors")
    Authors_full_names = models.TextField(default="Unknown Authors")
    Author_ID = models.CharField(max_length=2000, default="Unknown",verbose_name="Author ID")  # Assuming it's a string of IDs
    Title = models.CharField(max_length=2000, default="Unknown Title")
    Year = models.CharField(max_length=5, default="0000")
    Source_title = models.CharField(max_length=2000, default="Unknown Source")
    Volume = models.CharField(max_length=2000, default="N/A")
    Issue = models.CharField(max_length=2000, default="N/A")
    Art_No = models.CharField(max_length=2000, null=True, blank=True)  # Article number might not always be available
    Page_start = models.CharField(max_length=2000, default="N/A")
    Page_end = models.CharField(max_length=2000, default="N/A")
    Page_count = models.CharField(max_length=2000)  # Page count as an integer
    Citations = models.CharField(max_length=2000, null=True, blank=True)  # Increased length
    DOI = models.CharField(max_length=2000, null=True, blank=True)
    Link = models.CharField(max_length=2000, null=True, blank=True)
    Affiliations = models.TextField(default="Unknown Affiliations")
    Authors_with_Affiliations = models.TextField(null=True, blank=True)
    Abstract = models.TextField(null=True, blank=True)
    Author_Keywords = models.TextField(null=True, blank=True)
    Index_Keywords = models.TextField(null=True, blank=True)
    Molecular_Sequence_Numbers = models.CharField(max_length=2000, null=True, blank=True)
    Chemicals = models.TextField(null=True, blank=True)
    Tradenames = models.TextField(null=True, blank=True)
    Manufacturers = models.TextField(null=True, blank=True)
    Funding_Details = models.TextField(null=True, blank=True)
    Funding_Texts = models.TextField(null=True, blank=True)
    Reference = models.TextField(null=True, blank=True)
    Correspondence_Address = models.TextField(null=True, blank=True)
    Editors = models.TextField(null=True, blank=True)
    Publisher = models.TextField(default="Unknown Publisher")
    Sponsors = models.TextField(null=True, blank=True)
    Conference_name = models.TextField(null=True, blank=True)
    Conference_date = models.CharField(max_length= 2000, null=True, blank=True)
    Conference_location = models.TextField(null=True, blank=True)
    Conference_code = models.CharField(max_length=2000, null=True, blank=True)
    ISSN = models.CharField(max_length=2000, null=True, blank=True)
    ISBN = models.CharField(max_length=2000, null=True, blank=True)
    CODEN = models.CharField(max_length=2000, null=True, blank=True)
    PubMed_ID = models.CharField(max_length=2000, null=True, blank=True)
    Language = models.CharField(max_length=2000, default="Unknown Language")
    Abbreviated_Source_Title = models.CharField(max_length=2000, null=True, blank=True)
    Document = models.TextField(default="null")
    Publication_Stage = models.CharField(max_length=2000, null=True, blank=True)
    Open_Access = models.CharField(max_length=2000, default=False)
    Source = models.CharField(max_length=2000, null=True, blank=True)
    EID = models.CharField(max_length=2000, null=True, blank=True)

    def _str_(self):
        return self.Title