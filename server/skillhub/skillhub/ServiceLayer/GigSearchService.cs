using skillhub.Interfaces.IRepositryLayer;
using skillhub.Interfaces.IServiceLayer;
using skillhub.CommonLayer.Model.SearchResult;

namespace skillhub.ServiceLayer
{
    public class GigSearchService : IGigSearchService
    {
        private readonly IGigSearchRepository _repository;

        public GigSearchService(IGigSearchRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<SearchResult>> SearchGigsAsync(string query)
        {
            if (string.IsNullOrWhiteSpace(query))
                throw new ArgumentException("Search query cannot be empty");

            return await _repository.SearchGigsAsync(query);
        }
    }
}
