using skillhub.CommonLayer.Model.GigPackageSkills;

namespace skillhub.Interfaces.IRepositryLayer
{
    public interface IGigPackageSkillRL
    {
        public Task<bool> AddGigPackageSkill(GigPackageSkill packageSkill);
        public Task<bool> UpdateGigPackageSkill(GigPackageSkill packageSkill);

    }
}
