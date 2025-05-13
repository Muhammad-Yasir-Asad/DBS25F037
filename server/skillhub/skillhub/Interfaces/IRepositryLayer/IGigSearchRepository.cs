using skillhub.CommonLayer.Model.SearchResult;
namespace skillhub.Interfaces.IRepositryLayer
{
    public interface IGigSearchRepository
    {
        Task<List<SearchResult>> SearchGigsAsync(string query);
    }
}
