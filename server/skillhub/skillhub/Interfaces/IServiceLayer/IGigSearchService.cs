using skillhub.CommonLayer.Model.SearchResult;
namespace skillhub.Interfaces.IServiceLayer
{
    public interface IGigSearchService
    {
        Task<List<SearchResult>> SearchGigsAsync(string query);

    }
}
