from import_export import resources
from .models import PaperRank

class PaperRankResource(resources.ModelResource):
    class Meta:
        model = PaperRank